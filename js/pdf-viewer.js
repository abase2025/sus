// PDF Viewer Enhanced for Mobile with Reference Design
class PDFViewer {
    constructor() {
        this.currentPDF = '';
        this.currentPage = 1;
        this.totalPages = 1;
        this.scale = 1.0;
        this.pdfList = [
            'assets/legislacao-sus-odontologia.pdf',
            'assets/diretrizes-sus-odontologia.pdf', 
            'assets/protocolos-sus-odontologia.pdf',
            'assets/epidemiologia-saude-bucal.pdf',
            'assets/prevencao-saude-bucal.pdf',
            'assets/promocao-saude-bucal.pdf',
            'assets/organizacao-servicos-saude-bucal.pdf',
            'assets/planejamento-saude-bucal.pdf',
            'assets/avaliacao-saude-bucal.pdf'
        ];
        this.currentIndex = 0;
        this.init();
    }

    init() {
        this.createViewer();
        this.setupEventListeners();
    }

    createViewer() {
        const viewer = document.createElement('div');
        viewer.id = 'pdf-viewer';
        viewer.className = 'pdf-viewer';
        viewer.innerHTML = `
            <!-- Botões Principais (Topo) -->
            <div class="pdf-controls-top">
                <button class="pdf-btn pdf-btn-home" onclick="pdfViewer.goHome()">
                    <i class="fas fa-home"></i>
                    Início
                </button>
                <button class="pdf-btn pdf-btn-prev" onclick="pdfViewer.previousPDF()">
                    <i class="fas fa-chevron-left"></i>
                    Anterior
                </button>
                <button class="pdf-btn pdf-btn-next" onclick="pdfViewer.nextPDF()">
                    <i class="fas fa-chevron-right"></i>
                    Próximo
                </button>
                <button class="pdf-btn pdf-btn-download" onclick="pdfViewer.downloadPDF()">
                    <i class="fas fa-download"></i>
                    Download
                </button>
                <button class="pdf-btn pdf-btn-close" onclick="pdfViewer.close()">
                    <i class="fas fa-times"></i>
                    Fechar
                </button>
            </div>

            <!-- Título do PDF -->
            <div class="pdf-title">
                <h2 id="pdf-title-text">Carregando PDF...</h2>
            </div>

            <!-- Container do PDF -->
            <div class="pdf-container">
                <embed id="pdf-embed" type="application/pdf" width="100%" height="100%">
                
                <!-- Controles Laterais (Direita) -->
                <div class="pdf-controls-side">
                    <button class="pdf-control-btn pdf-btn-page-prev" onclick="pdfViewer.previousPage()" title="Página anterior">
                        <i class="fas fa-chevron-up"></i>
                    </button>
                    <button class="pdf-control-btn pdf-btn-page-next" onclick="pdfViewer.nextPage()" title="Próxima página">
                        <i class="fas fa-chevron-down"></i>
                    </button>
                    <button class="pdf-control-btn pdf-btn-zoom-in" onclick="pdfViewer.zoomIn()" title="Aumentar zoom">
                        <i class="fas fa-plus"></i>
                    </button>
                    <button class="pdf-control-btn pdf-btn-zoom-out" onclick="pdfViewer.zoomOut()" title="Diminuir zoom">
                        <i class="fas fa-minus"></i>
                    </button>
                    <button class="pdf-control-btn pdf-btn-zoom-reset" onclick="pdfViewer.resetZoom()" title="Resetar zoom">
                        <i class="fas fa-expand-arrows-alt"></i>
                    </button>
                </div>
            </div>

            <!-- Indicador de Página -->
            <div class="pdf-page-indicator">
                <span id="current-page">1</span> / <span id="total-pages">1</span>
            </div>
        `;
        
        document.body.appendChild(viewer);
    }

    setupEventListeners() {
        // Touch gestures para mobile
        let startX, startY, startDistance;
        const pdfContainer = document.querySelector('.pdf-container');
        
        pdfContainer.addEventListener('touchstart', (e) => {
            if (e.touches.length === 1) {
                startX = e.touches[0].clientX;
                startY = e.touches[0].clientY;
            } else if (e.touches.length === 2) {
                startDistance = this.getDistance(e.touches[0], e.touches[1]);
            }
        });

        pdfContainer.addEventListener('touchmove', (e) => {
            e.preventDefault();
            if (e.touches.length === 2) {
                const currentDistance = this.getDistance(e.touches[0], e.touches[1]);
                const scaleChange = currentDistance / startDistance;
                this.scale *= scaleChange;
                this.scale = Math.max(0.5, Math.min(3.0, this.scale));
                startDistance = currentDistance;
                this.updateZoom();
            }
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (document.getElementById('pdf-viewer').style.display === 'flex') {
                switch(e.key) {
                    case 'Escape':
                        this.close();
                        break;
                    case 'ArrowLeft':
                        this.previousPDF();
                        break;
                    case 'ArrowRight':
                        this.nextPDF();
                        break;
                    case 'ArrowUp':
                        this.previousPage();
                        break;
                    case 'ArrowDown':
                        this.nextPage();
                        break;
                    case '+':
                        this.zoomIn();
                        break;
                    case '-':
                        this.zoomOut();
                        break;
                }
            }
        });
    }

