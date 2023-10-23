<script setup lang="ts">
import {ref, watchEffect} from "vue";
import * as THREE from 'three';
import {Object3D} from "three";
import {getSphere} from "@/services/figures";

interface IPlanet {
  name: string;
  object3D: Object3D;
}

const canvasElement = ref();

const selectedPlanetName = ref(undefined);

const speed = ref(undefined);
const x = ref(undefined);
const y = ref(undefined);
const z = ref(undefined);

let previousPlanetName: string|undefined = undefined;

const getDefaultParameters = (planetName: string) => {
  switch (planetName) {
    case 'mercury':
      return {speed: 0.3, x: 4000, y: 0, z: 4000};
    case 'venus':
      return {speed: 0.2, x: 5500, y: 0, z: 5500};
    case 'earth':
      return {speed: 0.1, x: 7500, y: 0, z: 7500};
    case 'mars':
      return {speed: 0.08, x: 8000, y: 0, z: 8000};
    default:
      return {speed: undefined, x: undefined, y: undefined, z: undefined};
  }
};

watchEffect(() => {
  const canvas = canvasElement.value;

  const width = window.innerWidth - 65
  const height = window.innerHeight - 200

  const renderer = new THREE.WebGLRenderer({canvas: canvas})
  renderer.setSize(width, height)

  const sun = getSphere(2300, 80, 80, true);

  const mercury: IPlanet = {name: 'mercury', object3D: getSphere(60, 20, 20)};
  const venus: IPlanet = {name: 'venus', object3D: getSphere(90, 20, 20)};
  const earth: IPlanet = {name: 'earth', object3D: getSphere(100, 40, 40)};
  const mars: IPlanet = {name: 'mars', object3D: getSphere(80, 20, 20)};

  const planets: Array<IPlanet> = [];
  planets.push(mercury, venus, earth, mars);

  const scene = new THREE.Scene()
  scene.add(sun);
  planets.forEach((planet) => scene.add(planet.object3D))

  const light = new THREE.AmbientLight(0xffffff)
  scene.add(light)

  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 300000)
  camera.position.set(0, 0, 15000)

  const getSelectedPlanet = (): IPlanet|undefined => {
    switch (selectedPlanetName.value) {
      case 'mercury':
        return mercury;
      case 'venus':
        return venus;
      case 'earth':
        return earth;
      case 'mars':
        return mars;
      default:
        return undefined;
    }
  };

  const selectedPlanet = getSelectedPlanet();

  if (selectedPlanet && previousPlanetName !== selectedPlanet.name) {
    const defaultParams = getDefaultParameters(selectedPlanet.name);

    speed.value = defaultParams.speed;
    x.value = defaultParams.x;
    y.value = defaultParams.y;
    z.value = defaultParams.z;

    previousPlanetName = selectedPlanet.name;
  }

  const setPlanetParameters = (planet: IPlanet, speed: number, x: number, y: number, z: number) => {
    planet.object3D.position.x = Math.sin(speed) * x;
    planet.object3D.position.y = y;
    planet.object3D.position.z = Math.cos(speed) * z;
  };

  let t = 0;

  const render = () => {
    requestAnimationFrame(render);

    planets.forEach((planet) => {
      const params = getDefaultParameters(planet.name);

      if (planet === selectedPlanet) {
        setPlanetParameters(planet, t * speed.value, x.value, y.value, z.value);
      } else {
        setPlanetParameters(planet, t * params.speed, params.x, params.y, params.z);
      }
    })

    t += 0.01;
    sun.rotation.y += 0.001;

    renderer.render(scene, camera);
  }

  render();

})

</script>

<template>
  <h1>Анимация моделей. Создание солнечной системы.</h1>

  <div class="block planet-selection">
    <div class="block-head">Выбор планеты</div>
    <div>
      <input type="radio" id="mercury" value="mercury" v-model="selectedPlanetName"/>
      <label for="mercury">Меркурий</label>
    </div>
    <div>
      <input type="radio" id="venus" value="venus" v-model="selectedPlanetName"/>
      <label for="venus">Венера</label>
    </div>
    <div>
      <input type="radio" id="earth" value="earth" v-model="selectedPlanetName"/>
      <label for="earth">Земля</label>
    </div>
    <div>
      <input type="radio" id="mars" value="mars" v-model="selectedPlanetName">
      <label for="earth">Марс</label>
    </div>
  </div>

  <div class="block parameter-block">
    <div class="block-head">Параметры планеты</div>
    <div class="input-block">
      <p>Cкорость вращения</p>
      <input v-model="speed"/>
    </div>

    <div class="input-block">
      <p>Отдаление по оси X</p>
      <input v-model="x"/>
    </div>

    <div class="input-block">
      <p>Отдаление по оси Y</p>
      <input v-model="y"/>
    </div>

    <div class="input-block">
      <p>Отдаление по оси Z</p>
      <input v-model="z"/>
    </div>
  </div>
  <div class="content">
    <canvas ref="canvasElement"></canvas>
  </div>
</template>

<style scoped lang="scss">

h1 {
  margin: 15px 0px;
}

label {
  margin-left: 10px;
}

.block {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: end;
  margin-bottom: 20px;
  padding: 15px;
  border: 1px solid black;
  border-radius: 5px;
  font-size: 16px;
}

.block-head {
  position: absolute;
  top: 0;
  left: 50%;
  padding: 0 15px;
  transform: translateX(-50%) translateY(-15px);
  line-height: 25px;
  font-weight: bold;
  text-transform: uppercase;
  background: #FFF;
}

.parameter-block {
  width: 1000px;
}

.planet-selection {
  width: 500px;
}

</style>