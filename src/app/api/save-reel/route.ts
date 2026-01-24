import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as Blob;

        // Get filename from formData, fallback to default if missing or invalid
        // Sanitize: remove any path traversal chars
        let filename = (formData.get('file') as any).name || 'chat_reel.mp4';
        filename = path.basename(filename);

        if (!file) {
            return NextResponse.json({ error: 'No file received' }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());

        // Ensure directory exists
        const dir = path.join(process.cwd(), 'public', 'barberox', 'instagram', 'reels');
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        const filePath = path.join(dir, filename);
        fs.writeFileSync(filePath, buffer);

        return NextResponse.json({ success: true, path: filePath, filename });
    } catch (error) {
        console.error('Save error:', error);
        return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
    }
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const filename = searchParams.get('file');

    if (!filename) {
        return new NextResponse('Filename required', { status: 400 });
    }

    // Sanitize
    const safeName = path.basename(filename);
    const filePath = path.join(process.cwd(), 'public', 'barberox', 'instagram', 'reels', safeName);

    if (!fs.existsSync(filePath)) {
        return new NextResponse('File not found', { status: 404 });
    }

    const fileBuffer = fs.readFileSync(filePath);
    const isMP4 = safeName.toLowerCase().endsWith('.mp4');

    return new NextResponse(fileBuffer, {
        headers: {
            'Content-Type': isMP4 ? 'video/mp4' : 'video/webm',
            'Content-Disposition': `attachment; filename="${safeName}"`,
        },
    });
}
