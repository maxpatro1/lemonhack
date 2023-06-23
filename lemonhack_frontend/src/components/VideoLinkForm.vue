<script setup>
import { ref } from 'vue'
import IconArrowRight from './icons/IconArrowRight.vue'

const isLinkEntered = ref(false)
const link = ref('')

const handleSubmit = (event) => {
  event.preventDefault()
  console.log('submit event:', event)
}
</script>

<template>
  <form v-if="!isLinkEntered" class="form" @submit="handleSubmit">
    <input type="text" placeholder="Вставьте ссылку на видео" v-model="link" class="input" />
    <button type="submit" class="submit-button">
      <IconArrowRight />
    </button>
  </form>
  <div v-else></div>
</template>

<style scoped>
.form {
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
  height: 100%;
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
</style>
