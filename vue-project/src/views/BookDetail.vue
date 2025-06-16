<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const book = ref({})
const quantity = ref(1)

onMounted(async () => {
  try {
    const response = await fetch(`http://localhost:8080/api/book/${route.params.id}`)
    const json = await response.json()
    book.value = json.data
  } catch (error) {
    console.error('Failed to fetch book:', error)
  }
})

const formatPrice = (price) => {
  console.log('formatPrice called with:', price)
  if (!price || isNaN(price)) return 'N/A'
  return Number(price).toLocaleString('vi-VN') + 'đ'
}


const increaseQty = () => quantity.value++
const decreaseQty = () => {
  if (quantity.value > 1) quantity.value--
}
</script>

<template>
  <div class="book-detail">
    <div class="left">
      <img :src="book.imagePath" class="main-image" />
      <div class="thumbnails">
        <img :src="book.imagePath" v-for="n in 3" :key="n" />
      </div>
    </div>

    <div class="right">
      <h1 class="title">{{ book.title }}</h1>
      <p class="author">Tác giả: <strong>{{ book.author }}</strong></p>

      <div class="price-block">
        <span class="original-price">{{ formatPrice(book.price * 1.3) }}</span>
        <span class="sale-price">{{ formatPrice(book.price) }}</span>
        <span class="discount">-30%</span>
      </div>

      <div class="qty">
        <button @click="decreaseQty" class="btn_quantity">-</button>
        <!-- <input type="text" v-model="quantity" readonly /> -->
         <span class="quantity">{{quantity}}</span>
        <button @click="increaseQty" class="btn_quantity">+</button>
      </div>

      <div class="actions">
        <button class="add-to-cart">THÊM VÀO GIỎ</button>
        <button class="buy-now">MUA NGAY</button>
      </div>

      <div class="description">
        <span>MÔ TẢ</span>
        <p>{{ book.description }}</p>
      </div>
    </div>
  </div>
</template>

<style>
.book-detail {
  display: flex;
  gap: 40px;
  padding: 40px;
  font-family: 'Segoe UI', sans-serif;
  background: #fff;
}

.left {
  width: 40%;
}

.main-image {
  width: 70%;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.thumbnails {
  display: flex;
  gap: 8px;
  margin-top: 12px;
}

.thumbnails img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.right {
  flex: 1;
}

.title {
  font-size: 38px;
  margin-bottom: 8px;
  color: black;
}

.author {
  font-size: 16px;
  margin-bottom: 16px;
  color: black;
}

.price-block {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;
}

.original-price {
  text-decoration: line-through;
  color: #888;
}

.sale-price {
  font-size: 24px;
  font-weight: bold;
  color: #e53935;
}

.discount {
  background: #e53935;
  color: white;
  font-size: 14px;
  padding: 4px 8px;
  border-radius: 4px;
}

.qty {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
}

.qty button {
  padding: 18px 24px;
  font-size: 18px;
  border: none;
  background-color: #f3f4f4;
  height: 45px;
  width: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.qty input {
  width: 50px;
  text-align: center;
}

.actions {
  display: flex;
  gap: 16px;
  margin-bottom: 32px;
}

.add-to-cart {
  padding: 12px 20px;
  background-color: #673ab7;
  color: white;
  border: none;
  font-weight: bold;
  border-radius: 6px;
  cursor: pointer;
}

.buy-now {
  padding: 12px 20px;
  background-color: #f44336;
  color: white;
  border: none;
  font-weight: bold;
  border-radius: 6px;
  cursor: pointer;
}

.description {
  color: #333;
  font-size: 30px;
}
.quantity {
  color: black;
  font-size: 26px;
  align-items: center;
}
/* .btn_quantity {
  padding: 10px;
} */
</style>
