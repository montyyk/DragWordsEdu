<template>
    <header class="global-header">
        <router-link to="/">
            <h1 class="global-header__title">Drag Words</h1>
        </router-link>

        <div class="global-header__navbar" v-if="!headerHidden">
            <div class="game-id-input">
                <div class="form-group">
                    <input placeholder="GAME ID" id="game" v-model="gameId" type="text" />
                </div>
                <button class="button button--primary" @click="goToGame">Play</button>
            </div>

            <div class="auth-actions">
                <div class="user-info button button--text" v-if="isLoggedIn" @click="goToDashboard">
                    {{ user?.username }}
                </div>
                <button class="button button--accent" v-if="isLoggedIn" @click="logout">
                    Log Out
                </button>
                <button class="button button--secondary" v-else @click="goToLogin">Log In</button>
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import router from '@/router'
import authService from '@/api/authService' // Adjust according to your service structure
import { useUser } from '@/composables/useUser'
import { useToast } from 'vue-toast-notification'
import { useHeader } from '@/composables/useHeader'

const { headerHidden } = useHeader()

const gameId = ref('')

const toast = useToast()

const { isLoggedIn, user } = useUser()

const goToGame = () => {
    if (gameId.value) {
        router.push({ name: 'game', params: { pin: gameId.value } }) // Ensure this matches your route configuration
    }
}

const logout = () => {
    authService.logout() // Make sure to implement this in your authService
    localStorage.removeItem('user') // Clear user token
    toast.success('Logged out successfully')
    router.push({ name: 'home' }) // Redirect to the home or login page
}

const goToDashboard = () => {
    router.push({ name: 'dashboard' })
}

const goToLogin = () => {
    router.push({ name: 'login' })
}
</script>

<style scoped lang="scss">
@import '@/assets/styles/variables.scss';

.global-header {
    background-color: darken($color-background, 10%);

    &__navbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 2rem;
        padding-top: 0;
        gap: 1rem;
        flex-wrap: wrap;
    }

    &__title {
        font-size: 2.5rem;
        padding-top: 1rem;
        padding-bottom: 1rem;
        width: 100%;
        text-align: center;
        color: darken($color-primary, 25%);
    }
}

.game-id-input {
    display: flex;
    align-items: center;
    gap: 1rem;
    flex-grow: 1;

    .button {
        min-width: 100px;
    }
}

.auth-actions {
    display: flex;
    gap: 1rem;

    .button {
        min-width: 100px;
    }
}

.user-info {
    display: flex;
    align-items: center;
}
</style>
