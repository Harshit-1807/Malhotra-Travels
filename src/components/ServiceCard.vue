<template>
  <div class="bg-white p-6 rounded-lg shadow-md text-center">
    <component :is="icon" class="w-12 h-12 mx-auto mb-4 text-blue-600" />
    <h3 class="text-xl font-bold mb-2">{{ title }}</h3>
    <p class="text-gray-600 mb-4">{{ description }}</p>
    <a
      :href="ctaLink"
      @click="scrollToSection"
      class="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >{{ ctaText }}</a
    >
  </div>
</template>

<script setup>
import { defineProps } from "vue";

defineProps({
  icon: {
    type: [Object, Function], // Allow both Object and Function to handle Heroicons
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  ctaText: {
    type: String,
    required: true,
  },
  ctaLink: {
    type: String,
    required: true,
  },
});

const scrollToSection = (event) => {
  event.preventDefault();
  const id = event.currentTarget.getAttribute("href").slice(1);
  console.log(`ServiceCard: Scrolling to ${id}`);
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  } else {
    console.error(`ServiceCard: Element ${id} not found`);
  }
};
</script>
