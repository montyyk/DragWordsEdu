<script setup lang="ts">
import { RouterView } from 'vue-router'
import ViewWrapper from './components/common/ViewWrapper.vue'
import Header from './components/common/Header.vue'
import { useUser } from './composables/useUser'

const userManager = useUser()
userManager.setUserFromLocalStorage()
</script>

<template>
    <main class="app">
        <Header />
        <ViewWrapper>
            <RouterView />
        </ViewWrapper>
    </main>
</template>

<style lang="scss" scoped>
.app {
    display: grid;
    grid-template-rows: auto 1fr;
    min-height: 100vh;
}
</style>
