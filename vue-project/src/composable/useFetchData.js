import { ref } from 'vue';

export function useFetchData(url) {
  const loading = ref(true);
  const data = ref(null);
  const error = ref(null);

  const fetchData = async (url) => {
    try {
      const response = await fetch(url);
      const json = await response.json();
      data.value = json.data;
    } catch (e) {
      error.value = e;
    } finally {
      loading.value = false;
    }
  };

  fetchData(url); 

  return {
    loading,
    data,
    error,
  };
}
