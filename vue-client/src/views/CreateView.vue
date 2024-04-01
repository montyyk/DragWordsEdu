<template>
    <div class="create-game__wrapper">
        <h2>Game Creation</h2>
        <input
            type="text"
            v-model="gameForm.name"
            placeholder="Game Name"
            class="create-game__category-input create-game__category-input--name"
        />
        <div class="create-game">
            <div class="create-game__column">
                <input
                    type="text"
                    v-model="gameForm.category1"
                    placeholder="Category 1"
                    class="create-game__category-input"
                />
                <textarea
                    v-model="gameForm.words1"
                    placeholder="Enter words for Category 1 separated by commas"
                    class="create-game__words-textarea"
                ></textarea>
            </div>

            <div class="create-game__column">
                <input
                    type="text"
                    v-model="gameForm.category2"
                    placeholder="Category 2"
                    class="create-game__category-input"
                />
                <textarea
                    v-model="gameForm.words2"
                    placeholder="Enter words for Category 2 separated by commas"
                    class="create-game__words-textarea"
                ></textarea>
            </div>
        </div>
        <button type="button" class="button button--primary" @click="handleSubmit">
            {{ submitButtonText }}
        </button>
    </div>
</template>

<script setup lang="ts">
import gameService from '@/api/gameService'
import { useUser } from '@/composables/useUser'
import type { Game } from '@/models/Game'
import router from '@/router'
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useToast } from 'vue-toast-notification'

const gameForm = ref({
    name: '',
    category1: '',
    words1: '',
    category2: '',
    words2: ''
})

const route = useRoute()
const gameId = ref<string>(route.params?.gameId as string)
const isEditMode = computed(() => !!gameId.value)

const { user } = useUser()

// if in edit mode, fetch the game details
const getGame = async () => {
    if (!gameId.value) return

    const game = await gameService.getGameById(gameId.value)
    gameForm.value = {
        name: game.name,
        category1: game.categories[0],
        words1: game.words
            .filter((word) => word.category === game.categories[0])
            .map((word) => word.text)
            .join(', '),
        category2: game.categories[1],
        words2: game.words
            .filter((word) => word.category === game.categories[1])
            .map((word) => word.text)
            .join(', ')
    }
}

const submitButtonText = computed(() => (isEditMode.value ? 'Update Game' : 'Create Game'))

const toast = useToast()

const createGame = async () => {
    try {
        const gameData = mapFormToGame()

        await gameService.createGame(gameData)
        toast.success('Game created!')
        router.push({ name: 'dashboard' })
    } catch (error) {
        toast.error('Could not create game.')
        console.log(error)
    }
}

const updateGame = async () => {
    try {
        const gameData = mapFormToGame()

        await gameService.updateGame(gameId.value, gameData)
        toast.success('Game updated!')
        router.push({ name: 'dashboard' })
    } catch (error) {
        toast.error('Could not update game.')
        console.log(error)
    }
}

const handleSubmit = () => {
    if (isEditMode.value) {
        updateGame()
    } else {
        createGame()
    }
}

const mapFormToGame = () => {
    const game: Game = {
        name: gameForm.value.name,
        categories: [gameForm.value.category1, gameForm.value.category2],
        words: [
            ...gameForm.value.words1
                .split(',')
                .map((word) => ({ text: word.trim(), category: gameForm.value.category1 })),
            ...gameForm.value.words2
                .split(',')
                .map((word) => ({ text: word.trim(), category: gameForm.value.category2 }))
        ],
        createdBy: user?.value?._id
    }

    return game
}

onMounted(() => {
    if (isEditMode.value) {
        getGame()
    }
})
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';
.create-game {
    display: flex;
    justify-content: space-around;
    color: $color-text;
    &__column {
        flex: 1;
        margin: 0 10px;

        &:first-child {
            margin-left: 0;
        }

        &:last-child {
            margin-right: 0;
        }
    }

    &__category-input,
    &__words-textarea {
        width: 100%;
        margin-bottom: 10px;
        padding: 10px;
        box-sizing: border-box;
        border-radius: 4px;
        border: 1px solid #ccc;
        resize: none;
    }

    &__category-input--name {
        padding: 15px;
    }

    &__words-textarea {
        height: 250px;
    }

    &__words-textarea textarea {
        resize: vertical;
    }
}
</style>
