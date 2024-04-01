<template>
    <div class="dashboard">
        <h1>Dashboard</h1>
        <button class="button button--secondary" @click="navigateToCreateGame">
            Create New Game
        </button>
        <div class="games-list">
            <GamePreview v-for="game in games" :key="game._id" :game="game" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import router from '@/router'
import { type Game } from '@/models/Game'
import gameService from '@/api/gameService'
import { useToast } from 'vue-toast-notification'
import activeGameService from '@/api/activeGameService'
import GamePreview from '@/components/GamePreview.vue'

const games = ref<Game[]>([])
const toast = useToast()

const fetchGames = async () => {
    try {
        const data = await gameService.getGames()
        games.value = data
    } catch (error) {
        console.error('Failed to fetch games:', error)
        toast.error('Failed to load games, please try again later.')
        // Handle error (e.g., show a toast notification)
    }
}

const navigateToCreateGame = () => {
    router.push({ name: 'create' }) // Ensure you have this route configured
}

onMounted(fetchGames)
</script>

<style lang="scss" scoped>
.dashboard {
    .games-list {
        .game-item {
            margin-bottom: 1rem;
            margin-top: 1rem;
            padding: 1rem;
            border: 1px solid #ccc;
            border-radius: 0.5rem;
            transition: box-shadow 0.3s ease;

            &:hover {
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            }

            h2 {
                margin-top: 0;
            }
        }

        .buttons {
            display: flex;
            gap: 0.5rem;
        }
    }
}
</style>
