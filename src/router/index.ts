import { createRouter, createWebHistory } from 'vue-router'
import Lab1_1 from '../views/lab1/Lab1_1.vue';
import Lab1_2 from '../views/lab1/Lab1_2.vue';
import Lab1_3 from '../views/lab1/Lab1_3.vue';
import Lab1_5 from '../views/lab1/Lab1_5.vue';
import Lab1_6 from '../views/lab1/Lab1_6.vue';
import Lab1_7 from '../views/lab1/Lab1_7.vue';
import Lab1_8 from '../views/lab1/Lab1_8.vue';
import Lab2 from '../views/lab2/Lab2.vue';
import Lab3 from '../views/lab3/Lab3.vue';
import Lab4 from '../views/lab4/Lab4.vue';
import Lab5 from '../views/lab5/Lab5.vue';
import Lab6 from '../views/lab6/Lab6.vue';
import Lab7 from '../views/lab7/Lab7.vue';
import Lab8 from '../views/lab8/Lab8.vue';

const router = createRouter({
  history: createWebHistory(),
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
      path: '/lab2',
      name: 'lab2',
      component: Lab2
    },
    {
      path: '/lab3',
      name: 'lab3',
      component: Lab3
    },
    {
      path: '/lab4',
      name: 'lab4',
      component: Lab4
    },
    {
      path: '/lab5',
      name: 'lab5',
      component: Lab5
    },
    {
      path: '/lab6',
      name: 'lab6',
      component: Lab6
    },
    {
      path: '/lab7',
      name: 'lab7',
      component: Lab7
    },
    {
      path: '/lab8',
      name: 'lab8',
      component: Lab8
    }
  ]
})

export default router
