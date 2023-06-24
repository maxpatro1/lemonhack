<script setup>
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import YouTube from 'vue3-youtube'
// import article from '../assets/article.json'
import { useArticleStore } from '../stores/article'
import { useVideoIdStore } from '../stores/videoId'

const router = useRouter()

const player = ref(null)

const videoIdStore = useVideoIdStore()
const { videoId } = storeToRefs(videoIdStore)

onMounted(() => {
  if (!videoId.value) {
    router.push('/')
  }
})

const store = useArticleStore()
const { article } = storeToRefs(store)
const { setArticle } = store

const handleVideoChange = () => {
  setArticle(null)
  router.push('/')
}

const handleTimeCodeClick = (timeCode) => {
  if (player.value) {
    player.value.seekTo(timeCode, true)
  }
}
</script>

<template>
  <div class="content-container">
    <div class="video-container">
      <div class="video">
        <YouTube ref="player" :src="`https://www.youtube.com/watch?v=jfKfPfyJRdk`" />
      </div>
      <button class="button" @click="handleVideoChange">Попробовать другое видео</button>
    </div>
    <div class="article-container">
      <h1 class="title">{{ article.title }}</h1>
      <div class="paragraph-container">
        <div class="paragraph-tip-container">
          <p class="paragraph-tip">Annotation:</p>
        </div>
        <div class="paragraph-text-container">
          <p class="paragraph-text">{{ article.annotation }}</p>
        </div>
      </div>
      <div v-for="(segment, index) in article.segments" :key="index" class="paragraph-container">
        <div class="paragraph-tip-container">
          <button class="paragraph-tip" @click="() => handleTimeCodeClick(segment.time[0])">
            {{ Number(segment.time[0]).toFixed(2) }}
          </button>
          <button
            class="paragraph-tip"
            @click="() => handleTimeCodeClick(segment.time[segment.time.length - 1])"
          >
            {{ Number(segment.time[segment.time.length - 1]).toFixed(2) }}
          </button>
        </div>
        <div class="paragraph-text-container">
          <h2 class="paragraph-title">{{ segment.text.split('\n')[0].replace('*', '') }}</h2>
          <p class="paragraph-text">{{ segment.text.split('\n')[1] }}</p>
          <img :src="`/api/data/uuid/${segment.time[0]}.jpg`" alt="" class="paragraph-image" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.content-container {
  position: relative;
  padding: 5rem 0;
  display: flex;
  gap: 7rem;
}

.video-container {
  position: sticky;
  top: 1rem;
  flex-shrink: 0;
  flex-basis: 38rem;
  flex-grow: 0;
}

.video {
  width: 100%;
  aspect-ratio: 16 / 9;
  margin-bottom: 2rem;
  border-radius: 2rem;
}

.button {
  width: 100%;
  padding: 0.3rem 2.1rem;
  font-size: 1.3rem;
  font-weight: 700;
  border: 2px solid var(--color-primary-accent);
  border-radius: 9999px;
  color: var(--color-secondary-accent);
  background-color: transparent;
}

.article-container {
  flex-grow: 1;
  flex-shrink: 1;
  padding: 1.5rem;
  border: 1px solid var(--color-secondary-accent);
  border-radius: 2rem;
  box-shadow: 0px 4px 15px 0px rgba(0, 0, 0, 0.1);
}

.title {
  margin-top: 1rem;
  margin-bottom: 2rem;
  font-size: 1.6rem;
  font-weight: 800;
  text-align: center;
}

.paragraph-container {
  margin-bottom: 1.5rem;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
}

.paragraph-tip-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: end;
}

.paragraph-tip {
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--color-secondary-accent);
}

button.paragraph-tip {
  transition: color 0.3s;
}

button.paragraph-tip:hover {
  color: var(--color-primary-accent);
}

.paragraph-text-container {
  grid-column: 2 / 5;
}

.paragraph-title {
  margin-bottom: 1rem;
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--color-black);
}

.paragraph-text {
  margin-bottom: 1rem;
  font-size: 1.1rem;
  line-height: 1.1;
}

.paragraph-image {
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  object-position: center;
}
</style>
