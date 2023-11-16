<script setup lang="ts">
import {ref, watchEffect} from "vue";
import {Scene} from "three";
import {render} from '/src/services/render.ts'
import {getRing} from '/src/services/figures.ts'

const canvasElement = ref();

watchEffect(() => {
  const canvas = canvasElement.value;

  render(canvas, (scene: Scene) => {

    const ring1 = getRing('white');
    ring1.position.x = -290;
    ring1.position.y = 120;

    const ring2 = getRing('white');
    ring2.position.y = 120;

    const ring3 = getRing('white');
    ring3.position.x = 290;
    ring3.position.y = 120;

    const ring4 = getRing('white');
    ring4.position.x = 150;

    const ring5 = getRing('white');
    ring5.position.x = -150;

    scene.add(ring1);
    scene.add(ring2);
    scene.add(ring3);
    scene.add(ring4);
    scene.add(ring5);
  })
})

</script>

<template>
  <h1>Создайте из колец символ Олимпийских игр</h1>
  <canvas ref="canvasElement"></canvas>
</template>

<style scoped lang="scss">
h1 {
  margin: 15px 0px;
}
</style>