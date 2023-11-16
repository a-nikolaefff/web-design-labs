<script setup lang="ts">
import {ref, watchEffect} from "vue";
import * as THREE from 'three';
import {createStars} from "@/services/stars";

const canvasElement = ref();

watchEffect(() => {
  const canvas = canvasElement.value;

  const width = window.innerWidth - 65;
  const height = window.innerHeight - 200;
  const renderer = new THREE.WebGLRenderer({canvas: canvas})
  renderer.setSize(width, height)

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 300000)
  camera.position.set(0, 0, 9000);

  const stars = createStars(0xffffff, 40000, 2000);
  scene.add(stars);

  renderer.render(scene, camera);
})

</script>

<template>
  <h1>Звездное небо</h1>
  <canvas ref="canvasElement"></canvas>
</template>

<style scoped lang="scss">
h1 {
  margin: 15px 0px;
}
</style>