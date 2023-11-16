<script setup lang="ts">
import {ref, watchEffect} from "vue";
import {Scene} from "three";
import {render} from '/src/services/render.ts';
import {getCube} from '/src/services/figures.ts';

const canvasElement = ref();

watchEffect(() => {
  const canvas = canvasElement.value;

  render(canvas, (scene: Scene) => {

    const cube1 = getCube(200, 10, '#white');
    cube1.position.z = 300;
    cube1.position.x = 300;
    cube1.position.y = 0;

    const cube2 = getCube(300, 10, '#AD1457');
    cube2.position.x = 300;
    cube2.position.y = 0;

    const cube3 = getCube(400, 10, '#43A047');
    cube3.position.z = -400;
    cube3.position.x = 300;
    cube3.position.y = 0;

    scene.add(cube1);
    scene.add(cube2);
    scene.add(cube3);
  })

})

</script>

<template>
  <h1>Разместите три куба так, чтобы их центры находились на одной линии и все
    кубы были видны</h1>
  <canvas ref="canvasElement"></canvas>
</template>

<style scoped lang="scss">
h1 {
  margin: 15px 0px;
}
</style>