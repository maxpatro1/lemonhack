import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useVideoIdStore = defineStore('videoId', () => {
  const videoId = ref('')

  function setVideoId(id) {
    videoId.value = id
  }

  return { videoId, setVideoId }
})
