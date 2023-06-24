import { createRouter, createWebHistory } from 'vue-router'
import ArticleView from '../views/ArticleView.vue'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/article',
      name: 'article',
      component: ArticleView
    }
  ]
})

export default router
