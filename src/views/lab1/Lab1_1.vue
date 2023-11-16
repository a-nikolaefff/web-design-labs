<script setup lang="ts">
import {ref, watchEffect} from "vue";
import {Scene} from "three";
import {render} from '/src/services/render.ts'
import {getTorus} from '/src/services/figures.ts'

const canvasElement = ref();

watchEffect(() => {
  const canvas = canvasElement.value;

  render(canvas, (scene: Scene) => {
    const torus1 = getTorus('white');
    torus1.position.x = -500;
    torus1.position.y = 150;
    torus1.position.z = 0;

    const torus2 = getTorus('#AD1457');
    torus2.position.x = -220;
    torus2.position.y = -200;
    torus2.position.z = 0;

    const torus3 = getTorus('#43A047');
    torus3.position.x = -60;
    torus3.position.y = 200;
    torus3.position.z = 0;

    scene.add(torus1);
    scene.add(torus2);
    scene.add(torus3);
  })

})
</script>

<template>
  <h1>Создайте три тора и разместите их в зоне одновременной видимости</h1>
  <canvas ref="canvasElement"></canvas>
</template>

<style scoped>
h1 {
  margin: 15px 0px;
}
</style>