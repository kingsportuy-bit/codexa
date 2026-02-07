import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { AnalyticsEvent, AnalyticsData, EventType } from './types';

export const dynamic = 'force-dynamic';

const DATA_FILE_PATH = path.join(process.cwd(), 'data', 'barberox-analytics.json');

// Ensure data directory and file exist
function ensureDataFile() {
    const dir = path.dirname(DATA_FILE_PATH);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    if (!fs.existsSync(DATA_FILE_PATH)) {
        const initialData: AnalyticsData = { events: [] };
        fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(initialData, null, 2));
    }
}

// Read analytics data from file
function readAnalyticsData(): AnalyticsData {
    ensureDataFile();
    const fileContent = fs.readFileSync(DATA_FILE_PATH, 'utf-8');
    return JSON.parse(fileContent);
}

// Write analytics data to file
function writeAnalyticsData(data: AnalyticsData) {
    ensureDataFile();
    fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(data, null, 2));
}

// POST: Record a new analytics event
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { type, metadata } = body;

        if (!type || !['page_view', 'cta_click', 'pricing_navigation', 'section_view'].includes(type)) {
            return NextResponse.json(
                { error: 'Invalid event type' },
                { status: 400 }
            );
        }

        const newEvent: AnalyticsEvent = {
            id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            timestamp: new Date().toISOString(),
            type: type as EventType,
            metadata: metadata || {}
        };

        const data = readAnalyticsData();
        data.events.push(newEvent);
        writeAnalyticsData(data);

        return NextResponse.json({ success: true, event: newEvent });
    } catch (error) {
        console.error('Analytics POST error:', error);
        return NextResponse.json(
            { error: 'Failed to record event' },
            { status: 500 }
        );
    }
}

// GET: Retrieve analytics data with optional filtering
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);

        const fromDate = searchParams.get('fromDate');
        const toDate = searchParams.get('toDate');
        const fromTime = searchParams.get('fromTime');
        const toTime = searchParams.get('toTime');
        const eventType = searchParams.get('eventType') as EventType | null;

        const data = readAnalyticsData();
        let filteredEvents = [...data.events];

        // Filter by date range
        if (fromDate) {
            const fromDateTime = new Date(fromDate);
            filteredEvents = filteredEvents.filter(event =>
                new Date(event.timestamp) >= fromDateTime
            );
        }

        if (toDate) {
            const toDateTime = new Date(toDate);
            if (!toDate.includes('T')) {
                toDateTime.setUTCHours(23, 59, 59, 999); // End of day in UTC
            }
            filteredEvents = filteredEvents.filter(event =>
                new Date(event.timestamp) <= toDateTime
            );
        }

        // Filter by time range (hour:minute)
        if (fromTime || toTime) {
            filteredEvents = filteredEvents.filter(event => {
                const eventDate = new Date(event.timestamp);
                const eventTime = `${eventDate.getHours().toString().padStart(2, '0')}:${eventDate.getMinutes().toString().padStart(2, '0')}`;

                if (fromTime && eventTime < fromTime) return false;
                if (toTime && eventTime > toTime) return false;

                return true;
            });
        }

        // Filter by event type
        if (eventType) {
            filteredEvents = filteredEvents.filter(event => event.type === eventType);
        }

        // Calculate summary statistics
        const summary = {
            totalEvents: filteredEvents.length,
            pageViews: filteredEvents.filter(e => e.type === 'page_view').length,
            ctaClicks: filteredEvents.filter(e => e.type === 'cta_click').length,
            pricingNavigations: filteredEvents.filter(e => e.type === 'pricing_navigation').length,
            ctaClicksBySource: {} as Record<string, number>,
            pricingNavigationsBySource: {} as Record<string, number>,
            sectionViewsBySource: {} as Record<string, number>
        };

        // Group CTA clicks by source
        filteredEvents
            .filter(e => e.type === 'cta_click' && e.metadata?.source)
            .forEach(e => {
                const source = e.metadata!.source!;
                summary.ctaClicksBySource[source] = (summary.ctaClicksBySource[source] || 0) + 1;
            });

        // Group pricing navigations by source
        filteredEvents
            .filter(e => e.type === 'pricing_navigation' && e.metadata?.source)
            .forEach(e => {
                const source = e.metadata!.source!;
                summary.pricingNavigationsBySource[source] = (summary.pricingNavigationsBySource[source] || 0) + 1;
            });

        // Group section views by source (drop-off tracking)
        filteredEvents
            .filter(e => e.type === 'section_view' && e.metadata?.source)
            .forEach(e => {
                const source = e.metadata!.source!;
                summary.sectionViewsBySource[source] = (summary.sectionViewsBySource[source] || 0) + 1;
            });

        return NextResponse.json({
            events: filteredEvents,
            summary
        });
    } catch (error) {
        console.error('Analytics GET error:', error);
        return NextResponse.json(
            { error: 'Failed to retrieve analytics' },
            { status: 500 }
        );
    }
}

// DELETE: Clear all analytics data
export async function DELETE() {
    try {
        const emptyData: AnalyticsData = { events: [] };
        writeAnalyticsData(emptyData);
        return NextResponse.json({ success: true, message: 'All analytics data cleared' });
    } catch (error) {
        console.error('Analytics DELETE error:', error);
        return NextResponse.json(
            { error: 'Failed to clear analytics data' },
            { status: 500 }
        );
    }
}
