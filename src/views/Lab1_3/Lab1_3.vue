<script setup lang="ts">
import { ref, watchEffect } from "vue";
import * as THREE from 'three';
import { renderFunc } from '/src/services/threeHelper.ts'
import { setPositions } from '/src/services/meshHelper.ts'
import { createTorus, createRing } from '/src/services/figureFactory.ts'


const webGl = ref();

watchEffect(() => {
    if (webGl.value) {
        const canvas = webGl.value;
        
        renderFunc(canvas, (scene) => {

            let ring1 = createRing('blue');
            ring1.position.x = -200;
            ring1.position.y = 100;

            let ring2 = createRing('black');
            ring2.position.y = 100;

            let ring3 = createRing('red');
            ring3.position.x = 200;
            ring3.position.y = 100;

            let ring4 = createRing('green');
            ring4.position.x = 100;

            let ring5 = createRing('yellow');
            ring5.position.x = -100;

            scene.add(ring1);
            scene.add(ring2);
            scene.add(ring3);
            scene.add(ring4);
            scene.add(ring5);
        }, true)
    }
})

</script>

<template>
    <h1>Олимпийские кольца</h1>
    <canvas ref="webGl" class="webGl"></canvas>
</template>

<style scoped  lang="scss">
h1 {
    margin: 15px 0px;
}
</style>