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
    const [chatMessages] = useState<ChatMessage[]>(DEFAULT_CHAT);
    const [notifications] = useState<ChatMessage[]>(DEFAULT_NOTIFS);
    const [status, setStatus] = useState('Idle');
    const [isRecording, setIsRecording] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [animationProgress, setAnimationProgress] = useState(0);

    // State for tabs and views
    const [activeTab, setActiveTab] = useState<'locked' | 'unlocked' | 'design'>('locked');
    const [quality, setQuality] = useState<'720p' | '1080p' | '2k'>('1080p');
    const [viewMode, setViewMode] = useState<'chat' | 'lockscreen'>('lockscreen');

    // Background State
    const [bgType, setBgType] = useState<'transparent' | 'color' | 'image'>('transparent');
    const [bgColor, setBgColor] = useState('#0b141a');

    // Resources
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // --- Core Drawing Functions ---
    const getContext = () => {
        const canvas = canvasRef.current;
        if (!canvas) return null;

        const ctx = canvas.getContext('2d', {
            alpha: true,
            willReadFrequently: false,
            colorSpace: 'srgb'
        });

        if (!ctx) return null;

        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
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

        ctx.resetTransform();
        return { canvas, ctx };
    };

    const drawPreview = () => {
        const r = getContext();
        if (!r) return;
        const { ctx } = r;

        try {
            // Clear canvas
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            
            // Draw background
            ctx.fillStyle = bgColor;
            ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            
            // Draw phone frame
            const phoneW = ctx.canvas.width * 0.8;
            const phoneH = ctx.canvas.height * 0.9;
            const phoneX = (ctx.canvas.width - phoneW) / 2;
            const phoneY = (ctx.canvas.height - phoneH) / 2;
            
            // Phone outline
            ctx.fillStyle = '#1a1a1a';
            ctx.fillRect(phoneX, phoneY, phoneW, phoneH);
            
            // Screen area
            const screenX = phoneX + 20;
            const screenY = phoneY + 20;
            const screenWidth = phoneW - 40;
            const screenHeight = phoneH - 40;
            
            ctx.fillStyle = '#0b141a';
            ctx.fillRect(screenX, screenY, screenWidth, screenHeight);
            
            // Draw content based on view mode
            if (viewMode === 'lockscreen') {
                // Lock screen content
                ctx.fillStyle = '#ffffff';
                ctx.font = 'bold 24px Arial';
                ctx.textAlign = 'center';
                ctx.fillText('16:30', screenX + screenWidth/2, screenY + 100);
                ctx.font = '16px Arial';
                ctx.fillText('jueves, 3 de enero', screenX + screenWidth/2, screenY + 130);
                
                // Notifications
                ctx.font = '14px Arial';
                notifications.forEach((notif, i) => {
                    const yPos = screenY + 200 + (i * 60);
                    ctx.fillStyle = '#ffffff';
                    ctx.fillText(notif.title || '', screenX + 20, yPos);
                    ctx.font = '12px Arial';
                    ctx.fillText(notif.text, screenX + 20, yPos + 20);
                });
            } else {
                // Chat content
                ctx.fillStyle = '#202c33';
                ctx.fillRect(screenX, screenY, screenWidth, 60); // Header
                
                // Messages
                let currentY = screenY + 80;
                chatMessages.forEach((msg) => {
                    const bubbleColor = msg.side === 'right' ? '#005c4b' : '#202c33';
                    const xPos = msg.side === 'right' ? screenX + screenWidth - 200 : screenX + 20;
                    
                    ctx.fillStyle = bubbleColor;
                    ctx.fillRect(xPos, currentY, 180, 40);
                    
                    ctx.fillStyle = '#ffffff';
                    ctx.font = '12px Arial';
                    ctx.fillText(msg.text, xPos + 10, currentY + 25);
                    
                    currentY += 50;
                });
            }
            
        } catch (e) {
            console.error(e);
        }
    };

    // Redraw on changes
    useEffect(() => {
        drawPreview();
    }, [viewMode, quality, bgColor, chatMessages, notifications]);

    return (
        <div className={`min-h-screen bg-[#0f1115] text-white p-6 ${outfit.className}`}>
            <div className="max-w-7xl mx-auto h-[90vh] flex gap-8">
                
                {/* LEFT: Controls Panel */}
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
                                onClick={() => !isAnimating && !isRecording && setStatus('Previewing...')}
                                disabled={isAnimating || isRecording}
                                className={`flex-1 px-4 py-2.5 rounded-xl font-bold text-sm transition-colors ${
                                    isAnimating ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-600 hover:bg-blue-500 text-white disabled:opacity-50'
                                }`}
                            >
                                {isAnimating ? '▶️ Previsualizando...' : '▶️ Previsualizar'}
                            </button>
                            <button
                                onClick={() => !isRecording && !isAnimating && setStatus('Recording...')}
                                disabled={isRecording || isAnimating}
                                className={`flex-1 px-4 py-2.5 rounded-xl font-bold text-sm transition-colors ${
                                    isRecording ? 'bg-red-500/20 text-red-500' : 'bg-red-600 hover:bg-red-500 text-white disabled:opacity-50'
                                }`}
                            >
                                {isRecording ? '🎬 Grabando...' : '🎬 Grabar Video'}
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
                                    className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${
                                        activeTab === 'locked' ? 'bg-[#2a2d36] text-white' : 'text-gray-500 hover:text-gray-300'
                                    }`}
                                >
                                    🔒 Bloqueado
                                </button>
                                <button
                                    onClick={() => {
                                        setActiveTab('unlocked');
                                        setViewMode('chat');
                                    }}
                                    className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${
                                        activeTab === 'unlocked' ? 'bg-[#2a2d36] text-white' : 'text-gray-500 hover:text-gray-300'
                                    }`}
                                >
                                    📱 Desbloqueado
                                </button>
                                <button
                                    onClick={() => setActiveTab('design')}
                                    className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${
                                        activeTab === 'design' ? 'bg-[#2a2d36] text-white' : 'text-gray-500 hover:text-gray-300'
                                    }`}
                                >
                                    🎨 Diseño
                                </button>
                            </div>
                        </div>

                        {/* Content based on active tab */}
                        {activeTab === 'locked' && (
                            <div className="flex flex-col gap-4 mt-4">
                                <div className="bg-[#0a0b0d] p-4 rounded-xl border border-white/5">
                                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-3">Pantalla Bloqueada</h3>
                                    <p className="text-sm text-gray-300">Mostrando vista de lockscreen con notificaciones</p>
                                </div>
                            </div>
                        )}

                        {activeTab === 'unlocked' && (
                            <div className="flex flex-col gap-4 mt-4">
                                <div className="bg-[#0a0b0d] p-4 rounded-xl border border-white/5">
                                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-3">Pantalla Desbloqueada</h3>
                                    <p className="text-sm text-gray-300">Mostrando vista de chat con mensajes</p>
                                </div>
                            </div>
                        )}

                        {activeTab === 'design' && (
                            <div className="flex flex-col gap-4 mt-4">
                                <div className="bg-[#0a0b0d] p-4 rounded-xl border border-white/5">
                                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-3">Diseño</h3>
                                    <div className="space-y-3">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Calidad de Video</label>
                                        <div className="grid grid-cols-3 gap-2">
                                            <button
                                                onClick={() => setQuality('720p')}
                                                className={`p-3 rounded-lg text-center ${
                                                    quality === '720p' ? 'bg-[#2a2d36] text-white' : 'bg-[#0a0b0d] text-gray-500'
                                                }`}
                                            >
                                                720p
                                            </button>
                                            <button
                                                onClick={() => setQuality('1080p')}
                                                className={`p-3 rounded-lg text-center ${
                                                    quality === '1080p' ? 'bg-[#2a2d36] text-white' : 'bg-[#0a0b0d] text-gray-500'
                                                }`}
                                            >
                                                1080p
                                            </button>
                                            <button
                                                onClick={() => setQuality('2k')}
                                                className={`p-3 rounded-lg text-center ${
                                                    quality === '2k' ? 'bg-[#2a2d36] text-white' : 'bg-[#0a0b0d] text-gray-500'
                                                }`}
                                            >
                                                2K
                                            </button>
                                        </div>
                                        
                                        <div className="pt-4 border-t border-white/5">
                                            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-2">Color de Fondo</label>
                                            <div className="flex items-center gap-3">
                                                <input
                                                    type="color"
                                                    value={bgColor}
                                                    onChange={e => setBgColor(e.target.value)}
                                                    className="w-8 h-8 rounded cursor-pointer"
                                                />
                                                <span className="text-sm font-mono">{bgColor}</span>
                                            </div>
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