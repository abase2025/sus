// PDF Viewer Enhanced for Mobile
class MobilePDFViewer {
    constructor() {
        this.currentPDF = null;
        this.currentPage = 1;
        this.totalPages = 1;
        this.scale = 1;
        this.minScale = 0.5;
        this.maxScale = 3;
        this.isLoading = false;
        this.touchStartX = 0;
        this.touchStartY = 0;
        this.touchStartScale = 1;
        this.touchStartDistance = 0;
        
        this.initViewer();
    }

    initViewer() {
        this.createViewerHTML();
        this.bindEvents();
        this.setupTouchGestures();
    }

    createViewerHTML() {
        // Enhanced PDF modal with mobile controls
        const existingModal = document.getElementById('pdfModal');
        if (existingModal) {
            existingModal.remove();
        }

        const modalHTML = `
            <div id="pdfModal" class="pdf-modal">
                <div class="pdf-container">
                    <div class="pdf-header">
                        <div class="pdf-title-section">
                            <h3 id="pdfTitle" class="pdf-title">Documento PDF</h3>
                            <div class="pdf-page-info">
                                <span id="currentPageDisplay">1</span> / <span id="totalPagesDisplay">1</span>
                            </div>
                        </div>
                        <div class="pdf-controls">
                            <button id="pdfBack" class="pdf-btn pdf-btn-primary">
                                <i class="fas fa-arrow-left"></i>
                                <span class="btn-text">Voltar</span>
                            </button>
                            <button id="pdfDownload" class="pdf-btn pdf-btn-secondary">
                                <i class="fas fa-download"></i>
                                <span class="btn-text">Download</span>
                            </button>
                            <button id="pdfClose" class="pdf-btn pdf-btn-danger">
                                <i class="fas fa-times"></i>
                                <span class="btn-text">Fechar</span>
                            </button>
                        </div>
                    </div>
                    
                    <div class="pdf-navigation">
                        <button id="prevPage" class="nav-btn" disabled>
                            <i class="fas fa-chevron-left"></i>
                            <span>Anterior</span>
                        </button>
                        <div class="page-controls">
                            <input type="number" id="pageInput" min="1" value="1" class="page-input">
                            <button id="goToPage" class="go-btn">Ir</button>
                        </div>
                        <button id="nextPage" class="nav-btn">
                            <span>Próxima</span>
                            <i class="fas fa-chevron-right"></i>
                        </button>
                    </div>
                    
                    <div class="pdf-zoom-controls">
                        <button id="zoomOut" class="zoom-btn">
                            <i class="fas fa-search-minus"></i>
                        </button>
                        <span id="zoomLevel" class="zoom-display">100%</span>
                        <button id="zoomIn" class="zoom-btn">
                            <i class="fas fa-search-plus"></i>
                        </button>
                        <button id="fitWidth" class="zoom-btn">
                            <i class="fas fa-arrows-alt-h"></i>
                        </button>
                        <button id="fitPage" class="zoom-btn">
                            <i class="fas fa-expand-arrows-alt"></i>
                        </button>
                    </div>
                    
                    <div class="pdf-viewer-container">
                        <div id="loadingSpinner" class="loading-spinner-container">
                            <div class="loading-spinner"></div>
                            <p>Carregando PDF...</p>
                        </div>
                        <div class="pdf-viewer" id="pdfViewer">
                            <iframe id="pdfFrame" src="" width="100%" height="100%"></iframe>
                        </div>
                    </div>
                    
                    <div class="pdf-mobile-controls">
                        <div class="mobile-control-item">
                            <i class="fas fa-hand-paper"></i>
                            <span>Arraste para navegar</span>
                        </div>
                        <div class="mobile-control-item">
                            <i class="fas fa-search-plus"></i>
                            <span>Pinça para zoom</span>
                        </div>
                        <div class="mobile-control-item">
                            <i class="fas fa-swatchbook"></i>
                            <span>Toque duplo para ajustar</span>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHTML);
        this.addMobileStyles();
    }

    addMobileStyles() {
        const style = document.createElement('style');
        style.textContent = `
            /* Enhanced PDF Modal Styles */
            .pdf-modal {
                display: none;
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.95);
                z-index: 2000;
                overflow: hidden;
            }