    open(pdfPath) {
        this.currentPDF = pdfPath;
        this.currentIndex = this.pdfList.indexOf(pdfPath);
        this.currentPage = 1;
        this.scale = 1.0;
        
        const viewer = document.getElementById('pdf-viewer');
        const embed = document.getElementById('pdf-embed');
        const titleText = document.getElementById('pdf-title-text');
        
        // Definir título baseado no PDF
        const titles = {
            'legislacao-sus-odontologia.pdf': 'Legislação do SUS na Odontologia',
            'diretrizes-sus-odontologia.pdf': 'Diretrizes do SUS na Odontologia',
            'protocolos-sus-odontologia.pdf': 'Protocolos Clínicos do SUS',
            'epidemiologia-saude-bucal.pdf': 'Epidemiologia da Saúde Bucal',
            'prevencao-saude-bucal.pdf': 'Prevenção em Saúde Bucal',
            'promocao-saude-bucal.pdf': 'Promoção da Saúde Bucal',
            'organizacao-servicos-saude-bucal.pdf': 'Organização dos Serviços',
            'planejamento-saude-bucal.pdf': 'Planejamento em Saúde Bucal',
            'avaliacao-saude-bucal.pdf': 'Avaliação em Saúde Bucal'
        };
        
        const fileName = pdfPath.split('/').pop();
        titleText.textContent = titles[fileName] || 'Documento PDF';
        
        embed.src = pdfPath;
        viewer.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        // Atualizar controles
        this.updateControls();
    }

    close() {
        const viewer = document.getElementById('pdf-viewer');
        viewer.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    goHome() {
        this.close();
        // Scroll para o topo da página
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    previousPDF() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.open(this.pdfList[this.currentIndex]);
        }
    }

    nextPDF() {
        if (this.currentIndex < this.pdfList.length - 1) {
            this.currentIndex++;
            this.open(this.pdfList[this.currentIndex]);
        }
    }

    downloadPDF() {
        const link = document.createElement('a');
        link.href = this.currentPDF;
        link.download = this.currentPDF.split('/').pop();
        link.click();
    }

    previousPage() {
        if (this.currentPage > 1) {
            this.currentPage--;
            this.updatePage();
        }
    }

    nextPage() {
        this.currentPage++;
        this.updatePage();
    }

    zoomIn() {
        this.scale = Math.min(3.0, this.scale + 0.25);
        this.updateZoom();
    }

    zoomOut() {
        this.scale = Math.max(0.5, this.scale - 0.25);
        this.updateZoom();
    }

    resetZoom() {
        this.scale = 1.0;
        this.updateZoom();
    }

    updateZoom() {
        const embed = document.getElementById('pdf-embed');
        embed.style.transform = `scale(${this.scale})`;
        embed.style.transformOrigin = 'center top';
    }

    updatePage() {
        const embed = document.getElementById('pdf-embed');
        embed.src = `${this.currentPDF}#page=${this.currentPage}`;
        document.getElementById('current-page').textContent = this.currentPage;
    }

    updateControls() {
        const prevBtn = document.querySelector('.pdf-btn-prev');
        const nextBtn = document.querySelector('.pdf-btn-next');
        
        prevBtn.disabled = this.currentIndex === 0;
        nextBtn.disabled = this.currentIndex === this.pdfList.length - 1;
        
        prevBtn.style.opacity = this.currentIndex === 0 ? '0.5' : '1';
        nextBtn.style.opacity = this.currentIndex === this.pdfList.length - 1 ? '0.5' : '1';
    }

    getDistance(touch1, touch2) {
        const dx = touch1.clientX - touch2.clientX;
        const dy = touch1.clientY - touch2.clientY;
        return Math.sqrt(dx * dx + dy * dy);
    }
}

// Inicializar o visualizador
const pdfViewer = new PDFViewer();

// Função global para abrir PDFs
function openPDF(pdfPath) {
    pdfViewer.open(pdfPath);
}

