<template>
  <div>
    <AdminHeader />
    <main class="admin-dashboard">
      <h2>Welcome, Admin</h2>
      <p>Select an option from the menu to begin.</p>
    </main>
  </div>
</template>

<script setup>
import AdminHeader from '../components/AdminHeader.vue';
</script>

<style scoped>
.admin-dashboard {
  padding: 2rem;
}
</style>
