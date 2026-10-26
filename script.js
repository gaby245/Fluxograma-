'use strict';

// PERGUNTAS DO TESTE

const questions = [
    {
        question: "Qual é o seu nível de energia e preferência de ambiente?",
        options: [
            {
                text: "⚡ Super agitado(a) e adoro chamar atenção!",
                path: "A"
            },
            {
                text: "🌿 Calmo(a), prefiro cantinhos discretos e pacíficos.",
                path: "B"
            },
            {
                text: "✨ Misterioso(a), gosto de observar tudo no meu ritmo.",
                path: "C"
            }
        ]
    },
    {
        question: "Como você lida com os desafios do dia a dia?",
        options: [
            {
                text: "🎨 Com muita criatividade e um visual autêntico.",
                path: "A"
            },
            {
                text: "🍃 De forma super relaxada, deixando a vida me levar.",
                path: "B"
            },
            {
                text: "🔍 Analiso tudo cautelosamente antes de agir.",
                path: "C"
            }
        ]
    },
    {
        question: "Qual seria o seu superpoder aquático ideal?",
        options: [
            {
                text: "💖 Brilhar no escuro e espalhar fofura.",
                path: "A"
            },
            {
                text: "🍃 Camuflagem perfeita com a natureza.",
                path: "B"
            },
            {
                text: "🔮 Regeneração instantânea e sabedoria milenar.",
                path: "C"
            }
        ]
    },
    {
        question: "Qual seria o seu momento de lazer ideal?",
        options: [
            {
                text: "🍰 Um docinho gostoso assistindo a uma série animada.",
                path: "A"
            },
            {
                text: "🍵 Um chá quentinho lendo um livro na janela.",
                path: "B"
            },
            {
                text: "🌙 Uma caminhada noturna ouvindo música tranquila.",
                path: "C"
            }
        ]
    },
    {
        question: "Como os seus amigos descreveriam a sua personalidade?",
        options: [
            {
                text: "🌟 Divertido(a), expressivo(a) e cheio(a) de cor.",
                path: "A"
            },
            {
                text: "🌱 Pacificador(a), amigável e pé no chão.",
                path: "B"
            },
            {
                text: "🦉 Sábio(a), observador(a) e muito autêntico(a).",
                path: "C"
            }
        ]
    }
];

// RESULTADOS

const results = {
    A: {
        emoji: "🌸",
        title: "Axolote Leucístico",
        subtitle: "O Rosa Fofinho",
        description:
            "Você é o clássico axolote de brânquias rosinhas " +
            "e cor de marshmallow! Adora estar no centro das " +
            "atenções, é super carismático(a) e enche qualquer " +
            "ambiente de alegria."
    },

    B: {
        emoji: "🌿",
        title: "Axolote Selvagem",
        subtitle: "O Espírito da Natureza",
        description:
            "Sua vibe é totalmente zen e conectada à natureza. " +
            "Você prefere a tranquilidade, transmite paz para " +
            "quem está ao seu redor e valoriza a simplicidade."
    },

    C: {
        emoji: "🌙",
        title: "Axolote Especial",
        subtitle: "O Misterioso",
        description:
            "Você é único(a) e misterioso(a). Tem um charme " +
            "singular, gosta de observar o mundo com profundidade " +
            "e possui uma resiliência fantástica diante de " +
            "qualquer obstáculo."
    }
};

// ELEMENTOS DA PÁGINA

