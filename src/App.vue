<script setup lang="ts">
import { RouterView } from 'vue-router'
import MainMenu from './components/Menu/MainMenu.vue';
</script>

<template>
  <div class="header">
    <img alt="ГИС НГТУ" class="logo" src="@/assets/gis_logo.png" width="150" height="64" />
  </div>
  <MainMenu />
  <div class="content">
    <RouterView />
  </div>
</template>

<style scoped  lang="scss">
.header {
  width: 100%;
  height: 84px;
  box-shadow: 0 5px 5px -5px rgba(0, 0, 0, .5);
}

.header img {

  margin-top: 10px;
  margin-left: 30px;

}

.menu {
  padding-left: 15px;
  padding-top: 10px;
  position: absolute;
  width: 250px;
  height: calc(100vh - 84px);
  //background: red;
  box-shadow: 0px 5px 3px rgba(0, 0, 0, .5);
  //border-right: 1px solid rgba(159, 157, 247, 0.212);
}

.content {
  margin-left: 300px;
}
</style>
