<script setup lang="ts">
import {ref, watchEffect} from "vue";
import * as THREE from 'three';
import {Object3D} from "three";
import {getTexturedSphere} from "@/services/figures";
import {setPlanetParameters} from "@/services/planets";

const canvasElement = ref();

watchEffect(() => {
  const canvas = canvasElement.value

  const width = window.innerWidth - 65;
  const height = window.innerHeight - 200;
  const renderer = new THREE.WebGLRenderer({canvas: canvas})
  renderer.setSize(width, height)

  const light1 = new THREE.AmbientLight(0x919191);
  const light2 = new THREE.PointLight(0xC1C1C1, 3, 200000);

  light2.castShadow = true;
  light2.shadow.mapSize.width = 2048;
  light2.shadow.mapSize.height = 2048;
  light2.position.set(0, 0, 0);

  const sun = getTexturedSphere(2300, 80, 80, '/src/assets/textures/sun.jpg', 0xff0000);
  const earth = getTexturedSphere(100, 40, 40, '/src/assets/textures/earth.jpg');
  const mercury = getTexturedSphere(60, 20, 20, '/src/assets/textures/mercury.jpg');
  const venus = getTexturedSphere(90, 20, 20, '/src/assets/textures/venus.jpg');
  const mars = getTexturedSphere(80, 20, 20, '/src/assets/textures/mars.jpg');
  const jupiter = getTexturedSphere(350, 20, 20, '/src/assets/textures/jupiter.jpg');
  const saturn = getTexturedSphere(230, 20, 20, '/src/assets/textures/saturn.jpg');

  const scene = new THREE.Scene();

  scene.add(light1);
  scene.add(light2);

  const planets: Array<Object3D> = [];
  planets.push(mercury, venus, earth, mars, jupiter, saturn);
  planets.forEach((planet) => {
    planet.castShadow = true;
    scene.add(planet);
  });

  scene.add(sun);

  const saturnRungGeometry = new THREE.Geometry();
  const saturnRingGeometryMaterial = new THREE.PointsMaterial({color: 0x3A3A3A, size: 1, sizeAttenuation: false});

  for (let i = 0; i < 20000; i++) {
    const vertex = new THREE.Vector3();
    vertex.x = Math.sin(Math.PI / 180 * i) * (550 - i / 80);
    vertex.y = Math.random() * 20;
    vertex.z = Math.cos(Math.PI / 180 * i) * (550 - i / 80);

    saturnRungGeometry.vertices.push(vertex);
  }

  const ring = new THREE.Points(saturnRungGeometry, saturnRingGeometryMaterial);
  ring.castShadow = true;
  scene.add(ring);

  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 30000)

  camera.position.set(0, 0, 15000);

  let t = 0;

  const render = () => {
    requestAnimationFrame(render);

    setPlanetParameters(mercury, t * 0.3, 4000, 0 , 4000);
    setPlanetParameters(venus, t * 0.2, 5500, 0 , 5500);
    setPlanetParameters(earth, t * 0.1, 7500, 0 , 7500);
    setPlanetParameters(mars, t * 0.08, 8000, 0 , 8000);
    setPlanetParameters(jupiter, t * 0.08, 10700, 0 , 10700);
    setPlanetParameters(saturn, t * 0.08, 12000, 0 , 12000);

    ring.position.x = saturn.position.x;
    ring.position.z = saturn.position.z;

    camera.position.x = saturn.position.x + 1000;
    camera.position.z = saturn.position.z + 1000;
    camera.position.y = 200;
    camera.lookAt(saturn.position);

    t += 0.01;

    sun.rotation.y += 0.001;
    saturn.rotation.y += 0.001;
    ring.rotation.y -= 0.001;

    renderer.render(scene, camera);
  }

  render();
})

</script>

<template>
  <h1>Создание кольца сатурна.</h1>
  <canvas ref="canvasElement"></canvas>
</template>

<style>
h1 {
  margin: 15px 0px;
}
</style>