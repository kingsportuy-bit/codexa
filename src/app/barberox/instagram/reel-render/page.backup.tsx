'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Outfit } from 'next/font/google';

const outfit = Outfit({ subsets: ['latin'] });

// Add CSS animations similar to landing page
const addCSSAnimations = () => {
  if (typeof document !== 'undefined' && !document.getElementById('reel-render-animations')) {
    const style = document.createElement('style');
    style.id = 'reel-render-animations';
    style.textContent = `
      /* Smooth fade-up animation like landing page */
      .animate-fade-up-smooth {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
      }
      
      .animate-fade-up-smooth.animate-enter {
        opacity: 1;
        transform: translateY(0);
      }
      
      /* Staggered delays for sequential messages */
      .animate-delay-0 { animation-delay: 0s; }
      .animate-delay-100 { animation-delay: 0.1s; }
      .animate-delay-200 { animation-delay: 0.2s; }
      .animate-delay-300 { animation-delay: 0.3s; }
      .animate-delay-400 { animation-delay: 0.4s; }
      .animate-delay-500 { animation-delay: 0.5s; }
      
      /* Smooth slide-in from sides */
      .animate-slide-in-left {
        opacity: 0;
        transform: translateX(-40px);
        transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
      }
      
      .animate-slide-in-left.animate-enter {
        opacity: 1;
        transform: translateX(0);
      }
      
      .animate-slide-in-right {
        opacity: 0;
        transform: translateX(40px);
        transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
      }
      
      .animate-slide-in-right.animate-enter {
        opacity: 1;
        transform: translateX(0);
      }
      
      /* Pulse animation for interactive elements */
      .animate-pulse-gentle {
        animation: gentle-pulse 2s ease-in-out infinite;
      }
      
      @keyframes gentle-pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.02); }
        100% { transform: scale(1); }
      }
      
      /* Fade in for notifications */
      .animate-fade-in {
        opacity: 0;
        transition: opacity 0.4s ease-out;
      }
      
      .animate-fade-in.animate-enter {
        opacity: 1;
      }
    `;
    document.head.appendChild(style);
  }
};

// --- Types ---
interface ChatMessage {
    id: string;
    side: 'left' | 'right';
    text: string; // Used as body in lockscreen or message in chat
    time: string;
    title?: string; // Only for notifications
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
    const [chatMessages, setChatMessages] = useState<ChatMessage[]>(DEFAULT_CHAT);
    const [notifications, setNotifications] = useState<ChatMessage[]>(DEFAULT_NOTIFS);
    const [status, setStatus] = useState('Idle');
    const [isRecording, setIsRecording] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [animationProgress, setAnimationProgress] = useState(0);

    // State
    const [activeTab, setActiveTab] = useState<'locked' | 'unlocked' | 'design'>('locked');
    const [quality, setQuality] = useState<'720p' | '1080p' | '2k'>('1080p');
    
    // Generated videos tracking
    const [generatedVideos, setGeneratedVideos] = useState<Array<{
        filename: string;
        quality: string;
        timestamp: string;
        format: 'mp4' | 'mov';
    }>>([]);

    // Background State
    const [bgType, setBgType] = useState<'transparent' | 'color' | 'image'>('transparent');
    const [bgColor, setBgColor] = useState('#0b141a');
    const [bgImage, setBgImage] = useState<HTMLImageElement | null>(null);
    const [lockWallpaper, setLockWallpaper] = useState<HTMLImageElement | null>(null);
    const [chatWallpaper, setChatWallpaper] = useState<HTMLImageElement | null>(null);

    // Form State
    const [formSide, setFormSide] = useState<'left' | 'right'>('right');
    const [formText, setFormText] = useState('');
    const [formTitle, setFormTitle] = useState('');
    const [formPlatform, setFormPlatform] = useState<'whatsapp' | 'instagram' | 'facebook' | 'tiktok' | 'barberox'>('barberox');
    const [formTime, setFormTime] = useState('10:00');
    const [editingId, setEditingId] = useState<string | null>(null);

    // Identity State
    const [contactName, setContactName] = useState('Barberox');
    const [profilePic, setProfilePic] = useState<HTMLImageElement | null>(null);

    // Lock Screen State
    const [viewMode, setViewMode] = useState<'chat' | 'lockscreen'>('chat');
    const [lockClock, setLockClock] = useState('16:30');
    const [lockDate, setLockDate] = useState('jueves, 3 de enero');

    // Resources
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const logoRef = useRef<HTMLImageElement | null>(null);
    const animationFrameRef = useRef<number | null>(null);
    const recorderRef = useRef<MediaRecorder | null>(null);

