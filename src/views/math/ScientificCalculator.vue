<template>
  <ion-page>
    <ion-content class="ion-padding">
      <!-- Display Area -->
      <div class="display-container">
        <ion-input v-model="displayValue" type="text" readonly class="display-input"></ion-input>
      </div>

      <!-- Calculator Buttons -->
      <ion-grid class="calculator-grid">
        <!-- Row 1 -->
        <ion-row>
          <ion-col size="3">
            <ion-button expand="full" @click="clearDisplay" class="operator-button">AC</ion-button>
          </ion-col>
          <ion-col size="3">
            <ion-button expand="full" @click="deleteLast" class="operator-button">DEL</ion-button>
          </ion-col>
          <ion-col size="3">
            <ion-button expand="full" @click="appendOperator('%')" class="operator-button">%</ion-button>
          </ion-col>
          <ion-col size="3">
            <ion-button expand="full" @click="appendOperator('/')" class="operator-button">/</ion-button>
          </ion-col>
        </ion-row>

        <!-- Row 2 -->
        <ion-row>
          <ion-col size="3">
            <ion-button expand="full" @click="appendNumber('7')">7</ion-button>
          </ion-col>
          <ion-col size="3">
            <ion-button expand="full" @click="appendNumber('8')">8</ion-button>
          </ion-col>
          <ion-col size="3">
            <ion-button expand="full" @click="appendNumber('9')">9</ion-button>
          </ion-col>
          <ion-col size="3">
            <ion-button expand="full" @click="appendOperator('*')" class="operator-button">*</ion-button>
          </ion-col>
        </ion-row>

        <!-- Row 3 -->
        <ion-row>
          <ion-col size="3">
            <ion-button expand="full" @click="appendNumber('4')">4</ion-button>
          </ion-col>
          <ion-col size="3">
            <ion-button expand="full" @click="appendNumber('5')">5</ion-button>
          </ion-col>
          <ion-col size="3">
            <ion-button expand="full" @click="appendNumber('6')">6</ion-button>
          </ion-col>
          <ion-col size="3">
            <ion-button expand="full" @click="appendOperator('-')" class="operator-button">-</ion-button>
          </ion-col>
        </ion-row>

        <!-- Row 4 -->
        <ion-row>
          <ion-col size="3">
            <ion-button expand="full" @click="appendNumber('1')">1</ion-button>
          </ion-col>
          <ion-col size="3">
            <ion-button expand="full" @click="appendNumber('2')">2</ion-button>
          </ion-col>
          <ion-col size="3">
            <ion-button expand="full" @click="appendNumber('3')">3</ion-button>
          </ion-col>
          <ion-col size="3">
            <ion-button expand="full" @click="appendOperator('+')" class="operator-button">+</ion-button>
          </ion-col>
        </ion-row>

        <!-- Row 5 -->
        <ion-row>
          <ion-col size="3">
            <ion-button expand="full" @click="sciCal()" class="special-button">Sci</ion-button>
          </ion-col>
          <ion-col size="3">
            <ion-button expand="full" @click="appendNumber('0')">0</ion-button>
          </ion-col>
          <ion-col size="3">
            <ion-button expand="full" @click="appendNumber('.')">.</ion-button>
          </ion-col>
          <ion-col size="3">
            <ion-button expand="full" @click="calculateResult" class="equal-button">=</ion-button>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref } from 'vue';
import { IonButton, IonCol, IonContent, IonGrid, IonInput, IonPage, IonRow } from '@ionic/vue';
const displayValue = ref('');


const appendNumber = (number) => {
  if (displayValue.value === '0' && number !== '.') {
    displayValue.value = number;
  } else {
    displayValue.value += number;
  }
};

const appendOperator = (operator) => {
  if (displayValue.value !== '' && !isNaN(displayValue.value.slice(-1))) {
    displayValue.value += operator;
  }
};


const clearDisplay = () => {
  displayValue.value = '';
};


const deleteLast = () => {
  displayValue.value = displayValue.value.slice(0, -1);
};

const calculateResult = () => {
  try {
    displayValue.value = eval(displayValue.value).toString();
  } catch (error) {
    displayValue.value = 'Error';
  }
};

const sciCal = () => {
  alert('Scientific Calculator coming soon!');
};
</script>

<style scoped>
.display-container {
  margin-bottom: 20px;
}

.display-input {
  text-align: right;
  font-size: 2rem;
  font-weight: bold;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 10px;
  color: #333;
  background-color: #f9f9f9;
}

.calculator-grid {
  max-width: 400px;

  margin: 0 auto;
}

ion-button {
  font-size: 1.2rem;
  font-weight: bold;
  --background: #e0e0e0;
  --color: #333;
  --border-radius: 8px;
}

.operator-button {
  --background: #ff9500;
  --color: #fff;
}

.equal-button {
  --background: #34c759;
  --color: #fff;
}

.special-button {
  --background: #5856d6;
  --color: #fff;
}
</style>
