// Sistema de Questões Avançado para SUS NA ODONTOLOGIA
class QuestionSystem {
    constructor() {
        this.questions = [
            {
                id: 1,
                category: "Políticas Públicas",
                difficulty: "medio",
                question: "Qual é o principal objetivo da Política Nacional de Saúde Bucal (Brasil Sorridente)?",
                options: [
                    "Apenas tratamento curativo",
                    "Reorganização da prática e qualificação das ações e serviços",
                    "Apenas prevenção de doenças",
                    "Redução de custos"
                ],
                correct: 1,
                explanation: "A Política Nacional de Saúde Bucal visa reorganizar a prática e qualificar as ações e serviços oferecidos, ampliando o acesso e melhorando a qualidade da atenção à saúde bucal no SUS."
            },
            {
                id: 2,
                category: "Atenção Básica",
                difficulty: "dificil",
                question: "Como deve ser organizada a atenção à saúde bucal na Estratégia Saúde da Família?",
                options: [
                    "Apenas atendimento individual",
                    "Integrada às ações da equipe multiprofissional",
                    "Separada das demais ações de saúde",
                    "Apenas em unidades especializadas"
                ],
                correct: 1,
                explanation: "A atenção à saúde bucal deve estar integrada às ações da equipe multiprofissional, seguindo os princípios da ESF com foco na família e comunidade."
            },
            {
                id: 3,
                category: "Princípios SUS",
                difficulty: "facil",
                question: "Quais são os princípios doutrinários do SUS?",
                options: [
                    "Universalidade, Equidade e Integralidade",
                    "Apenas Universalidade",
                    "Descentralização e Hierarquização",
                    "Participação Popular"
                ],
                correct: 0,
                explanation: "Os princípios doutrinários do SUS são: Universalidade (acesso para todos), Equidade (tratamento diferenciado conforme necessidades) e Integralidade (atenção completa)."
            },
            {
                id: 4,
                category: "CEO",
                difficulty: "medio",
                question: "Quais especialidades básicas devem ser oferecidas nos Centros de Especialidades Odontológicas (CEO)?",
                options: [
                    "Apenas endodontia",
                    "Endodontia, periodontia, cirurgia oral e atendimento a pacientes especiais",
                    "Todas as especialidades odontológicas",
                    "Apenas cirurgia oral"
                ],
                correct: 1,
                explanation: "Os CEOs devem oferecer no mínimo: endodontia, periodontia, cirurgia oral menor e atendimento a pacientes com necessidades especiais."
            },
            {
                id: 5,
                category: "Epidemiologia",
                difficulty: "dificil",
                question: "Qual é a principal fonte de dados epidemiológicos em saúde bucal no Brasil?",
                options: [
                    "DATASUS",
                    "Pesquisa SB Brasil",
                    "IBGE",
                    "Ministério da Educação"
                ],
                correct: 1,
                explanation: "A Pesquisa SB Brasil é o principal levantamento epidemiológico nacional em saúde bucal, fornecendo dados sobre condições bucais da população brasileira."
            },
            {
                id: 6,
                category: "Prevenção",
                difficulty: "facil",
                question: "Qual é uma das principais medidas de prevenção da cárie dentária em nível populacional?",
                options: [
                    "Uso de antibióticos",
                    "Fluoretação das águas de abastecimento",
                    "Cirurgias preventivas",
                    "Uso de enxaguatórios"
                ],
                correct: 1,
                explanation: "A fluoretação das águas de abastecimento público é uma das medidas mais eficazes e equitativas de prevenção da cárie dentária em nível populacional."
            },
            {
                id: 7,
                category: "Gestão",
                difficulty: "medio",
                question: "O que é o PMAQ-AB em relação à saúde bucal?",
                options: [
                    "Programa de financiamento",
                    "Programa de Melhoria do Acesso e da Qualidade da Atenção Básica",
                    "Programa de especialização",
                    "Programa de prevenção"
                ],
                correct: 1,
                explanation: "O PMAQ-AB é o Programa de Melhoria do Acesso e da Qualidade da Atenção Básica, que inclui avaliação e melhoria da qualidade dos serviços de saúde bucal."
            },
            {
                id: 8,
                category: "Financiamento",
                difficulty: "dificil",
                question: "Como é organizado o financiamento da saúde bucal no SUS?",
                options: [
                    "Apenas federal",
                    "Apenas municipal",
                    "Tripartite (União, Estados e Municípios)",
                    "Apenas estadual"
                ],
                correct: 2,
                explanation: "O financiamento da saúde bucal no SUS é tripartite, com responsabilidades compartilhadas entre União, Estados e Municípios, conforme pactuação."
            }
        ];
        
        this.currentQuestionIndex = 0;
        this.userAnswers = [];
        this.score = 0;
        this.isQuizMode = false;
        
        this.init();
    }

