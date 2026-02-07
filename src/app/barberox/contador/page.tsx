'use client';

import React, { useEffect, useState } from 'react';
import './dashboard.css';

interface AnalyticsEvent {
    id: string;
    timestamp: string;
    type: 'page_view' | 'cta_click' | 'pricing_navigation' | 'section_view';
    metadata?: {
        source?: string;
    };
}

interface AnalyticsSummary {
    totalEvents: number;
    pageViews: number;
    ctaClicks: number;
    pricingNavigations: number;
    ctaClicksBySource: Record<string, number>;
    pricingNavigationsBySource: Record<string, number>;
    sectionViewsBySource: Record<string, number>;
}

const ContadorPage = () => {
    const [events, setEvents] = useState<AnalyticsEvent[]>([]);
    const [summary, setSummary] = useState<AnalyticsSummary | null>(null);
    const [loading, setLoading] = useState(true);

    // Simple filter: 'today', 'month', 'all'
    const [activeFilter, setActiveFilter] = useState<'today' | 'month' | 'all'>('today');

    const fetchAnalytics = async (filter: 'today' | 'month' | 'all' = activeFilter, isSilent: boolean = false) => {
        if (!isSilent) setLoading(true);
        try {
            const params = new URLSearchParams();
            const now = new Date();

            if (filter === 'today') {
                // Today: from 00:00 to 23:59 UTC
                const dateStr = now.toISOString().split('T')[0];
                params.append('fromDate', dateStr);
                params.append('toDate', dateStr);
            } else if (filter === 'month') {
                // This month: from 1st day UTC
                const dateStr = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-01`;
                params.append('fromDate', dateStr);
            }

            const response = await fetch(`/api/barberox-analytics?${params.toString()}`);
            const data = await response.json();

            setEvents(data.events || []);
            setSummary(data.summary || null);
            setActiveFilter(filter);
        } catch (error) {
            console.error('Error fetching analytics:', error);
        } finally {
            if (!isSilent) setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!window.confirm('¿Estás seguro de que quieres borrar todos los registros? Esta acción no se puede deshacer.')) {
            return;
        }

        try {
            const response = await fetch('/api/barberox-analytics', { method: 'DELETE' });
            if (response.ok) {
                // Refresh data after deletion
                fetchAnalytics(activeFilter, false);
            } else {
                alert('Error al borrar los registros');
            }
        } catch (error) {
            console.error('Error deleting analytics:', error);
            alert('Error al conectar con el servidor');
        }
    };

    useEffect(() => {
        // Initial fetch (only on mount)
        fetchAnalytics('today', false);
    }, []);

    useEffect(() => {
        // Auto-refresh interval for the currently active filter
        const interval = setInterval(() => {
            fetchAnalytics(activeFilter, true);
        }, 5000);

        return () => clearInterval(interval);
    }, [activeFilter]);

    return (
        <div className="contador-root font-outfit min-h-screen bg-black text-white">
            {/* Header */}
            <header className="border-b border-white/10 bg-black/80 backdrop-blur-xl sticky top-0 z-50">
                <div className="container mx-auto px-6 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <img src="/barberox/img/logo.png" alt="Barberox" className="h-8 w-auto brightness-200" />
                            <div>
                                <h1 className="text-2xl font-black tracking-tight">Analytics Dashboard</h1>
                                <p className="text-sm text-white/40">Contador de eventos /barberox</p>
                            </div>
                        </div>
                        <a href="/barberox" className="text-sm text-primary hover:text-primary/80 transition-colors font-bold">
                            ← Volver a Barberox
                        </a>
                    </div>
                </div>
            </header>

            <div className="container mx-auto px-6 py-12">
                {/* Simple Filters Section */}
                <div className="glass-card p-6 mb-8">
                    <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                        </svg>
                        Período
                    </h2>

                    <div className="flex gap-3 flex-wrap">
                        <button
                            onClick={() => fetchAnalytics('today')}
                            className={`filter-preset-btn ${activeFilter === 'today' ? 'active' : ''}`}
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                            HOY
                        </button>

                        <button
                            onClick={() => fetchAnalytics('month')}
                            className={`filter-preset-btn ${activeFilter === 'month' ? 'active' : ''}`}
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            ESTE MES
                        </button>

                        <button
                            onClick={() => fetchAnalytics('all')}
                            className={`filter-preset-btn ${activeFilter === 'all' ? 'active' : ''}`}
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            HISTÓRICO
                        </button>

                        <button onClick={() => fetchAnalytics(activeFilter)} className="btn-secondary ml-auto">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            Actualizar
                        </button>

                        <button onClick={handleDelete} className="btn-delete">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            Borrar Registros
                        </button>
                    </div>
                </div>

                {/* Summary Cards */}
                {loading ? (
                    <div className="text-center py-20">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
                        <p className="mt-4 text-white/50">Cargando analytics...</p>
                    </div>
                ) : summary ? (
                    <>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                            {/* Page Views */}
                            <div className="metric-card">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-sm font-bold text-white/60 uppercase tracking-wider">Visitas a la Página</h3>
                                    <div className="metric-icon bg-blue-500/10">
                                        <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="text-4xl font-black text-white mb-2">{summary.pageViews}</div>
                                <p className="text-xs text-white/40">Personas que entraron a /barberox</p>
                            </div>

                            {/* Pricing Navigation */}
                            <div className="metric-card">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-sm font-bold text-white/60 uppercase tracking-wider">Navegación a Pricing</h3>
                                    <div className="metric-icon bg-green-500/10">
                                        <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="text-4xl font-black text-white mb-2">{summary.pricingNavigations}</div>
                                <p className="text-xs text-white/40">Usuarios que llegaron a #pricing</p>
                            </div>

                            {/* CTA Clicks */}
                            <div className="metric-card">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-sm font-bold text-white/60 uppercase tracking-wider">Clicks en CTA</h3>
                                    <div className="metric-icon bg-primary/10">
                                        <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="text-4xl font-black text-white mb-2">{summary.ctaClicks}</div>
                                <p className="text-xs text-white/40">Botones que llevan a #pricing</p>
                            </div>
                        </div>

                        {/* Drop-off Analysis / Funnel */}
                        <div className="glass-card p-8 mb-8">
                            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                                <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                                Embudo de Conversión (Drop-off)
                            </h3>
                            <div className="space-y-6">
                                {[
                                    { id: 'hero', source: 'hero', label: '1. Inicio (Hero)' },
                                    { id: 'hard-truth', source: 'hard-truth', label: '2. Problema (Hard Truth)' },
                                    { id: 'anti-app', source: null, label: '3. Diferenciación (Anti-App)' },
                                    { id: 'features', source: 'solution', label: '4. Solución (IA Chat)' },
                                    { id: 'reminders-section', source: 'reminders', label: '5. Recordatorios' },
                                    { id: 'bonus-panel-section', source: 'bonus-panel', label: '6. Bonus: Panel Web' },
                                    { id: 'assistant-section', source: 'bonus-assistant', label: '7. Bonus: Asistente IA' },
                                    { id: 'pricing', source: null, label: '8. Precios (Llegada)' },
                                ].map((section) => {
                                    const viewCount = summary.sectionViewsBySource?.[section.id] || 0;
                                    const clickCount = section.source ? (summary.pricingNavigationsBySource?.[section.source] || 0) : 0;

                                    const viewPercentage = summary.pageViews > 0
                                        ? Math.round((viewCount / summary.pageViews) * 100)
                                        : 0;

                                    const conversionRate = viewCount > 0
                                        ? Math.round((clickCount / viewCount) * 100)
                                        : 0;

                                    return (
                                        <div key={section.id} className="relative group">
                                            <div className="flex justify-between items-end mb-2">
                                                <div>
                                                    <span className="text-sm font-bold text-white/70 block">{section.label}</span>
                                                    <div className="flex gap-4 mt-1">
                                                        <span className="text-[10px] text-white/40 uppercase tracking-tighter">Vistas: <b className="text-white/80">{viewCount}</b></span>
                                                        {section.source && (
                                                            <span className="text-[10px] text-primary/60 uppercase tracking-tighter">Clicks: <b className="text-primary">{clickCount}</b></span>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <span className="text-xs font-black text-white bg-white/10 px-2 py-1 rounded inline-block mb-1">
                                                        {viewPercentage}% alcance
                                                    </span>
                                                    {section.source && viewCount > 0 && (
                                                        <div className="text-[10px] font-bold text-primary animate-pulse">
                                                            CTR: {conversionRate}%
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="w-full bg-white/5 rounded-full h-3 overflow-hidden border border-white/5 relative">
                                                {/* View Bar */}
                                                <div
                                                    className="bg-white/10 h-full absolute left-0 top-0 transition-all duration-1000 ease-out"
                                                    style={{ width: `${viewPercentage}%` }}
                                                ></div>
                                                {/* Click/Conversion indicator within the view bar if applicable */}
                                                {section.source && (
                                                    <div
                                                        className="bg-primary h-full absolute left-0 top-0 transition-all duration-1000 ease-out shadow-[0_0_15px_rgba(255,119,0,0.3)]"
                                                        style={{ width: `${(clickCount / summary.pageViews) * 100}%` }}
                                                    ></div>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="mt-8 p-4 bg-primary/5 border border-primary/10 rounded-2xl">
                                <p className="text-xs text-white/60 leading-relaxed">
                                    <b className="text-primary text-sm block mb-1">💡 Cómo leer esto:</b>
                                    Muestra qué porcentaje de los visitantes totales llegaron hasta cada sección. Un salto grande entre dos niveles indica que el contenido de esa sección podría estar causando que los usuarios se vayan.
                                </p>
                            </div>
                        </div>

                        {/* Breakdown by Source */}
                        <div className="grid md:grid-cols-2 gap-6 mb-8">
                            {/* CTA Clicks by Source */}
                            <div className="glass-card p-6">
                                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                                    <span className="text-primary">●</span>
                                    Clicks CTA por Sección
                                </h3>
                                {Object.keys(summary.ctaClicksBySource).length > 0 ? (
                                    <div className="space-y-3">
                                        {Object.entries(summary.ctaClicksBySource).map(([source, count]) => (
                                            <div key={source} className="flex items-center justify-between">
                                                <span className="text-sm text-white/70 capitalize">{source.replace('-', ' ')}</span>
                                                <span className="text-lg font-bold text-primary">{count}</span>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-white/40 text-sm">No hay datos disponibles</p>
                                )}
                            </div>

                            {/* Pricing Navigation by Source */}
                            <div className="glass-card p-6">
                                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                                    <span className="text-green-500">●</span>
                                    Navegación Pricing por Fuente
                                </h3>
                                {Object.keys(summary.pricingNavigationsBySource).length > 0 ? (
                                    <div className="space-y-3">
                                        {Object.entries(summary.pricingNavigationsBySource).map(([source, count]) => (
                                            <div key={source} className="flex items-center justify-between">
                                                <span className="text-sm text-white/70 capitalize">{source.replace('-', ' ')}</span>
                                                <span className="text-lg font-bold text-green-500">{count}</span>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-white/40 text-sm">No hay datos disponibles</p>
                                )}
                            </div>
                        </div>

                        {/* Recent Events Table */}
                        <div className="glass-card p-6">
                            <h3 className="text-lg font-bold mb-4">Eventos Recientes ({events.length})</h3>
                            {events.length > 0 ? (
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="border-b border-white/10">
                                                <th className="text-left py-3 px-4 text-xs font-bold text-white/60 uppercase tracking-wider">Fecha/Hora</th>
                                                <th className="text-left py-3 px-4 text-xs font-bold text-white/60 uppercase tracking-wider">Tipo</th>
                                                <th className="text-left py-3 px-4 text-xs font-bold text-white/60 uppercase tracking-wider">Fuente</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {events.slice(0, 50).map((event) => (
                                                <tr key={event.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                                    <td className="py-3 px-4 text-sm text-white/80">
                                                        {new Date(event.timestamp).toLocaleString('es-UY')}
                                                    </td>
                                                    <td className="py-3 px-4">
                                                        <span className={`event-badge ${event.type === 'page_view' ? 'badge-blue' :
                                                            event.type === 'cta_click' ? 'badge-orange' :
                                                                'badge-green'
                                                            }`}>
                                                            {event.type === 'page_view' ? 'Visita' :
                                                                event.type === 'cta_click' ? 'CTA Click' :
                                                                    'Pricing Nav'}
                                                        </span>
                                                    </td>
                                                    <td className="py-3 px-4 text-sm text-white/60 capitalize">
                                                        {event.metadata?.source?.replace('-', ' ') || '—'}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <p className="text-white/40 text-center py-8">No hay eventos para mostrar</p>
                            )}
                        </div>
                    </>
                ) : (
                    <div className="text-center py-20">
                        <p className="text-white/50">No se pudieron cargar los datos</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ContadorPage;
