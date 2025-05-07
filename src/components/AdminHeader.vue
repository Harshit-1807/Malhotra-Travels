<template>
  <header class="admin-header">
    <h2 class="admin-header__title">Admin Panel</h2>
    <nav class="admin-header__nav">
      <button
        @click="navigateTo('/admin-dashboard')"
        class="admin-header__link"
      >
        Dashboard
      </button>
      <button @click="navigateTo('/admin-bookings')" class="admin-header__link">
        Bookings
      </button>
      <button
        @click="navigateTo('/admin-affiliate')"
        class="admin-header__link"
      >
        Affiliate
      </button>
      <button
        @click="navigateTo('/admin-carOwner')"
        class="admin-header__link"
      >
        Car Owner
      </button>
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

const navigateTo = (path) => {
  router.push(path);
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
  flex-wrap: wrap;
}

.admin-header__nav {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
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
