<template>
    <ion-page>
        <ion-header>
            <ion-toolbar color="primary">
                <ion-buttons slot="start">
                    <ion-back-button default-href="/" />
                </ion-buttons>
                <ion-title>Game Options</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding" color="light">
            <ion-card class="animated-card">
                <ion-card-header>
                    <ion-card-title class="ion-text-center">Choose Difficulty</ion-card-title>
                </ion-card-header>
                <ion-card-content>
                    <ion-list>
                        <ion-item class="ion-margin-bottom" lines="none">
                            <ion-label>Difficulty</ion-label>
                            <ion-select v-model="difficulty" interface="action-sheet" class="custom-select">
                                <ion-select-option value="easy">Easy</ion-select-option>
                                <ion-select-option value="medium">Medium</ion-select-option>
                                <ion-select-option value="hard">Hard</ion-select-option>
                            </ion-select>
                        </ion-item>
                    </ion-list>
                    <ion-button expand="block" color="primary" @click="startGame" class="ion-margin-top">
                        Start Game
                    </ion-button>
                </ion-card-content>
            </ion-card>
        </ion-content>
    </ion-page>
</template>
