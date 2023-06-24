<script setup>
import { useField, useForm } from 'vee-validate'
import { ref } from 'vue'
import * as yup from 'yup'
import { youtubeClient } from '../services/youtubeClient'
// import { baseClient } from '../services/baseClient'
import { useRouter } from 'vue-router'
import { useVideoIdStore } from '../stores/videoId'
import IconArrowRight from './icons/IconArrowRight.vue'
// import { useArticleStore } from '../stores/article'

const linkFormSchema = yup.object({
  link: yup
    .string()
    .url('Неверная ссылка')
    .required('Введите ссылку')
    .matches(/youtu/, 'На данный момент поддерживаются только YouTube видео')
    .trim()
})

const { handleSubmit: handleLinkFormSubmit } = useForm({
  validationSchema: linkFormSchema,
  initialValues: { link: '' }
})
const {
  value: linkFieldValue,
  errorMessage: linkFieldError,
  setErrors: setLinkFiledError
} = useField('link')

const { setVideoId } = useVideoIdStore()

const isLinkEntered = ref(false)
const videoData = ref(null)

const onLinkFormSubmit = handleLinkFormSubmit(async (values) => {
  console.log(values)
  const { link } = values
  try {
    let videoId = ''
    if (link.includes('&')) {
      videoId = link.split('&')[0].split('v=')[1]
    } else {
      const linkParts = link.split('?')[0].split('/')
      videoId = linkParts[linkParts.length - 1]
    }
    const { data } = await youtubeClient.get('/videos?part=id&part=snippet&part=contentDetails', {
      params: { id: videoId }
    })
    const { items } = data
    if (items.length === 0) {
      setLinkFiledError('Неверная ссылка')
      return
    }
    setVideoId(videoId)
    videoData.value = items[0]
    isLinkEntered.value = true
  } catch (error) {
    setLinkFiledError('Неверная ссылка')
    console.error(error)
  }
})

const { handleSubmit: handleVideoParamsFormSubmit, resetForm: resetVideoParamsForm } = useForm({
  validationSchema: yup.object({
    startTime: yup.string(),
    endTime: yup.string(),
    maxSymbols: yup
      .number()
      .typeError('Число должно состоять из цифр')
      .integer('Число должно быть целым')
      .positive('Число должно быть положительным')
  })
})
const { value: startTimeFieldValue } = useField('startTime')
const { value: endTimeFieldValue } = useField('endTime')
const { value: maxSymbolsFieldValue } = useField('maxSymbols')

const router = useRouter()
// const { setArticle } = useArticleStore()

const onVideoParamsFormCancel = () => {
  resetVideoParamsForm()
  isLinkEntered.value = false
}
const onVideoParamsFormSubmit = handleVideoParamsFormSubmit(async (values) => {
  console.log(values)
  try {
    // const {data} = await baseClient.get(some params...)
    // setArticle(data)
    router.push('/article')
  } catch (error) {
    console.error(error)
  }
})
</script>

<template>
  <form v-if="!isLinkEntered" class="link-form" @submit="onLinkFormSubmit">
    <input
      type="text"
      placeholder="Вставьте ссылку на видео"
      v-model="linkFieldValue"
      class="input"
    />
    <button type="submit" class="submit-button">
      <IconArrowRight />
    </button>
  </form>
  <div v-if="!isLinkEntered" class="error-container">
    <p v-if="linkFieldError" class="error">{{ linkFieldError }}</p>
  </div>
  <div v-if="isLinkEntered && videoData" class="video-container">
    <img
      :src="videoData.snippet.thumbnails.standard.url"
      :alt="videoData.snippet.title"
      class="video-image"
    />
    <div class="video-info">
      <h2 class="video-title">{{ videoData.snippet.title }}</h2>
      <div class="video-subtitle-container">
        <p class="video-subtitle">Вы можете выбрать для генерации статьи:</p>
        <ul class="video-options-list">
          <li>начальное и конечное время видео</li>
          <li>количество символов</li>
        </ul>
      </div>
      <form id="video-params-form" class="video-params-form" @submit="onVideoParamsFormSubmit">
        <label class="inline-input-container">
          <p>Начало:</p>
          <input
            type="text"
            placeholder="00:00:00"
            v-model="startTimeFieldValue"
            class="inline-input"
          />
        </label>
        <label class="inline-input-container">
          <p>Символы:</p>
          <input
            type="number"
            step="1"
            placeholder="0"
            v-model="maxSymbolsFieldValue"
            class="inline-input"
          />
        </label>
        <label class="inline-input-container">
          <p>Конец:</p>
          <input
            type="text"
            placeholder="00:00:00"
            v-model="endTimeFieldValue"
            class="inline-input"
          />
        </label>
      </form>
      <div class="buttons-container">
        <button
          type="button"
          form="video-params-form"
          class="button-with-text"
          @click="onVideoParamsFormCancel"
        >
          Попробовать другое видео
        </button>
        <button type="submit" form="video-params-form" class="submit-button-with-text">Пуск</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.link-form {
  width: 75%;
  padding: 0.3rem 0.5rem;
  display: flex;
  border: 1px solid var(--color-secondary-accent);
  border-radius: 9999px;
  background-color: var(--color-background);
  box-shadow: 0px 4px 15px 0px rgba(0, 0, 0, 0.1);
}

.input {
  flex-grow: 1;
  padding: 0 1.3rem;
  font-size: 1.2rem;
  letter-spacing: 0.1rem;
  background-color: transparent;
}

.submit-button {
  padding: 0.65rem 0.9rem;
  border-radius: 9999px;
  background-color: var(--color-primary-accent);
}

.submit-button svg {
  width: 1.5rem;
}

.error-container {
  height: 3rem;
  width: 75%;
}

.error {
  margin-top: 1rem;
  color: red;
}

.video-container {
  width: 75%;
  padding: 1.5rem;
  display: flex;
  gap: 2rem;
  border: 1px solid var(--color-border);
  border-radius: 1.5rem;
  background-color: var(--color-background);
  box-shadow: 0px 4px 15px 0px rgba(0, 0, 0, 0.1);
}

.video-image {
  width: 30rem;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  object-position: center;
  border-radius: 1rem;
}

.video-info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.video-title {
  font-size: 1.6rem;
  font-weight: 800;
  color: var(--color-black);
}

.video-subtitle {
  font-size: 1.3rem;
  line-height: 1.2;
}

.video-options-list {
  line-height: 1.2;
}

.video-params-form {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.inline-input-container {
  display: flex;
  gap: 1rem;
}

.inline-input {
  height: 100%;
  width: max-content;
  background-color: transparent;
  border-bottom: 1px solid transparent;
  transition: border-color 0.3s;
}

.inline-input:hover,
.inline-input:focus,
.inline-input:focus-visible {
  border-color: var(--color-primary-accent);
}

.buttons-container {
  display: flex;
  justify-content: space-between;
}

.button-with-text {
  padding: 0.3rem 2.1rem;
  font-size: 1.3rem;
  font-weight: 700;
  border: 2px solid var(--color-primary-accent);
  border-radius: 9999px;
  color: var(--color-secondary-accent);
  background-color: transparent;
}

.submit-button-with-text {
  padding: 0.3rem 2.1rem;
  font-size: 1.3rem;
  font-weight: 700;
  border: 2px solid var(--color-primary-accent);
  border-radius: 9999px;
  color: white;
  background-color: var(--color-primary-accent);
}
</style>
