<template>
    <div class="game-item">
        <h2>{{ game.name }}</h2>
        <div class="buttons">
            <!-- Additional game details here -->
            <button class="button button--primary" @click="editGame(game._id!)">Edit</button>
            <!-- button for activating the game -->
            <button v-if="!isActive" class="button button--accent" @click="startGame(game._id!)">
                Activate
            </button>
            <div v-else>
                <p>PIN: {{ activeGamePin }}</p>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import activeGameService from '@/api/activeGameService'
import type { Game } from '@/models/Game'
import router from '@/router'
import { computed, onMounted, ref } from 'vue'

const props = defineProps<{
    game: Game
}>()

const activeGamePin = ref<number | null>(null)
const isActive = computed(() => activeGamePin.value !== null)

const editGame = (gameId: string) => {
    router.push({ name: 'edit', params: { gameId } }) // Ensure you have this route configured
}

const startGame = async (gameId: string) => {
    const activeGame = await activeGameService.createActiveGame(gameId)
    activeGamePin.value = activeGame.pin
}

onMounted(async () => {
    try {
        activeGamePin.value = (await activeGameService.getActiveGameByGameId(props.game._id!)).pin
    } catch {}
})
</script>
<style scoped lang="scss">
.buttons {
    margin-top: 0.5rem;
    display: flex;
    gap: 1rem;
    align-items: center;
}
</style>
