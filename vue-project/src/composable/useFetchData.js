import { ref } from 'vue'

export function useFetchData() {
  const loading = ref(true)
  const data = ref(null)
  const error = ref(null)

  const fetchData = async (url) => {
    loading.value = true
    try {
      const response = await fetch(url)
      const json = await response.json()
      data.value = json.data
    } catch (e) {
      error.value = e
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    data,
    error,
    fetchData
  }
}
