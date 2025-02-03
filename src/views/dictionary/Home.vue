<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>WordInn Dictionary</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-searchbar v-model="searchQuery" @ionInput="handleLiveSearch" placeholder="Search for a word"></ion-searchbar>
      <ion-button expand="full" @click="handleSearch">Search</ion-button>
      <ion-list v-if="searchHistory.length > 0" class="history-container">
        <ion-chip v-for="(historyItem, index) in searchHistory" :key="index" @click="selectSuggestion(historyItem)">
          {{ historyItem }}
        </ion-chip>
      </ion-list>

      <ion-list v-if="suggestions.length > 0">
        <ion-item v-for="suggestion in suggestions" :key="suggestion" @click="selectSuggestion(suggestion)">
          {{ suggestion }}
        </ion-item>
      </ion-list>
      <ion-card v-if="errorMessage">
        <ion-card-content>
          <p v-if="errorMessage">{{ errorMessage }}</p>
        </ion-card-content>
      </ion-card>

      <ion-card v-if="wordData">
        <ion-card-header>
          <ion-card-title>{{ wordData.word }}</ion-card-title>
        </ion-card-header>

        <ion-card-content>
          <p><strong>Phonetic:</strong> {{ wordData.phonetic }}</p>
          <p v-if="wordData.phonetics.length">
            <strong>Pronunciations:</strong>
            <span v-for="(phonetic, index) in wordData.phonetics" :key="index">
              <audio v-if="phonetic.audio" :src="phonetic.audio" controls></audio>
              {{ phonetic.text }}
            </span>
          </p>

          <div v-for="(meaning, index) in wordData.meanings" :key="index">
            <h3>{{ meaning.partOfSpeech }}</h3>
            <ul>
              <li v-for="(definition, dIndex) in meaning.definitions" :key="dIndex">
                <p><strong>Definition:</strong> {{ definition.definition }}</p>
                <p v-if="definition.example"><strong>Example:</strong> {{ definition.example }}</p>
              </li>
            </ul>
            <p v-if="meaning.synonyms.length"><strong>Synonyms:</strong> {{ meaning.synonyms.join(', ') }}</p>
            <p v-if="meaning.antonyms.length"><strong>Antonyms:</strong> {{ meaning.antonyms.join(', ') }}</p>
          </div>
        </ion-card-content>
      </ion-card>

      <ion-footer v-if="wordData">
        <ion-toolbar>
          <ion-text>
            <a :href="wordData.sourceUrls[0]" target="_blank">Source</a>
          </ion-text>
        </ion-toolbar>
      </ion-footer>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonSearchbar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonList,
  IonItem,
  IonFooter,
  IonText
} from '@ionic/vue';
import axios from 'axios';

const searchQuery = ref('');
const wordData = ref(null);
const suggestions = ref([]);
const searchHistory = ref([]);
const errorMessage = ref('');

const fetchWordDefinition = async (word) => {
  try {
    const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    wordData.value = response.data[0];

    // Save search history
    addToHistory(word);
  } catch (error) {
    wordData.value = null;
    errorMessage.value = 'No definition found for this word. Please try another word.';
  }
};

const handleLiveSearch = async () => {
  if (searchQuery.value) {
    try {
      const response = await axios.get(`https://api.datamuse.com/sug?s=${searchQuery.value}&max=5`);
      suggestions.value = response.data.map((item) => item.word);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      suggestions.value = [];
    }
  } else {
    suggestions.value = [];
  }
};

const handleSearch = () => {
  if (searchQuery.value) {
    fetchWordDefinition(searchQuery.value);
    suggestions.value = [];
  }
};

const selectSuggestion = (suggestion) => {
  searchQuery.value = suggestion;
  fetchWordDefinition(suggestion);
  suggestions.value = [];
};

// Function to add searched word to history
const addToHistory = (word) => {
  if (!searchHistory.value.includes(word)) {
    searchHistory.value.unshift(word); // Add to the beginning
    if (searchHistory.value.length > 10) {
      searchHistory.value.pop(); // Keep only the last 10 searches
    }
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory.value)); // Save to localStorage
  }
};

// Function to load history from localStorage when the app starts
const loadHistory = () => {
  const storedHistory = JSON.parse(localStorage.getItem('searchHistory'));
  if (storedHistory) {
    searchHistory.value = storedHistory;
  }
};

// Load history when the component is mounted
onMounted(() => {
  loadHistory();
});
</script>

<style scoped>
.history-container {
  display: flex;
  overflow-x: auto;
  white-space: nowrap;
  padding: 10px;
}

ion-chip {
  margin-right: 8px;
  cursor: pointer;
}
</style>
