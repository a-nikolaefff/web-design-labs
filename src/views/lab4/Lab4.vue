<script setup lang="ts">
import { ref, watchEffect } from "vue";
import * as THREE from 'three';

const webGl = ref();

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

        const width = window.innerWidth - 350;
        const height = window.innerHeight - 200;
        const renderer = new THREE.WebGLRenderer({ canvas: canvas })
        renderer.setSize(width, height)

        const scene = new THREE.Scene();
        const light1 = new THREE.AmbientLight(0x808080);
        const light2 = new THREE.PointLight( 0xffffff, 3, 200000 );
        light2.castShadow = true;
        light2.shadow.mapSize.width = 2048;
        light2.shadow.mapSize.height = 2048;
        light2.position.set(0,0,0);

        scene.add(light1);
        scene.add(light2);

        var sun = createSphere(2300, 80, 80, '/src/assets/textures/sun.jpg', 0xff0000);
        var earth = createSphere(100, 40, 40, '/src/assets/textures/earth.jpg');
        earth.castShadow = true;
        var mercury = createSphere(60, 20, 20, '/src/assets/textures/mercury.jpg');
        mercury.castShadow = true;
        var venus = createSphere(90, 20, 20, '/src/assets/textures/venus.jpg');
        venus.castShadow = true;
        var mars = createSphere(80, 20, 20, '/src/assets/textures/mars.jpg');
        mars.castShadow = true;
        var jupiter = createSphere(350, 20, 20, '/src/assets/textures/jupiter.jpg');
        jupiter.castShadow = true;
        var saturn = createSphere(230, 20, 20, '/src/assets/textures/saturn.jpg');
        saturn.castShadow = true;

        scene.add(sun);
        scene.add(earth);
        scene.add(mercury);
        scene.add(venus);
        scene.add(mars);
        scene.add(jupiter);
        scene.add(saturn);
 

        const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 30000)

        camera.position.set(5000, 0, 10000);
        var t = 0;

        const loop = () => {
            requestAnimationFrame(loop);

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
            earth.rotation.y += 0.0008;

            renderer.render(scene, camera);
        }

        loop();

    }
})

</script>

<template>
    <h1>Добавление источников света. Работа с тенями.</h1>
    <canvas ref="webGl" class="webGl"></canvas>
</template>

<style scoped  lang="scss">
h1 {
    margin: 15px 0px;
}
</style>