<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start" v-if="GoBackButton">
          <ion-back-button default-href="/" />
        </ion-buttons>
        <ion-title>Games</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-card color="primary" @click="$router.push('/math-quiz/difficulty')" class="professional-card">
        <img
          src="https://icons.veryicon.com/png/o/education-technology/icon-summary-of-educational-activities/mathematics-1.png"
          alt="Math Quiz Image" class="card-image" />
        <ion-card-header>
          <ion-card-title class="card-title">Math Quiz</ion-card-title>
          <ion-card-subtitle class="card-subtitle">Test Your Math Skills</ion-card-subtitle>
        </ion-card-header>

        <ion-card-content class="card-content">
          <p class="card-description">
            Challenge yourself with fun and interactive math problems. Improve your skills and become a Math Genius!
          </p>
          <ion-button expand="full" fill="solid" color="light" class="start-button">
            Start Now
          </ion-button>
        </ion-card-content>
      </ion-card>

      <ion-card color="secondary">
        <ion-card-header>
          <ion-card-title>Card Title</ion-card-title>
          <ion-card-subtitle>Card Subtitle</ion-card-subtitle>
        </ion-card-header>

        <ion-card-content> Card Content </ion-card-content>
      </ion-card>

      <ion-card color="tertiary">
        <ion-card-header>
          <ion-card-title>Card Title</ion-card-title>
          <ion-card-subtitle>Card Subtitle</ion-card-subtitle>
        </ion-card-header>

        <ion-card-content> Card Content </ion-card-content>
      </ion-card>

      <ion-card color="success">
        <ion-card-header>
          <ion-card-title>Card Title</ion-card-title>
          <ion-card-subtitle>Card Subtitle</ion-card-subtitle>
        </ion-card-header>

        <ion-card-content> Card Content </ion-card-content>
      </ion-card>

      <ion-card color="warning">
        <ion-card-header>
          <ion-card-title>Card Title</ion-card-title>
          <ion-card-subtitle>Card Subtitle</ion-card-subtitle>
        </ion-card-header>

        <ion-card-content> Card Content </ion-card-content>
      </ion-card>

      <ion-card color="danger">
        <ion-card-header>
          <ion-card-title>Card Title</ion-card-title>
          <ion-card-subtitle>Card Subtitle</ion-card-subtitle>
        </ion-card-header>

        <ion-card-content> Card Content </ion-card-content>
      </ion-card>

      <ion-card color="light">
        <ion-card-header>
          <ion-card-title>Card Title</ion-card-title>
          <ion-card-subtitle>Card Subtitle</ion-card-subtitle>
        </ion-card-header>

        <ion-card-content> Card Content </ion-card-content>
      </ion-card>

      <ion-card color="medium">
        <ion-card-header>
          <ion-card-title>Card Title</ion-card-title>
          <ion-card-subtitle>Card Subtitle</ion-card-subtitle>
        </ion-card-header>

        <ion-card-content> Card Content </ion-card-content>
      </ion-card>

      <ion-card color="dark">
        <ion-card-header>
          <ion-card-title>Card Title</ion-card-title>
          <ion-card-subtitle>Card Subtitle</ion-card-subtitle>
        </ion-card-header>

        <ion-card-content> Card Content </ion-card-content>
      </ion-card>
    </ion-content>

  </ion-page>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { IonPage, IonHeader, IonButtons, IonBackButton, IonToolbar, IonTitle, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from "@ionic/vue";
import { useRoute } from "vue-router";
const GoBackButton = ref(false);
const route = useRoute();

onMounted(() => {
  if (route.name !== "Home") {
    GoBackButton.value = true;
  }
});
</script>

<style scoped>
.professional-card {
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.professional-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
}

.card-image {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
}

.card-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #ffffff;
  text-align: center;
  margin-top: 10px;
}

.card-subtitle {
  font-size: 1rem;
  color: #e0e0e0;
  text-align: center;
}

.card-content {
  padding: 16px;
  background: rgba(255, 255, 255, 0.1);
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
}

.card-description {
  font-size: 0.9rem;
  color: #ffffff;
  text-align: center;
  margin-bottom: 16px;
}

.start-button {
  font-weight: bold;
  margin-top: 10px;
  --border-radius: 8px;
}
</style>