<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ref, watch } from 'vue';
import MenuItemChild from './MenuItemChild.vue'

const props = defineProps(['title', 'url', 'items'])

const route = useRouter();
let isActive = ref(route.currentRoute.value.fullPath.includes(props.url!));

function handleClick() {
    const a1  = props.url === '/lab1' ? "1" : "";
    route.push(`${props.url}/${a1}`)
}

watch(
    () => route.currentRoute.value.fullPath,
    async () => {
        isActive.value = route.currentRoute.value.fullPath.includes(props.url);
    }
);

</script>

<template>
    <div @click="handleClick" :class="isActive ? 'menu-item menu-item_active' : 'menu-item'">{{ title }}</div>
    <template v-if="items && isActive">
      <div class="menu-child-items">
        <template v-for="item in items" :key="item.title">
          <MenuItemChild :title="item.title" :url="item.url" />
        </template>
      </div>
    </template>
</template>

<style scoped lang="scss">
.menu-item {
    margin: 8px 15px;
    cursor: pointer;
}

.menu-item_active {
  font-weight: 700;
}

.menu-child-items {
  display: flex;
  order: 1;
  flex-basis: 100%;
}
</style>
