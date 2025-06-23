import { ref } from 'vue'

export function useFetchData(url) {
  const loading = ref(true)
  const data = ref(null)
  const error = ref(null)

  const fetchData = async () => {
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

  fetchData()

  return {
    loading,
    data,
    error
  }
}
