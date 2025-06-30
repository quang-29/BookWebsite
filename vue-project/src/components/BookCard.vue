<script setup>

import { useFetchData } from '@/composable/useFetchData';
import { onMounted, ref } from 'vue';
import { RouterLink } from 'vue-router';
import { computed } from 'vue';
import { useFetchBooks } from '@/composable/useFetchBooks';



const {loading, books, error} = useFetchBooks('http://localhost:8080/api/v1/book/all')
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
                <RouterLink class="book-item" v-for="book in books" :to="`/book/${book.id}`" :key="book.id">
                    <div class="book-image" 
                    :style="{
                        backgroundImage: `url(${book.imagePath})`
                    }"></div>

                    <div class="book-infor">
                        <p class="book-author">{{book.authorName}}</p>
                        <h3 class="book-title"> {{book.title}}</h3>
                        <p class="book-price">{{formatPrice(book.price *0.3)}}đ <span class="book-price discount">{{formatPrice(book.price)}}đ</span></p>
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
    margin-top: 10px;
    padding: 5px;
    width: calc((100% - 4 * 16px) / 5);
    border: 1px solid transparent; /* Thêm dòng này */
    transition: all 0.3s ease;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    border-radius: 12px;
    margin-top: 20px;
    
    
}
.book-item:hover{
    background-color: transparent;
    border-radius: 12px;
    border: 1px solid #f75454;
    transform: scale(1.05)
}
.book-image {
    width: 100%;
    aspect-ratio: 2 / 3;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    border-radius: 10px;
}
.book-infor {
    width: 100%;
    font-size: 16px;
    color: black;
    padding: 20px 10px;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    overflow: hidden;
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