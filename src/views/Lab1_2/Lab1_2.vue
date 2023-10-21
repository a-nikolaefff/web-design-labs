<script setup lang="ts">
import { ref, watchEffect } from "vue";
import { renderFunc } from '/src/services/threeHelper.ts'
import { createTorus, createRing } from '/src/services/figureFactory.ts'


const webGl = ref();

watchEffect(() => {
    if (webGl.value) {
        const canvas = webGl.value;

        renderFunc(canvas, (scene) => {

            let torus1 = createTorus('green');
            torus1.position.z = -100;

            let ring = createRing('white');
            ring.position.z = 10;

            scene.add(ring);
            scene.add(torus1);
            
        })
    }
})

</script>

<template>
    <h1>Кольцо на торе</h1>
    <canvas ref="webGl" class="webGl"></canvas>
</template>

<style scoped  lang="scss">
h1 {
    margin: 15px 0px;
}
</style>