            .pdf-container {
                width: 100%;
                height: 100%;
                display: flex;
                flex-direction: column;
                background: #1a1a2e;
            }

            .pdf-header {
                background: rgba(26, 26, 46, 0.98);
                padding: 1rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
                border-bottom: 1px solid rgba(0, 212, 255, 0.2);
                backdrop-filter: blur(10px);
            }

            .pdf-title-section {
                display: flex;
                flex-direction: column;
                gap: 0.5rem;
            }

            .pdf-title {
                color: #ffffff;
                font-size: 1.1rem;
                font-weight: 600;
                margin: 0;
            }

            .pdf-page-info {
                color: #00d4ff;
                font-size: 0.9rem;
                font-weight: 500;
            }

            .pdf-controls {
                display: flex;
                gap: 0.5rem;
            }

            .pdf-btn {
                background: rgba(0, 212, 255, 0.2);
                border: 1px solid #00d4ff;
                color: #00d4ff;
                padding: 8px 12px;
                border-radius: 8px;
                cursor: pointer;
                transition: all 0.3s ease;
                display: flex;
                align-items: center;
                gap: 6px;
                font-size: 0.9rem;
            }

            .pdf-btn:hover {
                background: #00d4ff;
                color: #0a0a0a;
                transform: translateY(-1px);
            }

            .pdf-btn-primary {
                background: rgba(0, 212, 255, 0.3);
            }

            .pdf-btn-secondary {
                background: rgba(156, 39, 176, 0.3);
                border-color: #9c27b0;
                color: #9c27b0;
            }

            .pdf-btn-secondary:hover {
                background: #9c27b0;
                color: #ffffff;
            }

            .pdf-btn-danger {
                background: rgba(244, 67, 54, 0.3);
                border-color: #f44336;
                color: #f44336;
            }

            .pdf-btn-danger:hover {
                background: #f44336;
                color: #ffffff;
            }

            .pdf-navigation {
                background: rgba(26, 26, 46, 0.95);
                padding: 0.8rem 1rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
                border-bottom: 1px solid rgba(0, 212, 255, 0.1);
            }

            .nav-btn {
                background: rgba(0, 212, 255, 0.2);
                border: 1px solid rgba(0, 212, 255, 0.5);
                color: #00d4ff;
                padding: 8px 16px;
                border-radius: 6px;
                cursor: pointer;
                transition: all 0.3s ease;
                display: flex;
                align-items: center;
                gap: 8px;
                font-size: 0.9rem;
            }

            .nav-btn:hover:not(:disabled) {
                background: rgba(0, 212, 255, 0.3);
                transform: translateY(-1px);
            }

            .nav-btn:disabled {
                opacity: 0.5;
                cursor: not-allowed;
            }

            .page-controls {
                display: flex;
                align-items: center;
                gap: 8px;
            }

            .page-input {
                width: 60px;
                padding: 6px 8px;
                background: rgba(255, 255, 255, 0.1);
                border: 1px solid rgba(0, 212, 255, 0.3);
                border-radius: 4px;
                color: #ffffff;
                text-align: center;
                font-size: 0.9rem;
            }

            .go-btn {
                background: rgba(0, 212, 255, 0.3);
                border: 1px solid #00d4ff;
                color: #00d4ff;
                padding: 6px 12px;
                border-radius: 4px;
                cursor: pointer;
                font-size: 0.9rem;
                transition: all 0.3s ease;
            }

            .go-btn:hover {
                background: #00d4ff;
                color: #0a0a0a;
            }

            .pdf-zoom-controls {
                background: rgba(26, 26, 46, 0.95);
                padding: 0.8rem 1rem;
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 1rem;
                border-bottom: 1px solid rgba(0, 212, 255, 0.1);
            }

            .zoom-btn {
                background: rgba(0, 212, 255, 0.2);
                border: 1px solid rgba(0, 212, 255, 0.5);
                color: #00d4ff;
                padding: 8px;
                border-radius: 6px;
                cursor: pointer;
                transition: all 0.3s ease;
                display: flex;
                align-items: center;
                justify-content: center;
                width: 36px;
                height: 36px;
            }

            .zoom-btn:hover {
                background: rgba(0, 212, 255, 0.3);
                transform: scale(1.05);
            }

            .zoom-display {
                color: #ffffff;
                font-weight: 600;
                min-width: 50px;
                text-align: center;
                font-size: 0.9rem;
            }

