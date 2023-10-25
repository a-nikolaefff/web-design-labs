<script setup lang="ts">
import {ref, watchEffect} from "vue";
import * as THREE from 'three';
import {Object3D} from "three";
import {getTexturedSphere} from "@/services/figures";
import {setPlanetParameters} from "@/services/planets";

const canvasElement = ref();

const Orbit = function (radius: number) {
  this.radius = radius;

  this.draw = function (scene: any) {
    const og = new THREE.Geometry();
    const om = new THREE.PointsMaterial({color: 0xbfbfbf, size: 1, sizeAttenuation: false});

    for (let i = 0; i < 50000; i++) {
      let v = new THREE.Vector3();
      v.x = Math.sin(Math.PI / 180 * i) * this.radius;
      v.z = Math.cos(Math.PI / 180 * i) * this.radius;

      og.vertices.push(v);
    }

    const obj = new THREE.Points(og, om);
    scene.add(obj);
  }
}

watchEffect(() => {
  const canvas = canvasElement.value;

  const width = window.innerWidth - 65;
  const height = window.innerHeight - 200;
  const renderer = new THREE.WebGLRenderer({canvas: canvas})
  renderer.setSize(width, height)

  const ambientLight = new THREE.AmbientLight(0x808080);
  const pointLight = new THREE.PointLight(0xffffff, 3, 200000);

  pointLight.castShadow = true;
  pointLight.shadow.mapSize.width = 2048;
  pointLight.shadow.mapSize.height = 2048;
  pointLight.position.set(0, 0, 0);

  const scene = new THREE.Scene();

  scene.add(ambientLight);
  scene.add(pointLight);

  const sun = getTexturedSphere(2300, 80, 80, '/src/assets/textures/sun.jpg', 0xff0000);

  scene.add(sun);

  const mercury = getTexturedSphere(60, 20, 20, '/src/assets/textures/mercury.jpg');
  const venus = getTexturedSphere(90, 20, 20, '/src/assets/textures/venus.jpg');
  const earth = getTexturedSphere(100, 40, 40, '/src/assets/textures/earth.jpg');
  const mars = getTexturedSphere(80, 20, 20, '/src/assets/textures/mars.jpg');
  const jupiter = getTexturedSphere(350, 20, 20, '/src/assets/textures/jupiter.jpg');
  const saturn = getTexturedSphere(230, 20, 20, '/src/assets/textures/saturn.jpg');

  const planets: Array<Object3D> = [];
  planets.push(mercury, venus, earth, mars, jupiter, saturn);
  planets.forEach((planet) => {
    planet.castShadow = true;
    scene.add(planet);
  });

  const earthOrbitGeometry = new THREE.Geometry();
  const earthOrbitMaterial = new THREE.PointsMaterial({color: 0xffffff, size: 1, sizeAttenuation: false});

  for (let i = 0; i < 200000; i++) {
    let earthOrbitVertex = new THREE.Vector3();
    earthOrbitVertex.x = Math.sin(180 / Math.PI * i) * 7500;
    earthOrbitVertex.z = Math.cos(180 / Math.PI * i) * 7500;

    earthOrbitGeometry.vertices.push(earthOrbitVertex);
  }

  const earthOrbit = new THREE.Points(earthOrbitGeometry, earthOrbitMaterial);
  earthOrbit.castShadow = true;
  scene.add(earthOrbit);

  const mercuryOrbit = new Orbit(4000);
  const venusOrbit = new Orbit(5500);
  const marsOrbit = new Orbit(8000);
  const jupiterOrbit = new Orbit(10700);
  const saturnOrbit = new Orbit(12000);

  const orbits = [];
  orbits.push(mercuryOrbit, venusOrbit, marsOrbit, jupiterOrbit, saturnOrbit);
  orbits.forEach((orbit) => {
    orbit.draw(scene);
  });

  const saturnRingGeometry = new THREE.Geometry();
  const saturnRingMaterial = new THREE.PointsMaterial({color: 0x3A3A3A, size: 1, sizeAttenuation: false});

  for (let i = 0; i < 20000; i++) {
    let vertex = new THREE.Vector3();
    vertex.x = Math.sin(Math.PI / 180 * i) * (550 - i / 80);
    vertex.y = Math.random() * 20;
    vertex.z = Math.cos(Math.PI / 180 * i) * (550 - i / 80);

    saturnRingGeometry.vertices.push(vertex);
  }

  const saturnRing = new THREE.Points(saturnRingGeometry, saturnRingMaterial);
  saturnRing.castShadow = true;
  scene.add(saturnRing);

  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 30000)

  camera.position.set(0, 0, 19000);

  let t = 0;

  const render = () => {
    requestAnimationFrame(render);

    camera.position.y = 1500;

    saturnRing.position.x = saturn.position.x;
    saturnRing.position.z = saturn.position.z;

    setPlanetParameters(mercury, t * 0.3, 4000, 0 , 4000);
    setPlanetParameters(venus, t * 0.2, 5500, 0 , 5500);
    setPlanetParameters(earth, t * 0.1, 7500, 0 , 7500);
    setPlanetParameters(mars, t * 0.08, 8000, 0 , 8000);
    setPlanetParameters(jupiter, t * 0.08, 10700, 0 , 10700);
    setPlanetParameters(saturn, t * 0.08, 12000, 0 , 12000);

    sun.rotation.y += 0.001;
    earth.rotation.y += 0.0008;

    saturn.rotation.y += 0.001;
    saturnRing.rotation.y -= 0.001;

    t += 0.01;

    renderer.render(scene, camera);
  }

  render();
})

</script>

<template>
  <h1>Создание орбит планет.</h1>
  <canvas ref="canvasElement"></canvas>
</template>

<style scoped lang="scss">
h1 {
  margin: 15px 0px;
}
</style>