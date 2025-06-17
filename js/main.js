// Main JavaScript functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initScrollAnimations();
    initPDFViewer();
    initQuestions();
    initChat();
    initParticles();
    
    // Page load animation
    document.body.classList.add('page-transition', 'loaded');
});

// Navigation functionality
function initNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Header background on scroll
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(10, 10, 10, 0.98)';
        } else {
            header.style.background = 'rgba(10, 10, 10, 0.95)';
        }
    });
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe cards and sections
    const animatedElements = document.querySelectorAll('.card, .section-header, .info-item, .equipe-card');
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // Stagger animation for cards
    const cardContainers = document.querySelectorAll('.cards-grid, .questoes-grid, .equipe-grid');
    cardContainers.forEach(container => {
        const cards = container.querySelectorAll('.card, .questao-card, .equipe-card');
        cards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
        });
    });
}

// PDF Viewer functionality
function initPDFViewer() {
    const pdfModal = document.getElementById('pdfModal');
    const pdfFrame = document.getElementById('pdfFrame');
    const pdfTitle = document.getElementById('pdfTitle');
    const pdfBack = document.getElementById('pdfBack');
    const pdfDownload = document.getElementById('pdfDownload');
    const pdfClose = document.getElementById('pdfClose');

    let currentPdfUrl = '';

    // Close PDF viewer
    function closePDFViewer() {
        pdfModal.style.display = 'none';
        pdfFrame.src = '';
        currentPdfUrl = '';
        document.body.style.overflow = 'auto';
    }

    // Event listeners
    if (pdfBack) {
        pdfBack.addEventListener('click', closePDFViewer);
    }

    if (pdfClose) {
        pdfClose.addEventListener('click', closePDFViewer);
    }

    if (pdfDownload) {
        pdfDownload.addEventListener('click', () => {
            if (currentPdfUrl) {
                const link = document.createElement('a');
                link.href = currentPdfUrl;
                link.download = currentPdfUrl.split('/').pop();
                link.click();
            }
        });
    }

    // Close on background click
    pdfModal.addEventListener('click', (e) => {
        if (e.target === pdfModal) {
            closePDFViewer();
        }
    });

    // ESC key to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && pdfModal.style.display === 'flex') {
            closePDFViewer();
        }
    });

    // Make openPDF function global
    window.openPDF = function(pdfUrl, title) {
        currentPdfUrl = pdfUrl;
        pdfTitle.textContent = title;
        pdfFrame.src = pdfUrl;
        pdfModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        // Add loading state
        pdfFrame.addEventListener('load', () => {
            pdfModal.classList.add('modal-fade-in');
        });
    };
}

// Questions functionality
function initQuestions() {
    window.showAnswer = function(button, correctAnswer, explanation) {
        const card = button.closest('.questao-card');
        const options = card.querySelectorAll('input[type="radio"]');
        const selectedOption = card.querySelector('input[type="radio"]:checked');
        
        // Disable all options
        options.forEach(option => {
            option.disabled = true;
            const label = option.closest('.option');
            
            if (option.value === correctAnswer) {
                label.style.background = 'rgba(76, 175, 80, 0.2)';
                label.style.border = '1px solid #4caf50';
                label.style.color = '#4caf50';
            } else if (selectedOption && option === selectedOption && option.value !== correctAnswer) {
                label.style.background = 'rgba(244, 67, 54, 0.2)';
                label.style.border = '1px solid #f44336';
                label.style.color = '#f44336';
            }
        });

        // Show explanation
        const existingExplanation = card.querySelector('.explanation');
        if (!existingExplanation) {
            const explanationDiv = document.createElement('div');
            explanationDiv.className = 'explanation';
            explanationDiv.style.cssText = `
                margin-top: 1rem;
                padding: 1rem;
                background: rgba(0, 212, 255, 0.1);
                border: 1px solid rgba(0, 212, 255, 0.3);
                border-radius: 10px;
                color: #ffffff;
                font-size: 0.9rem;
                line-height: 1.5;
            `;
            explanationDiv.innerHTML = `<strong>Explicação:</strong> ${explanation}`;
            card.appendChild(explanationDiv);
            explanationDiv.classList.add('animate-fade-in-up');
        }

        // Hide button
        button.style.display = 'none';

        // Show result message
        const isCorrect = selectedOption && selectedOption.value === correctAnswer;
        const resultDiv = document.createElement('div');
        resultDiv.className = 'result-message';
        resultDiv.style.cssText = `
            margin-top: 0.5rem;
            padding: 0.5rem 1rem;
            border-radius: 8px;
            font-weight: 600;
            text-align: center;
            ${isCorrect ? 
                'background: rgba(76, 175, 80, 0.2); color: #4caf50; border: 1px solid #4caf50;' : 
                'background: rgba(244, 67, 54, 0.2); color: #f44336; border: 1px solid #f44336;'
            }
        `;
        resultDiv.textContent = isCorrect ? '✓ Resposta Correta!' : '✗ Resposta Incorreta';
        button.parentNode.insertBefore(resultDiv, button);
        resultDiv.classList.add('animate-scale-in');
    };
}

