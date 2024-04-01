<template>
    <div class="view-wrapper">
        <slot></slot>
        <!-- Content to be wrapped -->
    </div>
</template>

<script setup lang="ts">
import { useHeader } from '@/composables/useHeader'
import { watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

watch(
    () => route.fullPath,
    () => {
        const { headerHidden } = useHeader()
        headerHidden.value = false
    }
)
</script>

<style lang="scss" scoped>
.view-wrapper {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
    padding-top: 1rem;
    display: flex;
    flex-direction: column;
    width: 100%;

    @media (max-width: 768px) {
        padding: 1rem;
    }
}
</style>
