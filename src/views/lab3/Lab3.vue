<script setup lang="ts">
import { ref, watchEffect } from "vue";
import * as THREE from 'three';
import { OrbitControls } from 'three-orbitcontrols-ts';

const webGl = ref();

const picked = ref('earth');

const createSphere = (radius, w_segments, h_segments, texturePath = '', emissive = undefined) => {
    let geometry = new THREE.SphereGeometry(radius, w_segments, h_segments);
    var loader = new THREE.TextureLoader();
    var texture = loader.load(texturePath);
    texture.anisotropy = 16;
    let material = new THREE.MeshPhongMaterial({ map: texture, emissive: emissive });
    let sphere = new THREE.Mesh(geometry, material)

    return sphere;
}

watchEffect(() => {

    if (webGl.value) {
        const canvas = webGl.value;

        var sun = createSphere(2300, 80, 80, '/src/assets/sun.jpg', 0xff0000);
        var earth = createSphere(100, 40, 40, '/src/assets/earth.jpg');
        var mercury = createSphere(60, 20, 20, '/src/assets/mercury.jpg');
        var venus = createSphere(90, 20, 20, '/src/assets/venus.jpg');
        var mars = createSphere(80, 20, 20, '/src/assets/textures/mars.jpg');
        var jupiter = createSphere(350, 20, 20, '/src/assets/textures/jupiter.jpg');
        var saturn = createSphere(230, 20, 20, '/src/assets/textures/saturn.jpg');

        const getSelectedPlanet = () => {

            if (picked.value === 'earth') {
                return earth;
            }

            if (picked.value === 'mercury') {
                return mercury;
            }

            if (picked.value === 'venus') {
                return venus;
            }

            if (picked.value === 'mars') {
                return mars;
            }

            if (picked.value === 'saturn') {
                return saturn;
            }

            return earth;
        };

        const focusOnPlanet = (camera) => {
            const selectedPlanet = getSelectedPlanet();

            camera.position.x = selectedPlanet.position.x + 1000;
            camera.position.z = selectedPlanet.position.z + 1000;
            camera.lookAt(selectedPlanet.position);
        }

        const width = window.innerWidth - 600;
        const height = window.innerHeight - 200;
        const renderer = new THREE.WebGLRenderer({ canvas: canvas })
        renderer.setSize(width, height)

        const scene = new THREE.Scene()

        const light = new THREE.AmbientLight(0xffffff)
        scene.add(light)

        scene.add(sun);
        scene.add(earth);
        scene.add(mercury);
        scene.add(venus);
        scene.add(mars);
        scene.add(jupiter);
        scene.add(saturn);

        const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 300000)

        camera.position.set(0, 0, 15000);

        const controls = new OrbitControls(camera, canvas);

        var t = 0;

        const loop = () => {
            controls.update();
            requestAnimationFrame(loop);

            focusOnPlanet(camera);

            earth.position.x = Math.sin(t * 0.1) * 7500;
            earth.position.z = Math.cos(t * 0.1) * 7500;

            mercury.position.x = Math.sin(t * 0.3) * 4000;
            mercury.position.z = Math.cos(t * 0.3) * 4000;

            venus.position.x = Math.sin(t * 0.2) * 5500;
            venus.position.z = Math.cos(t * 0.2) * 5500;

            mars.position.x = Math.sin(t * 0.08) * 8000;
            mars.position.z = Math.cos(t * 0.08) * 8000;

            jupiter.position.x = Math.sin(t * 0.08) * 10700;
            jupiter.position.z = Math.cos(t * 0.08) * 10700;

            saturn.position.x = Math.sin(t * 0.08) * 12000;
            saturn.position.z = Math.cos(t * 0.08) * 12000;

            t += 0.01;

            sun.rotation.y += 0.001;
            
            earth.rotation.y += 0.001;
            mercury.rotation.y += 0.001;
            venus.rotation.y += 0.001;
            mars.rotation.y += 0.001;
            jupiter.rotation.y += 0.001;
            saturn.rotation.y += 0.001;

            renderer.render(scene, camera);
        }
        
        loop();

    }
})

</script>

<template>
    <h1>Добавление текстур планетам.</h1>
    <div class="content">
        <canvas ref="webGl" class="webGl"></canvas>
        <div class="right-block">
            <div>
                <input type="radio" id="earth" value="earth" v-model="picked" />
                <label for="earth">Земля</label>
            </div>
            <div>
                <input type="radio" id="mercury" value="mercury" v-model="picked" />
                <label for="mercury">Меркурий</label>
            </div>

            <div>
                <input type="radio" id="venus" value="venus" v-model="picked" />
                <label for="venus">Венера</label>
            </div>

            <div>
                <input type="radio" id="mars" value="mars" v-model="picked" />
                <label for="mars">Марс</label>
            </div>

            <div>
                <input type="radio" id="jupiter" value="jupiter" v-model="picked" />
                <label for="jupiter">Юпитер</label>
            </div>

            <div>
                <input type="radio" id="saturn" value="saturn" v-model="picked" />
                <label for="saturn">Сатурн</label>
            </div>

        </div>
    </div>
</template>

<style scoped  lang="scss">
h1 {
    margin: 15px 0px;
}

.right-block {
    display: flex;
    flex-direction: column;
    width: 200px;
    height: 450px;
    margin-left: 40px;
}

label {
    color: #003775;
    font-size: 20px;
    margin-left: 15px;
}

.content {
    display: flex;
}
</style>