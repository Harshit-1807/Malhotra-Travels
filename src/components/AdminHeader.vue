<template>
  <header class="admin-header">
    <h2 class="admin-header__title">Admin Panel</h2>
    <nav class="admin-header__nav">
      <button @click="goBack" class="admin-header__link">
        Back to Website
      </button>
      <button @click="logout" class="admin-header__logout">Logout</button>
    </nav>
  </header>
</template>

<script setup>
import { useRouter } from "vue-router";
const router = useRouter();

const logout = () => {
  localStorage.removeItem("isAdmin");
  router.push("/admin-login");
};

const goBack = () => {
  router.push("/"); 
};
</script>

<style scoped>
.admin-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #222;
  color: #fff;
}

.admin-header__nav button {
  margin-left: 1rem;
  background: none;
  border: none;
  color: #fff;
  cursor: pointer;
  font-weight: bold;
}

.admin-header__nav button:hover {
  text-decoration: underline;
}
</style>
