<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start" v-if="GoBackButton">
                    <ion-back-button default-href="/" />
                </ion-buttons>
                <ion-title>Math Challenge</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content class="ion-padding">
            <div v-if="gameOver" class="game-over">
                <h2>Game Over!</h2>
                <p>Your Score: {{ score }}</p>
                <p>High Score: {{ highScore }}</p>
                <ion-button color="success" @click="$router.push('/')">Go Back</ion-button>
                <ion-button @click="startGame">Play Again</ion-button>
            </div>

            <div v-else>
                <h2>{{ question }}</h2>
                <div class="answer-options">
                    <ion-button v-for="(option, index) in answerOptions" :key="index" @click="checkAnswer(option)"
                        :color="getButtonColor(option)"
                        :class="{ 'shake': isWrongAnswer && selectedAnswer === option }">
                        {{ option }}
                    </ion-button>
                </div>
                <ion-progress-bar :value="timeLeft / 30"></ion-progress-bar>
                <p>Time Left: {{ timeLeft }}s</p>
                <p>Score: {{ score }}</p>
            </div>
        </ion-content>
    </ion-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { IonPage, IonButtons, IonBackButton, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonProgressBar } from "@ionic/vue";
import { useRoute } from "vue-router";
import confetti from 'canvas-confetti';

const question = ref("");
const correctAnswer = ref(0);
const answerOptions = ref([]);
const score = ref(0);
const timeLeft = ref(30);
const gameOver = ref(false);
const GoBackButton = ref(false);
const highScore = ref(0);
const selectedAnswer = ref(null);
const isWrongAnswer = ref(false);
const route = useRoute();
const difficulty = ref(route.params.difficulty || "Easy");



let timer = null;

const generateQuestion = () => {
    let num1, num2, num3;

    switch (difficulty.value) {
        case "Easy":
            num1 = Math.floor(Math.random() * 50) + 1;
            num2 = Math.floor(Math.random() * 50) + 1;
            num3 = Math.floor(Math.random() * 50) + 1;
            break;
        case "Medium":
            num1 = Math.floor(Math.random() * 100) + 1;
            num2 = Math.floor(Math.random() * 100) + 1;
            num3 = Math.floor(Math.random() * 100) + 1;
            break;
        case "Hard":
            num1 = Math.floor(Math.random() * 200) + 1;
            num2 = Math.floor(Math.random() * 200) + 1;
            num3 = Math.floor(Math.random() * 200) + 1;
            break;
    }

    const operations = ["+", "-", "*"];
    const op1 = operations[Math.floor(Math.random() * operations.length)];
    const op2 = operations[Math.floor(Math.random() * operations.length)];

    question.value = `${num1} ${op1} ${num2} ${op2} ${num3} = ?`;

    let result;
    switch (op1) {
        case "+":
            result = num1 + num2;
            break;
        case "-":
            result = num1 - num2;
            break;
        case "*":
            result = num1 * num2;
            break;
    }

    switch (op2) {
        case "+":
            correctAnswer.value = result + num3;
            break;
        case "-":
            correctAnswer.value = result - num3;
            break;
        case "*":
            correctAnswer.value = result * num3;
            break;
    }

    // Generate answer options
    const options = [correctAnswer.value];
    while (options.length < 4) {
        const randomAnswer = correctAnswer.value + Math.floor(Math.random() * 20 - 10); // Random offset
        if (!options.includes(randomAnswer)) {
            options.push(randomAnswer);
        }
    }
    answerOptions.value = shuffleArray(options);
};
const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

const startGame = () => {
    score.value = 0;
    timeLeft.value = 30;
    gameOver.value = false;
    selectedAnswer.value = null;
    isWrongAnswer.value = false;
    generateQuestion();
    startTimer();
};

const startTimer = () => {
    if (timer) clearInterval(timer);
    timer = setInterval(() => {
        timeLeft.value--;
        if (timeLeft.value <= 0) {
            gameOver.value = true;
            clearInterval(timer);
            updateHighScore();
        }
    }, 1000);
};

const checkAnswer = (selectedOption) => {
    selectedAnswer.value = selectedOption;
    if (selectedOption === correctAnswer.value) {
        score.value++;
        generateQuestion();
        timeLeft.value = 30; // Reset timer
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
    } else {
        isWrongAnswer.value = true;
        setTimeout(() => {
            isWrongAnswer.value = false;
            selectedAnswer.value = null;
        }, 500); // Reset feedback after 500ms
    }
};

const getButtonColor = (option) => {
    if (selectedAnswer.value === option) {
        return isWrongAnswer.value ? "danger" : "primary";
    }
    return "light";
};

const updateHighScore = () => {
    if (score.value > highScore.value) {
        highScore.value = score.value;
        localStorage.setItem('highScore', highScore.value);
    }
};

onMounted(() => {
    if (route.name !== "Home") {
        GoBackButton.value = true;
    }
    highScore.value = localStorage.getItem('highScore') || 0;
    startGame();
});
</script>

<style scoped>
h2 {
    text-align: center;
    font-size: 24px;
}

p {
    text-align: center;
    font-size: 18px;
}

.answer-options {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
    margin: 20px 0;
}

ion-button {
    flex: 1 1 45%;
    max-width: 45%;
}

.game-over {
    text-align: center;
}

ion-progress-bar {
    margin: 20px auto;
    max-width: 300px;
}

/* Shake animation */
@keyframes shake {
    0% {
        transform: translateX(0);
    }

    25% {
        transform: translateX(-5px);
    }

    50% {
        transform: translateX(5px);
    }

    75% {
        transform: translateX(-5px);
    }

    100% {
        transform: translateX(0);
    }
}

.shake {
    animation: shake 0.5s;
}
</style>