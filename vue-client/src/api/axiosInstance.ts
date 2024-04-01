import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: '/api'
})

axiosInstance.interceptors.request.use(
    (config) => {
        const item = localStorage.getItem('user')
        if (!item) {
            return config
        }

        const token = JSON.parse(item)?.token
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default axiosInstance
