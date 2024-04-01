<template>
    <main class="game-view" id="game-view" v-if="!!game">
        <div class="heading">
            <h1>{{ game?.name }}</h1>
            <span class="heading__progress">
                {{ currentItemIdx + 1 }} / {{ game?.words.length }}
            </span>
            <span class="heading__correct"> Correct: {{ correctCount }} </span>
            <span class="heading__incorrect"> Incorrect: {{ incorrectCount }} </span>
        </div>
        <div class="drop-zones">
            <div class="drop-zone" id="drop-zone-1">
                <div class="drop-zone__title">
                    {{ game?.categories[0] }}
                </div>

                <div class="drop-zone__words">
                    <span v-for="word in dropped1" :key="word" class="drop-zone__word">
                        {{ word }}
                    </span>
                </div>
            </div>
            <div class="drop-zone" id="drop-zone-2">
                <div class="drop-zone__title">
                    {{ game?.categories[1] }}
                </div>

                <div class="drop-zone__words">
                    <span v-for="word in dropped2" :key="word" class="drop-zone__word">
                        {{ word }}
                    </span>
                </div>
            </div>
        </div>
        <div class="scroll-container">
            <div class="items" v-if="!gameCompleted">
                <Word class="item" :word="game.words[currentItemIdx]" />
            </div>
        </div>
    </main>
</template>
<script setup lang="ts">
import { useRoute } from 'vue-router'
import DragSelect from 'dragselect'
import activeGameService from '@/api/activeGameService'
import { computed, nextTick, onMounted, ref } from 'vue'
import { useToast } from 'vue-toast-notification'
import router from '@/router'
import type { Game, Word as WordType } from '@/models/Game'
import { useHeader } from '@/composables/useHeader'
import Word from '@/components/common/Word.vue'

interface GuessedWord {
    word: string
    correct: boolean
}

const dropped1 = ref<string[]>([])
const dropped2 = ref<string[]>([])
const gameCompleted = ref(false)

const correctCount = computed(
    () =>
        dropped1.value.filter(
            (word) =>
                game.value?.words.find((w) => w.text === word)?.category ===
                game.value?.categories[0]
        ).length +
        dropped2.value.filter(
            (word) =>
                game.value?.words.find((w) => w.text === word)?.category ===
                game.value?.categories[1]
        ).length
)

const incorrectCount = computed(
    () =>
        dropped1.value.filter(
            (word) =>
                game.value?.words.find((w) => w.text === word)?.category !==
                game.value?.categories[0]
        ).length +
        dropped2.value.filter(
            (word) =>
                game.value?.words.find((w) => w.text === word)?.category !==
                game.value?.categories[1]
        ).length
)

const handleVerify = (drop: 1 | 2, word: WordType) => {
    if (drop === 1) {
        return word.category == game.value?.categories[0]
    } else if (drop === 2) {
        return word.category == game.value?.categories[1]
    }

    return false
}

const handleDrop = (drop: 1 | 2, word: WordType) => {
    if (drop === 1) dropped1.value.push(word.text)
    if (drop === 2) dropped2.value.push(word.text)

    if (handleVerify(drop, word)) {
        toast.success('Correct')
    } else {
        toast.error('Incorrect')
    }

    if (currentItemIdx.value === (game.value?.words?.length ?? 0) - 1) {
        toast.success('Game completed!')
        gameCompleted.value = true
        return
    }
    currentItemIdx.value++
}

const initDragSelect = () => {
    const ds = new DragSelect({
        selectables: Array.from(
            document.getElementsByClassName('item') as unknown as HTMLElement[]
        ),
        area: document.getElementById('game-view')!,
        dropZones: [
            {
                element: document.getElementById('drop-zone-1')!,
                id: 'zone-1'
            },
            {
                element: document.getElementById('drop-zone-2')!,
                id: 'zone-2'
            }
        ],
        dropInsideThreshold: 0.6
    })

    ds.subscribe('DS:end', ({ dropTarget }) => {
        if (!game.value || !dropTarget?.itemsDropped) return

        if (dropTarget?.id === 'zone-1') {
            handleDrop(1, game.value.words[currentItemIdx.value])
        } else if (dropTarget?.id === 'zone-2') {
            handleDrop(2, game.value.words[currentItemIdx.value])
        }

        dropTarget?.itemsDropped.forEach((item) => {
            item.style.transform = 'translate(0, 0)'
        })
    })
}

const route = useRoute()
const toast = useToast()
const game = ref<Game | null>(null)
const currentItemIdx = ref(0)
const { toggleHeader } = useHeader()
toggleHeader()

onMounted(async () => {
    try {
        const pin = Number(route.params.pin)
        game.value = (await activeGameService.getActiveGameByPin(pin)).game
        // shuffle the words
        game.value.words = game.value.words.sort(() => Math.random() - 0.5)

        if (!game) {
            toast.error('Invalid game PIN')
            router.push({ name: 'home' })
        }

        nextTick(() => {
            initDragSelect()
        })
    } catch (error) {
        console.error('Failed to fetch game:', error)
        toast.error('Failed to load game, please try again later.')
        router.push({ name: 'home' })
    }
})
</script>
<style scoped lang="scss">
@import '@/assets/styles/variables.scss';

.game-view {
    display: grid;
    grid-template-rows: auto minmax(10vh, 300px) 1fr;
    gap: 1rem;
    height: 100%;
}

.drop-zones {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.5rem;
}

.drop-zone {
    width: 100%;
    text-align: center;
    height: 100%;
    padding: 0.5rem;
    border: 1px solid #ccc;
    background-color: #fff;

    &__title {
        font-size: 1.5rem;
        font-weight: bold;
        margin-bottom: 0.5rem;
    }

    &__words {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        justify-content: center;
    }

    &.ds-dropzone-ready {
        border-color: $color-primary;
    }
}
.items {
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;
    min-width: 100%;
    overflow-x: visible;
}
</style>
