<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ref, watch } from 'vue';
import MenuItemChild from './MenuItemChild.vue'

const props = defineProps(['title', 'url', 'items'])

const route = useRouter();
let isActive = ref(route.currentRoute.value.fullPath.includes(props.url!));

function handleClick() {
    route.push(`${props.url}/1`)
}

watch(
    () => route.currentRoute.value.fullPath,
    async () => {
        isActive.value = route.currentRoute.value.fullPath.includes(props.url!);
    }
);

</script>

<template>
    <div @click="handleClick" class="menu-item">{{ title }}</div>
    <template v-if="items && isActive">
        <template v-for="item in items" :key="item.title">
            <MenuItemChild :title="item.title" :url="item.url" />
        </template>
    </template>
</template>

<style scoped lang="scss">
.menu-item {
    margin: 8px 10px;
    color: #003775;
    cursor: pointer;
}
</style>
