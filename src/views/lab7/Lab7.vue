<script setup lang="ts">
import {  ref, watchEffect } from "vue";

import * as THREE from 'three';

const webGl = ref();

const createStars = (color: any, count: number) => {
        const starsGeometry = new THREE.Geometry();
        const starsMaterial = new THREE.PointsMaterial({color: color, opacity: 0.1, size: 1, sizeAttenuation: false });

        for(let i=0; i<count; i++)
        {
            var vertex = new THREE.Vector3();
            vertex.x = Math.random()*2 -1;
            vertex.y = Math.random()*2 -1;
            vertex.z = Math.random()*2 -1;

            vertex.multiplyScalar(2000);
            starsGeometry.vertices.push(vertex);
        }

        const stars = new THREE.Points(starsGeometry, starsMaterial);
        stars.scale.set(200,200,200);

        return stars;
}

watchEffect(() => {
    if (webGl.value) {
        const canvas = webGl.value;


        const width = window.innerWidth - 350;
        const height = window.innerHeight - 200;
        const renderer = new THREE.WebGLRenderer({ canvas: canvas })
        renderer.setSize(width, height)

        const scene = new THREE.Scene();

        const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 300000)

        camera.position.set(0, 0,  9000);

        const whiteStars = createStars(0xffffff,40000);
        const blueStars = createStars(0x7279D8,28000);
        
        scene.add(whiteStars);
        scene.add(blueStars);

        renderer.render(scene, camera);
    }
})

</script>

<template>
    <h1>Звездное небо.</h1>
    <canvas ref="webGl" class="webGl"></canvas>
</template>

<style scoped  lang="scss">
h1 {
    margin: 15px 0px;
}
</style>