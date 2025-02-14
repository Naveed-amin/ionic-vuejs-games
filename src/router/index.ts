import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import MathQuiz from '@/views/games/MathQuizGame/MathQuiz.vue';
import DifficultySelection from '@/views/games/MathQuizGame/DifficultySelection.vue';
import Dictionary from '@/views/dictionary/Home.vue';
import ScientificCalculator from '@/views/math/ScientificCalculator.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/math_quiz',
    name: 'MathQuiz',
    component: MathQuiz
  },
  {
    path: '/math-quiz/difficulty',
    name: 'DifficultySelection',
    component: DifficultySelection,
},
{
    path: '/math-quiz/:difficulty',
    name: 'MathQuizGame',
    component: MathQuiz,
    props: true,
},
{
  path: '/dictionary',
  name: 'Dictionary',
  component: Dictionary,
},
{
  path: '/calculator',
  name: 'Calculator',
  component: ScientificCalculator,
},
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
