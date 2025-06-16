<script setup>

import { useRouter } from 'vue-router';
import { ShoppingCart, User, Search, ArrowDown } from 'lucide-vue-next'

const router = useRouter();

const directToCart = () => {
  router.push('/cart')
}
</script>

<template>
  <header class="header-container">

    <div class="logo-header">
        <div class="logo-container">
            <img src="../assets/images/logo.jpeg" alt="Logo" class="logo-image" />
        </div>
        <div class="brand-header">
            <span class="logo-text">Mickey's Bookstore</span>
        </div>
    </div>
    

    <div class="search-container">
      <input
        type="text"
        class="search-input"
        placeholder="Enter book name you're looking for..."
      />
      <button class="search-button">
        <Search size="20" />
      </button>
    </div>

    <div class="language-button">
        <button class="btn">
            Language <ArrowDown size="16" />
        </button>

        <div class="language-list">
            <li class="language-item">Vietnamese</li>
            <li class="language-item">English</li>
        </div>
        
    </div>

    <div class="cart-button">
      <button v-on:click="directToCart" class="btn cart-btn">
        <span>Cart</span>
        <ShoppingCart size="20" />
      </button>
    
      <RouterLink to="/profile" :style="{ backgroundColor: 'white' }"><button class="btn user-btn">
        <span>Account</span>
        <User size="20" />
      </button></RouterLink>
      
    </div>
  </header>
</template>

<style scoped>
.header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 16px 24px;
  background-color: #fefefe;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.logo-header {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo-container {
  flex-shrink: 0;
}
.logo-image {
  width: 100px;
  height: auto;
  object-fit: contain;
}
.search-container {
  flex: 3;
  margin: 0 20px;
  position: relative;
}
.logo-text{
    color: black;
    font-size: 2rem;
}

.search-input {
  width: 100%;
  padding: 10px 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
  transition: all 0.3s;
}

.search-button {
  position: absolute;
  right: 5px;
  top: 50%;
  transform: translateY(-40%);
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 4px;
  color: #555;
  transition: color 0.2s ease;
  border-radius: 6px;
  padding: 6px 10px;
  background-color: #0093E9;
  background-image: linear-gradient(160deg, #0093E9 0%, #80D0C7 100%);

}

.search-button:hover {
  color: #007bff;
}

.search-input:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 6px rgba(0, 123, 255, 0.4);
}
.language-list{
    display: none;
}
.language-button{
    position: relative;
}
.language-list{
    position: absolute;
    width: 100%;
    border: 1px solid #ccc;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;

}
.language-button:hover .language-list {
    display: block;
}
.language-item {
    list-style: none;
    padding: 6px 8px;
    text-align: center;
    width: 100%;
    color: black;
    font-size: 15px;
}
.language-item:hover {
    background-color: #d6d8db;
}
.cart-button{
  margin-left: 10px;
  display: flex;
  align-items: center;
  column-gap: 5px;
}

.btn {
  padding: 10px 14px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  display: flex;
  align-items: center;
  gap: 6px;
  color: black;
  background-color: #e9ecef;
}
.btn:hover {
  background-color: #d6d8db;
  transform: translateY(-1px);
}

.user-btn {
  background-color: #6c757d;
  color: #fff;
}
.user-btn:hover {
  background-color: #5a6268;
}
@media (min-width: 1400px) {
    .search-container {
        flex: 3;
    }
    .header-container{
        font-size: 30px;
    }

}
@media (max-width: 1200px) and (min-width: 768px){
    .logo-header{
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .logo-text {
        font-size: 16px;
    }
    .search-container {
        flex: 1;
    }
}
@media (max-width: 767px) {
    .logo-text {
        font-size: 10px;
    }
    .logo-header{
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0px;
    }
    .logo-image{
        width:50px;
        height: auto;
    }
    .search-input::placeholder {
        font-size: 12px; 
}
}

</style>
