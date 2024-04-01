import { type User } from '@/models/User'
import axiosInstance from './axiosInstance'
import { useUser } from '@/composables/useUser'
import { AxiosError } from 'axios'
import type { ErrorType } from './ErrorType'

interface LoginData {
    email: string
    password: string
}

interface RegisterData extends LoginData {
    username: string
}

const { user } = useUser()

// Login User
const login = async (loginData: LoginData) => {
    const response = await axiosInstance.post<User>('/users/login', loginData)
    if (response.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    user.value = response.data

    return response.data
}

// Register User
const register = async (registerData: RegisterData) => {
    try {
        const response = await axiosInstance.post<User>('/users/register', registerData)

        return response.data
    } catch (error) {
        const axErr = error as AxiosError<ErrorType>
        if (axErr.response?.data.code === 'USER_EXISTS') {
            throw new Error('User already exists')
        }

        throw new Error('Failed to register user')
    }
}

// Logout User
const logout = () => {
    user.value = null
    localStorage.removeItem('user')
}

export default {
    login,
    register,
    logout
}
