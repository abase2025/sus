/**
 * DON_FBBR - Inteligência Artificial para o site de SUS NA ODONTOLOGIA
 * Implementação de chat interativo com respostas sobre SUS na Odontologia e outros temas
 */

class DonFbbrAI {
    constructor() {
        this.knowledge = {
            sus_odontologia: [
                "O SUS na Odontologia é organizado através da Política Nacional de Saúde Bucal, que visa reorganizar a prática e qualificar as ações e serviços oferecidos.",
                "A atenção básica em saúde bucal é desenvolvida através da Estratégia Saúde da Família, com equipes de saúde bucal integradas.",
                "Os Centros de Especialidades Odontológicas (CEO) oferecem atendimento especializado em endodontia, periodontia, cirurgia oral e atendimento a pacientes especiais.",
                "A vigilância em saúde bucal monitora indicadores epidemiológicos e fatores de risco para doenças bucais na população.",
                "O financiamento da saúde bucal no SUS é tripartite, envolvendo União, estados e municípios."
            ],
            politicas_publicas: [
                "A Política Nacional de Saúde Bucal - Brasil Sorridente foi lançada em 2004 para reorganizar a atenção à saúde bucal no SUS.",
                "Os princípios do SUS (universalidade, equidade e integralidade) se aplicam integralmente à saúde bucal.",
                "A descentralização permite que municípios organizem seus serviços de saúde bucal conforme suas necessidades locais.",
                "O controle social é exercido através dos Conselhos de Saúde, garantindo participação da comunidade nas decisões.",
                "A regionalização organiza os serviços em redes de atenção à saúde bucal, integrando diferentes níveis de complexidade."
            ],
            atencao_basica: [
                "A atenção básica em saúde bucal inclui ações de promoção, prevenção, diagnóstico, tratamento e reabilitação.",
                "As equipes de saúde bucal são compostas por cirurgião-dentista e auxiliar/técnico em saúde bucal.",
                "O acolhimento e classificação de risco organizam a demanda e priorizam casos urgentes.",
                "A territorialização permite conhecer as necessidades de saúde bucal da população adscrita.",
                "A educação em saúde bucal é desenvolvida em escolas, unidades de saúde e espaços comunitários."
            ],
            especialidades: [
                "Os CEOs oferecem especialidades básicas: endodontia, periodontia, cirurgia oral menor e atendimento a pacientes especiais.",
                "A endodontia no SUS trata dentes com alterações pulpares, evitando extrações desnecessárias.",
                "A periodontia trata doenças gengivais e periodontais, importantes problemas de saúde pública.",
                "A cirurgia oral menor inclui extrações complexas, biópsias e pequenas cirurgias ambulatoriais.",
                "O atendimento a pacientes especiais garante acesso à saúde bucal para pessoas com deficiência."
            ],
            gestao_avaliacao: [
                "O PMAQ-AB avalia e melhora a qualidade da atenção básica, incluindo saúde bucal.",
                "Os indicadores de saúde bucal monitoram cobertura, acesso e qualidade dos serviços.",
                "O planejamento em saúde bucal utiliza dados epidemiológicos para definir prioridades.",
                "A educação permanente qualifica profissionais para atuação no SUS.",
                "A auditoria em saúde bucal verifica a qualidade e adequação dos procedimentos realizados."
            ],
            epidemiologia: [
                "A cárie dentária ainda é o principal problema de saúde bucal no Brasil, apesar da redução observada.",
                "A doença periodontal afeta grande parte da população adulta e idosa brasileira.",
                "O câncer de boca tem alta incidência no Brasil, especialmente em homens acima de 40 anos.",
                "As pesquisas epidemiológicas nacionais (SB Brasil) orientam as políticas de saúde bucal.",
                "Os fatores de risco incluem dieta rica em açúcar, tabagismo, etilismo e má higiene bucal."
            ],
            promocao_prevencao: [
                "A fluoretação das águas de abastecimento é uma das principais medidas de prevenção da cárie.",
                "A escovação com dentifrício fluoretado é recomendada desde o primeiro dente da criança.",
                "Os programas de saúde bucal nas escolas promovem educação e prevenção.",
                "A alimentação saudável é fundamental para a saúde bucal e geral.",
                "O controle do tabagismo e etilismo previne doenças bucais e câncer de boca."
            ],
            geral: [
                "Estou aqui para ajudar com suas dúvidas sobre SUS na Odontologia e outros temas relacionados à saúde.",
                "Posso fornecer informações sobre políticas públicas, gestão, epidemiologia e práticas em saúde bucal no SUS.",
                "Meu objetivo é auxiliar no seu aprendizado sobre o Sistema Único de Saúde aplicado à Odontologia.",
                "Sou o DON_FBBR, sua inteligência artificial assistente para estudos em SUS na Odontologia.",
                "Além de SUS na Odontologia, posso responder sobre diversos temas relacionados à saúde e ciência."
            ]
        };
        
        this.greetings = [
            "Olá! Sou o DON_FBBR, sua IA assistente em SUS na Odontologia. Como posso ajudar?",
            "Bem-vindo! Estou aqui para responder suas dúvidas sobre SUS na Odontologia. O que deseja saber?",
            "Olá! Sou especializado em SUS na Odontologia. Em que posso ser útil hoje?",
            "Bem-vindo ao assistente DON_FBBR! Estou pronto para ajudar com suas questões sobre SUS na Odontologia.",
            "Olá! Sou o DON_FBBR, assistente virtual de SUS na Odontologia. Como posso auxiliar seus estudos?"
        ];
        
        this.fallbacks = [
            "Interessante pergunta! Vamos explorar esse tema juntos no contexto do SUS.",
            "Essa é uma questão importante para a saúde pública. Deixe-me compartilhar o que sei sobre isso.",
            "Ótima pergunta! Vou tentar responder da melhor forma possível com base no conhecimento do SUS.",
            "Esse é um tópico relevante para a odontologia no SUS. Aqui está o que posso dizer sobre isso.",
            "Vamos analisar essa questão com base nas diretrizes e políticas do SUS na Odontologia."
        ];

        this.isAnimated = true;
        this.currentAnimation = 'idle';
    }
    
