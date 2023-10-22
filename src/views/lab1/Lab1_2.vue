<script setup lang="ts">
import { ref, watchEffect } from "vue";
import { render } from '/src/services/render.ts'
import { getTorus, getRing } from '/src/services/figures.ts'

const canvasElement = ref();

watchEffect(() => {
    if (canvasElement.value) {
        const canvas = canvasElement.value;

        render(canvas, (scene) => {

            let torus = getTorus('#AED581');
            torus.position.x = -200;
            torus.position.y = 0;
            torus.position.z = -100;

            let ring = getRing('#FFEB3B');
            ring.position.x = -180;
            ring.position.y = 0;
            ring.position.z = 10;

            scene.add(torus);
            scene.add(ring);
        })
    }
})

</script>

<template>
    <h1>Разместите кольцо на торе:</h1>
    <canvas ref="canvasElement"></canvas>
</template>

<style scoped  lang="scss">
h1 {
    margin: 15px 0px;
}
</style>