<script setup lang="ts">
import {ref, watchEffect} from "vue";
import * as THREE from 'three';
import {getTexturedSphere} from "@/services/figures";
import {createStars} from "@/services/stars";
import {getSaturnRing, setPlanetParameters} from "@/services/planets";

const canvasElement = ref();

const Orbit = function (radius: number) {
  this.radius = radius;

  this.draw = function (scene: any) {
    const geometry = new THREE.Geometry();
    const material = new THREE.PointsMaterial({
      color: 0xbfbfbf,
      size: 1,
      sizeAttenuation: false});

    for (let i = 0; i < 500; i++) {
      let v = new THREE.Vector3();
      v.x = Math.sin(180 / Math.PI * i) * this.radius;
      v.z = Math.cos(180 / Math.PI * i) * this.radius;

      geometry.vertices.push(v);
    }

    const orbit = new THREE.Points(geometry, material);
    scene.add(orbit);
  }
}

const Planet = function (radius: number, texture: string) {
  this.radius = radius;
  this.texture = texture;
  this.init = function () {
    let geometry = new THREE.SphereGeometry(this.radius, 40, 40);
    const textureLoader = new THREE.TextureLoader();
    const loadedTexture = textureLoader.load(this.texture);
    loadedTexture.anisotropy = 8;
    let material = new THREE.MeshPhongMaterial({map: loadedTexture});
    let planet = new THREE.Mesh(geometry, material)
    planet.castShadow = true;

    return planet;
  }
}

watchEffect(() => {
  const canvas = canvasElement.value;

  const width = window.innerWidth - 65;
  const height = window.innerHeight - 200;

  const renderer = new THREE.WebGLRenderer({canvas: canvas});
  renderer.setSize(width, height);

  const scene = new THREE.Scene();
  const ambientLight = new THREE.AmbientLight(0x808080);
  const pointLight = new THREE.PointLight(0xffffff, 3, 200000);

  pointLight.castShadow = true;
  pointLight.shadow.mapSize.width = 2048;
  pointLight.shadow.mapSize.height = 2048;
  pointLight.position.set(0, 0, 0);

  scene.add(ambientLight);
  scene.add(pointLight);

  const sun = getTexturedSphere(2300, 80, 80, '/src/assets/textures/sun.jpg', 0xff0000, 8);
  scene.add(sun);

  const mercury = new Planet(60, '/src/assets/textures/mercury.jpg').init();
  const venus = new Planet(90, '/src/assets/textures/venus.jpg').init();
  const earth = new Planet(100, '/src/assets/textures/earth.jpg').init();
  const mars = new Planet(80, '/src/assets/textures/mars.jpg').init();
  const jupiter = new Planet(350, '/src/assets/textures/jupiter.jpg').init();
  const saturn = new Planet(230, '/src/assets/textures/saturn.jpg').init();

  const planets = [];
  planets.push(mercury, venus, earth, mars, jupiter, saturn);
  planets.forEach((planet) => {
    planet.castShadow = true;
    scene.add(planet);
  });

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

  const saturnRing = getSaturnRing(0x3A3A3A, 1);
  saturnRing.castShadow = true;
  scene.add(saturnRing);

  const stars = createStars(0xffffff, 40000, 200);
  scene.add(stars);

  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 30000)

  camera.position.set(0, 0, 19000);

  let t = 0;

  const render = () => {
    requestAnimationFrame(render);

    setPlanetParameters(mercury, t * 0.3, 4000, 0 , 4000);
    setPlanetParameters(venus, t * 0.2, 5500, 0 , 5500);
    setPlanetParameters(earth, t * 0.1, 7500, 0 , 7500);
    setPlanetParameters(mars, t * 0.08, 8000, 0 , 8000);
    setPlanetParameters(jupiter, t * 0.08, 10700, 0 , 10700);
    setPlanetParameters(saturn, t * 0.08, 12000, 0 , 12000);

    saturnRing.position.x = saturn.position.x;
    saturnRing.position.z = saturn.position.z;

    sun.rotation.y += 0.001;
    earth.rotation.y += 0.0008;

    saturn.rotation.y += 0.001;
    saturnRing.rotation.y -= 0.001;

    camera.position.y = 1500;

    t += 0.01;

    renderer.render(scene, camera);
  }

  render();
})

</script>

<template>
  <h1>Оптимизация</h1>
  <canvas ref="canvasElement"></canvas>
</template>

<style scoped>
h1 {
  margin: 15px 0px;
}
</style>