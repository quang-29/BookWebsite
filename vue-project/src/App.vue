<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import HomeView from './views/HomeView.vue';
import Header from './components/Header.vue';
import NavBar from './components/NavBar.vue';
import { useFetchData } from './composable/useFetchData';

import { ref, onMounted } from 'vue'

const {loading, data, error} = useFetchData('http://localhost:8080/api/category/getAllCategories')

</script>

<template>
  <div class="nav">
    <router-view></router-view>
  </div>
</template>


<style >
</style>
