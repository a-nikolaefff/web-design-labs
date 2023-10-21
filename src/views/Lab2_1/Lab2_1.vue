<script setup lang="ts">
import { ref, watchEffect } from "vue";
import * as THREE from 'three';

const webGl = ref();

const createSphere = (radius, w_segments, h_segments, withWireframe = false) => {
    let geometry = new THREE.SphereGeometry(radius, w_segments, h_segments)
    let material = new THREE.MeshNormalMaterial({ wireframe: withWireframe })
    let sphere = new THREE.Mesh(geometry, material)

    return sphere;
}

const speed = ref(1);
const x = ref(7500);
const y = ref(0);
const z = ref(7500);

watchEffect(() => {
    if (webGl.value) {
        const canvas = webGl.value;

        const width = window.innerWidth - 600;
        const height = window.innerHeight - 200;
        const renderer = new THREE.WebGLRenderer({ canvas: canvas })
        renderer.setSize(width, height)

        const scene = new THREE.Scene()

        const light = new THREE.AmbientLight(0xffffff)
        scene.add(light)

        var sun = createSphere(2300, 80, 80, true);
        var earth = createSphere(100, 40, 40);
        var mercury = createSphere(60, 20, 20);
        var venus = createSphere(90, 20, 20);
        var mars = createSphere(80, 20, 20);


        scene.add(sun);
        scene.add(earth);
        scene.add(mercury);
        scene.add(venus);
        scene.add(mars);

        const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 300000)

        camera.position.set(0, 0, 15000)

        var t = 0;

        const loop = () => {

            requestAnimationFrame(loop);

            earth.position.x = Math.sin(t * 0.1 * speed.value) * x.value;
            earth.position.y = y.value;
            earth.position.z = Math.cos(t * 0.1 * speed.value) * z.value;

            mercury.position.x = Math.sin(t * 0.3) * 4000;
            mercury.position.z = Math.cos(t * 0.3) * 4000;

            venus.position.x = Math.sin(t * 0.2) * 5500;
            venus.position.z = Math.cos(t * 0.2) * 5500;

            mars.position.x = Math.sin(t * 0.08) * 8000;
            mars.position.z = Math.cos(t * 0.08) * 8000;

            t += 0.01;

            sun.rotation.y += 0.001;



            renderer.render(scene, camera);

        }

        loop();

    }
})

</script>

<template>
    <h1>Анимация моделей. Создание солнечной системы.</h1>
    <div class="content">
        
        <canvas ref="webGl" class="webGl"></canvas>
        <div class="right-block">
            <p>Коэффициент скорости вращения планеты</p>
            <input v-model="speed" placeholder="Коэффициент скорости вращения" />

            <p>Отдаление по оси X</p>
            <input v-model="x" placeholder="Коэффициент скорости вращения" />
            <p>Отдаление по оси Y</p>
            <input v-model="y" placeholder="Коэффициент скорости вращения" />
            <p>Отдаление по оси Z</p>
            <input v-model="z" placeholder="Коэффициент скорости вращения" />
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

p{
    margin-top: 15px;
}

.content {
    display: flex;
}
</style>