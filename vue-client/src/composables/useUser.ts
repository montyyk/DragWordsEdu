import type { User } from '@/models/User'
import { computed, ref } from 'vue'

const user = ref<User | null>(null)

const setUser = (newUser: User) => {
    user.value = newUser
}

const deleteUser = () => {
    user.value = null
}

const setUserFromLocalStorage = () => {
    const userString = localStorage.getItem('user')
    if (userString) {
        user.value = JSON.parse(userString)
    }
}

const isLoggedIn = computed(() => {
    return user.value !== null
})

export const useUser = () => {
    return {
        user,
        setUser,
        deleteUser,
        isLoggedIn,
        setUserFromLocalStorage
    }
}
