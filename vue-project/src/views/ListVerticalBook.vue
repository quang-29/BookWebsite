<script setup>

import { onMounted,ref,watch } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
const route = useRoute();
const books = ref([])


const fetchBooksByCategory = async () => {
  try {
    const response = await fetch(`http://localhost:8080/api/book/getAllBooksByCategory/${route.params.categoryName}`);
    const json = await response.json();
    books.value = json.content;
    console.log(json.content);
  } catch (error) {
    console.error("Error fetching books:", error);
  }
};
watch(() => route.params.categoryName, () => {
  fetchBooksByCategory();
})

onMounted(async() => {
    fetchBooksByCategory();
})

const formatPrice = (price) => {
  if (typeof price !== 'number') price = Number(price);
  return price.toLocaleString('vi-VN');
};


</script>

<template>

  <div class="header">
    {{ route.params.categoryName }}
  </div>
  <div class="book-grid">
    <RouterLink class="book-card" v-for="book in books" :key="book.id" :to="`/books/${book.id}`">
      <img
        class="book-image"
        :src="book.imagePath || 'https://upload.wikimedia.org/wikipedia/commons/3/36/Hopetoun_falls.jpg'"
        :alt="book.title"
      />
      <div class="book-info">
        <h3 class="book-title">{{ book.title }}</h3>
        <p class="book-author">Tác giả: {{ book.author }}</p>
        <p class="book-price">Giá: {{ formatPrice(book.price) }}đ</p>
        <p class="book-publisher">NXB: {{ book.publisher }}</p>
        <p class="book-isbn">ISBN: {{ book.isbn }}</p>
        <p class="book-language">Ngôn ngữ: {{ book.language }}</p>
      </div>
    </RouterLink>
  </div>
</template>

<style scoped>

.header {
  color: black;
}
.book-grid {
  display: flex;
  flex-wrap: wrap;
  grid-template-columns: 1fr;
  gap: 20px;
  justify-content: center;
  padding: 30px;
  background-color: #fdfdfd;
}

.book-card {
  width: 300px;
  background-color: #fff;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 6px 8px 24px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.book-card:hover {
  transform: translateY(-5px) scale(1.03);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.15);
  cursor: pointer;
}

.book-image {
  width: 100%;
  height: 350px;
  object-fit: cover;
  border-bottom: 1px solid #eee;
}

.book-info {
  padding: 16px;
  color: #333;
}

.book-title {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 8px;
  color: #222;
}

.book-author,
.book-price,
.book-publisher,
.book-isbn,
.book-language {
  font-size: 16px;
  margin: 4px 0;
  color: #555;
}
</style>
