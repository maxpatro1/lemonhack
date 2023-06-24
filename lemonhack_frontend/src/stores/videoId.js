import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useVideoIdStore = defineStore(() => {
  const videoId = ref('')

  const setVideoId = (id) => (videoId.value = id)

  return { videoId, setVideoId }
})
