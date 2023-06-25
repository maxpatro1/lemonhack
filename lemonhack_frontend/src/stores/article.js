import { defineStore } from 'pinia'
import { ref } from 'vue'
// import articleJson from '../assets/article.json'

export const useArticleStore = defineStore('article', () => {
  const article = ref(null)
  // const article = ref(articleJson)

  function setArticle(articleData) {
    article.value = articleData
  }

  return { article, setArticle }
})
