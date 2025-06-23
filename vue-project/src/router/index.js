import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { compile } from 'vue'


const requireAuth = (to, from, next) => {
  const isLoggedIn = !!localStorage.getItem('token') 
  if (isLoggedIn) {
    next()
  } else {
    next({name: 'signIn'})
  }
}

// const requireAuth = (to, from, next) => {
//   const isLoggedIn = !!localStorage.getItem('token') // hoặc dùng Pinia/Vuex nếu có
//   if (isLoggedIn) {
//     next()
//   } else {
//     next({ name: 'signIn' }) // chuyển hướng nếu chưa đăng nhập
//   }
// }

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {requireAuth: true},
  },
  {
    path: '/category',
    name: 'category',
    component: () => import(/* webpackChunkName: "category" */ '@/views/Category.vue'),
    meta: {requireAuth: true}
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
    meta: {requireAuth: true},
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import(/* webpackChunkName: "profile" */"@/views/Cart.vue"),
    meta: {requireAuth: true},
    beforeEnter: (to,from,next) => {
      const userInfor = JSON.parse(localStorage.getItem('user-info') || '{}')
      if(userInfor.username == 'admin'){
        console.log("Before Enter")
        console.log("Người dùng có quyền admin")
        next()
      } else {
        console.log("Người dùng không phải là admin")
        next({name: 'home'})
      }
    }
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
  },
  {
    path: '/signIn',
    name: 'signIn',
    component: () => import(/* webpackChunkName: "profile" */"@/views/SignIn.vue")
  }, 
  {
    path: '/signUp',
    name: 'signUp',
    component: () => import(/* webpackChunkName: "profile" */"@/views/SignUp.vue")
  },
  ]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})
 router.beforeEach((to, from, next) => {
    const isLoggIn = localStorage.getItem('token')
    if(to.meta.requireAuth && !isLoggIn){
      console.log("Before Each")
      console.log("Chưa đăng nhập, chuyển về LogIn")
      next({name: 'signIn'})
    } else {
      next()
    }
  })

  router.beforeResolve((to,from,next) => {
    console.log("Before Resolve")
    next()
  })

export default router
