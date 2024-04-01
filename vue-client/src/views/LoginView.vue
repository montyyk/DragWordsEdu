<template>
    <div class="login-view">
        <form novalidate class="login-form">
            <h2>{{ isRegistering ? 'Register' : 'Login' }}</h2>
            <div v-if="isRegistering" class="form-group">
                <label for="email">Username:</label>
                <input
                    id="email"
                    v-model="loginForm.username"
                    type="text"
                    autocomplete="username"
                    required
                />
            </div>
            <div class="form-group">
                <label for="email">Email:</label>
                <input
                    id="email"
                    v-model="loginForm.email"
                    type="email"
                    autocomplete="email"
                    required
                />
            </div>
            <div class="form-group">
                <label for="password">Password:</label>
                <input
                    id="password"
                    v-model="loginForm.password"
                    type="password"
                    autocomplete="current-password"
                    required
                />
            </div>
            <div class="buttons" :class="{ 'buttons--registering': isRegistering }">
                <button
                    @click="handleLoginClick"
                    type="button"
                    :class="`button ${!isRegistering ? 'button--primary' : 'button--text'}`"
                >
                    Login
                </button>
                <button
                    type="button"
                    @click="handleRegisterClick"
                    :class="`button ${isRegistering ? 'button--primary' : 'button--text'}`"
                >
                    Create account
                </button>
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import authService from '@/api/authService' // Adjust the path as needed
import { useToast } from 'vue-toast-notification'
import router from '@/router'

const loginForm = ref({
    email: '',
    password: '',
    username: ''
})

const isRegistering = ref(false)

const handleLoginClick = () => {
    if (!isRegistering.value) {
        handleLogin()
        return
    }

    isRegistering.value = false
}

const handleRegisterClick = () => {
    if (isRegistering.value) {
        handleRegister()
        return
    }

    isRegistering.value = true
}

const toast = useToast()

const handleLogin = async () => {
    try {
        const response = await authService.login(loginForm.value)
        toast.success('Login successful!')
        router.push({ name: 'dashboard' })
    } catch (error) {
        console.error('Login error:', error)
        toast.error('Login failed!')
    }
}

const handleRegister = async () => {
    try {
        const response = await authService.register(loginForm.value)
        toast.success('Registration successful!')
        isRegistering.value = false
    } catch (error: any) {
        console.error('Registration error:', error)
        toast.error(error.message)
    }
}
</script>

<style lang="scss" scoped>
@import '../assets/styles/variables.scss';

.login-view {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: $color-background;
    flex: 1;

    .login-form {
        padding: 2rem;
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        background: white;
        width: 100%;
        max-width: 400px;
        display: flex;
        flex-direction: column;
        gap: 0.25rem;

        h2 {
            color: $color-primary;
            text-align: center;
        }

        .buttons {
            display: flex;
            flex-direction: column;
            margin-top: 1rem;

            &--registering {
                flex-direction: column-reverse;
            }
        }
    }
}
</style>
