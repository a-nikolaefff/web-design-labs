<script setup lang="ts">
import { ref, watchEffect } from "vue";
import {Scene} from "three";
import { render } from '/src/services/render.ts';
import { getCube } from '/src/services/figures.ts';

const canvasElement = ref();

watchEffect(() => {
    if (canvasElement.value) {
        const canvas = canvasElement.value;

        render(canvas, (scene: Scene) => {

            const cube1 = getCube(200, 5, '#white');
            cube1.position.x = -400;

            const cube2 = getCube(300, 5, '#AD1457');

            const cube3 = getCube(400, 5, '#43A047');
            cube3.position.x = 500;

            scene.add(cube1);
            scene.add(cube2);
            scene.add(cube3);
        })
    }
})
</script>

<template>
    <h1>Создайте три куба: большой, средний и маленький</h1>
    <canvas ref="canvasElement"></canvas>
</template>

<style scoped  lang="scss">
h1 {
    margin: 15px 0px;
}
</style>