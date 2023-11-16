<script setup lang="ts">
import {ref, watchEffect} from "vue";
import * as THREE from 'three';
import {Camera, Object3D} from "three";
import {OrbitControls} from 'three-orbitcontrols-ts';
import {getTexturedSphere} from "@/services/figures";
import {setPlanetParameters} from "@/services/planets";

const canvasElement = ref();
const selectedPlanetName = ref('mercury');

watchEffect(() => {
  const canvas = canvasElement.value;

  const sun: Object3D = getTexturedSphere(2300, 80, 80, '/src/assets/sun.jpg', 0xff0000);
  const mercury: Object3D = getTexturedSphere(60, 20, 20, '/src/assets/mercury.jpg');
  const venus: Object3D = getTexturedSphere(90, 20, 20, '/src/assets/venus.jpg');
  const earth: Object3D = getTexturedSphere(100, 40, 40, '/src/assets/earth.jpg');
  const mars: Object3D = getTexturedSphere(80, 20, 20, '/src/assets/textures/mars.jpg');
  const jupiter: Object3D = getTexturedSphere(350, 20, 20, '/src/assets/textures/jupiter.jpg');
  const saturn: Object3D = getTexturedSphere(230, 20, 20, '/src/assets/textures/saturn.jpg');

  const getSelectedPlanet = (planetName: string): Object3D|undefined => {
    switch (planetName) {
      case 'mercury':
        return mercury;
      case 'venus':
        return venus;
      case 'earth':
        return earth;
      case 'mars':
        return mars;
      case 'saturn':
        return saturn;
      case 'jupiter':
        return jupiter;
      default:
        return undefined;
  }};

  const focus = (camera: Camera) => {
    const selectedPlanet = getSelectedPlanet(selectedPlanetName.value);

    if (selectedPlanet) {
      camera.position.x = selectedPlanet.position.x + 1000;
      camera.position.z = selectedPlanet.position.z + 1000;
      camera.lookAt(selectedPlanet.position);
    }
  }

  const width = window.innerWidth - 65;
  const height = window.innerHeight - 200;
  const renderer = new THREE.WebGLRenderer({canvas: canvas})
  renderer.setSize(width, height)

  const light = new THREE.AmbientLight(0xffffff)

  const scene = new THREE.Scene()

  scene.add(light)

  scene.add(sun);
  scene.add(earth);
  scene.add(mercury);
  scene.add(venus);
  scene.add(mars);
  scene.add(jupiter);
  scene.add(saturn);

  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 300000)

  const orbitControls = new OrbitControls(camera, canvas);

  let t = 0;

  const render = () => {
    orbitControls.update();
    requestAnimationFrame(render);

    focus(camera);

    setPlanetParameters(mercury, t * 0.3, 4000, 0 , 4000);
    setPlanetParameters(venus, t * 0.2, 5500, 0 , 5500);
    setPlanetParameters(earth, t * 0.1, 7500, 0 , 7500);
    setPlanetParameters(mars, t * 0.08, 8000, 0 , 8000);
    setPlanetParameters(jupiter, t * 0.08, 10700, 0 , 10700);
    setPlanetParameters(saturn, t * 0.08, 12000, 0 , 12000);

    sun.rotation.y += 0.001;

    earth.rotation.y += 0.001;
    mercury.rotation.y += 0.001;
    venus.rotation.y += 0.001;
    mars.rotation.y += 0.001;
    jupiter.rotation.y += 0.001;
    saturn.rotation.y += 0.001;

    t += 0.01;

    renderer.render(scene, camera);
  }

  render();
})

</script>

<template>
  <h1>Добавление текстур планетам</h1>
  <div class="block planet-selection">
    <div class="block-head">Фокус на планете</div>
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
        <input type="radio" id="mars" value="mars" v-model="selectedPlanetName"/>
        <label for="mars">Марс</label>
      </div>

      <div>
        <input type="radio" id="jupiter" value="jupiter" v-model="selectedPlanetName"/>
        <label for="jupiter">Юпитер</label>
      </div>

      <div>
        <input type="radio" id="saturn" value="saturn" v-model="selectedPlanetName"/>
        <label for="saturn">Сатурн</label>
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

.planet-selection {
  width: 800px;
}

label {
  margin-left: 10px;
}

</style>