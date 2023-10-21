<script setup lang="ts">
import { ref, watchEffect } from "vue";
import { renderFunc } from '/src/services/render.ts'
import {  createRing } from '/src/services/figures.ts'


const webGl = ref();

watchEffect(() => {
    if (webGl.value) {
        const canvas = webGl.value;
        
        renderFunc(canvas, (scene) => {

            let ring1 = createRing('white');
            ring1.position.x = -200;
            ring1.position.y = 100;

            let ring2 = createRing('white');
            ring2.position.y = 100;

            let ring3 = createRing('white', 5, 15, 25, true);
            ring3.position.x = 200;
            ring3.position.y = 100;

            let ring4 = createRing('white');
            ring4.position.x = 100;

            let ring5 = createRing('white');
            ring5.position.x = -100;

            scene.add(ring1);
            scene.add(ring2);
            scene.add(ring3);
            scene.add(ring4);
            scene.add(ring5);
        })
    }
})

</script>

<template>
    <h1>Олимпийские кольца с нераскрывшимся</h1>
    <canvas ref="webGl" class="webGl"></canvas>
</template>

<style scoped  lang="scss">
h1 {
    margin: 15px 0px;
}
</style>