const welcomeScreen = document.getElementById("welcome-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const startBtn = document.getElementById("start-btn");
const restartBtn = document.getElementById("restart-btn");

const questionText = document.getElementById("question-text");
const currentQSpan = document.getElementById("current-q");
const optionsContainer = document.getElementById("options-container");
const progressBar = document.getElementById("progress-bar");

const resultEmoji = document.getElementById("result-emoji");
const resultTitle = document.getElementById("result-title");
const resultDescription = document.getElementById("result-description");

// ESTADO DO TESTE

let currentQuestionIndex = 0;

let userChoices = {
    A: 0,
    B: 0,
    C: 0
};

// MOSTRAR UMA TELA E ESCONDER AS OUTRAS

function showScreen(screenToShow) {
    const screens = [
        welcomeScreen,
        quizScreen,
        resultScreen
    ];

    screens.forEach(function(screen) {
        screen.classList.remove("active");
    });

    screenToShow.classList.add("active");
}

// INICIAR O TESTE

function startQuiz() {
    currentQuestionIndex = 0;

    userChoices = {
        A: 0,
        B: 0,
        C: 0
    };

    showScreen(quizScreen);
    loadQuestion();
}

// CARREGAR A PERGUNTA ATUAL

function loadQuestion() {
    if (currentQuestionIndex >= questions.length) {
        showResult();
        return;
    }

    const currentQuestion = questions[currentQuestionIndex];

    questionText.textContent = currentQuestion.question;

    currentQSpan.textContent = currentQuestionIndex + 1;

    const progressPercentage =
        ((currentQuestionIndex + 1) / questions.length) * 100;

    progressBar.style.width = progressPercentage + "%";

    // Limpa as opções anteriores.
    optionsContainer.replaceChildren();

    // Cria os botões das respostas.
    currentQuestion.options.forEach(function(option) {
        const button = document.createElement("button");

        button.type = "button";
        button.className = "option-btn";
        button.textContent = option.text;

        button.addEventListener("click", function() {
            selectOption(option.path);
        });

        optionsContainer.appendChild(button);
    });
}

// REGISTRAR A RESPOSTA

function selectOption(path) {
    if (!Object.prototype.hasOwnProperty.call(userChoices, path)) {
        return;
    }

    userChoices[path]++;

    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        showResult();
    }
}

// CALCULAR E EXIBIR O RESULTADO

function showResult() {
    let highestScore = -1;
    let winningPaths = [];

    Object.keys(userChoices).forEach(function(path) {
        const score = userChoices[path];

        if (score > highestScore) {
            highestScore = score;
            winningPaths = [path];
        } else if (score === highestScore) {
            winningPaths.push(path);
        }
    });

    // Em caso de empate, escolhe aleatoriamente
    // entre os resultados empatados.
    const randomIndex = Math.floor(
        Math.random() * winningPaths.length
    );

    const finalPath = winningPaths[randomIndex];
    const result = results[finalPath];

    resultEmoji.textContent = result.emoji;
    resultTitle.textContent = result.title;
    resultDescription.textContent =
        result.subtitle + "! " + result.description;

    showScreen(resultScreen);
}

// REINICIAR O TESTE

function resetQuiz() {
    currentQuestionIndex = 0;

    userChoices = {
        A: 0,
        B: 0,
        C: 0
    };

    progressBar.style.width = "0%";

    showScreen(welcomeScreen);
}

// CONECTAR OS BOTÕES

function initializeApp() {
    if (
        !welcomeScreen ||
        !quizScreen ||
        !resultScreen ||
        !startBtn ||
        !restartBtn ||
        !questionText ||
        !currentQSpan ||
        !optionsContainer ||
        !progressBar ||
        !resultEmoji ||
        !resultTitle ||
        !resultDescription
    ) {
        console.error(
            "Não foi possível iniciar o teste. " +
            "Confira se o HTML contém todos os IDs necessários."
        );

        return;
    }

    startBtn.addEventListener("click", startQuiz);
    restartBtn.addEventListener("click", resetQuiz);

    showScreen(welcomeScreen);

    console.log("Teste de Axolote iniciado com sucesso!");
}

// GARANTIR QUE O HTML ESTEJA CARREGADO

if (document.readyState === "loading") {
    document.addEventListener(
        "DOMContentLoaded",
        initializeApp,
        { once: true }
    );
} else {
    initializeApp();
}