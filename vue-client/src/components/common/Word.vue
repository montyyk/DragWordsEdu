<template>
    <div :data-word="word.text" :data-category="word.category" class="word">{{ word.text }}</div>
</template>

<script setup lang="ts">
import type { Word } from '@/models/Game'

const props = defineProps<{
    word: Word
}>()
</script>

<style scoped lang="scss">
@import '@/assets/styles/variables.scss';

.word {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem 1rem;
    background-color: #f0f0f0;
    border-radius: 0.5rem;
    margin: 0.5rem;
    border: solid 1px $color-accent;
    cursor: pointer;
    font-size: large;
    font-weight: bold;
    width: min(100%, 200px);
    height: 80px;
}
</style>