    init() {
        this.renderQuestions();
        this.setupQuizMode();
    }

    renderQuestions() {
        const questoesGrid = document.querySelector('.questoes-grid');
        if (!questoesGrid) return;

        // Limpar questões existentes
        questoesGrid.innerHTML = '';

        // Renderizar primeiras 3 questões
        this.questions.slice(0, 3).forEach((question, index) => {
            const questionCard = this.createQuestionCard(question, index);
            questoesGrid.appendChild(questionCard);
        });

        // Adicionar botão para ver mais questões
        const moreQuestionsBtn = document.createElement('div');
        moreQuestionsBtn.className = 'more-questions-container';
        moreQuestionsBtn.innerHTML = `
            <button class="btn btn-outline" onclick="questionSystem.showAllQuestions()">
                <i class="fas fa-plus"></i>
                Ver Mais Questões (${this.questions.length - 3} restantes)
            </button>
            <button class="btn btn-primary" onclick="questionSystem.startQuiz()">
                <i class="fas fa-play"></i>
                Iniciar Quiz Completo
            </button>
        `;
        questoesGrid.appendChild(moreQuestionsBtn);
    }

    createQuestionCard(question, index) {
        const card = document.createElement('div');
        card.className = `questao-card animate-fade-in-up`;
        card.style.animationDelay = `${index * 0.1}s`;
        card.setAttribute('data-difficulty', question.difficulty);
        
        card.innerHTML = `
            <div class="questao-header">
                <span class="questao-category">${question.category}</span>
                <span class="questao-difficulty ${question.difficulty}">${this.getDifficultyText(question.difficulty)}</span>
            </div>
            <div class="questao-content">
                <h3 class="questao-title">${question.question}</h3>
                <div class="questao-options">
                    ${question.options.map((option, optIndex) => `
                        <label class="option">
                            <input type="radio" name="q${question.id}" value="${optIndex}">
                            <span>${String.fromCharCode(97 + optIndex)}) ${option}</span>
                        </label>
                    `).join('')}
                </div>
                <button class="btn btn-outline" onclick="questionSystem.showAnswer(this, ${question.id})">
                    Ver Resposta
                </button>
            </div>
        `;
        
