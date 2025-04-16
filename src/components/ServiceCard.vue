<template>
  <div class="service-card">
    <component :is="icon" class="service-card__icon" />
    <h3 class="service-card__title">{{ title }}</h3>
    <p class="service-card__description">{{ description }}</p>
    <a
      :href="ctaLink"
      @click="scrollToSection"
      class="service-card__cta"
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

<style scoped>
.service-card {
  background-color: white;
  padding: 2rem;
  border-radius: 0.75rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.service-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.service-card__icon {
  width: 4rem;
  height: 4rem;
  margin: 0 auto 1.5rem;
  color: #2563eb; /* blue-600 */
  transition: transform 0.3s ease;
}

.service-card:hover .service-card__icon {
  transform: scale(1.1);
}

.service-card__title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #1f2937; /* gray-800 */
  line-height: 1.2;
}

.service-card__description {
  color: #4b5563; /* gray-600 */
  margin-bottom: 1.5rem;
  line-height: 1.6;
  flex-grow: 1;
  font-size: 1.05rem;
}

.service-card__cta {
  display: inline-block;
  background-color: #2563eb; /* blue-600 */
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 0.375rem;
  font-weight: 600;
  text-decoration: none;
  transition: background-color 0.2s ease, transform 0.2s ease;
  cursor: pointer;
  box-shadow: 0 4px 6px -1px rgba(37, 99, 235, 0.2);
}

.service-card__cta:hover {
  background-color: #1d4ed8; /* blue-700 */
  transform: translateY(-2px);
}

.service-card__cta:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.5);
}

.service-card__cta:active {
  transform: translateY(0);
}

@media (max-width: 640px) {
  .service-card {
    padding: 1.5rem;
  }

  .service-card__icon {
    width: 3rem;
    height: 3rem;
    margin-bottom: 1rem;
  }

  .service-card__title {
    font-size: 1.25rem;
  }

  .service-card__description {
    font-size: 1rem;
  }

  .service-card__cta {
    padding: 0.6rem 1.2rem;
  }
}
</style>
