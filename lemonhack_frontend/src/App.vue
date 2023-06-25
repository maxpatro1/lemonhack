<script setup>
import { RouterLink, RouterView } from 'vue-router'
import IconLogo from './components/icons/IconLogo.vue'
</script>

<template>
  <header class="header">
    <div class="logo-container">
      <IconLogo />
    </div>
    <nav class="nav">
      <RouterLink to="#" class="nav-link">Вопросы</RouterLink>
      <RouterLink to="#" class="nav-link">Помощь</RouterLink>
    </nav>
  </header>
  <main class="main">
    <RouterView />
  </main>
</template>

<style scoped>
.header {
  padding: 1rem 3rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  border-bottom: 1px solid var(--color-secondary-accent);
  background-color: var(--color-background);
}

.logo-container {
  grid-column: 2 / 2;
  display: flex;
  justify-content: center;
  align-items: center;
}

.logo-container svg {
  width: 9rem;
}

.nav {
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 3rem;
}

.nav-link {
  font-size: 1.35rem;
}

.main {
  flex-grow: 1;
  padding: 1rem 3rem;
}

@media screen and (min-width: 1536px) {
  .main {
    max-width: 1536px;
    margin: 0 auto;
  }
}
</style>
