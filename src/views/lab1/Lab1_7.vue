<script setup lang="ts">
import { ref, watchEffect } from "vue";
import { render } from '/src/services/render.ts';
import { createBox } from '/src/services/figures.ts';

const webGl = ref();

watchEffect(() => {
    if (webGl.value) {
        const canvas = webGl.value;

        render(canvas, (scene) => {

            let box1 = createBox(100, 15, 'white');
            box1.position.z = 300;
            box1.position.x = -300;
            box1.position.y = 150;

            
            let box2 = createBox(200, 15, 'blue');
            box2.position.x = -300;
            box2.position.y = 150;

            let box3 = createBox(300, 15, 'red');
            box3.position.z = -300;
            box3.position.x = -300;
            box3.position.y = 150;

            scene.add(box1);
            scene.add(box2);
            scene.add(box3);
        })
    }
})

</script>

<template>
    <h1>Кубы на одной прямой</h1>
    <canvas ref="webGl" class="webGl"></canvas>
</template>

<style scoped  lang="scss">
h1 {
    margin: 15px 0px;
}
</style>