<script setup>
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import YouTube from 'vue3-youtube'
import { useArticleStore } from '../stores/article'
import { useVideoIdStore } from '../stores/videoId'
// import { baseClient } from '../services/baseClient'

const router = useRouter()

const player = ref(null)
const playerWidth = ref(640)
const playerHeight = ref(360)

const videoIdStore = useVideoIdStore()
const { videoId } = storeToRefs(videoIdStore)

onMounted(() => {
  if (!videoId.value) {
    router.push('/')
    return
  }
  playerWidth.value = Math.floor(window.innerWidth / 2.5)
  playerHeight.value = Math.floor((playerWidth.value / 16) * 9)
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

const handleArticleSave = async () => {
  try {
    const updatedSegments = article.value.segments.map((segment, index) => {
      const titleElement = document.querySelector(`#article-title-${index}`)
      const textElement = document.querySelector(`#article-text-${index}`)
      return { ...segment, text: `*${titleElement.innerText}\n${textElement.innerHTML}\n\n` }
    })
    console.log('updated article:', { ...article.value, segments: updatedSegments })
    // await baseClient.put('/', {article: { ...article.value, segments: updatedSegments }})
  } catch (error) {
    console.error(error)
  }
}
</script>

<template>
  <div class="content-container">
    <div class="video-container">
      <div class="video">
        <YouTube
          ref="player"
          :src="`https://www.youtube.com/watch?v=${videoId}`"
          :width="playerWidth"
          :height="playerHeight"
        />
      </div>
      <button class="button" @click="handleVideoChange">Попробовать другое видео</button>
      <button class="save-button" @click="handleArticleSave">Сохранить изменения в статье</button>
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
          <h2 :id="`article-title-${index}`" class="paragraph-title" contenteditable="true">
            {{ segment.text.split('\n')[0].replace('*', '') }}
          </h2>
          <p :id="`article-text-${index}`" class="paragraph-text" contenteditable="true">
            {{ segment.text.split('\n')[1] }}
          </p>
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
  margin-bottom: 1rem;
  padding: 0.3rem 2.1rem;
  font-size: 1.3rem;
  font-weight: 700;
  border: 2px solid var(--color-primary-accent);
  border-radius: 9999px;
  color: var(--color-secondary-accent);
  background-color: transparent;
}

.save-button {
  width: 100%;
  padding: 0.3rem 2.1rem;
  font-size: 1.3rem;
  font-weight: 700;
  border: 2px solid var(--color-primary-accent);
  border-radius: 9999px;
  color: #fff;
  background-color: var(--color-primary-accent);
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
