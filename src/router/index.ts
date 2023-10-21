import { createRouter, createWebHistory } from 'vue-router'
import Lab1_1 from '../views/Lab1_1/Lab1_1.vue';
import Lab1_2 from '../views/Lab1_2/Lab1_2.vue';
import Lab1_3 from '../views/Lab1_3/Lab1_3.vue';
import Lab1_4 from '../views/Lab1_4/Lab1_4.vue';
import Lab1_5 from '../views/Lab1_5/Lab1_5.vue';
import Lab1_6 from '../views/Lab1_6/Lab1_6.vue';
import Lab1_7 from '../views/Lab1_7/Lab1_7.vue';
import Lab1_8 from '../views/Lab1_8/Lab1_8.vue';
import Lab2_1 from '../views/Lab2_1/Lab2_1.vue';
import Lab3_1 from '../views/Lab3_1/Lab3_1.vue';
import Lab4_1 from '../views/Lab4_1/Lab4_1.vue';
import Lab5_1 from '../views/Lab5_1/Lab5_1.vue';
import Lab6_1 from '../views/Lab6_1/Lab6_1.vue';
import Lab7_1 from '../views/Lab7_1/Lab7_1.vue';
import Lab8_1 from '../views/Lab8_1/Lab8_1.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Lab1_1
    },
    {
      path: '/lab1/1',
      name: 'lab1_1',
      component: Lab1_1
    },
    {
      path: '/lab1/2',
      name: 'lab1_2',
      component: Lab1_2
    },
    {
      path: '/lab1/3',
      name: 'lab1_3',
      component: Lab1_3
    },
    {
      path: '/lab1/4',
      name: 'lab1_4',
      component: Lab1_4
    },
    {
      path: '/lab1/5',
      name: 'lab1_5',
      component: Lab1_5
    },
    {
      path: '/lab1/6',
      name: 'lab1_6',
      component: Lab1_6
    },
    {
      path: '/lab1/7',
      name: 'lab1_7',
      component: Lab1_7
    },
    {
      path: '/lab1/8',
      name: 'lab1_8',
      component: Lab1_8
    },
    {
      path: '/lab2/1',
      name: 'lab2_1',
      component: Lab2_1
    },
    {
      path: '/lab3/1',
      name: 'lab3_1',
      component: Lab3_1
    },
    {
      path: '/lab4/1',
      name: 'lab4_1',
      component: Lab4_1
    },
    {
      path: '/lab5/1',
      name: 'lab5_1',
      component: Lab5_1
    },
    {
      path: '/lab6/1',
      name: 'lab6_1',
      component: Lab6_1
    },
    {
      path: '/lab7/1',
      name: 'lab7_1',
      component: Lab7_1
    },
    {
      path: '/lab8/1',
      name: 'lab8_1',
      component: Lab8_1
    }
  ]
})

export default router
