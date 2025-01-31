<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button default-href="/" />
                </ion-buttons>
                <ion-title>Select Difficulty</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content class="ion-padding">
            <div class="difficulty-options">
                <ion-button
                    v-for="(difficulty, index) in difficulties"
                    :key="index"
                    @click="selectDifficulty(difficulty)"
                    color="primary"
                >
                    {{ difficulty }}
                </ion-button>
            </div>
        </ion-content>
    </ion-page>
</template>

<script setup>
import { IonPage, IonButtons, IonBackButton, IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from "@ionic/vue";
import { useRouter } from "vue-router";

const router = useRouter();

const difficulties = ["Easy", "Medium", "Hard"];

const selectDifficulty = (difficulty) => {
    router.push({ name: "MathQuizGame", params: { difficulty } });
};
</script>

<style scoped>
.difficulty-options {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin: 20px 0;
}

ion-button {
    width: 100%;
}
</style>