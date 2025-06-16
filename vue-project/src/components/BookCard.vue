<script setup>

import { useFetchData } from '@/composable/useFetchData';
import { onMounted, ref } from 'vue';
import { RouterLink } from 'vue-router';
import { computed } from 'vue';
import { useFetchBooks } from '@/composable/useFetchBooks';
// const books = ref([]);

// onMounted( async () => {
//     try {
//         const response = await fetch('http://localhost:8080/api/book/getAllBooks?pageSize=10');
//         const json = await response.json();
//         books.value = json.content;
//         console.log(json.content);
//     } catch(err) {
//         console.log("Error to fetch data book", err)
//     }
// })

const {loading, books, error} = useFetchBooks('http://localhost:8080/api/book/getAllBooks?pageSize=10')
console.log(books);

const formatPrice = (price) => {
    if (typeof price !== 'number') {
        price = Number(price);
    }
    return price.toLocaleString('vi-VN'); 
};


</script>

<template>
    <div>
        <div class="book-header">
            <h4>ALL BOOKS</h4>
        </div>

        <div class="book-container">
            <div class="book-list">
                <RouterLink class="book-item" v-for="book in books" :to="`/books/${book.id}`" :key="book.id">
                    <div class="book-image" 
                    :style="{
                        backgroundImage: `url(${book.imagePath})`,
                        width: '250px',
                        height: '350px',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }"></div>

                    <div class="book-infor">
                        <p class="book-author">{{book.author}}</p>
                        <h3 class="book-title"> {{book.title}}</h3>
                        <p class="book-price">{{formatPrice(book.price)}}đ <span class="book-price discount">400.000đ</span></p>
                        <p class="review"></p>
                    </div>
                </RouterLink>
            </div>

        </div>
    </div>
</template>

<style>
.book-header{
    color: black;
}
.book-container {
    margin: 30px;

}
.book-list {
    width: 100%;
    display: flex;
    align-items: center;
    column-gap: 10px;
    height: auto;
    flex-wrap: wrap;
}
.book-item {
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 5px;
    width: calc((100% - 4 * 16px) / 5);
    
}
.book-image {
    border-radius: 10px;
    width: 100%;
}
.book-infor {
    width: 250px;
    font-size: 16px;
    color: black;
    padding: 20px 10px;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
}
.book-author {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #f75454;
    font-size: 20px;
}
.book-title {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.book-price {
    color: black;
    font-weight: 600;
    font-size: 18px;
}
.discount {
    text-decoration: line-through;

}
</style>