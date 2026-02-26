'use client';

import React, { useState } from 'react';
import './instagram.css';

type ContentType = 'all' | 'reel' | 'story' | 'carousel';

interface ContentItem {
    id: string;
    title: string;
    type: ContentType;
    format: string;
    path: string;
    thumbnail: string;
}

const InstagramPlatform = () => {
    const [filter, setFilter] = useState<ContentType>('all');

    const contentItems: ContentItem[] = [
        {
            id: '1',
            title: 'Agenda Tu Turno',
            type: 'story',
            format: 'Historia (1080x1920)',
            path: '/barberox/instagram/stories/agenda_turno.png',
            thumbnail: '/barberox/instagram/stories/agenda_turno.png'
        },
        {
            id: '2',
            title: 'Horarios',
            type: 'story',
            format: 'Historia (1080x1920)',
            path: '/barberox/instagram/stories/horarios.png',
            thumbnail: '/barberox/instagram/stories/horarios.png'
        },
        {
            id: '3',
            title: 'Agenda Automática',
            type: 'reel',
            format: 'Reel (1080x1920)',
            path: '/barberox/instagram/reels/agenda_automatica.png',
            thumbnail: '/barberox/instagram/reels/agenda_automatica.png'
        },
        {
            id: '5',
            title: 'Animación Chat Ideal',
            type: 'reel',
            format: 'Reel (Video WebM)',
            path: '/barberox/instagram/reels/chat_ideal.webm?v=final_fix_v3',
            thumbnail: '/barberox/instagram/reels/chat_ideal_thumb.png'
        },
        {
            id: '4',
            title: 'Servicios Premium',
            type: 'carousel',
            format: 'Carrusel (1080x1080)',
            path: '/barberox/instagram/carousels/servicios.png',
            thumbnail: '/barberox/instagram/carousels/servicios.png'
        }
    ];

    const filteredContent = filter === 'all'
        ? contentItems
        : contentItems.filter(item => item.type === filter);

    // Download handler removed in favor of direct anchor tags

    const getTypeLabel = (type: ContentType): string => {
        const labels = {
            reel: 'Reel',
            story: 'Historia',
            carousel: 'Carrusel',
            all: 'Todos'
        };
        return labels[type];
    };

    return (
        <div className="instagram-platform">
            {/* Hero Header */}
            <header className="platform-header">
                <div className="header-content">
                    <div className="header-badge">
                        <div className="badge-dot"></div>
                        <span>Contenido Premium</span>
                    </div>
                    <h1>
                        <span className="header-title">CONTENIDO INSTAGRAM</span>
                        <span className="header-subtitle">BARBEROX</span>
                    </h1>
                    <p className="header-description">
                        Descarga contenido profesional para <b>Reels</b>, <b>Historias</b> y <b>Carruseles</b>.
                        <br />
                        Diseñado para hacer crecer tu barbería en redes sociales.
                    </p>
                </div>
            </header>

            {/* Filter Tabs */}
            <div className="filter-container">
                <div className="filter-tabs">
                    {(['all', 'reel', 'story', 'carousel'] as ContentType[]).map((type) => (
                        <button
                            key={type}
                            onClick={() => setFilter(type)}
                            className={`filter-tab ${filter === type ? 'active' : ''}`}
                        >
                            {getTypeLabel(type)}
                            <span className="tab-count">
                                {type === 'all'
                                    ? contentItems.length
                                    : contentItems.filter(item => item.type === type).length}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Content Grid */}
            <div className="content-section">
                <div className="content-grid">
                    {filteredContent.map((item) => (
                        <div key={item.id} className="content-card">
                            <div className="card-image-container">
                                <img
                                    src={item.thumbnail}
                                    alt={item.title}
                                    className="card-image"
                                />
                                <div className="card-overlay">
                                    <a
                                        href={item.path}
                                        download
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="download-button"
                                        style={{ textDecoration: 'none' }}
                                    >
                                        <svg className="download-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                        </svg>
                                        Descargar
                                    </a>
                                </div>
                                <div className="card-badge">{getTypeLabel(item.type)}</div>
                            </div>
                            <div className="card-content">
                                <h3 className="card-title">{item.title}</h3>
                                <p className="card-format">{item.format}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredContent.length === 0 && (
                    <div className="empty-state">
                        <div className="empty-icon">📱</div>
                        <p className="empty-text">No hay contenido disponible en esta categoría</p>
                    </div>
                )}
            </div>

            {/* Back Button */}
            <div className="back-container">
                <a href="/barberox" className="back-button">
                    <svg className="back-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Volver a Barberox
                </a>
            </div>
        </div>
    );
};

export default InstagramPlatform;
