<script setup lang="ts">
import { ref, watchEffect } from "vue";
import { renderFunc } from '/src/services/render.ts';
import { createBox } from '/src/services/figures.ts';

const webGl = ref();

watchEffect(() => {
    if (webGl.value) {
        const canvas = webGl.value;

        renderFunc(canvas, (scene) => {

            let box1 = createBox(100, 15, 'white');
            box1.position.x = -500;
            box1.position.y = -100;

            let box2 = createBox(200, 15, 'blue');
            
            let box3 = createBox(300, 15, 'red');
            box3.position.x = 500;
            box3.position.y = 100;

            scene.add(box1);
            scene.add(box2);
            scene.add(box3);
        })
    }
})

</script>

<template>
    <h1>Кубы разных размеров</h1>
    <canvas ref="webGl" class="webGl"></canvas>
</template>

<style scoped  lang="scss">
h1 {
    margin: 15px 0px;
}
</style>