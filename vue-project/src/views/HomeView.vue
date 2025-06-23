<script setup>
import TheWelcome from '../components/TheWelcome.vue'
import Header from '@/components/Header.vue';
import NavBar from  '@/components/NavBar.vue';
import ImageView from '@/components/ImageView.vue';
import CategoryView from '@/components/CategoryView.vue';
import BookCard from '@/components/BookCard.vue';
import { useFetchData } from '@/composable/useFetchData';
import { onMounted } from 'vue';
import { ref } from 'vue';

const categories = ref(null)
const isLoading = ref(true)
const hasError = ref(null)

onMounted( async() => {
  const {loading,data,error} = useFetchData('http://localhost:8080/api/category/getAllCategories')
  categories.value = data.value
  isLoading.value = loading.value
  hasError.value = error.value
})



</script>

<template>
  <main>

    <div class="nav">
      <Header></Header>
      <NavBar
      :listcategories="categories"
      :isLoading="isLoading"
      :isError="hasError"
      />
      <ImageView></ImageView>
      <CategoryView :listcategories="categories"
                  :isLoading="isLoading"
                  :isError="hasError"

      ></CategoryView>
      <BookCard></BookCard>
    </div>

  </main>
</template>