            .pdf-viewer-container {
                flex: 1;
                position: relative;
                background: #ffffff;
                overflow: hidden;
            }

            .loading-spinner-container {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                text-align: center;
                color: #00d4ff;
                z-index: 10;
            }

            .loading-spinner {
                width: 40px;
                height: 40px;
                border: 4px solid rgba(0, 212, 255, 0.3);
                border-top: 4px solid #00d4ff;
                border-radius: 50%;
                animation: spin 1s linear infinite;
                margin: 0 auto 1rem;
            }

            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }

            .pdf-viewer {
                width: 100%;
                height: 100%;
                position: relative;
                overflow: auto;
                -webkit-overflow-scrolling: touch;
            }

            .pdf-viewer iframe {
                border: none;
                width: 100%;
                height: 100%;
                transform-origin: top left;
                transition: transform 0.3s ease;
            }

            .pdf-mobile-controls {
                background: rgba(26, 26, 46, 0.95);
                padding: 0.8rem 1rem;
                display: flex;
                justify-content: space-around;
                border-top: 1px solid rgba(0, 212, 255, 0.1);
            }

            .mobile-control-item {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 4px;
                color: #a0a0a0;
                font-size: 0.8rem;
            }

            .mobile-control-item i {
                color: #00d4ff;
                font-size: 1.2rem;
            }

            /* Mobile Responsive */
            @media (max-width: 768px) {
                .pdf-header {
                    padding: 0.8rem;
                    flex-direction: column;
                    gap: 1rem;
                    align-items: stretch;
                }

                .pdf-controls {
                    justify-content: space-between;
                    gap: 0.5rem;
                }

                .pdf-btn {
                    flex: 1;
                    justify-content: center;
                    padding: 10px 8px;
                    font-size: 0.8rem;
                }

                .pdf-navigation {
                    padding: 0.6rem 0.8rem;
                    flex-wrap: wrap;
                    gap: 0.5rem;
                }

                .nav-btn {
                    flex: 1;
                    justify-content: center;
                    min-width: 80px;
                }

                .page-controls {
                    order: 3;
                    width: 100%;
                    justify-content: center;
                    margin-top: 0.5rem;
                }

                .pdf-zoom-controls {
                    padding: 0.6rem 0.8rem;
                    flex-wrap: wrap;
                    gap: 0.8rem;
                }

                .zoom-btn {
                    width: 32px;
                    height: 32px;
                }

                .pdf-mobile-controls {
                    padding: 0.6rem 0.8rem;
                }

                .mobile-control-item {
                    font-size: 0.7rem;
                }

                .mobile-control-item i {
                    font-size: 1rem;
                }
            }

            @media (max-width: 480px) {
                .pdf-header {
                    padding: 0.6rem;
                }

                .pdf-title {
                    font-size: 1rem;
                }

                .pdf-btn .btn-text {
                    display: none;
                }

                .pdf-btn {
                    padding: 8px;
                    min-width: 40px;
                }

                .nav-btn span {
                    display: none;
                }

                .nav-btn {
                    min-width: 40px;
                    padding: 8px;
                }

                .pdf-zoom-controls {
                    gap: 0.5rem;
                }

                .zoom-display {
                    font-size: 0.8rem;
                    min-width: 40px;
                }
            }

            /* Touch-friendly improvements */
            @media (hover: none) and (pointer: coarse) {
                .pdf-btn,
                .nav-btn,
                .zoom-btn,
                .go-btn {
                    min-height: 44px;
                    min-width: 44px;
                }

                .pdf-btn:active,
                .nav-btn:active,
                .zoom-btn:active {
                    transform: scale(0.95);
                }
            }
        `;
        document.head.appendChild(style);
    }

    bindEvents() {
        const modal = document.getElementById('pdfModal');
        const backBtn = document.getElementById('pdfBack');
        const downloadBtn = document.getElementById('pdfDownload');
        const closeBtn = document.getElementById('pdfClose');
        const prevBtn = document.getElementById('prevPage');
        const nextBtn = document.getElementById('nextPage');
        const pageInput = document.getElementById('pageInput');
        const goBtn = document.getElementById('goToPage');
        const zoomInBtn = document.getElementById('zoomIn');
        const zoomOutBtn = document.getElementById('zoomOut');
        const fitWidthBtn = document.getElementById('fitWidth');
        const fitPageBtn = document.getElementById('fitPage');

        // Close events
        backBtn?.addEventListener('click', () => this.closePDF());
        closeBtn?.addEventListener('click', () => this.closePDF());
        
        // Download event
        downloadBtn?.addEventListener('click', () => this.downloadPDF());

        // Navigation events
        prevBtn?.addEventListener('click', () => this.previousPage());
        nextBtn?.addEventListener('click', () => this.nextPage());
        goBtn?.addEventListener('click', () => this.goToPage());
        pageInput?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.goToPage();
        });

        // Zoom events
        zoomInBtn?.addEventListener('click', () => this.zoomIn());
        zoomOutBtn?.addEventListener('click', () => this.zoomOut());
        fitWidthBtn?.addEventListener('click', () => this.fitWidth());
        fitPageBtn?.addEventListener('click', () => this.fitPage());

        // Close on background click
        modal?.addEventListener('click', (e) => {
            if (e.target === modal) this.closePDF();
        });

        // ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal?.style.display === 'flex') {
                this.closePDF();
            }
        });
    }

    setupTouchGestures() {
        const viewer = document.getElementById('pdfViewer');
        const iframe = document.getElementById('pdfFrame');
        
        if (!viewer || !iframe) return;

        let isZooming = false;
        let isPanning = false;
        let lastTouchTime = 0;

        // Touch start
        viewer.addEventListener('touchstart', (e) => {
            if (e.touches.length === 2) {
                // Pinch zoom start
                isZooming = true;
                this.touchStartDistance = this.getTouchDistance(e.touches);
                this.touchStartScale = this.scale;
            } else if (e.touches.length === 1) {
                // Pan start or double tap detection
                const currentTime = new Date().getTime();
                const tapLength = currentTime - lastTouchTime;
                
                if (tapLength < 500 && tapLength > 0) {
                    // Double tap - fit to width
                    this.fitWidth();
                    e.preventDefault();
                } else {
                    // Single tap - prepare for pan
                    isPanning = true;
                    this.touchStartX = e.touches[0].clientX;
                    this.touchStartY = e.touches[0].clientY;
                }
                
                lastTouchTime = currentTime;
            }
        }, { passive: false });

        // Touch move
        viewer.addEventListener('touchmove', (e) => {
            if (isZooming && e.touches.length === 2) {
                // Pinch zoom
                const currentDistance = this.getTouchDistance(e.touches);
                const scaleChange = currentDistance / this.touchStartDistance;
                const newScale = Math.max(this.minScale, Math.min(this.maxScale, this.touchStartScale * scaleChange));
                
                this.setZoom(newScale);
                e.preventDefault();
            } else if (isPanning && e.touches.length === 1) {
                // Pan
                const deltaX = e.touches[0].clientX - this.touchStartX;
                const deltaY = e.touches[0].clientY - this.touchStartY;
                
                viewer.scrollLeft -= deltaX;
                viewer.scrollTop -= deltaY;
                
                this.touchStartX = e.touches[0].clientX;
                this.touchStartY = e.touches[0].clientY;
                e.preventDefault();
            }
        }, { passive: false });

        // Touch end
        viewer.addEventListener('touchend', (e) => {
            isZooming = false;
            isPanning = false;
        });
    }

    getTouchDistance(touches) {
        const dx = touches[0].clientX - touches[1].clientX;
        const dy = touches[0].clientY - touches[1].clientY;
        return Math.sqrt(dx * dx + dy * dy);
    }

    openPDF(pdfUrl, title) {
        const modal = document.getElementById('pdfModal');
        const iframe = document.getElementById('pdfFrame');
        const titleElement = document.getElementById('pdfTitle');
        const spinner = document.getElementById('loadingSpinner');

        this.currentPDF = pdfUrl;
        titleElement.textContent = title;
        
        // Show modal and loading
        modal.style.display = 'flex';
        spinner.style.display = 'block';
        document.body.style.overflow = 'hidden';

        // Load PDF
        iframe.src = pdfUrl;
        
        iframe.onload = () => {
            spinner.style.display = 'none';
            this.resetZoom();
            this.updatePageInfo();
        };

        iframe.onerror = () => {
            spinner.style.display = 'none';
            this.showError('Erro ao carregar o PDF');
        };
    }

    closePDF() {
        const modal = document.getElementById('pdfModal');
        const iframe = document.getElementById('pdfFrame');
        
        modal.style.display = 'none';
        iframe.src = '';
        document.body.style.overflow = 'auto';
        
        this.currentPDF = null;
        this.resetZoom();
    }

    downloadPDF() {
        if (this.currentPDF) {
            const link = document.createElement('a');
            link.href = this.currentPDF;
            link.download = this.currentPDF.split('/').pop();
            link.click();
        }
    }

    previousPage() {
        if (this.currentPage > 1) {
            this.currentPage--;
            this.updatePageInfo();
        }
    }

    nextPage() {
        if (this.currentPage < this.totalPages) {
            this.currentPage++;
            this.updatePageInfo();
        }
    }

    goToPage() {
        const pageInput = document.getElementById('pageInput');
        const page = parseInt(pageInput.value);
        
        if (page >= 1 && page <= this.totalPages) {
            this.currentPage = page;
            this.updatePageInfo();
        } else {
            pageInput.value = this.currentPage;
        }
    }

    updatePageInfo() {
        const currentPageDisplay = document.getElementById('currentPageDisplay');
        const totalPagesDisplay = document.getElementById('totalPagesDisplay');
        const pageInput = document.getElementById('pageInput');
        const prevBtn = document.getElementById('prevPage');
        const nextBtn = document.getElementById('nextPage');

        currentPageDisplay.textContent = this.currentPage;
        totalPagesDisplay.textContent = this.totalPages;
        pageInput.value = this.currentPage;
        pageInput.max = this.totalPages;

        prevBtn.disabled = this.currentPage <= 1;
        nextBtn.disabled = this.currentPage >= this.totalPages;
    }

    zoomIn() {
        const newScale = Math.min(this.maxScale, this.scale * 1.2);
        this.setZoom(newScale);
    }

    zoomOut() {
        const newScale = Math.max(this.minScale, this.scale / 1.2);
        this.setZoom(newScale);
    }

    setZoom(scale) {
        this.scale = scale;
        const iframe = document.getElementById('pdfFrame');
        const zoomDisplay = document.getElementById('zoomLevel');
        
        iframe.style.transform = `scale(${scale})`;
        iframe.style.width = `${100 / scale}%`;
        iframe.style.height = `${100 / scale}%`;
        
        zoomDisplay.textContent = `${Math.round(scale * 100)}%`;
    }

    fitWidth() {
        const viewer = document.getElementById('pdfViewer');
        const iframe = document.getElementById('pdfFrame');
        
        // Calculate scale to fit width
        const viewerWidth = viewer.clientWidth;
        const iframeWidth = iframe.offsetWidth;
        const scale = viewerWidth / iframeWidth;
        
        this.setZoom(Math.max(this.minScale, Math.min(this.maxScale, scale)));
    }

    fitPage() {
        this.setZoom(1);
    }

    resetZoom() {
        this.scale = 1;
        this.currentPage = 1;
        this.setZoom(1);
        this.updatePageInfo();
    }

    showError(message) {
        const viewer = document.getElementById('pdfViewer');
        viewer.innerHTML = `
            <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; color: #f44336; text-align: center; padding: 2rem;">
                <i class="fas fa-exclamation-triangle" style="font-size: 3rem; margin-bottom: 1rem;"></i>
                <h3>Erro ao carregar PDF</h3>
                <p>${message}</p>
                <button onclick="location.reload()" style="margin-top: 1rem; padding: 8px 16px; background: #f44336; color: white; border: none; border-radius: 4px; cursor: pointer;">
                    Tentar Novamente
                </button>
            </div>
        `;
    }
}

// Initialize PDF Viewer
document.addEventListener('DOMContentLoaded', () => {
    const pdfViewer = new MobilePDFViewer();
    
    // Make openPDF function global
    window.openPDF = (pdfUrl, title) => {
        pdfViewer.openPDF(pdfUrl, title);
    };
});

// Service Worker for offline PDF caching
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/pdf-sw.js').then(registration => {
        console.log('PDF Service Worker registered');
    }).catch(error => {
        console.log('PDF Service Worker registration failed');
    });
}

