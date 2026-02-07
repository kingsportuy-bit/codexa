export type EventType = 'page_view' | 'cta_click' | 'pricing_navigation' | 'section_view';

export interface AnalyticsEvent {
    id: string;
    timestamp: string;
    type: EventType;
    metadata?: {
        source?: string; // Section where the event originated (e.g., "hero", "hard-truth", "solution")
    };
}

export interface AnalyticsData {
    events: AnalyticsEvent[];
}

export interface AnalyticsFilters {
    fromDate?: string;
    toDate?: string;
    fromTime?: string;
    toTime?: string;
    eventType?: EventType;
}
