import { ref } from 'vue'

const headerHidden = ref(false)

const toggleHeader = () => {
    headerHidden.value = !headerHidden.value
}

export const useHeader = () => {
    return {
        headerHidden,
        toggleHeader
    }
}
