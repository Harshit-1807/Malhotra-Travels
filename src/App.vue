<template>
  <div class="app">
    <div class="app__wrapper">
      <Header />
      <main class="app__main">
        <Home />
      </main>
      <Footer />
    </div>
  </div>
</template>

<script setup>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import Home from './views/Home.vue'
</script>

<style scoped>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f9fafb;
  width: 100%;
  overflow-x: hidden;
}

.app__wrapper {
  width: 100%;
  max-width: 1350px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.05);
  background-color: #ffffff;
  box-sizing: border-box;
}

.app__main {
  flex-grow: 1;
  width: 100%;
}

@media screen and (max-width: 768px) {
  .app__wrapper {
    max-width: 100%;
    width: 100vw;
  }
}
</style>