// Chat functionality
function initChat() {
    const chatModal = document.getElementById('chatModal');
    const chatMessages = document.getElementById('chatMessages');
    const chatInput = document.getElementById('chatInput');
    const sendMessageBtn = document.getElementById('sendMessage');
    const closeChatBtn = document.getElementById('closeChat');

    // Inicializar IA DON_FBBR
    let donFbbr;
    try {
        donFbbr = new DonFbbrAI();
        console.log('IA DON_FBBR inicializada com sucesso');
    } catch (error) {
        console.error('Erro ao inicializar IA:', error);
        // Fallback simples se a classe não estiver disponível
        donFbbr = {
            getGreeting: () => "Olá! Sou o DON_FBBR, sua IA especializada em SUS na Odontologia. Como posso ajudá-lo hoje?",
            processAdvancedQuestion: (question) => {
                const responses = [
                    "O SUS na Odontologia é organizado através da Política Nacional de Saúde Bucal, que visa reorganizar a prática e qualificar as ações e serviços oferecidos.",
                    "A atenção básica em saúde bucal é desenvolvida através da Estratégia Saúde da Família, com equipes de saúde bucal integradas.",
                    "Os Centros de Especialidades Odontológicas (CEO) oferecem atendimento especializado em endodontia, periodontia, cirurgia oral e atendimento a pacientes especiais.",
                    "A Política Nacional de Saúde Bucal - Brasil Sorridente foi lançada em 2004 para reorganizar a atenção à saúde bucal no SUS.",
                    "Os princípios do SUS (universalidade, equidade e integralidade) se aplicam integralmente à saúde bucal."
                ];
                return responses[Math.floor(Math.random() * responses.length)];
            }
        };
    }

    // Open chat
    window.openChat = function() {
        if (chatModal) {
            chatModal.style.display = 'flex';
            chatModal.classList.add('modal-fade-in');
            if (chatInput) chatInput.focus();
            document.body.style.overflow = 'hidden';
            
            // Adicionar mensagem de boas-vindas se não houver mensagens
            if (chatMessages && chatMessages.children.length === 0) {
                addWelcomeMessage();
            }
        }
    };

    // Close chat
    function closeChat() {
        if (chatModal) {
            chatModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }

    // Adicionar mensagem de boas-vindas
    function addWelcomeMessage() {
        const welcomeMessage = donFbbr.getGreeting();
        addMessage(welcomeMessage, 'ai');
    }

    // Adicionar mensagem ao chat
    function addMessage(message, sender) {
        if (!chatMessages) return;
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${sender}`;
        
        const avatarImg = document.createElement('img');
        avatarImg.className = 'message-avatar';
        avatarImg.src = sender === 'ai' ? 'assets/don_fbbr_robot_small.png' : 'assets/user-avatar.png';
        avatarImg.alt = sender === 'ai' ? 'DON_FBBR' : 'Usuário';
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        contentDiv.textContent = message;
        
        if (sender === 'ai') {
            messageDiv.appendChild(avatarImg);
            messageDiv.appendChild(contentDiv);
        } else {
            messageDiv.appendChild(contentDiv);
            messageDiv.appendChild(avatarImg);
        }
        
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // Animação
        setTimeout(() => {
            messageDiv.style.opacity = '1';
            messageDiv.style.transform = 'translateY(0)';
        }, 100);
    }

    // Processar mensagem do usuário
    function processUserMessage() {
        const userMessage = chatInput.value.trim();
        if (userMessage && chatMessages) {
            addMessage(userMessage, 'user');
            chatInput.value = '';
            
            // Mostrar indicador de digitação
            showTypingIndicator();
            
            // Simular tempo de processamento
            setTimeout(() => {
                hideTypingIndicator();
                try {
                    const aiResponse = donFbbr.processAdvancedQuestion ? 
                        donFbbr.processAdvancedQuestion(userMessage) : 
                        donFbbr.processQuestion(userMessage);
                    addMessage(aiResponse, 'ai');
                } catch (error) {
                    console.error('Erro ao processar pergunta:', error);
                    addMessage("Desculpe, tive um problema ao processar sua pergunta. Pode tentar novamente?", 'ai');
                }
            }, 1200);
        }
    }

    // Indicador de digitação
    function showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'typing-indicator';
        typingDiv.id = 'typingIndicator';
        typingDiv.innerHTML = `
            <img src="assets/don_fbbr_robot_small.png" alt="DON_FBBR" class="message-avatar">
            <div class="typing-dots">
                <span></span>
                <span></span>
                <span></span>
            </div>
        `;
        chatMessages.appendChild(typingDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function hideTypingIndicator() {
        const typingIndicator = document.getElementById('typingIndicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    // Event listeners
    if (closeChatBtn) {
        closeChatBtn.addEventListener('click', closeChat);
    }

    if (sendMessageBtn) {
        sendMessageBtn.addEventListener('click', processUserMessage);
    }

    if (chatInput) {
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                processUserMessage();
            }
        });
    }

    // Close on background click
    if (chatModal) {
        chatModal.addEventListener('click', (e) => {
            if (e.target === chatModal) {
                closeChat();
            }
        });
    }

    // ESC key to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && chatModal && chatModal.style.display === 'flex') {
            closeChat();
        }
    });
}

    // Close chat
    function closeChat() {
        chatModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    // Event listeners
    if (closeChatBtn) {
        closeChatBtn.addEventListener('click', closeChat);
    }

    if (donFbbrFloating) {
        donFbbrFloating.addEventListener('click', openChat);
    }

    // Close on background click
    chatModal.addEventListener('click', (e) => {
        if (e.target === chatModal) {
            closeChat();
        }
    });

    // ESC key to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && chatModal.style.display === 'flex') {
            closeChat();
        }
    });

    // Send message on Enter
    if (chatInput) {
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }

    if (sendMessageBtn) {
        sendMessageBtn.addEventListener('click', sendMessage);
    }

    function sendMessage() {
        const message = chatInput.value.trim();
        if (message) {
            addMessage(message, 'user');
            chatInput.value = '';
            
            // Simulate AI response (will be handled by don_fbbr_ai.js)
            setTimeout(() => {
                const responses = [
                    "Interessante pergunta sobre SUS na Odontologia! O Sistema Único de Saúde tem diretrizes específicas para a saúde bucal.",
                    "A Política Nacional de Saúde Bucal é fundamental para organizar os serviços odontológicos no SUS.",
                    "Vou ajudar você com essa questão sobre SUS na Odontologia. É importante entender os princípios e diretrizes.",
                    "Excelente pergunta! O SUS na Odontologia envolve atenção básica, especializada e hospitalar."
                ];
                const randomResponse = responses[Math.floor(Math.random() * responses.length)];
                addMessage(randomResponse, 'ai');
            }, 1000);
        }
    }

    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;
        messageDiv.textContent = text;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        messageDiv.classList.add('animate-fade-in-up');
    }
}

// Particles animation
function initParticles() {
    const particlesContainer = document.querySelector('.particles');
    if (!particlesContainer) return;

    // Create additional particle effects
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 1}px;
            height: ${Math.random() * 4 + 1}px;
            background: ${Math.random() > 0.5 ? '#00d4ff' : '#9c27b0'};
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            opacity: ${Math.random() * 0.8 + 0.2};
            animation: float ${Math.random() * 3 + 2}s ease-in-out infinite;
            animation-delay: ${Math.random() * 2}s;
        `;
        particlesContainer.appendChild(particle);
    }
}

// Utility functions
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = section.offsetTop - headerHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// Progress bar animation
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-fill');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const width = progressBar.style.width;
                progressBar.style.width = '0%';
                setTimeout(() => {
                    progressBar.style.width = width;
                    progressBar.style.transition = 'width 1.5s ease-out';
                }, 100);
                observer.unobserve(progressBar);
            }
        });
    });

    progressBars.forEach(bar => observer.observe(bar));
}

// Initialize progress bar animations
document.addEventListener('DOMContentLoaded', animateProgressBars);

// Lazy loading for images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Performance optimization
function optimizePerformance() {
    // Debounce scroll events
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(() => {
            // Handle scroll events here
        }, 16); // ~60fps
    });

    // Preload critical resources
    const criticalImages = [
        'images/odonto-hero.jpg',
        'images/sus-hero.jpg',
        'assets/don_fbbr_robot_small.png'
    ];

    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
}

// Initialize performance optimizations
document.addEventListener('DOMContentLoaded', optimizePerformance);

// Error handling
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
    // Could implement error reporting here
});

// Service Worker registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

