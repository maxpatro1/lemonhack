<script setup>
import IconHomeBackground from '../components/icons/IconHomeBackground.vue'
import VideoLinkForm from '../components/VideoLinkForm.vue'
</script>

<template>
  <div class="background-container">
    <IconHomeBackground />
  </div>
  <div class="content-container">
    <h1 class="title">Clip to Text</h1>
    <p class="subtitle">Сервис, позволяющий конвертировать видео<br />с YouTube в статью</p>
    <VideoLinkForm />
  </div>
</template>

<style scoped>
.background-container {
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.content-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.title {
  margin-top: 3rem;
  margin-bottom: 1.5rem;
  font-size: 7rem;
  font-weight: 800;
  color: var(--color-black);
}

.subtitle {
  margin-bottom: 4rem;
  font-size: 1.6rem;
  line-height: 1.7rem;
  font-weight: 500;
  text-align: center;
}
</style>
