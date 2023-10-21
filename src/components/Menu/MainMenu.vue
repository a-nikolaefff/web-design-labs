<script setup lang="ts">
import MenuItem from './components/MenuItem.vue'
import { menuItems } from './constants.ts'


</script>

<template>
    <div class="menu">
        <template v-for="menuItem in menuItems" :key="menuItem.title">
            <MenuItem :title="menuItem.title" :url="menuItem.url" :items="menuItem.items" />
        </template>

    </div>
</template>


<style scoped  lang="scss"></style>
