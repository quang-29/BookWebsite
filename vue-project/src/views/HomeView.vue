<script setup>
import TheWelcome from '../components/TheWelcome.vue'
import Header from '@/components/Header.vue';
import NavBar from  '@/components/NavBar.vue';
import ImageView from '@/components/ImageView.vue';
import CategoryView from '@/components/CategoryView.vue';
import BookCard from '@/components/BookCard.vue';




defineProps({listcategories: Array,
             isLoading: Boolean,
             isError: [Object, null]
});

</script>

<template>
  <main>

    <ImageView></ImageView>
    <CategoryView :listcategories="listcategories"
                  :isLoading="isLoading"
                  :isError="isFetchingError"

    ></CategoryView>
    <BookCard></BookCard>

  </main>
</template>