    // --- Asset Loading (Once) ---
    useEffect(() => {
        // Add CSS animations
        addCSSAnimations();
        
        const loadAssets = async () => {
            try {
                // Load Logo
                const img = new Image();
                img.crossOrigin = 'anonymous';
                img.src = '/barberox/img/logo.png';
                await new Promise((resolve, reject) => {
                    img.onload = resolve;
                    img.onerror = () => { console.warn('Logo failed'); resolve(null); };
                });
                logoRef.current = img;

                // Initial Draw
                drawPreview();
            } catch (e) {
                console.error(e);
            }
        };
        loadAssets();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // --- Intersection Observer for smooth animations (like landing) ---
    useEffect(() => {
        if (typeof window === 'undefined') return;
        
        // Create intersection observer for chat messages
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add enter animation class
                    entry.target.classList.add('animate-enter');
                }
            });
        }, { 
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px' // Trigger slightly before entering viewport
        });

        // Observe all message containers
        const messageElements = document.querySelectorAll('[data-message-id]');
        messageElements.forEach(el => observer.observe(el));

        // Cleanup
        return () => {
            observer.disconnect();
        };
    }, [chatMessages, notifications]);

    // --- Redraw on Change ---
    useEffect(() => {
        if (!isRecording && !isAnimating) drawPreview();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chatMessages, notifications, quality, bgType, bgColor, bgImage, lockWallpaper, chatWallpaper, contactName, profilePic, viewMode, lockClock, lockDate]);

    // --- Cleanup on Unmount ---
    useEffect(() => {
        return () => {
            // Cancel any ongoing animation
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
                animationFrameRef.current = null;
            }
            // Stop any ongoing recording
            if (recorderRef.current && recorderRef.current.state === 'recording') {
                recorderRef.current.stop();
                recorderRef.current = null;
            }
        };
    }, []);

    // Handle Image Upload
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const img = new Image();
                img.onload = () => {
                    setBgImage(img);
                    setBgType('image');
                };
                img.src = event.target?.result as string;
            };
            reader.readAsDataURL(file);
        }
    };

    const handleProfilePicUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const img = new Image();
                img.onload = () => {
                    setProfilePic(img);
                };
                img.src = event.target?.result as string;
            };
            reader.readAsDataURL(file);
        }
    };

    // --- Core Engine: Drawing Helpers ---
    const getContext = () => {
        const canvas = canvasRef.current;
        if (!canvas) return null;

        // Enhanced context with better color management
        const ctx = canvas.getContext('2d', {
            alpha: true,
            willReadFrequently: false,
            colorSpace: 'srgb'
        });

        if (!ctx) return null;

        // Enable high quality rendering
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';

        // Set global composite operation for better blending
        ctx.globalCompositeOperation = 'source-over';

        // Resolution Config
        const resolutions = {
            '720p': { width: 1280, height: 720 },
            '1080p': { width: 1920, height: 1080 },
            '2k': { width: 2048, height: 1080 }
        };
        const targetRes = resolutions[quality];
        const targetW = targetRes.width;
        const targetH = targetRes.height;

        if (canvas.width !== targetW || canvas.height !== targetH) {
            canvas.width = targetW;
            canvas.height = targetH;
        }

        // Reset Transform & Scale if needed
        ctx.resetTransform();
        // No scaling needed for these resolutions

        return { canvas, ctx };
    };

    // --- Split Drawing Logic ---

    // 1. Draw Phone Shell & Screen Background (Bottom Layer)
    const drawPhoneShell = (ctx: CanvasRenderingContext2D, W: number, H: number) => {
        const PHONE_W = 900;
        const PHONE_H = 1800;
        const PHONE_X = (W - PHONE_W) / 2;
        const PHONE_Y = (H - PHONE_H) / 2;
        const CORNER_R = 70;
        const BEZEL = 25;
        const SW = PHONE_W;
        const SH = PHONE_H;

        // Global BG
        ctx.clearRect(0, 0, W, H);

        if (bgType === 'color') {
            ctx.fillStyle = bgColor;
            ctx.fillRect(0, 0, W, H);
        } else if (bgType === 'image' && bgImage) {
            const scale = Math.max(W / bgImage.width, H / bgImage.height);
            const x = (W / 2) - (bgImage.width / 2) * scale;
            const y = (H / 2) - (bgImage.height / 2) * scale;
            ctx.drawImage(bgImage, x, y, bgImage.width * scale, bgImage.height * scale);
        }

        // Bezel Shadow
        ctx.save();
        ctx.fillStyle = '#111';
        ctx.shadowColor = 'rgba(0,0,0,0.3)';
        ctx.shadowBlur = 30;

        ctx.beginPath();
        if (ctx.roundRect) ctx.roundRect(PHONE_X - 10, PHONE_Y - 10, PHONE_W + 20, PHONE_H + 20, CORNER_R + 10);
        else ctx.rect(PHONE_X - 10, PHONE_Y - 10, PHONE_W + 20, PHONE_H + 20);
        ctx.fill();
        ctx.restore();

        // Screen Clip Setup
        ctx.save();
        ctx.translate(PHONE_X, PHONE_Y);

        ctx.beginPath();
        if (ctx.roundRect) ctx.roundRect(0, 0, PHONE_W, PHONE_H, CORNER_R);
        else ctx.rect(0, 0, PHONE_W, PHONE_H);
        ctx.clip(); // <--- CLIP ACTIVE

        // Screen BG
        ctx.fillStyle = '#0b141a';
        ctx.fillRect(0, 0, SW, SH);

        // Draw Wallpaper if available
        if (viewMode === 'lockscreen' && lockWallpaper) {
            const scale = Math.max(SW / lockWallpaper.width, SH / lockWallpaper.height);
            const x = (SW / 2) - (lockWallpaper.width / 2) * scale;
            const y = (SH / 2) - (lockWallpaper.height / 2) * scale;
            ctx.drawImage(lockWallpaper, x, y, lockWallpaper.width * scale, lockWallpaper.height * scale);

            // Subtle dark overlay to ensure readability
            ctx.fillStyle = 'rgba(0,0,0,0.3)';
            ctx.fillRect(0, 0, SW, SH);
        } else if (viewMode === 'chat' && chatWallpaper) {
            const scale = Math.max(SW / chatWallpaper.width, SH / chatWallpaper.height);
            const x = (SW / 2) - (chatWallpaper.width / 2) * scale;
            const y = (SH / 2) - (chatWallpaper.height / 2) * scale;
            ctx.drawImage(chatWallpaper, x, y, chatWallpaper.width * scale, chatWallpaper.height * scale);

            // Subtle dark overlay to ensure readability
            ctx.fillStyle = 'rgba(0,0,0,0.2)';
            ctx.fillRect(0, 0, SW, SH);
        }

        // NOTE: Context is still translated and clipped here!
        // We return to let the caller draw bubbles inside this clip

        return { PHONE_X, PHONE_Y, SW, SH };
    };

    // 2. Draw Overlays (Header, Footer, Island - Top Layer)
    const drawOverlays = (ctx: CanvasRenderingContext2D, W: number, H: number, PHONE_X: number, PHONE_Y: number) => {
        const SW = 900;
        const SH = 1800;
        // Context assumed to be restored to Global 0,0? 
        // Or we should re-apply the phone transform?
        // Easier to re-apply "Phone Space" for header/footer to match previous logic.

        ctx.save();
        ctx.translate(PHONE_X, PHONE_Y);

        // Re-Clip just in case things bleed (though Overlays are usually solid blocks)
        const CORNER_R = 70;
        ctx.beginPath();
        if (ctx.roundRect) ctx.roundRect(0, 0, SW, SH, CORNER_R);
        else ctx.rect(0, 0, SW, SH);
        ctx.clip();

        if (viewMode === 'chat') {
            // B. Header
            const headerH = 250;
            ctx.fillStyle = '#202c33';
            ctx.fillRect(0, 0, SW, headerH);

            // Profile Pic
            const cx = 110;
            const cy = 150;
            const pic = profilePic || logoRef.current;

            // Draw black background circle
            ctx.fillStyle = '#000';
            ctx.beginPath();
            ctx.arc(cx, cy, 45, 0, Math.PI * 2);
            ctx.fill();

            if (pic) {
                const MAX_SIZE = 90;
                const scale = Math.min(MAX_SIZE / pic.width, MAX_SIZE / pic.height);
                const lw = pic.width * scale;
                const lh = pic.height * scale;

                ctx.save();
                ctx.beginPath();
                ctx.arc(cx, cy, 45, 0, Math.PI * 2);
                ctx.clip();
                ctx.drawImage(pic, cx - (lw / 2), cy - (lh / 2), lw, lh);
                ctx.restore();
            }

            ctx.fillStyle = '#fff';
            ctx.font = 'bold 42px "Outfit", sans-serif';
            ctx.fillText(contactName, 190, 155);
            ctx.fillStyle = 'rgba(255,255,255,0.6)';
            ctx.font = '28px "Outfit", sans-serif';
            ctx.fillText('en línea', 190, 195);

            // D. Footer
            const footerH = 160;
            const fy = SH - footerH;
            ctx.fillStyle = '#202c33';
            ctx.fillRect(0, fy, SW, footerH);

            ctx.fillStyle = '#2a3942';
            if (ctx.roundRect) { ctx.beginPath(); ctx.roundRect(140, fy + 40, SW - 260, 80, 40); ctx.fill(); }

            ctx.fillStyle = '#8696a0';
            ctx.font = '36px "Outfit", sans-serif';
            ctx.fillText('Mensaje', 180, fy + 90);

            ctx.strokeStyle = '#8696a0';
            ctx.lineWidth = 4;
            ctx.beginPath(); ctx.arc(70, fy + 80, 25, 0, Math.PI * 2); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(70, fy + 65); ctx.lineTo(70, fy + 95); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(55, fy + 80); ctx.lineTo(85, fy + 80); ctx.stroke();

            ctx.fillStyle = '#005c4b';
            ctx.beginPath(); ctx.arc(SW - 70, fy + 80, 40, 0, Math.PI * 2); ctx.fill();
            ctx.fillStyle = '#fff';
            ctx.fillRect(SW - 78, fy + 65, 16, 22);
        } else {
            // LOCK SCREEN OVERLAYS (Clock & Date)
            ctx.fillStyle = '#fff';
            ctx.textAlign = 'center';

            // Clock
            ctx.font = 'bold 180px "Outfit", sans-serif';
            ctx.fillText(lockClock, SW / 2, 450);

            // Date
            ctx.font = '40px "Outfit", sans-serif';
            ctx.fillStyle = 'rgba(255,255,255,0.8)';
            ctx.fillText(lockDate, SW / 2, 530);

            ctx.textAlign = 'left'; // Reset
        }

        ctx.restore(); // End Phone Content Clip

        // 4. Dynamic Island (Global Coords relative to Phone)
        ctx.lineWidth = 12;
        ctx.strokeStyle = '#222';
        ctx.beginPath();
        if (ctx.roundRect) ctx.roundRect(PHONE_X, PHONE_Y, 900, 1800, 70);
        ctx.stroke();

        ctx.fillStyle = '#000';
        const notchW = 260;
        const notchH = 70;
        const notchX = (W - notchW) / 2;
        const notchY = PHONE_Y + 30;
        ctx.beginPath();
        if (ctx.roundRect) ctx.roundRect(notchX, notchY, notchW, notchH, 35);
        else ctx.fillRect(notchX, notchY, notchW, notchH);
        ctx.fill();

        ctx.fillStyle = '#1a1a1a';
        ctx.beginPath(); ctx.arc(notchX + notchW - 50, notchY + 35, 12, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = 'rgba(255,255,255,0.1)';
        ctx.beginPath(); ctx.arc(notchX + notchW - 54, notchY + 31, 4, 0, Math.PI * 2); ctx.fill();
    };

    // --- Text Wrapping Helper ---
    const wrapText = (ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] => {
        const words = text.split(' ');
        const lines: string[] = [];
        let currentLine = words[0];

        for (let i = 1; i < words.length; i++) {
            const word = words[i];
            const width = ctx.measureText(currentLine + " " + word).width;
            if (width < maxWidth) {
                currentLine += " " + word;
            } else {
                lines.push(currentLine);
                currentLine = word;
            }
        }
        lines.push(currentLine);
        return lines;
    };

    // Enhanced layout calculation with predictive positioning
    const calculateLayout = (ctx: CanvasRenderingContext2D, SW: number, items: ChatMessage[]) => {
        const isLock = viewMode === 'lockscreen';
        // iOS Lockscreen: Clock/Date at top (~600px). Notifications scroll in the area below.
        const headerH = isLock ? 600 : 250;
        let layoutY = headerH + 50;
        const marginX = 40;
        const MAX_BUBBLE_W = isLock ? SW - (marginX * 2) : SW * 0.70;

        return items.map((msg, index) => {
            // Staggered timing with overlapping for smoother flow
            const delay = 300 + (index * 1200); // Reduced base delay and interval

            ctx.font = '38px "Outfit", sans-serif';

            const logicalLines = msg.text.split('\n');
            let wrappedLines: string[] = [];

            logicalLines.forEach(line => {
                if (line === '') {
                    wrappedLines.push('');
                } else {
                    const wrapped = wrapText(ctx, line, MAX_BUBBLE_W - 50);
                    wrappedLines = [...wrappedLines, ...wrapped];
                }
            });

            let maxW = 0;
            wrappedLines.forEach(line => {
                const m = ctx.measureText(line);
                if (m.width > maxW) maxW = m.width;
            });

            ctx.font = '24px "Outfit", sans-serif';
            const timeW = ctx.measureText(msg.time + (msg.side === 'right' ? ' ✓✓' : '')).width;

            const padding = 25;
            const contentW = Math.max(maxW, timeW + 20);
            const bubbleW = contentW + (padding * 2);

            const lineHeight = 48;
            const baseBubbleH = (wrappedLines.length * lineHeight) + 60;
            let finalH = baseBubbleH;

            if (isLock) {
                // Dynamic height for iOS notifications:
                // Header (App Name/Icon) approx 70px
                // Title approx 45px
                // Body (Lines * LineHeight)
                // Bottom padding 35px
                const headerArea = 75;
                const titleArea = 50;
                const bodyArea = wrappedLines.length * lineHeight;
                finalH = headerArea + titleArea + bodyArea + 30;
                if (finalH < 180) finalH = 180;
            }

            const isRight = msg.side === 'right';
            const x = isLock ? marginX : (isRight ? SW - 30 - bubbleW : 30);
            const y = layoutY;

            layoutY += finalH + (isLock ? 15 : 20);

            return {
                ...msg,
                lines: wrappedLines,
                x,
                y,
                w: isLock ? MAX_BUBBLE_W : bubbleW,
                h: finalH,
                padding,
                lineHeight,
                isRight,
                animStart: delay,
                bottomY: y + finalH // Track bottom
            };
        });
    };

    // Enhanced easing functions for ultra-smooth animations
    const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);
    const easeOutBack = (t: number) => {
        const s = 1.70158;
        return (t = t - 1) * t * ((s + 1) * t + s) + 1;
    };
    const easeInOutCubic = (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    // Ultra-smooth micro-easing for finest details
    const easeOutExpo = (t: number) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    const smoothStep = (t: number) => t * t * (3 - 2 * t);

    // Velocity-based interpolation for natural motion
    const interpolateWithVelocity = (current: number, target: number, velocity: number, deltaTime: number) => {
        const diff = target - current;
        const spring = 0.15; // Spring constant
        const damping = 0.8; // Damping factor

        velocity += diff * spring * deltaTime;
        velocity *= damping;

        return {
            value: current + velocity * deltaTime,
            velocity: velocity
        };
    };

    const drawBubbles = (ctx: CanvasRenderingContext2D, layout: any[], elapsed = 999999) => {
        const isLock = viewMode === 'lockscreen';

        layout.forEach(msg => {
            let opacity = 0;
            let yOffset = 40;

            if (elapsed > msg.animStart) {
                const p = Math.min(1, (elapsed - msg.animStart) / 600); // Further extended for ultra-smooth feel

                // Layered easing for micro-smoothness
                const primaryEase = isLock ? easeOutBack(p) : easeOutQuart(p);
                const microEase = easeOutExpo(p); // Fine detail smoothing
                const finalEase = smoothStep(primaryEase * 0.7 + microEase * 0.3); // Blend for perfection

                opacity = finalEase;
                yOffset = 40 * (1 - finalEase);

                // Add subtle micro-movements for lifelike feel
                const microShake = Math.sin(elapsed * 0.02) * 0.5 * (1 - finalEase);
                yOffset += microShake;
            }

            if (opacity > 0) {
                ctx.save();
                ctx.translate(0, yOffset);
                ctx.globalAlpha = opacity;

                const { x, y, w, h } = msg;

                if (isLock) {
                    // IOS NOTIFICATION STYLE
                    // iPhone-style animation: Slide UP from bottom of the screen/safe area
                    const entryOffset = 100 * (1 - opacity);
                    ctx.save();
                    ctx.translate(0, entryOffset);

                    const r = 40;
                    ctx.save();

                    // Glassmorphism effect
                    ctx.fillStyle = 'rgba(255,255,255,0.18)';
                    ctx.shadowColor = 'rgba(0,0,0,0.3)';
                    ctx.shadowBlur = 30;

                    if (ctx.roundRect) {
                        ctx.beginPath(); ctx.roundRect(x, y, w, h, r); ctx.fill();
                    } else {
                        ctx.fillRect(x, y, w, h);
                    }
                    ctx.shadowBlur = 0;

                    // Header: Icon + App Name + Time
                    const iconSize = 40;
                    const headerY = y + 36;
                    const iconX = x + 30;

                    // Draw App Icon
                    ctx.save();
                    const platform = msg.platform || 'barberox';
                    ctx.beginPath();
                    ctx.arc(iconX + iconSize / 2, headerY, iconSize / 2, 0, Math.PI * 2);
                    ctx.clip();

                    if (platform === 'whatsapp') {
                        ctx.fillStyle = '#25D366';
                        ctx.fillRect(iconX, headerY - iconSize / 2, iconSize, iconSize);
                    } else if (platform === 'instagram') {
                        const grad = ctx.createRadialGradient(iconX + iconSize / 2, headerY + iconSize / 2, 0, iconX + iconSize / 2, headerY + iconSize / 2, iconSize);
                        grad.addColorStop(0, '#f9ed32');
                        grad.addColorStop(0.5, '#ee2a7b');
                        grad.addColorStop(1, '#002aff');
                        ctx.fillStyle = grad;
                        ctx.fillRect(iconX, headerY - iconSize / 2, iconSize, iconSize);
                    } else if (platform === 'facebook') {
                        ctx.fillStyle = '#1877F2';
                        ctx.fillRect(iconX, headerY - iconSize / 2, iconSize, iconSize);
                    } else if (platform === 'tiktok') {
                        ctx.fillStyle = '#000000';
                        ctx.fillRect(iconX, headerY - iconSize / 2, iconSize, iconSize);
                    } else {
                        ctx.fillStyle = '#000';
                        ctx.fillRect(iconX, headerY - iconSize / 2, iconSize, iconSize);
                    }

                    // Icon text representation
                    ctx.fillStyle = '#fff';
                    ctx.textAlign = 'center';
                    ctx.font = 'bold 20px "Outfit", sans-serif';
                    if (platform === 'whatsapp') ctx.fillText('W', iconX + iconSize / 2, headerY + 8);
                    else if (platform === 'instagram') ctx.fillText('I', iconX + iconSize / 2, headerY + 8);
                    else if (platform === 'facebook') ctx.fillText('F', iconX + iconSize / 2, headerY + 8);
                    else if (platform === 'tiktok') ctx.fillText('T', iconX + iconSize / 2, headerY + 8);
                    else if (logoRef.current) ctx.drawImage(logoRef.current, iconX, headerY - iconSize / 2, iconSize, iconSize);

                    ctx.restore();

                    // App Label
                    ctx.textAlign = 'left';
                    ctx.fillStyle = 'rgba(255,255,255,0.65)';
                    ctx.font = 'bold 28px "Outfit", sans-serif';
                    const appLabel = platform === 'barberox' ? 'BARBEROX' : platform.charAt(0).toUpperCase() + platform.slice(1);
                    ctx.fillText(appLabel, iconX + 55, headerY + 10);

                    // "ahora" tag
                    ctx.textAlign = 'right';
                    ctx.font = '26px "Outfit", sans-serif';
                    ctx.fillText('ahora', x + w - 30, headerY + 10);
                    ctx.textAlign = 'left';

                    // Body: Text
                    ctx.fillStyle = '#fff';
                    ctx.font = 'bold 36px "Outfit", sans-serif';
                    const title = msg.title || (msg.side === 'right' ? 'Tú' : contactName);
                    ctx.fillText(title, x + 30, y + 105);

                    ctx.font = '36px "Outfit", sans-serif';
                    ctx.fillStyle = 'rgba(255,255,255,0.9)';
                    const bodyStartY = y + 155;
                    msg.lines.forEach((line: string, i: number) => {
                        ctx.fillText(line, msg.x + 30, bodyStartY + (i * msg.lineHeight));
                    });

                    ctx.restore(); // Restore from entry translation
                    ctx.restore(); // Restore from glassmorphism save

                } else {
                    // WHATSAPP STYLE
                    const bgColor = msg.isRight ? '#005c4b' : '#202c33';
                    ctx.fillStyle = bgColor;

                    const r = 20;
                    ctx.beginPath();
                    if (msg.isRight) {
                        ctx.moveTo(x + r, y);
                        ctx.lineTo(x + w - r, y);
                        ctx.quadraticCurveTo(x + w, y, x + w, y + r);
                        ctx.lineTo(x + w + 10, y + r);
                        ctx.quadraticCurveTo(x + w + 10, y + r + 10, x + w, y + r + 20);
                        ctx.lineTo(x + w, y + h - r);
                        ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
                        ctx.lineTo(x + r, y + h);
                        ctx.quadraticCurveTo(x, y + h, x, y + h - r);
                        ctx.lineTo(x, y + r);
                        ctx.quadraticCurveTo(x, y, x + r, y);
                    } else {
                        ctx.moveTo(x + w - r, y);
                        ctx.lineTo(x + r, y);
                        ctx.quadraticCurveTo(x, y, x, y + r);
                        ctx.lineTo(x - 10, y + r);
                        ctx.quadraticCurveTo(x - 10, y + r + 10, x, y + r + 20);
                        ctx.lineTo(x, y + h - r);
                        ctx.quadraticCurveTo(x, y + h, x + r, y + h);
                        ctx.lineTo(x + w - r, y + h);
                        ctx.quadraticCurveTo(x + w, y + h, x + w, y + h - r);
                        ctx.lineTo(x + w, y + r);
                        ctx.quadraticCurveTo(x + w, y, x + w - r, y);
                    }
                    ctx.fill();

                    ctx.fillStyle = '#e9edef';
                    ctx.font = '38px "Outfit", sans-serif';
                    ctx.textAlign = 'left';
                    msg.lines.forEach((line: string, i: number) => {
                        ctx.fillText(line, msg.x + msg.padding, msg.y + msg.padding + 35 + (i * msg.lineHeight));
                    });

                    ctx.fillStyle = 'rgba(255,255,255,0.6)';
                    ctx.font = '24px "Outfit", sans-serif';
                    ctx.textAlign = 'right';
                    const timeText = msg.isRight ? `${msg.time} ✓✓` : msg.time;
                    ctx.fillText(timeText, msg.x + msg.w - 15, msg.y + msg.h - 15);
                }

                ctx.restore();
            }
        });
    };

    // 1. Preview Mode (Static - Scrolled to End)
    const drawPreview = () => {
        const r = getContext();
        if (!r) return;
        const { ctx, canvas } = r;

        try {
            // Optimize canvas for preview
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';
            ctx.globalCompositeOperation = 'source-over';

            // A. Draw Shell (and Setup Clip)
            const shell = drawPhoneShell(ctx, 1080, 1920);

            // B. Calculate Layout
            const activeArray = viewMode === 'chat' ? chatMessages : notifications;
            const layout = calculateLayout(ctx, shell.SW, activeArray);

            // C. Calculate Scroll (To End)
            const headerH = 250;
            const footerH = 160;
            const visibleChatAreaH = shell.SH - headerH - footerH;
            const visibleChatAreaBottomY = shell.SH - footerH;
            let scrollY = 0;

            if (layout.length > 0) {
                const lastMsg = layout[layout.length - 1];
                const totalContentH = lastMsg.bottomY + 40; // padding below last message

                if (totalContentH > visibleChatAreaBottomY) {
                    scrollY = totalContentH - visibleChatAreaBottomY;
                }
            }

            // D. Draw Bubbles with Scroll & Clipping
            ctx.save();
            if (viewMode === 'lockscreen') {
                // CLIP AREA: Protect the clock. Only draw notifications in the bottom 2/3 of the screen.
                ctx.beginPath();
                ctx.rect(0, 580, 1080, 1920 - 580 - 150); // Margin top for clock, margin bottom for safe area
                ctx.clip();
            }
            ctx.translate(0, -scrollY);
            drawBubbles(ctx, layout, 9999999);
            ctx.restore();

            // E. Close Clip & Draw Overlays
            ctx.restore(); // Restore from Shell Clip
            drawOverlays(ctx, 1080, 1920, shell.PHONE_X, shell.PHONE_Y);

        } catch (e) {
            console.error(e);
        }
    };

    // 2. Recording Mode (Animated Scroll)
    const startRecording = () => {
        setIsRecording(true);
        setAnimationProgress(0);
        setStatus('Starting Recording...');

        const r = getContext();
        if (!r) return;
        const { ctx, canvas } = r;

        const bitrate = quality === '2k' ? 15000000 : quality === '1080p' ? 10000000 : 6000000; // 15Mbps for 2K, 10Mbps for 1080p, 6Mbps for 720p
        const stream = canvas.captureStream(60);

        // Enhanced MediaRecorder options for better color fidelity
        let options = {
            mimeType: 'video/webm; codecs=vp9',
            videoBitsPerSecond: bitrate,
            videoMaxFrameRate: 60
        };

        try {
            // Try VP9 with high quality profile
            if (!MediaRecorder.isTypeSupported(options.mimeType)) {
                // Fallback to VP8 with higher bitrate
                options = {
                    mimeType: 'video/webm; codecs=vp8',
                    videoBitsPerSecond: bitrate * 1.2,
                    videoMaxFrameRate: 60
                };

                if (!MediaRecorder.isTypeSupported(options.mimeType)) {
                    // Last resort fallback
                    options = {
                        mimeType: 'video/webm',
                        videoBitsPerSecond: bitrate,
                        videoMaxFrameRate: 60
                    };
                }
            }
        } catch (e) {
            options = {
                mimeType: 'video/webm',
                videoBitsPerSecond: bitrate,
                videoMaxFrameRate: 60
            };
        }

        const recorder = new MediaRecorder(stream, options);
        recorderRef.current = recorder;
        const chunks: Blob[] = [];
        recorder.ondataavailable = e => chunks.push(e.data);
        recorder.onstop = () => {
            uploadVideo(chunks);
            setIsRecording(false);
            recorderRef.current = null;
            setTimeout(drawPreview, 100);
        };
        recorder.start();

        const startTime = performance.now(); // More precise timing
        const activeArray = viewMode === 'chat' ? chatMessages : notifications;
        const introDelay = 5000; // 5 seconds of static screen at the beginning
        const baseDuration = (activeArray.length * 2000) + 6000;
        const duration = introDelay + baseDuration; // Total duration with intro delay at the start
        const headerH = 250;
        const footerH = 160;

        // Optimized FPS control
        let lastFrameTime = performance.now();
        const targetFrameTime = 1000 / 60; // 60 FPS

        const animate = (currentTime: number) => {
            // Better FPS throttling using performance.now()
            const deltaTime = currentTime - lastFrameTime;

            if (deltaTime < targetFrameTime) {
                animationFrameRef.current = requestAnimationFrame(animate);
                return;
            }

            lastFrameTime = currentTime - (deltaTime % targetFrameTime);
            const elapsed = currentTime - startTime;

            // Update progress
            const progress = Math.min(100, (elapsed / duration) * 100);
            setAnimationProgress(progress);

            if (elapsed > duration) {
                recorder.stop();
                if (animationFrameRef.current) {
                    cancelAnimationFrame(animationFrameRef.current);
                    animationFrameRef.current = null;
                }
                return;
            }

            try {
                // Clear & Setup Logic - Optimized
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                // Optimize canvas settings (scaling already handled by getContext)
                ctx.imageSmoothingEnabled = true;
                ctx.imageSmoothingQuality = 'high';
                ctx.globalCompositeOperation = 'source-over';

                const shell = drawPhoneShell(ctx, 1080, 1920);
                const activeArray = viewMode === 'chat' ? chatMessages : notifications;
                const layout = calculateLayout(ctx, shell.SW, activeArray);

                // Enhanced Dynamic Scroll Logic with smoother interpolation
                let scrollY = 0;
                const visibleChatAreaBottomY = shell.SH - footerH;

                // Account for intro delay - no animation during first 5 seconds
                const animationElapsed = Math.max(0, elapsed - introDelay);

                // Find the bottom of the latest *active* message
                let activeContentBottom = headerH + 40; // Start of chat area
                let lastActiveIndex = -1;

                if (animationElapsed > 0) { // Only animate after intro delay
                    for (let i = 0; i < layout.length; i++) {
                        const m = layout[i];
                        if (animationElapsed > m.animStart) {
                            activeContentBottom = m.bottomY + 40; // Include padding below message
                            lastActiveIndex = i;
                        } else {
                            // If a message hasn't started animating, its content isn't "active" yet
                            break;
                        }
                    }
                }

                // Apply smooth scrolling with easing (only after intro delay)
                if (animationElapsed > 0 && activeContentBottom > visibleChatAreaBottomY) {
                    const targetScroll = activeContentBottom - visibleChatAreaBottomY;
                    // Interpolate smoothly towards target scroll position
                    scrollY = targetScroll * easeInOutCubic(Math.min(1, animationElapsed / 2000));
                }

                ctx.save();
                if (viewMode === 'lockscreen') {
                    // CLIP AREA: Protect the clock.
                    ctx.beginPath();
                    ctx.rect(0, 580, 1080, 1920 - 580 - 150);
                    ctx.clip();
                }
                ctx.translate(0, -scrollY);
                drawBubbles(ctx, layout, animationElapsed);
                ctx.restore();

                ctx.restore(); // Restore Shell Clip
                drawOverlays(ctx, 1080, 1920, shell.PHONE_X, shell.PHONE_Y);

            } catch (e) {
                console.error('Animation error:', e);
                recorder.stop();
                if (animationFrameRef.current) {
                    cancelAnimationFrame(animationFrameRef.current);
                    animationFrameRef.current = null;
                }
            }

            animationFrameRef.current = requestAnimationFrame(animate);
        };
        animationFrameRef.current = requestAnimationFrame(animate);
    };

    // 3. Preview Animation Mode (No Recording)
    const startAnimationPreview = () => {
        setIsAnimating(true);
        setAnimationProgress(0);
        setStatus('Previewing Animation...');

        const r = getContext();
        if (!r) return;
        const { ctx, canvas } = r;

        const startTime = performance.now();
        const activeArray = viewMode === 'chat' ? chatMessages : notifications;
        const introDelay = 5000;
        const baseDuration = (activeArray.length * 2000) + 6000;
        const duration = introDelay + baseDuration;
        const headerH = 250;
        const footerH = 160;

        // Optimized FPS control
        let lastFrameTime = performance.now();
        const targetFrameTime = 1000 / 60; // 60 FPS

        const animate = (currentTime: number) => {
            const deltaTime = currentTime - lastFrameTime;

            if (deltaTime < targetFrameTime) {
                animationFrameRef.current = requestAnimationFrame(animate);
                return;
            }

            lastFrameTime = currentTime - (deltaTime % targetFrameTime);
            const elapsed = currentTime - startTime;

            // Update progress
            const progress = Math.min(100, (elapsed / duration) * 100);
            setAnimationProgress(progress);

            if (elapsed > duration) {
                setIsAnimating(false);
                setAnimationProgress(100);
                setStatus('Preview Complete');
                if (animationFrameRef.current) {
                    cancelAnimationFrame(animationFrameRef.current);
                    animationFrameRef.current = null;
                }
                return;
            }

            try {
                // Clear & Setup Logic - Optimized
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                // Optimize canvas settings (scaling already handled by getContext)
                ctx.imageSmoothingEnabled = true;
                ctx.imageSmoothingQuality = 'high';
                ctx.globalCompositeOperation = 'source-over';

                const shell = drawPhoneShell(ctx, 1080, 1920);
                const activeArray = viewMode === 'chat' ? chatMessages : notifications;
                const layout = calculateLayout(ctx, shell.SW, activeArray);

                // Enhanced Dynamic Scroll Logic
                let scrollY = 0;
                const visibleChatAreaBottomY = shell.SH - footerH;
                const animationElapsed = Math.max(0, elapsed - introDelay);

                // Find the bottom of the latest *active* message
                let activeContentBottom = headerH + 40;

                if (animationElapsed > 0) {
                    for (let i = 0; i < layout.length; i++) {
                        const m = layout[i];
                        if (animationElapsed > m.animStart) {
                            activeContentBottom = m.bottomY + 40;
                        } else {
                            break;
                        }
                    }
                }

                // Apply smooth scrolling with easing
                if (animationElapsed > 0 && activeContentBottom > visibleChatAreaBottomY) {
                    const targetScroll = activeContentBottom - visibleChatAreaBottomY;
                    scrollY = targetScroll * easeInOutCubic(Math.min(1, animationElapsed / 2000));
                }

                ctx.save();
                if (viewMode === 'lockscreen') {
                    ctx.beginPath();
                    ctx.rect(0, 580, 1080, 1920 - 580 - 150);
                    ctx.clip();
                }
                ctx.translate(0, -scrollY);
                drawBubbles(ctx, layout, animationElapsed);
                ctx.restore();

                ctx.restore(); // Restore Shell Clip
                drawOverlays(ctx, 1080, 1920, shell.PHONE_X, shell.PHONE_Y);

                ctx.restore(); // Restore quality scaling

            } catch (e) {
                console.error('Preview animation error:', e);
                setIsAnimating(false);
                setStatus('Preview Error');
                if (animationFrameRef.current) {
                    cancelAnimationFrame(animationFrameRef.current);
                    animationFrameRef.current = null;
                }
            }

            animationFrameRef.current = requestAnimationFrame(animate);
        };
        animationFrameRef.current = requestAnimationFrame(animate);
    };

    const uploadVideo = (chunks: Blob[], format: 'mp4' | 'mov' = 'mp4') => {
        setStatus('Uploading...');
        const blob = new Blob(chunks, { type: 'video/webm' });
        const fd = new FormData();
        // Append quality and format to filename
        const filename = `chat_${quality}.${format}`;
        fd.append('file', blob, filename);

        fetch('/api/save-reel', { method: 'POST', body: fd })
            .then(res => res.json())
            .then(() => {
                setStatus('UPLOAD_SUCCESS');
                // Add to generated videos list
                setGeneratedVideos(prev => [...prev, {
                    filename,
                    quality,
                    timestamp: new Date().toLocaleTimeString(),
                    format
                }]);
            })
            .catch(e => setStatus('Error: ' + e.message));
    };

    // --- Components Wrappers ---

    const handleAddOrUpdate = () => {
        if (!formText) return;

        const isNotif = viewMode === 'lockscreen';

        if (editingId) {
            // UPDATE
            if (isNotif) {
                setNotifications(prev => prev.map(m =>
                    m.id === editingId
                        ? { ...m, text: formText, time: formTime, title: formTitle, platform: formPlatform }
                        : m
                ));
            } else {
                setChatMessages(prev => prev.map(m =>
                    m.id === editingId
                        ? { ...m, side: formSide, text: formText, time: formTime }
                        : m
                ));
            }
            setEditingId(null);
        } else {
            // ADD
            const newMsg: ChatMessage = {
                id: Date.now().toString(),
                side: isNotif ? 'left' : formSide, // Notifications are basically static side visually in the bubble
                text: formText,
                time: formTime,
                title: isNotif ? formTitle : undefined,
                platform: isNotif ? formPlatform : undefined
            };
            if (isNotif) setNotifications([...notifications, newMsg]);
            else setChatMessages([...chatMessages, newMsg]);
        }

        // Reset Form
        setFormText('');
        setFormTitle('');
        setFormPlatform('barberox');
        // Keep last time/side as user convenience or reset?
        setFormSide('right');
    };

    const handleEdit = (msg: ChatMessage) => {
        setEditingId(msg.id);
        setFormText(msg.text);
        setFormTime(msg.time);
        setFormSide(msg.side);
        setFormTitle(msg.title || '');
        setFormPlatform(msg.platform || 'barberox');
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setFormText('');
        setFormTitle('');
        setFormPlatform('barberox');
        setFormSide('right');
    };

    const handleRemove = (id: string) => {
        if (viewMode === 'lockscreen') {
            setNotifications(prev => prev.filter(m => m.id !== id));
        } else {
            setChatMessages(prev => prev.filter(m => m.id !== id));
        }
        if (editingId === id) handleCancelEdit();
    };

    // Bulk import function for chat messages
    const importBulkMessages = (text: string) => {
        // Split by double newlines to get message blocks
        const blocks = text.split(/\n\s*\n/).filter(block => block.trim());

        // Get current time as base
        const baseTime = new Date();
        const newMessages: ChatMessage[] = [];

        let currentTime = new Date(baseTime);

        blocks.forEach((block, index) => {
            const trimmedBlock = block.trim();
            if (!trimmedBlock) return;

            // Determine side: # for "Yo" (right), * for "Ellos" (left)
            let isMine = false;
            let cleanText = trimmedBlock;

            if (trimmedBlock.startsWith('#')) {
                isMine = true;
                cleanText = trimmedBlock.substring(1).trim();
            } else if (trimmedBlock.startsWith('*')) {
                isMine = false;
                cleanText = trimmedBlock.substring(1).trim();
            }
            // If neither # nor *, treat as "Ellos" by default

            if (cleanText) {
                // Format time
                const hours = currentTime.getHours().toString().padStart(2, '0');
                const minutes = currentTime.getMinutes().toString().padStart(2, '0');

                const newMessage: ChatMessage = {
                    id: `bulk-${Date.now()}-${index}`,
                    side: isMine ? 'right' : 'left',
                    text: cleanText,
                    time: `${hours}:${minutes}`
                };

                newMessages.push(newMessage);

                // Advance time by 2 minutes for next message
                currentTime.setMinutes(currentTime.getMinutes() + 2);
            }
        });

        // Add to existing messages
        setChatMessages(prev => [...prev, ...newMessages]);
    };

    return (
        <div className={`min-h-screen bg-[#0f1115] text-white p-6 ${outfit.className}`}>
            <div className="max-w-7xl mx-auto h-[90vh] flex gap-8">

                {/* LEFT: Controls Panel with scroll */}
                <div className="w-[450px] flex flex-col gap-6 bg-[#16181d] rounded-3xl p-6 border border-white/5 shadow-2xl h-full overflow-hidden">

                    {/* Header */}
                    <div className="space-y-3 flex-shrink-0">
                        <div className="flex justify-between items-center">
                            <div>
                                <img src="/barberox/img/logo.png" alt="Barberox" className="h-10 w-auto" />
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2">
                            <button
                                onClick={() => !isAnimating && !isRecording && startAnimationPreview()}
                                disabled={isAnimating || isRecording}
                                className={`flex-1 px-4 py-2.5 rounded-xl font-bold text-sm transition-colors ${isAnimating
                                    ? 'bg-blue-500/20 text-blue-400'
                                    : 'bg-blue-600 hover:bg-blue-500 text-white disabled:opacity-50'
                                    }`}
                            >
                                {isAnimating ? '▶️ Previsualizando...' : '▶️ Previsualizar'}
                            </button>
                            <button
                                onClick={() => !isRecording && !isAnimating && startRecording()}
                                disabled={isRecording || isAnimating}
                                className={`flex-1 px-4 py-2.5 rounded-xl font-bold text-sm transition-colors ${isRecording
                                    ? 'bg-red-500/20 text-red-500'
                                    : 'bg-red-600 hover:bg-red-500 text-white disabled:opacity-50'
                                    }`}
                            >
                                {isRecording ? '🎬 Grabando...' : '🎬 Grabar Video'}
                            </button>
                        </div>

                        {/* Progress Bar */}
                        {(isAnimating || isRecording) && (
                            <div className="space-y-1">
                                <div className="flex justify-between text-xs text-gray-400">
                                    <span>{isAnimating ? 'Previsualización' : 'Grabación'}</span>
                                    <span>{Math.round(animationProgress)}%</span>
                                </div>
                                <div className="h-1.5 bg-[#0a0b0d] rounded-full overflow-hidden">
                                    <div
                                        className={`h-full transition-all duration-300 ${isAnimating ? 'bg-gradient-to-r from-blue-500 to-purple-600' : 'bg-gradient-to-r from-orange-500 to-red-600'
                                            }`}
                                        style={{ width: `${animationProgress}%` }}
                                    />
                                </div>
                            </div>
                        )}
                    </div> {/* Close Header */}

                    {/* Scrollable Content Area */}
                    <div className="flex-1 overflow-y-auto pr-2 scrollbar-thin">

                    {/* Navigation Tabs */}
                    <div className="flex flex-col gap-4">
                        {/* Main Tabs */}
                        <div className="flex p-1 bg-[#0a0b0d] rounded-xl">
                            <button
                                onClick={() => {
                                    setActiveTab('locked');
                                    setViewMode('lockscreen'); // Sync with phone view
                                }}
                                className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${activeTab === 'locked' ? 'bg-[#2a2d36] text-white' : 'text-gray-500 hover:text-gray-300'}`}
                            >
                                🔒 Bloqueado
                            </button>
                            <button
                                onClick={() => {
                                    setActiveTab('unlocked');
                                    setViewMode('chat'); // Sync with phone view
                                }}
                                className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${activeTab === 'unlocked' ? 'bg-[#2a2d36] text-white' : 'text-gray-500 hover:text-gray-300'}`}
                            >
                                📱 Desbloqueado
                            </button>
                            <button
                                onClick={() => setActiveTab('design')}
                                className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${activeTab === 'design' ? 'bg-[#2a2d36] text-white' : 'text-gray-500 hover:text-gray-300'}`}
                            >
                                🎨 Diseño
                            </button>
                        </div>
                    </div>

                    {/* Content: Locked Screen */}
                    {activeTab === 'locked' && (
                        <div className="flex flex-col flex-1 gap-4 overflow-hidden">
                            {/* Lock Screen Settings */}
                            <div className="space-y-4">
                                {/* Background Settings */}
                                <div className="bg-[#0a0b0d] p-4 rounded-xl border border-white/5">
                                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-3">Fondo de Pantalla</h3>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) {
                                                const reader = new FileReader();
                                                reader.onload = (event) => {
                                                    const img = new Image();
                                                    img.onload = () => setLockWallpaper(img);
                                                    img.src = event.target?.result as string;
                                                };
                                                reader.readAsDataURL(file);
                                            }
                                        }}
                                        className="block w-full text-xs text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
                                    />
                                    {lockWallpaper && (
                                        <div className="relative aspect-[9/16] w-full mt-3 rounded overflow-hidden border border-white/10">
                                            <img src={lockWallpaper.src} className="w-full h-full object-cover" alt="Wallpaper" />
                                            <button
                                                onClick={() => setLockWallpaper(null)}
                                                className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded"
                                            >
                                                Quitar
                                            </button>
                                        </div>
                                    )}
                                </div>
                    
                                {/* Background Color */}
                                <div className="bg-[#0a0b0d] p-4 rounded-xl border border-white/5">
                                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-3">Color de Fondo</h3>
                                    <div className="flex items-center gap-4">
                                        <input
                                            type="color"
                                            value={bgColor}
                                            onChange={e => setBgColor(e.target.value)}
                                            className="w-10 h-10 rounded cursor-pointer bg-transparent border-none"
                                        />
                                        <span className="text-sm font-mono text-gray-400">{bgColor}</span>
                                    </div>
                                </div>
                    
                                {/* Clock and Date */}
                                <div className="grid grid-cols-2 gap-3 bg-[#0a0b0d] p-3 rounded-xl border border-white/5">
                                    <div className="space-y-1">
                                        <label className="text-[10px] text-gray-500 font-bold uppercase tracking-widest leading-none">Reloj</label>
                                        <input
                                            type="text"
                                            value={lockClock}
                                            onChange={e => setLockClock(e.target.value)}
                                            className="w-full bg-[#16181d] border border-white/5 rounded px-2 py-1.5 text-xs text-white focus:outline-none"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] text-gray-500 font-bold uppercase tracking-widest leading-none">Fecha</label>
                                        <input
                                            type="text"
                                            value={lockDate}
                                            onChange={e => setLockDate(e.target.value)}
                                            className="w-full bg-[#16181d] border border-white/5 rounded px-2 py-1.5 text-xs text-white focus:outline-none"
                                        />
                                    </div>
                                </div>
                    
                                {/* Notifications Section */}
                                <div className="bg-[#0a0b0d] p-4 rounded-xl border border-white/5">
                                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-3">Notificaciones</h3>
                                    {/* Existing notification content */}
                                    <div className="space-y-3">
                                        {(viewMode === 'lockscreen' ? notifications : []).map((msg, i) => (
                                            <div key={msg.id} className="bg-[#16181d] rounded-lg p-3 border border-white/5">
                                                <div className="flex justify-between items-start">
                                                    <div className="flex-1">
                                                        <div className="text-[10px] font-bold text-gray-400 uppercase mb-1">
                                                            {msg.platform || 'BX'}
                                                        </div>
                                                        <div className="text-sm text-white mb-1">{msg.title}</div>
                                                        <div className="text-xs text-gray-300">{msg.text}</div>
                                                    </div>
                                                    <div className="text-[10px] text-gray-500">{msg.time}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Content: Unlocked Screen */}
                    {activeTab === 'unlocked' && (
                        <div className="flex flex-col flex-1 gap-4 overflow-hidden">
                            <div className="space-y-4">
                                {/* Background Color */}
                                <div className="bg-[#0a0b0d] p-4 rounded-xl border border-white/5">
                                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-3">Color de Fondo</h3>
                                    <div className="flex items-center gap-4">
                                        <input
                                            type="color"
                                            value={bgColor}
                                            onChange={e => setBgColor(e.target.value)}
                                            className="w-10 h-10 rounded cursor-pointer bg-transparent border-none"
                                        />
                                        <span className="text-sm font-mono text-gray-400">{bgColor}</span>
                                    </div>
                                </div>

                                {/* Profile Picture */}
                                <div className="bg-[#0a0b0d] p-4 rounded-xl border border-white/5">
                                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-3">Foto de Perfil</h3>
                                    <div className="flex items-center gap-4">
                                        <div className="relative w-16 h-16 rounded-full overflow-hidden bg-[#16181d] border border-white/10 flex-shrink-0">
                                            {profilePic ? (
                                                <img src={profilePic.src} className="w-full h-full object-cover" />
                                            ) : (
                                                <img src="/barberox/img/logo.png" className="w-full h-full object-cover opacity-50" />
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleProfilePicUpload}
                                                className="block w-full text-[10px] text-gray-400 file:mr-3 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-[10px] file:font-semibold file:bg-orange-500/10 file:text-orange-500 hover:file:bg-orange-500/20 cursor-pointer"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Contact Name */}
                                <div className="bg-[#0a0b0d] p-4 rounded-xl border border-white/5">
                                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-3">Nombre de Usuario</h3>
                                    <input
                                        type="text"
                                        value={contactName}
                                        onChange={e => setContactName(e.target.value)}
                                        className="w-full bg-[#16181d] border border-white/5 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500"
                                        placeholder="Ej: Barberox"
                                    />
                                </div>

                                {/* Message Groups */}
                                <div className="bg-[#0a0b0d] p-4 rounded-xl border border-white/5">
                                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-3">Mensajes Agrupados</h3>
                                    <div className="space-y-2">
                                        {chatMessages
                                            .reduce((groups: any[], msg, index) => {
                                                const lastGroup = groups[groups.length - 1];
                                                if (lastGroup && lastGroup.side === msg.side && index - lastGroup.startIndex < 3) {
                                                    lastGroup.messages.push(msg);
                                                } else {
                                                    groups.push({
                                                        side: msg.side,
                                                        messages: [msg],
                                                        startIndex: index
                                                    });
                                                }
                                                return groups;
                                            }, [])
                                            .map((group, groupIndex) => (
                                                <div key={groupIndex} className={`flex ${group.side === 'right' ? 'justify-end' : 'justify-start'}`}>
                                                    <div className={`max-w-[80%] ${group.side === 'right' ? 'bg-[#005c4b]' : 'bg-[#202c33]'} rounded-lg p-3`}>
                                                        {group.messages.map((msg: any, msgIndex: number) => (
                                                            <div key={msg.id} className={`${msgIndex > 0 ? 'mt-1 pt-1 border-t border-white/10' : ''} text-white text-sm`}>
                                                                {msg.text}
                                                                <div className="text-[9px] text-white/50 text-right mt-1">{msg.time}</div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                    </div>
                                </div>

                                {/* Individual Messages */}
                                <div className="bg-[#0a0b0d] p-4 rounded-xl border border-white/5">
                                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-3">Mensajes Individuales</h3>
                                    <div className="space-y-3 max-h-64 overflow-y-auto">
                                        {chatMessages.map((msg, i) => (
                                            <div key={msg.id} className={`flex ${msg.side === 'right' ? 'justify-end' : 'justify-start'}`}>
                                                <div className={`max-w-[80%] ${msg.side === 'right' ? 'bg-[#005c4b]' : 'bg-[#202c33]'} rounded-lg p-3`}>
                                                    <div className="text-white text-sm">{msg.text}</div>
                                                    <div className="flex items-center justify-between mt-1">
                                                        <div className="text-[9px] text-white/50">{msg.time}</div>
                                                        <div className="flex gap-1 ml-2">
                                                            <select 
                                                                value={msg.side}
                                                                onChange={(e) => {
                                                                    const newSide = e.target.value as 'left' | 'right';
                                                                    setChatMessages(prev => prev.map(m => 
                                                                        m.id === msg.id ? {...m, side: newSide} : m
                                                                    ));
                                                                }}
                                                                className="text-[8px] bg-transparent text-white/70 border border-white/20 rounded px-1"
                                                            >
                                                                <option value="right" className="bg-[#16181d]">Enviado</option>
                                                                <option value="left" className="bg-[#16181d]">Recibido</option>
                                                            </select>
                                                            <input
                                                                type="text"
                                                                value={msg.time}
                                                                onChange={(e) => {
                                                                    setChatMessages(prev => prev.map(m => 
                                                                        m.id === msg.id ? {...m, time: e.target.value} : m
                                                                    ));
                                                                }}
                                                                className="text-[8px] bg-transparent text-white/70 border border-white/20 rounded px-1 w-12"
                                                                placeholder="HH:MM"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Content: Design */}
                    {activeTab === 'design' && (
                        <div className="flex flex-col gap-6">

                            {/* Quality */}
                            <div className="space-y-4">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Calidad de Video</label>
                                <div className="grid grid-cols-3 gap-3">
                                    <button
                                        onClick={() => setQuality('720p')}
                                        className={`p-4 rounded-xl border transition-all flex flex-col items-center gap-2 ${quality === '720p' ? 'bg-[#2a2d36] border-white/20' : 'bg-[#0a0b0d] border-transparent opacity-60 hover:opacity-100'}`}
                                    >
                                        <span className="text-2xl">📱</span>
                                        <div className="text-center">
                                            <div className="font-bold text-sm">720p</div>
                                            <div className="text-[10px] text-gray-400">Rápido • HD</div>
                                        </div>
                                    </button>
                                    <button
                                        onClick={() => setQuality('1080p')}
                                        className={`p-4 rounded-xl border transition-all flex flex-col items-center gap-2 ${quality === '1080p' ? 'bg-[#2a2d36] border-white/20' : 'bg-[#0a0b0d] border-transparent opacity-60 hover:opacity-100'}`}
                                    >
                                        <span className="text-2xl">⚡</span>
                                        <div className="text-center">
                                            <div className="font-bold text-sm">1080p</div>
                                            <div className="text-[10px] text-gray-400">Equilibrado • Full HD</div>
                                        </div>
                                    </button>
                                    <button
                                        onClick={() => setQuality('2k')}
                                        className={`p-4 rounded-xl border transition-all flex flex-col items-center gap-2 ${quality === '2k' ? 'bg-gradient-to-br from-purple-900/40 to-pink-900/40 border-pink-500/30' : 'bg-[#0a0b0d] border-transparent opacity-60 hover:opacity-100'}`}
                                    >
                                        <span className="text-2xl">💎</span>
                                        <div className="text-center">
                                            <div className="font-bold text-sm">2K</div>
                                            <div className="text-[10px] text-gray-400">Nitidez Alta • Cinema</div>
                                        </div>
                                    </button>
                                </div>
                            </div>

                            {/* Background */}
                            <div className="space-y-3">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Fondo del Video</label>
                                <div className="flex bg-[#0a0b0d] p-1 rounded-xl">
                                    <button onClick={() => setBgType('transparent')} className={`flex-1 py-2 text-xs font-bold rounded-lg transition-colors ${bgType === 'transparent' ? 'bg-[#2a2d36] text-white' : 'text-gray-500'}`}>Transparente</button>
                                    <button onClick={() => setBgType('color')} className={`flex-1 py-2 text-xs font-bold rounded-lg transition-colors ${bgType === 'color' ? 'bg-[#2a2d36] text-white' : 'text-gray-500'}`}>Color</button>
                                    <button onClick={() => setBgType('image')} className={`flex-1 py-2 text-xs font-bold rounded-lg transition-colors ${bgType === 'image' ? 'bg-[#2a2d36] text-white' : 'text-gray-500'}`}>Imagen</button>
                                </div>

                                {bgType === 'color' && (
                                    <div className="bg-[#0a0b0d] p-4 rounded-xl border border-white/5 flex items-center gap-4">
                                        <input
                                            type="color"
                                            value={bgColor}
                                            onChange={e => setBgColor(e.target.value)}
                                            className="w-10 h-10 rounded cursor-pointer bg-transparent border-none"
                                        />
                                        <span className="text-sm font-mono text-gray-400">{bgColor}</span>
                                    </div>
                                )}

                                {bgType === 'image' && (
                                    <div className="bg-[#0a0b0d] p-4 rounded-xl border border-white/5 space-y-3">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                            className="block w-full text-xs text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
                                        />
                                        {bgImage && (
                                            <div className="relative aspect-video rounded-lg overflow-hidden border border-white/10">
                                                <img src={bgImage.src} className="w-full h-full object-cover" alt="Preview" />
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Generated Videos List */}
                            <div className="space-y-3 pt-6 border-t border-white/5">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest leading-none block">Videos Generados</label>
                                <div className="bg-[#0a0b0d] p-4 rounded-xl border border-white/5">
                                    <div className="space-y-2 max-h-40 overflow-y-auto">
                                        {generatedVideos.map((video, i) => (
                                            <div key={i} className="flex items-center justify-between bg-[#16181d] p-2 rounded-lg">
                                                <div className="flex-1 min-w-0">
                                                    <div className="text-sm font-medium text-white truncate">{video.filename}</div>
                                                    <div className="text-xs text-gray-400">{video.quality} • {video.timestamp}</div>
                                                </div>
                                                <div className="flex gap-2 ml-2">
                                                    <select 
                                                        value={video.format}
                                                        onChange={(e) => {
                                                            const newVideos = [...generatedVideos];
                                                            newVideos[i].format = e.target.value as 'mp4' | 'mov';
                                                            setGeneratedVideos(newVideos);
                                                        }}
                                                        className="text-xs bg-[#0a0b0d] text-white border border-white/20 rounded px-2 py-1"
                                                    >
                                                        <option value="mp4">MP4</option>
                                                        <option value="mov">MOV</option>
                                                    </select>
                                                    <button className="text-xs bg-blue-600 hover:bg-blue-500 text-white px-2 py-1 rounded">
                                                        Descargar
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    {generatedVideos.length === 0 && (
                                        <div className="text-center py-4 text-gray-500 text-sm">
                                            No hay videos generados aún
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                </div>

                {/* RIGHT: Preview (Fixed size phone display) */}
                <div className="flex-1 h-full bg-[#0a0b0d] rounded-3xl border border-white/5 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 pattern-grid opacity-10 pointer-events-none"></div>
                    {/* Fixed size container for phone - maintains position and size regardless of video format */}
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
                    {status && (
                        <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur px-6 py-2 rounded-full border border-white/10 z-50">
                            <div className="flex items-center gap-3">
                                {status.includes('Recording') && <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />}
                                <span className="text-xs font-bold text-white">{status}</span>
                                {status === 'UPLOAD_SUCCESS' && (
                                    <div className="flex flex-col gap-2 ml-2">
                                        <span className="text-green-400 text-xs">¡Video generado!</span>
                                        <div className="flex gap-2">
                                            <select 
                                                defaultValue="mp4"
                                                className="text-xs bg-[#16181d] text-white border border-white/20 rounded px-2 py-1"
                                            >
                                                <option value="mp4">MP4</option>
                                                <option value="mov">MOV</option>
                                            </select>
                                            <button 
                                                onClick={() => {
                                                    const formatSelect = document.querySelector('select') as HTMLSelectElement;
                                                    const format = formatSelect?.value || 'mp4';
                                                    window.open(`/api/save-reel?file=chat_${quality}.${format}&v=${Date.now()}`, '_blank');
                                                }}
                                                className="text-blue-400 hover:text-blue-300 text-xs underline"
                                            >
                                                Descargar
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div> {/* Close scrollable content area */}
            </div>
        </div>
    );
}