    getRandomResponse(array) {
        return array[Math.floor(Math.random() * array.length)];
    }
    
    getGreeting() {
        return this.getRandomResponse(this.greetings);
    }
    
    getFallback() {
        return this.getRandomResponse(this.fallbacks);
    }
    
    getRandomKnowledge(category) {
        if (this.knowledge[category]) {
            return this.getRandomResponse(this.knowledge[category]);
        }
        return this.getRandomResponse(this.knowledge.geral);
    }
    
    processQuestion(question) {
        question = question.toLowerCase();
        
        // Verificar palavras-chave para determinar a categoria
        if (question.match(/sus|sistema único|saúde pública|política nacional|brasil sorridente/)) {
            return this.getRandomKnowledge('sus_odontologia');
        }
        else if (question.match(/política|pública|diretrizes|princípios|universalidade|equidade|integralidade|descentralização/)) {
            return this.getRandomKnowledge('politicas_publicas');
        }
        else if (question.match(/atenção básica|esf|estratégia saúde família|unidade básica|ubs|acolhimento|territorialização/)) {
            return this.getRandomKnowledge('atencao_basica');
        }
        else if (question.match(/ceo|centro especialidades|endodontia|periodontia|cirurgia|pacientes especiais|especializada/)) {
            return this.getRandomKnowledge('especialidades');
        }
        else if (question.match(/gestão|avaliação|pmaq|indicadores|planejamento|auditoria|educação permanente/)) {
            return this.getRandomKnowledge('gestao_avaliacao');
        }
        else if (question.match(/epidemiologia|cárie|doença periodontal|câncer boca|sb brasil|prevalência|incidência/)) {
            return this.getRandomKnowledge('epidemiologia');
        }
        else if (question.match(/promoção|prevenção|fluoretação|escovação|educação saúde|alimentação|tabagismo/)) {
            return this.getRandomKnowledge('promocao_prevencao');
        }
        else if (question.match(/odontologia|dental|bucal|dente|gengiva|boca/)) {
            return this.getRandomKnowledge('sus_odontologia');
        }
        else {
            // Para perguntas que não se encaixam nas categorias específicas
            // Primeiro tenta dar uma resposta genérica sobre SUS na Odontologia
            if (Math.random() > 0.3) {
                return this.getRandomKnowledge('geral');
            }
            // Ou usa um fallback genérico
            return this.getFallback();
        }
    }

