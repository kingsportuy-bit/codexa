'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Outfit } from 'next/font/google';

const outfit = Outfit({ subsets: ['latin'] });

// --- Types ---
interface ChatMessage {
    id: string;
    side: 'left' | 'right';
    text: string;
    time: string;
    title?: string;
    platform?: 'whatsapp' | 'instagram' | 'facebook' | 'tiktok' | 'barberox';
}

// --- Default Data ---
const DEFAULT_CHAT: ChatMessage[] = [
    { id: '1', side: 'right', text: 'Hola! Quiero cortarme hoy.', time: '10:00' },
    { id: '2', side: 'left', text: 'Hola crack! 👋 Tengo estos lugares hoy:\n\n🔹 17:00\n🔹 18:30', time: '10:00' },
    { id: '3', side: 'right', text: 'A las 18:30 me va perfecto!', time: '10:01' },
    { id: '4', side: 'left', text: '¡Listo! ✂️ Agendado hoy\n18:30hs. ¡Te esperamos!', time: '10:01' },
];

const DEFAULT_NOTIFS: ChatMessage[] = [
    { id: 'n1', side: 'left', title: 'WhatsApp', text: '¿Vienes hoy?', time: '10:00', platform: 'whatsapp' },
];

export default function ChatReelGenerator() {
    // --- State ---
    const [status, setStatus] = useState('Idle');
    const [isRecording, setIsRecording] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [animationProgress, setAnimationProgress] = useState(0);

    // Form State
    const [chatMessages, setChatMessages] = useState<ChatMessage[]>(DEFAULT_CHAT);
    const [notifications, setNotifications] = useState<ChatMessage[]>(DEFAULT_NOTIFS);
    const [userName, setUserName] = useState('Juan Román');
    const [contactName, setContactName] = useState('Barberox Support');
    const [contactAvatar, setContactAvatar] = useState<string | null>(null);
    const [avatarZoom, setAvatarZoom] = useState(1);
    const [avatarOffsetX, setAvatarOffsetX] = useState(0);
    const [avatarOffsetY, setAvatarOffsetY] = useState(0);
    const [whatsappHeaderColor, setWhatsappHeaderColor] = useState('#202c33');
    const [lockDate, setLockDate] = useState('Sábado, 24 de enero');
    const [lockTime, setLockTime] = useState('16:30');
    const contactAvatarImgRef = useRef<HTMLImageElement | null>(null);
    const whatsappIconImgRef = useRef<HTMLImageElement | null>(null);

    // UI State
    const [activeTab, setActiveTab] = useState<'locked' | 'unlocked' | 'design'>('locked');
    const [quality, setQuality] = useState<'720p' | '1080p' | '2k'>('1080p');
    const [viewMode, setViewMode] = useState<'chat' | 'lockscreen'>('lockscreen');

    // Background State
    const [bgType, setBgType] = useState<'transparent' | 'color' | 'image'>('color');
    const [bgColor, setBgColor] = useState('#0b141a');
    const [wallpaper, setWallpaper] = useState<string | null>(null);
    const [chatBg, setChatBg] = useState<string | null>(null);
    const wallpaperImgRef = useRef<HTMLImageElement | null>(null);
    const chatBgImgRef = useRef<HTMLImageElement | null>(null);

    // Latest State Ref for Animation Loop (Prevents stale closures)
    const latestStateRef = useRef({
        chatMessages,
        notifications,
        userName,
        contactName,
        contactAvatar,
        avatarZoom,
        avatarOffsetX,
        avatarOffsetY,
        whatsappHeaderColor,
        lockDate,
        lockTime,
        activeTab,
        viewMode,
        bgColor,
        bgType,
        wallpaper,
        chatBg,
        isAnimating,
        animationProgress
    });

    useEffect(() => {
        latestStateRef.current = {
            chatMessages,
            notifications,
            userName,
            contactName,
            contactAvatar,
            avatarZoom,
            avatarOffsetX,
            avatarOffsetY,
            whatsappHeaderColor,
            lockDate,
            lockTime,
            activeTab,
            viewMode,
            bgColor,
            bgType,
            wallpaper,
            chatBg,
            isAnimating,
            animationProgress
        };
    }, [chatMessages, notifications, userName, contactName, contactAvatar, avatarZoom, avatarOffsetX, avatarOffsetY, whatsappHeaderColor, lockDate, lockTime, activeTab, viewMode, bgColor, bgType, wallpaper, chatBg, isAnimating, animationProgress]);

    useEffect(() => {
        const img = new Image();
        img.onload = () => { whatsappIconImgRef.current = img; };
        img.src = '/barberox/img/whatsapp-icon.png';
    }, []);

    // --- Actions ---
    const addMessage = (side: 'left' | 'right') => {
        const newMessage: ChatMessage = {
            id: Date.now().toString(),
            side,
            text: 'Nuevo mensaje...',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setChatMessages([...chatMessages, newMessage]);
    };

    const removeMessage = (id: string) => {
        setChatMessages(chatMessages.filter(m => m.id !== id));
    };

    const addNotification = () => {
        const newNotif: ChatMessage = {
            id: Date.now().toString(),
            side: 'left',
            platform: 'whatsapp',
            text: 'Nueva notificación...',
            time: 'ahora'
        };
        setNotifications([...notifications, newNotif]);
    };

    const removeNotification = (id: string) => {
        setNotifications(notifications.filter(n => n.id !== id));
    };

    const handleWallpaperUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            const img = new Image();
            img.onload = () => {
                wallpaperImgRef.current = img;
                setWallpaper(url);
                drawPreview(0);
            };
            img.src = url;
        }
    };

    const handleContactAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            const img = new Image();
            img.onload = () => {
                contactAvatarImgRef.current = img;
                setContactAvatar(url);
                drawPreview(viewMode === 'chat' ? 0.6 : 0);
            };
            img.src = url;
        }
    };

    const handleChatBgUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            const img = new Image();
            img.onload = () => {
                chatBgImgRef.current = img;
                setChatBg(url);
                drawPreview(0.6);
            };
            img.src = url;
        }
    };

    // Resources
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const offscreenCanvasRef = useRef<HTMLCanvasElement | null>(null);

    const getOffscreenCanvas = (width: number, height: number) => {
        if (!offscreenCanvasRef.current) {
            offscreenCanvasRef.current = document.createElement('canvas');
        }
        const canvas = offscreenCanvasRef.current;
        if (canvas.width !== width || canvas.height !== height) {
            canvas.width = width;
            canvas.height = height;
        }
        // Alpha enabled for transparency support
        const ctx = canvas.getContext('2d', { alpha: true });
        if (ctx) {
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';
        }
        return { canvas, ctx };
    };

    // --- Core Drawing Functions ---
    const getContext = () => {
        const canvas = canvasRef.current;
        if (!canvas) return null;

        // Alpha enabled for transparency support
        const ctx = canvas.getContext('2d', {
            alpha: true,
            willReadFrequently: false,
            colorSpace: 'srgb'
        });

        if (!ctx) return null;

        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.globalCompositeOperation = 'source-over';

        // Fixed 9:16 Resolution (1080x1920) for Reels
        const targetW = 1080;
        const targetH = 1920;

        if (canvas.width !== targetW || canvas.height !== targetH) {
            canvas.width = targetW;
            canvas.height = targetH;
        }

        ctx.resetTransform();
        return { canvas, ctx };
    };

    const drawPreview = (timeVal?: number) => {
        const r = getContext();
        if (!r) return;
        const { ctx: mainCtx, canvas: mainCanvas } = r;

        // Use ONLY the ref data during drawing to avoid stale closures
        const S = latestStateRef.current;

        const W = mainCanvas.width;
        const H = mainCanvas.height;
        const scale = H / 1080; // Reference height 1080p

        const { canvas: offCanvas, ctx: offCtx } = getOffscreenCanvas(W, H);
        if (!offCtx) return;

        // If timeVal is provided, use it (absolute seconds)
        // Otherwise use progress * duration to approximate current time for static previews
        let currentTime = 0;
        if (timeVal !== undefined) {
            currentTime = timeVal;
        } else {
            // Static preview fallback using progress
            const approxDuration = S.activeTab === 'locked'
                ? S.notifications.length * 1.0 + 3.0
                : S.chatMessages.length * 1.0 + 4.0;
            currentTime = S.animationProgress * approxDuration;
        }

        try {
            // 1. DRAW TO OFFSCREEN BUFFER
            if (S.bgType === 'transparent') {
                offCtx.clearRect(0, 0, W, H);
            } else {
                offCtx.fillStyle = '#000000';
                offCtx.fillRect(0, 0, W, H);
            }

            // 1. BACKGROUND
            if (S.bgType === 'color') {
                offCtx.fillStyle = S.bgColor;
                offCtx.fillRect(0, 0, W, H);
            }

            // 2. IPHONE FRAME CONSTANTS
            const phoneH = 920 * scale;
            const phoneW = phoneH * 0.49;
            const phoneX = (W - phoneW) / 2;
            const phoneY = (H - phoneH) / 2;
            const radius = 55 * scale;

            // 3. DRAW PHONE CASE
            offCtx.save();
            offCtx.beginPath();
            offCtx.roundRect(phoneX, phoneY, phoneW, phoneH, radius);
            offCtx.clip();

            // Background of phone
            offCtx.fillStyle = '#010101';
            offCtx.fillRect(phoneX, phoneY, phoneW, phoneH);

            // Screen Area (Inner)
            const margin = 10 * scale;
            const screenX = phoneX + margin;
            const screenY = phoneY + margin;
            const screenW = phoneW - (margin * 2);
            const screenH = phoneH - (margin * 2);
            const screenRadius = radius - 10;

            offCtx.save();
            offCtx.beginPath();
            offCtx.roundRect(screenX, screenY, screenW, screenH, screenRadius);
            offCtx.clip();

            // 4. DRAW SCREEN CONTENT - STRICT VIEW SEPARATION
            const showLockscreen = S.activeTab === 'locked';

            if (showLockscreen) {
                drawLockscreen(offCtx, screenX, screenY, screenW, screenH, scale, currentTime);
            } else {
                drawChatscreen(offCtx, screenX, screenY, screenW, screenH, scale, currentTime);
            }

            offCtx.restore(); // restore screen clip

            // 5. DYNAMIC ISLAND (On top of content but inside phone case)
            drawDynamicIsland(offCtx, phoneX + phoneW / 2, phoneY + 40 * scale, scale);

            // 6. ADDTIONAL MOCKUP DETAILS (Buttons)
            drawMockupDetails(offCtx, phoneX, phoneY, phoneW, phoneH, scale);

            offCtx.restore(); // restore phone case clip

            // 7. OUTER FRAME BORDER
            offCtx.strokeStyle = '#2a2a2a';
            offCtx.lineWidth = 3 * scale;
            offCtx.beginPath();
            offCtx.roundRect(phoneX, phoneY, phoneW, phoneH, radius);
            offCtx.stroke();

            // 8. BLIT TO MAIN CANVAS ATOMICALLY
            // DO NOT use clearRect here. 
            // 'copy' replaces the destination pixels with source pixels including alpha.
            mainCtx.globalCompositeOperation = 'copy';
            mainCtx.drawImage(offCanvas, 0, 0);
            mainCtx.globalCompositeOperation = 'source-over'; // reset

        } catch (e) {
            console.error('Render error:', e);
        }
    };

    const drawMockupDetails = (ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, scale: number) => {
        ctx.fillStyle = '#1a1a1a';

        // Power button (Right)
        ctx.beginPath();
        ctx.roundRect(x + w, y + 180 * scale, 4 * scale, 80 * scale, 3 * scale);
        ctx.fill();

        // Volume buttons (Left)
        ctx.beginPath();
        ctx.roundRect(x - 4 * scale, y + 150 * scale, 4 * scale, 50 * scale, 3 * scale);
        ctx.fill();
        ctx.beginPath();
        ctx.roundRect(x - 4 * scale, y + 210 * scale, 4 * scale, 50 * scale, 3 * scale);
        ctx.fill();

        // Mute switch
        ctx.beginPath();
        ctx.roundRect(x - 4 * scale, y + 100 * scale, 4 * scale, 30 * scale, 3 * scale);
        ctx.fill();
    };

    const drawDynamicIsland = (ctx: CanvasRenderingContext2D, x: number, y: number, scale: number) => {
        const w = 140 * scale;
        const h = 32 * scale;
        ctx.fillStyle = '#000000';
        ctx.beginPath();
        ctx.roundRect(x - w / 2, y - h / 2, w, h, 16 * scale);
        ctx.fill();

        // Lens reflection (Subtle)
        ctx.fillStyle = '#0a0a0d';
        ctx.beginPath();
        ctx.arc(x + w / 3, y, 4 * scale, 0, Math.PI * 2);
        ctx.fill();
    };

    const drawLockscreen = (ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, scale: number, currentTime: number) => {
        const S = latestStateRef.current;
        // Wallpaper
        if (S.wallpaper) {
            drawCoverImage(ctx, x, y, w, h);
            // Dark overlay for readability
            ctx.fillStyle = 'rgba(0,0,0,0.35)';
            ctx.fillRect(x, y, w, h);
        } else {
            const grad = ctx.createLinearGradient(x, y, x, y + h);
            grad.addColorStop(0, '#1a1a1d');
            grad.addColorStop(1, '#000000');
            ctx.fillStyle = grad;
            ctx.fillRect(x, y, w, h);
        }

        // Clock & Date (Center) - Back to original Outfit style
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'center';
        ctx.font = `300 ${92 * scale}px ${outfit.style.fontFamily}`;
        ctx.fillText(S.lockTime, x + w / 2, y + 210 * scale);

        ctx.font = `500 ${22 * scale}px ${outfit.style.fontFamily}`;
        ctx.fillStyle = 'rgba(255,255,255,0.75)';
        ctx.fillText(S.lockDate, x + w / 2, y + 265 * scale);

        // Notifications with iPhone logic (Elastic arrival)
        // Reverse stacking: Newest at top
        const NOTIF_STAGGER = 1.0;
        const NOTIF_DURATION = 0.8;
        let currentStackY = y + 420 * scale;

        // Iterate in reverse (newest first) to stack top-down
        for (let i = S.notifications.length - 1; i >= 0; i--) {
            const notif = S.notifications[i];
            const startTime = i * NOTIF_STAGGER;
            const animProgress = Math.max(0, Math.min(1, (currentTime - startTime) / NOTIF_DURATION));

            if (animProgress <= 0) continue;

            // Elastic out easing
            const elasticProgress = animProgress === 1 ? 1 : 1 - Math.pow(2, -10 * animProgress) * Math.sin((animProgress * 10 - 0.75) * ((2 * Math.PI) / 3));

            ctx.save();
            ctx.globalAlpha = Math.min(1, animProgress * 2);

            // Slide up with elastic overshoot
            const translateY = (1 - elasticProgress) * 60 * scale;
            // Scale bounce
            const s = 0.9 + (0.1 * elasticProgress);

            ctx.translate(x + w / 2, currentStackY + 42 * scale);
            ctx.scale(s, s);
            ctx.translate(-(x + w / 2), -(currentStackY + 42 * scale));

            const hUsed = drawNotification(ctx, x + 20 * scale, currentStackY + translateY, w - 40 * scale, scale, notif);
            ctx.restore();

            // Push subsequent notifications down
            currentStackY += (hUsed + 12 * scale);
        }
    };

    // Helper to draw image cover-style
    const drawCoverImage = (ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) => {
        const img = wallpaperImgRef.current;
        if (img && img.complete) {
            const imgAspect = img.width / img.height;
            const containerAspect = w / h;
            let drawW, drawH, drawX, drawY;

            if (imgAspect > containerAspect) {
                drawH = h;
                drawW = h * imgAspect;
                drawX = x + (w - drawW) / 2;
                drawY = y;
            } else {
                drawW = w;
                drawH = w / imgAspect;
                drawX = x;
                drawY = y + (h - drawH) / 2;
            }
            ctx.drawImage(img, drawX, drawY, drawW, drawH);
        }
    };

    const drawPlatformIcon = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, platform: string) => {
        ctx.save();
        ctx.beginPath();
        ctx.roundRect(x, y, size, size, size * 0.25);
        ctx.clip();

        // Platform Colors & Simple Icons
        if (platform === 'whatsapp') {
            if (whatsappIconImgRef.current) {
                ctx.drawImage(whatsappIconImgRef.current, x, y, size, size);
            } else {
                ctx.fillStyle = '#25D366';
                ctx.fillRect(x, y, size, size);
                ctx.fillStyle = '#ffffff';
                const cx = x + (size * 0.5);
                const cy = y + (size * 0.5);
                ctx.beginPath();
                ctx.arc(cx, cy, size * 0.35, 0, Math.PI * 2);
                ctx.fill();
                ctx.beginPath();
                ctx.moveTo(cx - (size * 0.2), cy + (size * 0.25));
                ctx.lineTo(cx - (size * 0.35), cy + (size * 0.35));
                ctx.lineTo(cx - (size * 0.25), cy + (size * 0.1));
                ctx.fill();
            }
        } else if (platform === 'instagram') {
            const grad = ctx.createLinearGradient(x, y, x + size, y + size);
            grad.addColorStop(0, '#405DE6');
            grad.addColorStop(0.5, '#E1306C');
            grad.addColorStop(1, '#FFDC80');
            ctx.fillStyle = grad;
            ctx.fillRect(x, y, size, size);
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 1.5 * (size / 22);
            ctx.strokeRect(x + size * 0.25, y + size * 0.25, size * 0.5, size * 0.5);
        } else if (platform === 'facebook') {
            ctx.fillStyle = '#1877F2';
            ctx.fillRect(x, y, size, size);
            ctx.fillStyle = '#ffffff';
            ctx.font = `bold ${size * 0.8}px Arial`;
            ctx.fillText('f', x + size * 0.35, y + size * 0.85);
        } else {
            ctx.fillStyle = '#000000';
            ctx.fillRect(x, y, size, size);
        }
        ctx.restore();
    };

    const drawNotification = (ctx: CanvasRenderingContext2D, x: number, y: number, w: number, scale: number, notif: ChatMessage) => {
        const S = latestStateRef.current;

        // Measure text for responsive height
        const horizontalPadding = 20 * scale;
        const textW = w - 40 * scale;
        ctx.font = `400 ${15 * scale}px ${outfit.style.fontFamily}`;

        // Robust line wrap handles explicit newlines
        const lines = [];
        const paragraphs = notif.text.split('\n');
        for (const p of paragraphs) {
            const words = p.split(' ');
            let line = '';
            for (let n = 0; n < words.length; n++) {
                const testLine = line + words[n] + ' ';
                const metrics = ctx.measureText(testLine);
                if (metrics.width > textW && n > 0) {
                    lines.push(line);
                    line = words[n] + ' ';
                } else {
                    line = testLine;
                }
            }
            lines.push(line);
        }

        const lineHeight = 20 * scale;
        const bottomPadding = 24 * scale;
        const textStartOffset = 88 * scale; // Offset where message text starts
        const h = textStartOffset + (lines.length * lineHeight) + bottomPadding;
        const r = 24 * scale;

        // Shadow
        ctx.shadowColor = 'rgba(0,0,0,0.3)';
        ctx.shadowBlur = 15 * scale;
        ctx.shadowOffsetY = 5 * scale;

        // Glass background
        ctx.fillStyle = 'rgba(255, 255, 255, 0.22)';
        ctx.beginPath();
        ctx.roundRect(x, y, w, h, r);
        ctx.fill();

        ctx.shadowBlur = 0;
        ctx.shadowOffsetY = 0;

        ctx.strokeStyle = 'rgba(255,255,255,0.2)';
        ctx.lineWidth = 1.5 * scale;
        ctx.stroke();

        // Icon
        drawPlatformIcon(ctx, x + 18 * scale, y + 16 * scale, 24 * scale, notif.platform || 'whatsapp');

        ctx.fillStyle = 'rgba(255,255,255,0.65)';
        ctx.font = `600 ${12 * scale}px ${outfit.style.fontFamily}`;
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        ctx.fillText(notif.platform?.toUpperCase() || 'WHATSAPP', x + 52 * scale, y + 27 * scale);

        // Title (Name Only)
        ctx.fillStyle = '#ffffff';
        ctx.font = `700 ${17 * scale}px ${outfit.style.fontFamily}`;
        ctx.fillText(S.userName, x + 20 * scale, y + 54 * scale);

        // Subtitle (Message Text)
        ctx.fillStyle = 'rgba(255,255,255,0.9)';
        ctx.font = `400 ${15 * scale}px ${outfit.style.fontFamily}`;
        ctx.textBaseline = 'top';
        lines.forEach((l, i) => {
            ctx.fillText(l.trim(), x + 20 * scale, y + textStartOffset + (i * lineHeight));
        });

        return h; // Return calculated height for stacking correctly
    };

    const drawAvatar = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
        const S = latestStateRef.current;
        ctx.save();
        ctx.beginPath();
        ctx.arc(x + size / 2, y + size / 2, size / 2, 0, Math.PI * 2);
        ctx.clip();

        if (contactAvatarImgRef.current && S.contactAvatar) {
            const img = contactAvatarImgRef.current;
            const aspect = img.width * (1 / img.height);

            // Base size for "fill"
            let drawW = size;
            let drawH = size;
            if (aspect > 1) drawW = size * aspect;
            else drawH = size / aspect;

            // Apply manual zoom
            drawW *= S.avatarZoom;
            drawH *= S.avatarZoom;

            const drawX = x + (size - drawW) / 2 + (S.avatarOffsetX * size);
            const drawY = y + (size - drawH) / 2 + (S.avatarOffsetY * size);

            ctx.drawImage(img, drawX, drawY, drawW, drawH);
        } else {
            ctx.fillStyle = '#6b7280';
            ctx.fillRect(x, y, size, size);
            ctx.fillStyle = '#ffffff';
            ctx.font = `600 ${size * 0.5}px ${outfit.style.fontFamily}`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(S.contactName.charAt(0).toUpperCase(), x + size / 2, y + size / 2);
        }
        ctx.restore();
    };

    const drawChatscreen = (ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, scale: number, currentTime: number) => {
        const S = latestStateRef.current;

        // 1. Background
        if (chatBgImgRef.current && S.chatBg) {
            const img = chatBgImgRef.current;
            const imgAspect = img.width / img.height;
            const containerAspect = w / h;
            let dW, dH, dX, dY;
            if (imgAspect > containerAspect) {
                dH = h; dW = h * imgAspect; dX = x + (w - dW) * 0.5; dY = y;
            } else {
                dW = w; dH = w * (1 / imgAspect); dX = x; dY = y + (h - dH) * 0.5;
            }
            ctx.drawImage(img, dX, dY, dW, dH);
            ctx.fillStyle = 'rgba(0,0,0,0.1)';
            ctx.fillRect(x, y, w, h);
        } else {
            ctx.fillStyle = '#0b141a';
            ctx.fillRect(x, y, w, h);
        }

        // 2. Header
        const headerH = 140 * scale;
        ctx.fillStyle = S.whatsappHeaderColor;
        ctx.fillRect(x, y, w, headerH);

        const contentY = y + 75 * scale;

        // Avatar (Enlarged)
        drawAvatar(ctx, x + 25 * scale, contentY - 8 * scale, 52 * scale);

        // Name & Status (Enlarged)
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';
        ctx.font = `700 ${21 * scale}px ${outfit.style.fontFamily}`;
        ctx.fillText(S.contactName, x + 90 * scale, contentY - 2 * scale);

        // Typing Indicator Status (Absolute seconds)
        const MSG_STAGGER = 1.0;
        let typingStatus = 'en línea';
        let typingColor = 'rgba(255,255,255,0.6)';
        S.chatMessages.forEach((msg, i) => {
            if (msg.side === 'right') return;
            const startT = 0.1 + (i * MSG_STAGGER);
            if (currentTime > startT - 0.8 && currentTime < startT) {
                typingStatus = 'Escribiendo...';
                typingColor = '#8696a0';
            }
        });

        ctx.font = `400 ${13 * scale}px ${outfit.style.fontFamily}`;
        ctx.fillStyle = typingColor;
        ctx.fillText(typingStatus, x + 90 * scale, contentY + 24 * scale);

        // 3. Input Bar (Bottom)
        const inputH = 80 * scale;
        const inputY = y + h - inputH - 10 * scale;
        const inputW = w - 80 * scale;
        const inputX = x + 10 * scale;

        // Pill background - Full width
        const pillW = w - 30 * scale;
        ctx.fillStyle = '#2a3942';
        ctx.beginPath();
        ctx.roundRect(x + 15 * scale, inputY, pillW, 56 * scale, 28 * scale);
        ctx.fill();

        ctx.fillStyle = 'rgba(255,255,255,0.5)';
        ctx.font = `400 ${18 * scale}px ${outfit.style.fontFamily}`;
        ctx.fillText('Mensaje', x + 65 * scale, inputY + 16 * scale);

        // 4. Chat Body with Auto-Scroll
        const safeAreaTop = y + headerH + 20 * scale;
        const safeAreaBottom = inputY - 15 * scale;
        const availableH = safeAreaBottom - safeAreaTop;

        // First pass: Calculate total height of all messages up to current progress
        let totalCurrentHeight = 0;
        const MSG_STAGGER_VAL = 1.0;
        const MSG_DURATION = 0.7;
        const messageMeta = S.chatMessages.map((msg, i) => {
            const startT = 0.1 + (i * MSG_STAGGER_VAL);
            const animProgress = Math.max(0, Math.min(1, (currentTime - startT) / MSG_DURATION));

            // Measure lines
            ctx.font = `400 ${15 * scale}px ${outfit.style.fontFamily}`;
            const bubbleW = w * 0.78;
            const textW = bubbleW - 30 * scale;
            let lineCount = 0;
            const paragraphs = msg.text.split('\n');
            for (const p of paragraphs) {
                const words = p.split(' ');
                let line = '';
                for (let n = 0; n < words.length; n++) {
                    const testLine = line + words[n] + ' ';
                    const metrics = ctx.measureText(testLine);
                    if (metrics.width > textW && n > 0) {
                        lineCount++; line = words[n] + ' ';
                    } else { line = testLine; }
                }
                lineCount++;
            }
            const msgH = (lineCount * 21 * scale) + 38 * scale;
            if (animProgress > 0) totalCurrentHeight += msgH + 12 * scale;
            return { msg, msgH, lineCount, animProgress };
        });

        // Calculate scroll offset to keep last message in view
        let scrollY = 0;
        if (totalCurrentHeight > availableH) {
            scrollY = availableH - totalCurrentHeight;
        }

        let currentY = safeAreaTop + scrollY;

        messageMeta.forEach(({ msg, msgH, lineCount, animProgress }, i) => {
            if (animProgress <= 0) return;

            const isRight = msg.side === 'right';
            const bubbleBg = isRight ? '#005c4b' : '#202c33';
            const bubbleW = w * 0.78;
            const bubbleX = isRight ? x + w - bubbleW - 15 * scale : x + 15 * scale;

            // Elastic arrival physics (shared with notifications)
            const elasticProgress = animProgress === 1 ? 1 : 1 - Math.pow(2, -10 * animProgress) * Math.sin((animProgress * 10 - 0.75) * ((2 * Math.PI) / 3));

            ctx.save();
            ctx.globalAlpha = Math.min(1, animProgress * 2);

            // Clip chat messages to the safe area (between header and input)
            ctx.beginPath();
            ctx.rect(x, safeAreaTop, w, availableH);
            ctx.clip();

            // Slide up and scale arrival
            const translateY = (1 - elasticProgress) * 25 * scale;
            const scaleIn = 0.95 + (0.05 * elasticProgress);

            ctx.translate(bubbleX + (isRight ? bubbleW : 0), currentY + msgH / 2);
            ctx.scale(scaleIn, scaleIn);
            ctx.translate(-(bubbleX + (isRight ? bubbleW : 0)), -(currentY + msgH / 2));

            ctx.fillStyle = bubbleBg;
            ctx.beginPath();
            if (isRight) {
                ctx.roundRect(bubbleX, currentY + translateY, bubbleW, msgH, [15 * scale, 2 * scale, 15 * scale, 15 * scale]);
            } else {
                ctx.roundRect(bubbleX, currentY + translateY, bubbleW, msgH, [2 * scale, 15 * scale, 15 * scale, 15 * scale]);
            }
            ctx.fill();

            ctx.fillStyle = '#ffffff';
            ctx.font = `400 ${15 * scale}px ${outfit.style.fontFamily}`;
            ctx.textAlign = 'left';
            ctx.textBaseline = 'top';

            // Redraw wrapped text handling newlines
            const textW = bubbleW - 30 * scale;
            const paragraphs = msg.text.split('\n');
            let lineIdx = 0;
            for (const p of paragraphs) {
                const words = p.split(' ');
                let line = '';
                for (let n = 0; n < words.length; n++) {
                    const testLine = line + words[n] + ' ';
                    const metrics = ctx.measureText(testLine);
                    if (metrics.width > textW && n > 0) {
                        ctx.fillText(line.trim(), bubbleX + 15 * scale, currentY + translateY + 12 * scale + (lineIdx * 21 * scale));
                        lineIdx++; line = words[n] + ' ';
                    } else { line = testLine; }
                }
                ctx.fillText(line.trim(), bubbleX + 15 * scale, currentY + translateY + 12 * scale + (lineIdx * 21 * scale));
                lineIdx++;
            }

            ctx.fillStyle = 'rgba(255,255,255,0.45)';
            ctx.font = `400 ${10 * scale}px ${outfit.style.fontFamily}`;
            ctx.textAlign = 'right';
            ctx.fillText(msg.time + (isRight ? ' ✓✓' : ''), bubbleX + bubbleW - 12 * scale, currentY + translateY + msgH - 12 * scale);

            ctx.restore();
            currentY += msgH + 12 * scale;
        });
    };

    // --- Animation & Recording Logic ---
    const startAnimation = async (record = false) => {
        const S = latestStateRef.current;
        const mode = S.activeTab; // locked or unlocked (chat)

        setIsAnimating(true);
        if (record) setIsRecording(true);
        setStatus(record ? 'Recording...' : 'Previewing...');

        let recorder: MediaRecorder | null = null;
        const chunks: Blob[] = [];

        if (record && canvasRef.current) {
            const stream = canvasRef.current.captureStream(60);
            const isTransparent = S.bgType === 'transparent';
            const mimeTypes = isTransparent ? [
                'video/webm;codecs=vp9',
                'video/webm;codecs=vp8,opus',
                'video/webm'
            ] : [
                'video/mp4;codecs=h264,aac',
                'video/mp4;codecs=h264',
                'video/mp4;codecs=avc1',
                'video/mp4',
                'video/webm;codecs=h264',
                'video/webm'
            ];

            const mimeType = mimeTypes.find(type => MediaRecorder.isTypeSupported(type)) || 'video/webm';

            try {
                recorder = new MediaRecorder(stream, {
                    mimeType,
                    videoBitsPerSecond: isTransparent ? 8000000 : 16000000 // VP9 is more efficient
                });
                recorder.ondataavailable = (e) => {
                    if (e.data.size > 0) chunks.push(e.data);
                };
                recorder.onstop = async () => {
                    if (chunks.length === 0) return;
                    const isMP4 = mimeType.includes('mp4');
                    const ext = isMP4 ? 'mp4' : 'webm';
                    const blobType = isMP4 ? 'video/mp4' : 'video/webm';
                    const blob = new Blob(chunks, { type: blobType });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    const fileNameBase = `barberox-${mode === 'locked' ? 'notif' : 'chat'}`;
                    a.download = `${fileNameBase}-${Date.now()}.${ext}`;
                    a.click();

                    const formData = new FormData();
                    formData.append('file', blob, `reel_${Date.now()}.${ext}`);
                    try {
                        await fetch('/api/save-reel', { method: 'POST', body: formData });
                    } catch (e) { console.error(e); }
                };
                recorder.start(100);
            } catch (e) {
                console.error(e);
                setIsRecording(false);
            }
        }

        const MARGIN = 2.0; // 2 seconds margin
        const STAGGER = 1.0; // 1 second between elements
        const DURATION_PER_ITEM = 0.8; // 0.8s for each item to animate

        let contentDuration = 0;
        if (mode === 'locked') {
            contentDuration = S.notifications.length > 0
                ? (S.notifications.length - 1) * STAGGER + DURATION_PER_ITEM + 1.0 // +1s buffer
                : 3.0;
        } else {
            contentDuration = S.chatMessages.length > 0
                ? (S.chatMessages.length - 1) * STAGGER + DURATION_PER_ITEM + 1.5 // +1.5s buffer
                : 4.0;
        }

        const totalDurationMs = record ? (contentDuration + (MARGIN * 2)) * 1000 : contentDuration * 1000;
        const start = performance.now();

        const animate = (time: number) => {
            const elapsedMs = time - start;
            const elapsedSec = elapsedMs / 1000;

            let animTime = 0; // The time used for actual animations (0 to contentDuration)
            if (record) {
                if (elapsedSec < MARGIN) {
                    animTime = 0;
                } else if (elapsedSec > MARGIN + contentDuration) {
                    animTime = contentDuration;
                } else {
                    animTime = elapsedSec - MARGIN;
                }
            } else {
                animTime = (elapsedMs / totalDurationMs) * contentDuration;
            }

            if (!record) {
                setAnimationProgress(animTime / contentDuration);
            }
            drawPreview(animTime); // Pass absolute seconds

            if (elapsedMs < totalDurationMs) {
                requestAnimationFrame(animate);
            } else {
                drawPreview(contentDuration);
                setIsAnimating(false);
                if (record && recorder) {
                    recorder.stop();
                    setIsRecording(false);
                }
                setStatus('Idle');
                setAnimationProgress(0);
            }
        };

        requestAnimationFrame(animate);
    };

    // Redraw on changes
    useEffect(() => {
        drawPreview();
    }, [viewMode, quality, bgColor, chatMessages, notifications, wallpaper, animationProgress, isAnimating, userName]);

    return (
        <div className={`min-h-screen bg-[#0f1115] text-white p-6 ${outfit.className}`}>
            <div className="max-w-7xl mx-auto h-[90vh] flex gap-8">

                {/* LEFT: Controls Panel */}
                <div className="w-[450px] flex flex-col gap-6 bg-[#16181d] rounded-3xl p-6 border border-white/5 shadow-2xl h-full overflow-hidden">

                    {/* Header */}
                    <div className="space-y-4 flex-shrink-0">
                        <div className="flex justify-between items-center">
                            <div>
                                <img src="/barberox/img/logo.png" alt="Barberox" className="h-8 w-auto mb-1" />
                                <span className="text-[10px] text-primary font-bold uppercase tracking-[0.2em]">Reel Generator</span>
                            </div>
                            <button
                                onClick={() => {
                                    setChatMessages(DEFAULT_CHAT);
                                    setNotifications(DEFAULT_NOTIFS);
                                    setUserName('Juan Román');
                                    setContactName('Barberox Support');
                                    setContactAvatar(null);
                                    setBgColor('#0b141a');
                                }}
                                className="text-[10px] text-gray-500 hover:text-white uppercase font-bold transition-colors"
                            >
                                Resetear
                            </button>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2">
                            <button
                                onClick={() => startAnimation(false)}
                                disabled={isAnimating || isRecording}
                                className={`flex-1 px-4 py-3 rounded-xl font-bold text-sm transition-all transform active:scale-95 ${isAnimating && !isRecording ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20 disabled:opacity-50'
                                    }`}
                            >
                                {isAnimating && !isRecording ? 'Previsualizando...' : '▶️ Previsualizar'}
                            </button>
                            <button
                                onClick={() => startAnimation(true)}
                                disabled={isRecording || isAnimating}
                                className={`flex-1 px-4 py-3 rounded-xl font-bold text-sm transition-all transform active:scale-95 ${isRecording ? 'bg-red-500/20 text-red-500 border border-red-500/30 animate-pulse' : 'bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-600/20 disabled:opacity-50'
                                    }`}
                            >
                                {isRecording ? `Grabando... ${Math.round(animationProgress * 100)}%` : '🎬 Grabar Video'}
                            </button>
                        </div>
                    </div>

                    {/* Scrollable Content Area */}
                    <div className="flex-1 overflow-y-auto pr-2 scrollbar-thin">

                        {/* Navigation Tabs */}
                        <div className="flex flex-col gap-4">
                            <div className="flex p-1 bg-[#0a0b0d] rounded-xl">
                                <button
                                    onClick={() => {
                                        setActiveTab('locked');
                                        setViewMode('lockscreen');
                                    }}
                                    className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${activeTab === 'locked' ? 'bg-[#2a2d36] text-white' : 'text-gray-500 hover:text-gray-300'
                                        }`}
                                >
                                    🔒 Bloqueado
                                </button>
                                <button
                                    onClick={() => {
                                        setActiveTab('unlocked');
                                        setViewMode('chat');
                                    }}
                                    className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${activeTab === 'unlocked' ? 'bg-[#2a2d36] text-white' : 'text-gray-500 hover:text-gray-300'
                                        }`}
                                >
                                    📱 Desbloqueado
                                </button>
                                <button
                                    onClick={() => setActiveTab('design')}
                                    className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${activeTab === 'design' ? 'bg-[#2a2d36] text-white' : 'text-gray-500 hover:text-gray-300'
                                        }`}
                                >
                                    🎨 Diseño
                                </button>
                            </div>
                        </div>

                        {activeTab === 'locked' && (
                            <div className="flex flex-col gap-4 mt-4 animate-fade-in">
                                <div className="bg-[#0a0b0d] p-4 rounded-xl border border-white/5">
                                    <div className="flex justify-between items-center mb-4">
                                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wide">Notificaciones</h3>
                                        <button
                                            onClick={addNotification}
                                            className="text-[10px] bg-primary/20 text-primary border border-primary/30 px-2 py-1 rounded hover:bg-primary/30 transition-colors font-bold uppercase"
                                        >
                                            + Agregar
                                        </button>
                                    </div>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="text-[10px] text-gray-500 uppercase font-bold mb-1 block">Nombre Usuario Destinatario</label>
                                            <input
                                                value={userName}
                                                onChange={e => setUserName(e.target.value)}
                                                className="w-full bg-black/50 border border-white/10 rounded-lg p-2 text-sm outline-none focus:border-primary/50"
                                                placeholder="Ej: Juan Román"
                                            />
                                        </div>
                                        {notifications.map((notif, i) => (
                                            <div key={notif.id} className="p-3 bg-white/[0.02] border border-white/5 rounded-lg space-y-2 relative group">
                                                <button
                                                    onClick={() => removeNotification(notif.id)}
                                                    className="absolute top-2 right-2 text-gray-600 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                                </button>
                                                <div className="flex gap-2">
                                                    <div className="flex-1">
                                                        <label className="text-[9px] text-gray-600 uppercase font-bold block mb-1">App / Plataforma</label>
                                                        <select
                                                            value={notif.platform}
                                                            onChange={e => {
                                                                const newNotifs = [...notifications];
                                                                newNotifs[i].platform = e.target.value as any;
                                                                setNotifications(newNotifs);
                                                            }}
                                                            className="w-full bg-black/50 border border-white/10 rounded p-1 text-[10px] transition-colors"
                                                        >
                                                            <option value="whatsapp">WhatsApp</option>
                                                            <option value="instagram">Instagram</option>
                                                            <option value="facebook">Facebook</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="text-[9px] text-gray-600 uppercase font-bold block mb-1">Mensaje</label>
                                                    <textarea
                                                        value={notif.text}
                                                        onChange={e => {
                                                            const newNotifs = [...notifications];
                                                            newNotifs[i].text = e.target.value;
                                                            setNotifications(newNotifs);
                                                        }}
                                                        className="w-full bg-black/50 border border-white/10 rounded-lg p-2 text-xs outline-none focus:border-primary/50 h-16 resize-none"
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'unlocked' && (
                            <div className="flex flex-col gap-4 mt-4 animate-fade-in">
                                <div className="bg-[#0a0b0d] p-4 rounded-xl border border-white/5">
                                    <div className="flex justify-between items-center mb-4">
                                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wide">Mensajes de WhatsApp</h3>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => addMessage('left')}
                                                className="text-[9px] bg-blue-500/20 text-blue-400 border border-blue-500/30 px-2 py-1 rounded hover:bg-blue-500/30 font-bold uppercase"
                                            >
                                                + Recibir
                                            </button>
                                            <button
                                                onClick={() => addMessage('right')}
                                                className="text-[9px] bg-green-500/20 text-green-400 border border-green-500/30 px-2 py-1 rounded hover:bg-green-500/30 font-bold uppercase"
                                            >
                                                + Enviar
                                            </button>
                                        </div>
                                    </div>
                                    <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 scrollbar-thin">
                                        {chatMessages.map((msg, i) => (
                                            <div key={msg.id} className="p-3 bg-white/[0.02] border border-white/5 rounded-lg space-y-2 relative group">
                                                <button
                                                    onClick={() => removeMessage(msg.id)}
                                                    className="absolute top-2 right-2 text-gray-600 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                                </button>
                                                <div className="flex justify-between items-center">
                                                    <div className="flex items-center gap-2">
                                                        <button
                                                            onClick={() => {
                                                                const newMsgs = [...chatMessages];
                                                                newMsgs[i].side = msg.side === 'left' ? 'right' : 'left';
                                                                setChatMessages(newMsgs);
                                                            }}
                                                            className={`text-[8px] font-bold px-1.5 py-0.5 rounded border ${msg.side === 'right'
                                                                ? 'bg-green-500/10 text-green-500 border-green-500/20'
                                                                : 'bg-blue-500/10 text-blue-500 border-blue-500/20'
                                                                }`}
                                                        >
                                                            {msg.side === 'right' ? 'TÚ (VERDE)' : 'ELLOS (GRIS)'}
                                                        </button>
                                                    </div>
                                                    <input
                                                        type="text"
                                                        value={msg.time}
                                                        onChange={e => {
                                                            const newMsgs = [...chatMessages];
                                                            newMsgs[i].time = e.target.value;
                                                            setChatMessages(newMsgs);
                                                        }}
                                                        className="text-[9px] bg-transparent text-gray-600 w-12 text-right outline-none"
                                                    />
                                                </div>
                                                <textarea
                                                    value={msg.text}
                                                    onChange={e => {
                                                        const newMsgs = [...chatMessages];
                                                        newMsgs[i].text = e.target.value;
                                                        setChatMessages(newMsgs);
                                                    }}
                                                    className="w-full bg-black/50 border border-white/10 rounded-lg p-2 text-xs outline-none focus:border-primary/50 h-16 resize-none"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'design' && (
                            <div className="flex flex-col gap-4 mt-4">
                                <div className="bg-[#0a0b0d] p-4 rounded-xl border border-white/5">
                                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-3">Diseño</h3>

                                    <div className="pt-4 border-t border-white/5 space-y-4">
                                        <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Ajustes de WhatsApp</h4>
                                        <div>
                                            <label className="text-[10px] text-gray-500 uppercase font-bold mb-1 block">Nombre del Contacto</label>
                                            <input
                                                value={contactName}
                                                onChange={e => setContactName(e.target.value)}
                                                className="w-full bg-black/50 border border-white/10 rounded-lg p-2 text-sm outline-none focus:border-primary/50"
                                                placeholder="Ej: Barberox Team"
                                            />
                                        </div>

                                        <div>
                                            <label className="text-[10px] text-gray-500 uppercase font-bold mb-1 block">Foto de Perfil</label>
                                            <div className="flex gap-3 items-center mb-3">
                                                {contactAvatar ? (
                                                    <div className="relative w-12 h-12 rounded-full overflow-hidden border border-white/10 group">
                                                        <img src={contactAvatar} className="w-full h-full object-cover" />
                                                        <button
                                                            onClick={() => setContactAvatar(null)}
                                                            className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-[8px] font-bold"
                                                        >
                                                            X
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-500">
                                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                                                    </div>
                                                )}
                                                <label className="cursor-pointer bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg px-3 py-2 transition-colors flex-1 text-center">
                                                    <span className="text-[10px] font-bold text-gray-300">Subir Avatar</span>
                                                    <input type="file" accept="image/*" className="hidden" onChange={handleContactAvatarUpload} />
                                                </label>
                                            </div>

                                            {contactAvatar && (
                                                <div className="space-y-3 p-3 bg-black/20 rounded-lg">
                                                    <div className="flex justify-between items-center">
                                                        <label className="text-[9px] text-gray-500 uppercase font-bold">Zoom</label>
                                                        <input
                                                            type="range" min="0.5" max="3" step="0.01"
                                                            value={avatarZoom}
                                                            onChange={e => setAvatarZoom(parseFloat(e.target.value))}
                                                            className="w-32 accent-primary"
                                                        />
                                                    </div>
                                                    <div className="flex justify-between items-center">
                                                        <label className="text-[9px] text-gray-500 uppercase font-bold">Desplazar X</label>
                                                        <input
                                                            type="range" min="-1" max="1" step="0.01"
                                                            value={avatarOffsetX}
                                                            onChange={e => setAvatarOffsetX(parseFloat(e.target.value))}
                                                            className="w-32 accent-primary"
                                                        />
                                                    </div>
                                                    <div className="flex justify-between items-center">
                                                        <label className="text-[9px] text-gray-500 uppercase font-bold">Desplazar Y</label>
                                                        <input
                                                            type="range" min="-1" max="1" step="0.01"
                                                            value={avatarOffsetY}
                                                            onChange={e => setAvatarOffsetY(parseFloat(e.target.value))}
                                                            className="w-32 accent-primary"
                                                        />
                                                    </div>
                                                    <button
                                                        onClick={() => { setAvatarZoom(1); setAvatarOffsetX(0); setAvatarOffsetY(0); }}
                                                        className="w-full text-[8px] text-gray-500 hover:text-white uppercase font-bold pt-1"
                                                    >
                                                        Resetear Ajuste
                                                    </button>
                                                </div>
                                            )}
                                        </div>

                                        <div className="space-y-4">
                                            <div>
                                                <label className="text-[10px] text-gray-500 uppercase font-bold mb-1 block">Color Cabezal WhatsApp</label>
                                                <div className="flex gap-2">
                                                    <input
                                                        type="color"
                                                        value={whatsappHeaderColor}
                                                        onChange={e => setWhatsappHeaderColor(e.target.value)}
                                                        className="w-10 h-10 rounded border border-white/10 bg-transparent p-0 cursor-pointer"
                                                    />
                                                    <input
                                                        type="text"
                                                        value={whatsappHeaderColor}
                                                        onChange={e => setWhatsappHeaderColor(e.target.value)}
                                                        className="flex-1 bg-white/5 border border-white/10 rounded px-3 py-2 text-xs text-white"
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label className="text-[10px] text-gray-500 uppercase font-bold mb-1 block">Hora Pantalla Bloqueo</label>
                                                <input
                                                    type="text"
                                                    value={lockTime}
                                                    onChange={e => setLockTime(e.target.value)}
                                                    className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-xs text-white"
                                                    placeholder="16:30"
                                                />
                                            </div>

                                            <div>
                                                <label className="text-[10px] text-gray-500 uppercase font-bold mb-1 block">Fecha Pantalla Bloqueo</label>
                                                <input
                                                    type="text"
                                                    value={lockDate}
                                                    onChange={e => setLockDate(e.target.value)}
                                                    className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-xs text-white"
                                                    placeholder="jueves, 22 de enero"
                                                />
                                            </div>

                                            <div>
                                                <label className="text-[10px] text-gray-500 uppercase font-bold mb-1 block">Fondo del Chat</label>
                                                <div className="flex gap-3 items-center">
                                                    {chatBg && (
                                                        <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-white/10 group">
                                                            <img src={chatBg} className="w-full h-full object-cover" />
                                                            <button
                                                                onClick={() => setChatBg(null)}
                                                                className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-[8px] font-bold"
                                                            >
                                                                X
                                                            </button>
                                                        </div>
                                                    )}
                                                    <label className="cursor-pointer bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg px-3 py-2 transition-colors flex-1 text-center">
                                                        <span className="text-[10px] font-bold text-gray-300">
                                                            {chatBg ? 'Cambiar Fondo Chat' : 'Subir Fondo Chat'}
                                                        </span>
                                                        <input type="file" accept="image/*" className="hidden" onChange={handleChatBgUpload} />
                                                    </label>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="pt-4 border-t border-white/5">
                                            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-2">Fondo de Pantalla</label>
                                            <div className="flex flex-col gap-3">
                                                {wallpaper && (
                                                    <div className="relative w-20 h-32 rounded-lg overflow-hidden border border-white/10 group">
                                                        <img src={wallpaper} className="w-full h-full object-cover" />
                                                        <button
                                                            onClick={() => setWallpaper(null)}
                                                            className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-[10px] font-bold"
                                                        >
                                                            Eliminar
                                                        </button>
                                                    </div>
                                                )}
                                                <label className="cursor-pointer bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-center transition-colors">
                                                    <span className="text-xs font-bold text-gray-300">
                                                        {wallpaper ? 'Cambiar Imagen' : 'Subir Fondo de Pantalla'}
                                                    </span>
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        className="hidden"
                                                        onChange={handleWallpaperUpload}
                                                    />
                                                </label>
                                            </div>
                                        </div>

                                        <div className="pt-4 border-t border-white/5 space-y-4">
                                            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest block">Tipo de Fondo Reel</label>
                                            <div className="grid grid-cols-2 gap-2">
                                                <button
                                                    onClick={() => setBgType('color')}
                                                    className={`py-2 rounded-lg text-xs font-bold transition-all ${bgType === 'color' ? 'bg-[#2a2d36] text-white' : 'bg-[#0a0b0d] text-gray-500 hover:text-gray-300'}`}
                                                >
                                                    🎨 Color Sólido
                                                </button>
                                                <button
                                                    onClick={() => setBgType('transparent')}
                                                    className={`py-2 rounded-lg text-xs font-bold transition-all ${bgType === 'transparent' ? 'bg-[#2a2d36] text-white' : 'bg-[#0a0b0d] text-gray-500 hover:text-gray-300'}`}
                                                >
                                                    🫥 Transparente
                                                </button>
                                            </div>

                                            {bgType === 'color' && (
                                                <div className="animate-fade-in flex items-center gap-3 bg-black/20 p-3 rounded-lg border border-white/5">
                                                    <input
                                                        type="color"
                                                        value={bgColor}
                                                        onChange={e => setBgColor(e.target.value)}
                                                        className="w-8 h-8 rounded cursor-pointer bg-transparent border-0"
                                                    />
                                                    <span className="text-sm font-mono text-gray-300">{bgColor}</span>
                                                </div>
                                            )}

                                            {bgType === 'transparent' && (
                                                <div className="animate-fade-in bg-blue-500/10 border border-blue-500/20 p-3 rounded-lg">
                                                    <p className="text-[10px] text-blue-400 leading-relaxed font-medium">
                                                        💡 El video se exportará como <b>WebM (VP9)</b> para mantener la transparencia del fondo.
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* RIGHT: Preview (Fixed size) */}
                <div className="flex-1 h-full bg-[#0a0b0d] rounded-3xl border border-white/5 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 pattern-grid opacity-10 pointer-events-none"></div>
                    {status !== 'Idle' && (
                        <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur px-6 py-2 rounded-full border border-white/10 z-50">
                            <span className="text-xs font-bold text-white">{status}</span>
                        </div>
                    )}
                    <div className="relative w-full h-full flex items-center justify-center p-8">
                        <canvas
                            ref={canvasRef}
                            className="max-h-full max-w-full object-contain shadow-2xl rounded-[3rem]"
                            style={{
                                maxHeight: 'calc(100vh - 200px)',
                                maxWidth: 'calc(100vw - 500px)'
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}