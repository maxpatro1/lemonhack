import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useArticleStore = defineStore('article', () => {
  const article = ref(null)

  function setArticle(articleData) {
    article.value = articleData
  }

  return { article, setArticle }
})