        return card;
    }

    getDifficultyText(difficulty) {
        const difficultyMap = {
            'facil': 'Fácil',
            'medio': 'Médio',
            'dificil': 'Difícil'
        };
        return difficultyMap[difficulty] || 'Médio';
    }

    showAnswer(button, questionId) {
        const question = this.questions.find(q => q.id === questionId);
        const card = button.closest('.questao-card');
        const options = card.querySelectorAll('input[type="radio"]');
        const selectedOption = card.querySelector('input[type="radio"]:checked');
        
        // Disable all options
        options.forEach((option, index) => {
            option.disabled = true;
            const label = option.closest('.option');
            
            if (index === question.correct) {
                label.style.background = 'rgba(76, 175, 80, 0.2)';
                label.style.border = '1px solid #4caf50';
                label.style.color = '#4caf50';
            } else if (selectedOption && option === selectedOption && index !== question.correct) {
                label.style.background = 'rgba(244, 67, 54, 0.2)';
                label.style.border = '1px solid #f44336';
                label.style.color = '#f44336';
            }
        });

        // Show explanation
        const existingExplanation = card.querySelector('.explanation');
        if (!existingExplanation) {
            const explanationDiv = document.createElement('div');
            explanationDiv.className = 'explanation animate-fade-in-up';
            explanationDiv.innerHTML = `
                <div class="explanation-content">
                    <h4><i class="fas fa-lightbulb"></i> Explicação:</h4>
                    <p>${question.explanation}</p>
                </div>
            `;
            card.appendChild(explanationDiv);
        }

        // Hide button and show result
        button.style.display = 'none';
        
        const isCorrect = selectedOption && parseInt(selectedOption.value) === question.correct;
        const resultDiv = document.createElement('div');
        resultDiv.className = `result-message animate-scale-in ${isCorrect ? 'correct' : 'incorrect'}`;
        resultDiv.innerHTML = `
            <i class="fas ${isCorrect ? 'fa-check-circle' : 'fa-times-circle'}"></i>
            <span>${isCorrect ? 'Resposta Correta!' : 'Resposta Incorreta'}</span>
        `;
        button.parentNode.insertBefore(resultDiv, button);
    }

    showAllQuestions() {
        const questoesGrid = document.querySelector('.questoes-grid');
        questoesGrid.innerHTML = '';

        this.questions.forEach((question, index) => {
            const questionCard = this.createQuestionCard(question, index);
            questoesGrid.appendChild(questionCard);
        });

        // Adicionar botão de quiz
        const quizContainer = document.createElement('div');
        quizContainer.className = 'quiz-container';
        quizContainer.innerHTML = `
            <div class="quiz-info">
                <h3>Quiz Completo</h3>
                <p>Teste seus conhecimentos com todas as ${this.questions.length} questões sobre SUS na Odontologia</p>
                <button class="btn btn-primary" onclick="questionSystem.startQuiz()">
                    <i class="fas fa-play"></i>
                    Iniciar Quiz Interativo
                </button>
            </div>
        `;
        questoesGrid.appendChild(quizContainer);
    }

    startQuiz() {
        this.isQuizMode = true;
        this.currentQuestionIndex = 0;
        this.userAnswers = [];
        this.score = 0;
        
        this.showQuizModal();
    }

    showQuizModal() {
        const modal = document.createElement('div');
        modal.className = 'quiz-modal';
        modal.id = 'quizModal';
        modal.innerHTML = `
            <div class="quiz-container-modal">
                <div class="quiz-header">
                    <h2>Quiz SUS na Odontologia</h2>
                    <div class="quiz-progress">
                        <div class="progress-bar">
                            <div class="progress-fill" id="quizProgress" style="width: 0%"></div>
                        </div>
                        <span class="progress-text">
                            <span id="currentQuestion">1</span> / ${this.questions.length}
                        </span>
                    </div>
                    <button class="quiz-close" onclick="questionSystem.closeQuiz()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="quiz-content" id="quizContent">
                    ${this.renderQuizQuestion()}
                </div>
                <div class="quiz-footer">
                    <button class="btn btn-outline" id="prevBtn" onclick="questionSystem.previousQuestion()" disabled>
                        <i class="fas fa-chevron-left"></i>
                        Anterior
                    </button>
                    <button class="btn btn-primary" id="nextBtn" onclick="questionSystem.nextQuestion()">
                        Próxima
                        <i class="fas fa-chevron-right"></i>
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';
        
        this.addQuizStyles();
        this.updateQuizProgress();
    }

    renderQuizQuestion() {
        const question = this.questions[this.currentQuestionIndex];
        return `
            <div class="quiz-question">
                <div class="question-category">
                    <span class="category-badge">${question.category}</span>
                    <span class="difficulty-badge ${question.difficulty}">${this.getDifficultyText(question.difficulty)}</span>
                </div>
                <h3 class="question-title">${question.question}</h3>
                <div class="question-options">
                    ${question.options.map((option, index) => `
                        <label class="quiz-option">
                            <input type="radio" name="quizQuestion" value="${index}" 
                                   ${this.userAnswers[this.currentQuestionIndex] === index ? 'checked' : ''}>
                            <span class="option-text">${String.fromCharCode(97 + index)}) ${option}</span>
                        </label>
                    `).join('')}
                </div>
            </div>
        `;
    }

    nextQuestion() {
        const selectedOption = document.querySelector('input[name="quizQuestion"]:checked');
        if (selectedOption) {
            this.userAnswers[this.currentQuestionIndex] = parseInt(selectedOption.value);
        }

        if (this.currentQuestionIndex < this.questions.length - 1) {
            this.currentQuestionIndex++;
            document.getElementById('quizContent').innerHTML = this.renderQuizQuestion();
            this.updateQuizProgress();
        } else {
            this.finishQuiz();
        }
    }

    previousQuestion() {
        if (this.currentQuestionIndex > 0) {
            this.currentQuestionIndex--;
            document.getElementById('quizContent').innerHTML = this.renderQuizQuestion();
            this.updateQuizProgress();
        }
    }

    updateQuizProgress() {
        const progress = ((this.currentQuestionIndex + 1) / this.questions.length) * 100;
        document.getElementById('quizProgress').style.width = `${progress}%`;
        document.getElementById('currentQuestion').textContent = this.currentQuestionIndex + 1;
        
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        
        prevBtn.disabled = this.currentQuestionIndex === 0;
        
        if (this.currentQuestionIndex === this.questions.length - 1) {
            nextBtn.innerHTML = '<i class="fas fa-check"></i> Finalizar Quiz';
        } else {
            nextBtn.innerHTML = 'Próxima <i class="fas fa-chevron-right"></i>';
        }
    }

    finishQuiz() {
        // Calculate score
        this.score = 0;
        this.userAnswers.forEach((answer, index) => {
            if (answer === this.questions[index].correct) {
                this.score++;
            }
        });

        const percentage = Math.round((this.score / this.questions.length) * 100);
        
        document.getElementById('quizContent').innerHTML = `
            <div class="quiz-results">
                <div class="result-icon">
                    <i class="fas ${percentage >= 70 ? 'fa-trophy' : percentage >= 50 ? 'fa-medal' : 'fa-graduation-cap'}"></i>
                </div>
                <h2>Quiz Finalizado!</h2>
                <div class="score-display">
                    <div class="score-circle">
                        <span class="score-number">${percentage}%</span>
                        <span class="score-text">${this.score}/${this.questions.length} acertos</span>
                    </div>
                </div>
                <div class="performance-message">
                    <h3>${this.getPerformanceMessage(percentage)}</h3>
                    <p>${this.getPerformanceDescription(percentage)}</p>
                </div>
                <div class="quiz-actions">
                    <button class="btn btn-primary" onclick="questionSystem.restartQuiz()">
                        <i class="fas fa-redo"></i>
                        Refazer Quiz
                    </button>
                    <button class="btn btn-outline" onclick="questionSystem.reviewAnswers()">
                        <i class="fas fa-eye"></i>
                        Revisar Respostas
                    </button>
                </div>
            </div>
        `;

        document.querySelector('.quiz-footer').style.display = 'none';
    }

    getPerformanceMessage(percentage) {
        if (percentage >= 90) return "Excelente! 🏆";
        if (percentage >= 80) return "Muito Bom! 🥇";
        if (percentage >= 70) return "Bom! 🥈";
        if (percentage >= 60) return "Regular 📚";
        return "Precisa Estudar Mais 📖";
    }

    getPerformanceDescription(percentage) {
        if (percentage >= 90) return "Você domina muito bem o conteúdo sobre SUS na Odontologia!";
        if (percentage >= 80) return "Você tem um bom conhecimento sobre SUS na Odontologia.";
        if (percentage >= 70) return "Você tem conhecimentos básicos, mas pode melhorar.";
        if (percentage >= 60) return "É recomendável revisar o conteúdo estudado.";
        return "Recomendamos estudar mais o material antes de tentar novamente.";
    }

    restartQuiz() {
        this.currentQuestionIndex = 0;
        this.userAnswers = [];
        this.score = 0;
        document.getElementById('quizContent').innerHTML = this.renderQuizQuestion();
        document.querySelector('.quiz-footer').style.display = 'flex';
        this.updateQuizProgress();
    }

    reviewAnswers() {
        // Implementation for reviewing answers
        this.closeQuiz();
        this.showAllQuestions();
    }

    closeQuiz() {
        const modal = document.getElementById('quizModal');
        if (modal) {
            modal.remove();
            document.body.style.overflow = 'auto';
        }
        this.isQuizMode = false;
    }

    addQuizStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .quiz-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.9);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 3000;
                animation: fadeIn 0.3s ease;
            }

            .quiz-container-modal {
                background: linear-gradient(135deg, #1a1a2e, #16213e);
                border-radius: 20px;
                width: 90%;
                max-width: 800px;
                max-height: 90vh;
                display: flex;
                flex-direction: column;
                border: 1px solid rgba(0, 212, 255, 0.3);
                overflow: hidden;
            }

            .quiz-header {
                padding: 1.5rem;
                border-bottom: 1px solid rgba(0, 212, 255, 0.2);
                display: flex;
                justify-content: space-between;
                align-items: center;
                background: rgba(0, 212, 255, 0.1);
            }

            .quiz-header h2 {
                color: #ffffff;
                margin: 0;
                font-size: 1.5rem;
            }

            .quiz-progress {
                display: flex;
                align-items: center;
                gap: 1rem;
                flex: 1;
                margin: 0 2rem;
            }

            .quiz-progress .progress-bar {
                flex: 1;
                height: 8px;
                background: rgba(255, 255, 255, 0.2);
                border-radius: 4px;
                overflow: hidden;
            }

            .quiz-progress .progress-fill {
                height: 100%;
                background: linear-gradient(90deg, #00d4ff, #9c27b0);
                transition: width 0.3s ease;
            }

            .progress-text {
                color: #00d4ff;
                font-weight: 600;
                font-size: 0.9rem;
            }

            .quiz-close {
                background: none;
                border: none;
                color: #ffffff;
                font-size: 1.5rem;
                cursor: pointer;
                padding: 0.5rem;
                border-radius: 50%;
                transition: background 0.3s ease;
            }

            .quiz-close:hover {
                background: rgba(255, 255, 255, 0.1);
            }

            .quiz-content {
                flex: 1;
                padding: 2rem;
                overflow-y: auto;
            }

            .quiz-question {
                max-width: 100%;
            }

            .question-category {
                display: flex;
                gap: 1rem;
                margin-bottom: 1.5rem;
            }

            .category-badge {
                background: rgba(0, 212, 255, 0.2);
                color: #00d4ff;
                padding: 0.5rem 1rem;
                border-radius: 20px;
                font-size: 0.9rem;
                font-weight: 500;
            }

            .difficulty-badge {
                padding: 0.5rem 1rem;
                border-radius: 20px;
                font-size: 0.9rem;
                font-weight: 600;
            }

            .difficulty-badge.facil {
                background: rgba(76, 175, 80, 0.2);
                color: #4caf50;
            }

            .difficulty-badge.medio {
                background: rgba(255, 193, 7, 0.2);
                color: #ffc107;
            }

            .difficulty-badge.dificil {
                background: rgba(244, 67, 54, 0.2);
                color: #f44336;
            }

            .question-title {
                color: #ffffff;
                font-size: 1.3rem;
                font-weight: 600;
                margin-bottom: 2rem;
                line-height: 1.4;
            }

            .question-options {
                display: flex;
                flex-direction: column;
                gap: 1rem;
            }

            .quiz-option {
                display: flex;
                align-items: center;
                gap: 1rem;
                padding: 1rem;
                background: rgba(255, 255, 255, 0.05);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 10px;
                cursor: pointer;
                transition: all 0.3s ease;
            }

            .quiz-option:hover {
                background: rgba(0, 212, 255, 0.1);
                border-color: rgba(0, 212, 255, 0.3);
            }

            .quiz-option input[type="radio"] {
                accent-color: #00d4ff;
                transform: scale(1.2);
            }

            .option-text {
                color: #ffffff;
                font-size: 1rem;
                line-height: 1.4;
            }

            .quiz-footer {
                padding: 1.5rem;
                border-top: 1px solid rgba(0, 212, 255, 0.2);
                display: flex;
                justify-content: space-between;
                background: rgba(0, 0, 0, 0.3);
            }

            .quiz-results {
                text-align: center;
                padding: 2rem 0;
            }

            .result-icon {
                font-size: 4rem;
                color: #00d4ff;
                margin-bottom: 1rem;
            }

            .quiz-results h2 {
                color: #ffffff;
                margin-bottom: 2rem;
                font-size: 2rem;
            }

            .score-display {
                margin-bottom: 2rem;
            }

            .score-circle {
                display: inline-flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                width: 150px;
                height: 150px;
                border: 4px solid #00d4ff;
                border-radius: 50%;
                background: rgba(0, 212, 255, 0.1);
            }

            .score-number {
                font-size: 2.5rem;
                font-weight: 700;
                color: #00d4ff;
            }

            .score-text {
                color: #ffffff;
                font-size: 0.9rem;
            }

            .performance-message {
                margin-bottom: 2rem;
            }

            .performance-message h3 {
                color: #ffffff;
                font-size: 1.5rem;
                margin-bottom: 0.5rem;
            }

            .performance-message p {
                color: #b0b0b0;
                font-size: 1rem;
            }

            .quiz-actions {
                display: flex;
                gap: 1rem;
                justify-content: center;
            }

            @media (max-width: 768px) {
                .quiz-container-modal {
                    width: 95%;
                    max-height: 95vh;
                }

                .quiz-header {
                    flex-direction: column;
                    gap: 1rem;
                    align-items: stretch;
                }

                .quiz-progress {
                    margin: 0;
                }

                .quiz-content {
                    padding: 1rem;
                }

                .question-title {
                    font-size: 1.1rem;
                }

                .quiz-footer {
                    flex-direction: column;
                    gap: 1rem;
                }

                .quiz-actions {
                    flex-direction: column;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Estilos adicionais para questões
const questionStyles = document.createElement('style');
questionStyles.textContent = `
    .explanation {
        margin-top: 1rem;
        padding: 1rem;
        background: rgba(0, 212, 255, 0.1);
        border: 1px solid rgba(0, 212, 255, 0.3);
        border-radius: 10px;
        animation: fadeInUp 0.5s ease;
    }

    .explanation-content h4 {
        color: #00d4ff;
        margin-bottom: 0.5rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    .explanation-content p {
        color: #ffffff;
        line-height: 1.6;
        margin: 0;
    }

    .result-message {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.8rem 1rem;
        border-radius: 8px;
        font-weight: 600;
        margin-top: 1rem;
        animation: scaleIn 0.3s ease;
    }

    .result-message.correct {
        background: rgba(76, 175, 80, 0.2);
        color: #4caf50;
        border: 1px solid #4caf50;
    }

    .result-message.incorrect {
        background: rgba(244, 67, 54, 0.2);
        color: #f44336;
        border: 1px solid #f44336;
    }

    .more-questions-container {
        grid-column: 1 / -1;
        display: flex;
        gap: 1rem;
        justify-content: center;
        align-items: center;
        padding: 2rem;
        flex-wrap: wrap;
    }

    .quiz-container {
        grid-column: 1 / -1;
        background: rgba(255, 255, 255, 0.05);
        border-radius: 20px;
        padding: 2rem;
        text-align: center;
        border: 1px solid rgba(0, 212, 255, 0.2);
        margin-top: 2rem;
    }

    .quiz-info h3 {
        color: #ffffff;
        margin-bottom: 1rem;
        font-size: 1.5rem;
    }

    .quiz-info p {
        color: #b0b0b0;
        margin-bottom: 1.5rem;
        line-height: 1.6;
    }

    @media (max-width: 768px) {
        .more-questions-container {
            flex-direction: column;
            gap: 1rem;
        }

        .more-questions-container .btn {
            width: 100%;
            max-width: 300px;
        }
    }
`;
document.head.appendChild(questionStyles);

// Inicializar sistema de questões
let questionSystem;
document.addEventListener('DOMContentLoaded', () => {
    questionSystem = new QuestionSystem();
});

