import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useArticleStore = defineStore('article', () => {
  const article = ref(null)

  const setArticle = (articleData) => (article.value = articleData)

  return { article, setArticle }
})
