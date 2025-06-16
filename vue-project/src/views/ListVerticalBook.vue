<script setup>

import { onMounted,ref } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();
const books = ref([])


onMounted(async() => {
    try {
        const response = await fetch(`http://localhost:8080/api/book/AllBooksByCategory/${route.params.id}`)
        const json = await response.json();
        books.value = json;
        console.log(books)
    } catch (error) {
        
    }
})

</script>

<template>
    <div v-for="book in books" :key="book.id">
        <div class="book-list">
            <div>
            <img :src="book.imagePath ? book.imagePath: 'https://upload.wikimedia.org/wikipedia/commons/3/36/Hopetoun_falls.jpg'" :alt="book.title" width="400" height="400">
        </div>
                
        <div class="book-information">
            <div>{{ book.title }}</div>
            <div>{{ book.author }}</div>
            <div>{{ book.price }}</div>
            <div>{{ book.publisher }}</div>
            <div>{{ book.isbn }}</div>
            <div>{{ book.language }}</div>
        </div>

        </div>
        
                
                


    </div>

</template>

<style>
p {
  color: black;
}
.book-list {
    display: flex;
    align-items: center;
}
.book-information{
    color: black;
    font-size: 24px;
}
</style>