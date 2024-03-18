const quizData = [
    {
        question: "信号機の赤信号は何を意味しますか？",
        options: ["停止", "進行", "注意", "右折"],
        correctAnswer: 0,
        image: "images/question1.png"
    },
    {
        question: "交差点で優先する車両はどれですか？",
        options: ["右折車", "直進車", "左折車", "信号待ちの車"],
        correctAnswer: 1,
        image: "images/question2.png"
    },
    {
        question: "高速道路での最低速度は何km/hですか？",
        options: ["40", "50", "60", "70"],
        correctAnswer: 2,
        image: "images/question3.png"
    },
    {
        question: "バス停で停車中のバスに対して、どのような運転をすべきですか？",
        options: ["急発進する", "左を追い抜く", "追い越し禁止", "譲る必要はない"],
        correctAnswer: 2,
        image: "images/question4.png"
    }
];

const correctAudio = document.getElementById("correct-audio");
const incorrectAudio = document.getElementById("incorrect-audio");

// 正解の場合に音楽を再生
function playCorrectMusic() {
    correctAudio.play();
}

// 不正解の場合に音楽を再生
function playIncorrectMusic() {
    incorrectAudio.play();
}

let currentQuestion = 0;
let score = 0;
let answeredQuestions = []; // 回答済みの質問を管理する配列

const questionElement = document.getElementById("question");
const imageElement = document.getElementById("question-image");
const optionsContainer = document.getElementById("options-container");
const resultElement = document.getElementById("result");
const nextButton = document.getElementById("next-btn");
const startButton = document.getElementById("start-btn");

const titleContainer = document.getElementById("title-container");
const quizContainer = document.getElementById("quiz-container");

// 開始ボタンがクリックされたときの処理
startButton.addEventListener("click", function() {
  titleContainer.style.display = "none"; // 開始ボタンを非表示
  quizContainer.style.display = "block"; // クイズコンテナを表示

  // ここにクイズの初期化処理を記述する（例：loadQuestion();）
  loadQuestion();
});

function loadQuestion() {

    const currentQuiz = quizData[currentQuestion];
    questionElement.textContent = currentQuiz.question;
    imageElement.src = currentQuiz.image;

    optionsContainer.innerHTML = "";
    currentQuiz.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.textContent = option;
        button.classList.add("option");
        button.addEventListener("click", function () {
            if (!answeredQuestions.includes(currentQuestion)) {
                checkAnswer(index);
            }
        });
        optionsContainer.appendChild(button);
    });
    if (currentQuestion == (quizData.length - 1)) {
        nextButton.textContent = "結果を表示";
    }
}

function checkAnswer(selectedIndex) {
    const currentQuiz = quizData[currentQuestion];
    const options = optionsContainer.children;

    resultElement.className = ""; // ラベルのクラスをリセット

    if (selectedIndex === currentQuiz.correctAnswer) {
        playCorrectMusic();

        score++;
        resultElement.textContent = "正解！";
        resultElement.classList.add("correct-label"); // 正解のラベルにクラスを追加
        options[currentQuiz.correctAnswer].classList.add("correct");
    } else {

        playIncorrectMusic();
        resultElement.textContent = "不正解。";
        resultElement.classList.add("incorrect-label"); // 不正解のラベルにクラスを追加
        options[selectedIndex].classList.add("incorrect");
        options[currentQuiz.correctAnswer].classList.add("correct");
    }

    answeredQuestions.push(currentQuestion); // 回答済みの質問を配列に追加

    optionsContainer.removeEventListener("click", checkAnswer);
    nextButton.style.display = "block";
}

function nextQuestion() {

    if (currentQuestion < quizData.length - 1) {
        currentQuestion++;
        loadQuestion();
        resultElement.textContent = "";
        nextButton.style.display = "none";
    } else {
        showResults();
    }
}

function showResults() {
    questionElement.textContent = "クイズ終了";
    imageElement.style.display = "none";
    optionsContainer.innerHTML = "";
    resultElement.textContent = `あなたのスコアは ${score} / ${quizData.length} です。`;
    nextButton.style.display = "none";
}

loadQuestion();
