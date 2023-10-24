<script setup lang="ts">
import {ref, watchEffect} from "vue";
import * as THREE from 'three';
import {Object3D} from "three";
import {getTexturedSphere} from "@/services/figures";
import {setPlanetParameters} from "@/services/planets";

const canvasElement = ref();

watchEffect(() => {
  const canvas = canvasElement.value;

  const width = window.innerWidth - 65;
  const height = window.innerHeight - 200;
  const renderer = new THREE.WebGLRenderer({canvas: canvas})
  renderer.setSize(width, height)

  const ambientLight = new THREE.AmbientLight(0x919191);
  const pointLight = new THREE.PointLight(0xC1C1C1, 3, 200000);

  pointLight.castShadow = true;
  pointLight.shadow.mapSize.width = 2048;
  pointLight.shadow.mapSize.height = 2048;
  pointLight.position.set(0, 0, 0);

  const scene = new THREE.Scene();

  scene.add(ambientLight);
  scene.add(pointLight);

  const sun = getTexturedSphere(2300, 80, 80, '/src/assets/textures/sun.jpg', 0xff0000);
  const earth = getTexturedSphere(100, 40, 40, '/src/assets/textures/earth.jpg');
  const mercury = getTexturedSphere(60, 20, 20, '/src/assets/textures/mercury.jpg');
  const venus = getTexturedSphere(90, 20, 20, '/src/assets/textures/venus.jpg');
  const mars = getTexturedSphere(80, 20, 20, '/src/assets/textures/mars.jpg');
  const jupiter = getTexturedSphere(350, 20, 20, '/src/assets/textures/jupiter.jpg');
  const saturn = getTexturedSphere(230, 20, 20, '/src/assets/textures/saturn.jpg');

  const planets: Array<Object3D> = [];
  planets.push(mercury, venus, earth, mars, jupiter, saturn);
  planets.forEach((planet) => {
    planet.castShadow = true;
    scene.add(planet);
  });

  scene.add(sun);

  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 30000)

  camera.position.set(5000, 0, 12000);
  let t = 0;

  const render = () => {
    requestAnimationFrame(render);

    setPlanetParameters(mercury, t * 0.3, 4000, 0 , 4000);
    setPlanetParameters(venus, t * 0.2, 5500, 0 , 5500);
    setPlanetParameters(earth, t * 0.1, 7500, 0 , 7500);
    setPlanetParameters(mars, t * 0.08, 8000, 0 , 8000);
    setPlanetParameters(jupiter, t * 0.08, 10700, 0 , 10700);
    setPlanetParameters(saturn, t * 0.08, 12000, 0 , 12000);

    t += 0.01;

    sun.rotation.y += 0.001;

    renderer.render(scene, camera);
  }

  render();
})

</script>

<template>
  <h1>Добавление источников света. Работа с тенями.</h1>
  <canvas ref="canvasElement"></canvas>
</template>

<style>
h1 {
  margin: 15px 0px;
}
</style>