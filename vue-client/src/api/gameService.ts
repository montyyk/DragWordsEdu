import { useUser } from '@/composables/useUser'
import axiosInstance from './axiosInstance'
import { type Game } from '@/models/Game'

const API_URL = '/games'

const { user } = useUser()

// Fetch all games created by the logged-in teacher
const getGames = async (): Promise<Game[]> => {
    const response = await axiosInstance.get(`${API_URL}/list/${user.value?._id}`)
    return response.data
}

// Fetch a single game by ID
const getGameById = async (id: string): Promise<Game> => {
    const response = await axiosInstance.get(`${API_URL}/${id}`)
    return response.data
}

// Create a new game
const createGame = async (gameData: Game): Promise<Game> => {
    gameData.createdBy = user.value?._id
    const response = await axiosInstance.post(`${API_URL}/create`, gameData)
    return response.data
}

// Update an existing game
const updateGame = async (id: string, gameData: Partial<Game>): Promise<Game> => {
    const response = await axiosInstance.put(`${API_URL}/edit/${id}`, gameData)
    return response.data
}

// Optionally, if you need to delete games
const deleteGame = async (id: string): Promise<void> => {
    await axiosInstance.delete(`${API_URL}/delete/${id}`)
}

export default {
    getGames,
    getGameById,
    createGame,
    updateGame,
    deleteGame
}
