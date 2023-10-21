<script setup lang="ts">
import { RouterView } from 'vue-router'
import MainMenu from './components/Menu/MainMenu.vue';
</script>

<template>
  <div class="header">
    <p>
      Лабораторные работы по предмету "Дизайн в WEB-ресурсах".
      Студент Николаев Александр Евгеньевич группы М22 ИСТ-5з НГТУ им. Р.Е. Алексеева.
    </p>
  </div>
  <hr>
  <MainMenu/>
  <hr>
  <div class="content">
    <RouterView />
  </div>
</template>

<style scoped  lang="scss">
.header {
  padding: 15px 0 15px 27px;
  font-size: 20px;
  font-weight: 1200;
  width: 100%;
}

.content {
  margin: 10px 0px 10px 30px;
}
</style>
