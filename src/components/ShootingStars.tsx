"use client";

import { useEffect, useRef } from "react";

export function ShootingStars() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animId: number;
        let w = 0, h = 0;

        const resize = () => {
            w = canvas.width = window.innerWidth;
            h = canvas.height = window.innerHeight * 3; // covers scroll height
        };
        resize();
        window.addEventListener("resize", resize);

        // ── Twinkling stars ──
        interface Star {
            x: number; y: number; r: number;
            baseAlpha: number; alpha: number;
            speed: number; phase: number;
        }

        const stars: Star[] = [];
        const STAR_COUNT = 400; // Increased significantly to be visible

        for (let i = 0; i < STAR_COUNT; i++) {
            stars.push({
                x: Math.random() * w,
                y: Math.random() * h,
                r: Math.random() * 0.4 + 0.1, // Very small ("no grandes")
                baseAlpha: Math.random() * 0.5 + 0.5, // Brighter base
                alpha: 0,
                speed: Math.random() * 0.001 + 0.0005,
                phase: Math.random() * Math.PI * 2,
            });
        }

        // ── Shooting stars ──
        interface Meteor {
            x: number; y: number;
            vx: number; vy: number;
            len: number; life: number; maxLife: number;
            alpha: number;
        }

        const meteors: Meteor[] = [];
        let nextMeteor = 2000 + Math.random() * 4000; // More frequent
        let meteorTimer = 0;

        const spawnMeteor = () => {
            const startX = Math.random() * w * 0.8 + w * 0.1;
            const startY = Math.random() * h * 0.3;
            const angle = Math.PI / 4 + Math.random() * 0.3 - 0.15; // ~45 degrees
            const speed = 6 + Math.random() * 4; // Slightly faster
            meteors.push({
                x: startX,
                y: startY,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                len: 40 + Math.random() * 30, // Longer tail
                life: 0,
                maxLife: 40 + Math.random() * 20,
                alpha: 0.8 + Math.random() * 0.2, // Super bright
            });
        };

        let lastTime = performance.now();

        const loop = (now: number) => {
            const dt = now - lastTime;
            lastTime = now;

            ctx.clearRect(0, 0, w, h);

            // Draw twinkling stars
            for (const s of stars) {
                s.phase += s.speed * dt;
                // Alpha oscillates between baseAlpha*0.2 and baseAlpha, creating a blinking effect
                s.alpha = s.baseAlpha * (0.2 + 0.8 * ((Math.sin(s.phase) + 1) / 2));

                ctx.beginPath();
                ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${s.alpha})`;
                ctx.fill();
            }

            // Spawn shooting stars
            meteorTimer += dt;
            if (meteorTimer >= nextMeteor) {
                spawnMeteor();
                meteorTimer = 0;
                nextMeteor = 2000 + Math.random() * 5000;
            }

            // Draw shooting stars
            for (let i = meteors.length - 1; i >= 0; i--) {
                const m = meteors[i];
                m.x += m.vx;
                m.y += m.vy;
                m.life++;

                const progress = m.life / m.maxLife;
                const fadeAlpha = m.alpha * (progress < 0.3 ? progress / 0.3 : 1 - ((progress - 0.3) / 0.7));

                // Tail gradient - pure white to transparent for a sharper "needle" look
                const gradient = ctx.createLinearGradient(
                    m.x, m.y,
                    m.x - m.vx / Math.sqrt(m.vx * m.vx + m.vy * m.vy) * m.len,
                    m.y - m.vy / Math.sqrt(m.vx * m.vx + m.vy * m.vy) * m.len
                );
                gradient.addColorStop(0, `rgba(255, 255, 255, ${fadeAlpha})`);
                gradient.addColorStop(0.2, `rgba(255, 255, 255, ${fadeAlpha * 0.5})`);
                gradient.addColorStop(1, `rgba(255, 255, 255, 0)`);

                ctx.beginPath();
                ctx.moveTo(m.x, m.y);
                const tailLen = m.len * Math.min(progress * 3, 1);
                const nx = m.vx / Math.sqrt(m.vx * m.vx + m.vy * m.vy);
                const ny = m.vy / Math.sqrt(m.vx * m.vx + m.vy * m.vy);
                ctx.lineTo(m.x - nx * tailLen, m.y - ny * tailLen);
                ctx.strokeStyle = gradient;
                ctx.lineWidth = 0.5; // Very thin, like a needle
                ctx.stroke();

                // Tiny head glow
                ctx.beginPath();
                ctx.arc(m.x, m.y, 0.6, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${fadeAlpha})`;
                ctx.fill();

                if (m.life >= m.maxLife) meteors.splice(i, 1);
            }

            animId = requestAnimationFrame(loop);
        };

        animId = requestAnimationFrame(loop);

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener("resize", resize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-[101]"
            style={{ opacity: 1 }}
        />
    );
}
