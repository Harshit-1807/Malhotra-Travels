<template>
  <Analytics />
  <div class="app">
    <div class="app__wrapper">
      <Header v-if="!isAdminRoute && shouldShowHeaderFooter" />
      <AdminHeader v-if="isAdminRoute" />

      <main class="app__main">
        <router-view />
        <FloatingButtons />
      </main>

      <Footer v-if="!isAdminRoute && shouldShowHeaderFooter" />
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { computed } from "vue";
import { useAdmin } from "./composables/useAdmin";

import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import AdminHeader from "./components/AdminComponents/AdminHeader.vue";
import FloatingButtons from "./components/FloatingButtons.vue";
const route = useRoute();
const { isAdmin } = useAdmin();

const isAdminRoute = computed(() => route.path.startsWith("/admin"));
const shouldShowAdminHeader = computed(
  () => isAdminRoute.value && isAdmin.value
);
const shouldShowHeaderFooter = computed(
  () => !isAdminRoute.value && route.meta.showHeaderFooter !== false
);
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

@media screen and (min-width: 1530px) {
  .app__wrapper {
    max-width: 1530px;
  }
}
</style>
