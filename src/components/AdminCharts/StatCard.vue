<template>
  <div class="stat-card">
    <div class="stat-card__icon">
      <slot name="icon" />
    </div>
    <div class="stat-card__info">
      <p class="stat-card__label">{{ label }}</p>
      <p class="stat-card__value">{{ value }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  label: String,
  value: [String, Number],
});
</script>

<style scoped>
.stat-card {
  display: flex;
  align-items: center;
  background-color: #ffffff;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.stat-card__icon {
  background-color: #3a75ff;
  color: white;
  font-size: 20px;
  padding: 12px;
  border-radius: 50%;
  margin-right: 16px;
}


.stat-card__label {
  font-size: 14px;
  color: #888;
  margin: 0;
}

.stat-card__value {
  font-size: 20px;
  font-weight: bold;
  margin: 4px 0 0;
}
</style>
