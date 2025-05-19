<template>
  <header class="admin-header">
    <div class="admin-header__top">
      <h2 class="admin-header__title">Admin Panel</h2>
      <button class="admin-header__menu-btn" @click="toggleMenu">☰</button>
    </div>
    <nav
      class="admin-header__nav"
      :class="{ 'admin-header__nav--open': isMenuOpen }"
    >
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
      <button @click="navigateTo('/admin-carOwner')" class="admin-header__link">
        Car Owner
      </button>
      <button @click="goBack" class="admin-header__link">
        Back to Website
      </button>
      <button @click="handleLogout" class="admin-header__logout">Logout</button>
    </nav>
  </header>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAdmin } from '../composables/useAdmin';

const router = useRouter();
const isMenuOpen = ref(false);
const { logout } = useAdmin();

const handleLogout = () => {
  logout(); 
  router.push("/admin-login");
};

const goBack = () => {
  router.push("/");
};

const navigateTo = (path) => {
  router.push(path);
  isMenuOpen.value = false;
};

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
</script>

<style scoped>
.admin-header {
  background-color: #013661;
  color: #fff;
  padding: 1rem 2rem;
}

.admin-header__top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}

@media (min-width: 769px) {
  .admin-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .admin-header__top {
    flex: 1;
  }

  .admin-header__nav {
    display: flex !important; /* override mobile collapse */
    flex-direction: row;
    align-items: center;
    gap: 1rem;
    margin-top: 0;
  }
}

.admin-header__title {
  font-size: 1.5rem;
  font-weight: bold;
}

.admin-header__menu-btn {
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  display: none;
}

/* Navigation styles */
.admin-header__nav {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1rem;
}

.admin-header__link,
.admin-header__logout {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-weight: bold;
  padding: 0.5rem;
}

.admin-header__link:hover,
.admin-header__logout:hover {
  text-decoration: underline;
}

/* Mobile styles */
@media (max-width: 768px) {
  .admin-header__menu-btn {
    display: block;
  }

  .admin-header__nav {
    display: none;
    flex-direction: column;
    margin-top: 1rem;
    gap: 0.5rem;
  }

  .admin-header__nav--open {
    display: flex;
  }
}
</style>
