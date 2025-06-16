import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/category',
    name: 'category',
    component: () => import(/* webpackChunkName: "category" */ '@/views/Category.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */"@/views/About.vue"),
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import(/* webpackChunkName: "profile" */"@/views/Profile.vue"),
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import(/* webpackChunkName: "profile" */"@/views/Cart.vue")
  },
  {
    path:'/books/:id',
    component: () => import(/* webpackChunkName: "profile" */"@/views/BookDetail.vue")
  }
  ,
  {
    path: '/categoryBook/:id',
    name: 'categoryBook',
    component: () => import(/* webpackChunkName: "profile" */"@/views/ListVerticalBook.vue")
  }
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