    // Animação do personagem
    setAnimation(animationType) {
        this.currentAnimation = animationType;
        const donFbbrIcon = document.querySelector('.don-fbbr');
        const floatingButton = document.querySelector('.don-fbbr-floating');
        
        if (donFbbrIcon) {
            donFbbrIcon.className = `don-fbbr animate-${animationType}`;
        }
        
        if (floatingButton) {
            floatingButton.className = `don-fbbr-floating animate-${animationType}`;
        }
    }

    // Resposta com animação
    respondWithAnimation(message) {
        this.setAnimation('bounce');
        setTimeout(() => {
            this.setAnimation('pulse');
        }, 1000);
        
        return message;
    }

    // Processamento avançado de questões
    processAdvancedQuestion(question) {
        const response = this.processQuestion(question);
        return this.respondWithAnimation(response);
    }
}

// Inicialização do DON_FBBR quando o documento estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    const donFbbr = new DonFbbrAI();
    const chatModal = document.getElementById('chatModal');
    const chatMessages = document.getElementById('chatMessages');
    const chatInput = document.getElementById('chatInput');
    const sendMessageBtn = document.getElementById('sendMessage');
    const closeChatBtn = document.getElementById('closeChat');
    const donFbbrIcon = document.querySelector('.don-fbbr');
    
    // Adicionar mensagem de boas-vindas
    function addWelcomeMessage() {
        const welcomeDiv = document.createElement('div');
        welcomeDiv.className = 'chat-welcome';
        welcomeDiv.innerHTML = `
            <div class="welcome-avatar">
                <img src="assets/don_fbbr_robot_small.png" alt="DON_FBBR" class="welcome-robot animate-float">
            </div>
            <h3>Bem-vindo ao DON_FBBR</h3>
            <p>Sua IA assistente para estudos em SUS na Odontologia</p>
            <div class="welcome-features">
                <div class="feature-item">
                    <i class="fas fa-tooth"></i>
                    <span>SUS na Odontologia</span>
                </div>
                <div class="feature-item">
                    <i class="fas fa-book"></i>
                    <span>Políticas Públicas</span>
                </div>
                <div class="feature-item">
                    <i class="fas fa-users"></i>
                    <span>Saúde Coletiva</span>
                </div>
            </div>
        `;
        chatMessages.appendChild(welcomeDiv);
        
        // Adicionar primeira mensagem da IA
        setTimeout(() => {
            addMessage(donFbbr.getGreeting(), 'ai');
        }, 1000);
    }
    
    // Adicionar mensagem ao chat
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;
        
        if (sender === 'ai') {
            messageDiv.innerHTML = `
                <div class="message-avatar">
                    <img src="assets/don_fbbr_robot_small.png" alt="DON_FBBR" class="ai-avatar">
                </div>
                <div class="message-content">
                    <div class="message-text">${text}</div>
                    <div class="message-time">${new Date().toLocaleTimeString('pt-BR', {hour: '2-digit', minute: '2-digit'})}</div>
                </div>
            `;
        } else {
            messageDiv.innerHTML = `
                <div class="message-content">
                    <div class="message-text">${text}</div>
                    <div class="message-time">${new Date().toLocaleTimeString('pt-BR', {hour: '2-digit', minute: '2-digit'})}</div>
                </div>
            `;
        }
        
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // Animação de entrada
        messageDiv.style.opacity = '0';
        messageDiv.style.transform = 'translateY(20px)';
        setTimeout(() => {
            messageDiv.style.transition = 'all 0.3s ease';
            messageDiv.style.opacity = '1';
            messageDiv.style.transform = 'translateY(0)';
        }, 100);
    }
    
    // Processar mensagem do usuário
    function processUserMessage() {
        const userMessage = chatInput.value.trim();
        if (userMessage) {
            addMessage(userMessage, 'user');
            chatInput.value = '';
            
            // Mostrar indicador de digitação
            showTypingIndicator();
            
            // Simular tempo de processamento
            setTimeout(() => {
                hideTypingIndicator();
                const aiResponse = donFbbr.processAdvancedQuestion(userMessage);
                addMessage(aiResponse, 'ai');
            }, 1200);
        }
    }
    
    // Indicador de digitação
    function showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'typing-indicator';
        typingDiv.id = 'typingIndicator';
        typingDiv.innerHTML = `
            <div class="message ai">
                <div class="message-avatar">
                    <img src="assets/don_fbbr_robot_small.png" alt="DON_FBBR" class="ai-avatar">
                </div>
                <div class="message-content">
                    <div class="typing-dots">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
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
    if (donFbbrIcon) {
        donFbbrIcon.addEventListener('click', () => {
            chatModal.style.display = 'flex';
            if (chatMessages.children.length === 0) {
                addWelcomeMessage();
            }
            chatInput.focus();
        });
    }
    
    if (closeChatBtn) {
        closeChatBtn.addEventListener('click', () => {
            chatModal.style.display = 'none';
        });
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
    
    // Adicionar botão flutuante para DON_FBBR se não existir
    if (!donFbbrIcon) {
        const donFbbrButton = document.createElement('div');
        donFbbrButton.className = 'don-fbbr-floating animate-float';
        donFbbrButton.innerHTML = `
            <img src="assets/don_fbbr_robot_small.png" alt="DON_FBBR" class="don-fbbr">
            <div class="floating-pulse"></div>
        `;
        document.body.appendChild(donFbbrButton);
        
        donFbbrButton.addEventListener('click', () => {
            chatModal.style.display = 'flex';
            if (chatMessages.children.length === 0) {
                addWelcomeMessage();
            }
            chatInput.focus();
        });
    }

    // Adicionar estilos específicos para o chat melhorado
    const chatStyles = document.createElement('style');
    chatStyles.textContent = `
        .chat-welcome {
            text-align: center;
            padding: 2rem 1rem;
            color: #b0b0b0;
        }

        .welcome-avatar {
            margin-bottom: 1rem;
        }

        .welcome-robot {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            border: 2px solid #00d4ff;
            padding: 5px;
        }

        .chat-welcome h3 {
            color: #ffffff;
            margin-bottom: 0.5rem;
            font-size: 1.2rem;
        }

        .welcome-features {
            display: flex;
            justify-content: space-around;
            margin-top: 1.5rem;
            gap: 1rem;
        }

        .feature-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.5rem;
            font-size: 0.8rem;
        }

        .feature-item i {
            color: #00d4ff;
            font-size: 1.5rem;
        }

        .message {
            display: flex;
            gap: 0.8rem;
            margin-bottom: 1rem;
            align-items: flex-start;
        }

        .message.user {
            flex-direction: row-reverse;
        }

        .message-avatar {
            flex-shrink: 0;
        }

        .ai-avatar {
            width: 32px;
            height: 32px;
            border-radius: 50%;
            border: 1px solid #00d4ff;
        }

        .message-content {
            max-width: 80%;
        }

        .message-text {
            background: rgba(255, 255, 255, 0.1);
            padding: 0.8rem 1rem;
            border-radius: 15px;
            color: #ffffff;
            line-height: 1.5;
            border: 1px solid rgba(0, 212, 255, 0.2);
        }

        .message.user .message-text {
            background: linear-gradient(135deg, #00d4ff, #0099cc);
            border: none;
        }

        .message-time {
            font-size: 0.7rem;
            color: #a0a0a0;
            margin-top: 0.3rem;
            text-align: right;
        }

        .message.user .message-time {
            text-align: left;
        }

        .typing-indicator {
            margin-bottom: 1rem;
        }

        .typing-dots {
            display: flex;
            gap: 4px;
            padding: 0.8rem 1rem;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 15px;
            border: 1px solid rgba(0, 212, 255, 0.2);
        }

        .typing-dots span {
            width: 6px;
            height: 6px;
            background: #00d4ff;
            border-radius: 50%;
            animation: typingDots 1.4s infinite ease-in-out;
        }

        .typing-dots span:nth-child(1) { animation-delay: -0.32s; }
        .typing-dots span:nth-child(2) { animation-delay: -0.16s; }

        @keyframes typingDots {
            0%, 80%, 100% {
                transform: scale(0);
                opacity: 0.5;
            }
            40% {
                transform: scale(1);
                opacity: 1;
            }
        }

        @media (max-width: 480px) {
            .welcome-features {
                flex-direction: column;
                gap: 0.8rem;
            }

            .feature-item {
                flex-direction: row;
                justify-content: center;
            }

            .message-content {
                max-width: 85%;
            }
        }
    `;
    document.head.appendChild(chatStyles);

    // Animação inicial do DON_FBBR
    setTimeout(() => {
        donFbbr.setAnimation('bounce');
        setTimeout(() => {
            donFbbr.setAnimation('float');
        }, 2000);
    }, 1000);
});

