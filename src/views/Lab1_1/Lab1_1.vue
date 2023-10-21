<script setup lang="ts">
import { ref, watchEffect } from "vue";
import { renderFunc } from '/src/services/threeHelper.ts'
import { setPositions } from '/src/services/meshHelper.ts'
import { createTorus } from '/src/services/figureFactory.ts'


const webGl = ref();

watchEffect(() => {
    if (webGl.value) {
        const canvas = webGl.value;

        renderFunc(canvas, (scene) => {
            let torus1 = createTorus('yellow');
            torus1 = setPositions(torus1, -300, -100);

            let torus2 = createTorus('green');
            torus2 = setPositions(torus2, 0, 100);

            let torus3 = createTorus('red');
            torus3 = setPositions(torus3, 300, -100);

            scene.add(torus1);
            scene.add(torus2);
            scene.add(torus3);
        })
    }
})

</script>

<template>
    <h1>Три тора</h1>
    <canvas ref="webGl" class="webGl"></canvas>
</template>

<style scoped  lang="scss">
h1 {
    margin: 15px 0px;
}
</style>