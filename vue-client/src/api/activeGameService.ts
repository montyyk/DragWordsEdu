import axiosInstance from './axiosInstance'
import { type ActiveGame } from '@/models/ActiveGame'

const API_URL = '/active-games'

const getActiveGameByPin = async (pin: number): Promise<ActiveGame> => {
    const response = await axiosInstance.get(`${API_URL}/${pin}`)
    return response.data
}

const getActiveGameByGameId = async (gameId: string): Promise<ActiveGame> => {
    const response = await axiosInstance.get(API_URL, { params: { gameId } })
    return response.data
}

const createActiveGame = async (gameId: string): Promise<ActiveGame> => {
    const response = await axiosInstance.post(`${API_URL}/create`, { gameId })
    return response.data
}

export default {
    getActiveGameByPin,
    getActiveGameByGameId,
    createActiveGame
}
