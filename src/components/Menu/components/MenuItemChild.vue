<script setup lang="ts">
import { useRouter } from 'vue-router';
import { watch, ref } from 'vue';

const props = defineProps({
    title: String,
    url: String
})


const route = useRouter();
let isActivea = ref(route.currentRoute.value.fullPath.includes(props.url!));

function handleClick() {
    route.push(props.url!);
}

watch(
    () => route.currentRoute.value.fullPath,
    async () => {
      console.log(route.currentRoute.value.fullPath)
      console.log(props.url!)
        isActivea.value = route.currentRoute.value.fullPath.includes(props.url!);
    }
);
</script>

<template>
    <div @click="handleClick" :class="isActivea ? 'menu-item-child menu-item-child__active' : 'menu-item-child'">{{ title }}
    </div>
</template>

<style scoped lang="scss">
.menu-item-child {
    margin: 8px 15px 8px 15px;
    cursor: pointer;
}

.menu-item-child__active {
    font-weight: 700;
}
</style>
