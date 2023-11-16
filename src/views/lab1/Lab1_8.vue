<script setup lang="ts">
import {ref, watchEffect} from "vue";
import {Scene} from "three";
import {render} from '/src/services/render.ts';
import {getCube} from '/src/services/figures.ts';

const canvasElement = ref();

watchEffect(() => {

  const canvas = canvasElement.value;

  render(canvas, (scene: Scene) => {

    const cube1 = getCube(200, 20, '#AD1457');
    cube1.position.x = -300;

    const cube2 = getCube(400, 5, '#43A047');
    cube2.position.x = 300;

    scene.add(cube1);
    scene.add(cube2);
  })

})

</script>

<template>
  <h1>Задайте материал с типом wireframe так, чтобы больший куб имел меньшее
    количество ячеек сетки, а меньший – большее количество ячеек</h1>
  <canvas ref="canvasElement"></canvas>
</template>

<style scoped lang="scss">
h1 {
  margin: 15px 0px;
}
</style>