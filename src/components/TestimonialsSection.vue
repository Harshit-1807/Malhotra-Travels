<template>
  <div class="testimonials">
    <div class="testimonials__container">
      <h2 class="testimonials__title">What Our Customers Say</h2>
      <div class="testimonials__slider">
        <!-- Navigation Arrows -->
        <button 
          class="nav-button nav-button--prev" 
          @click="prevSlide"
          :disabled="currentSlide === 0"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <!-- Slider Wrapper -->
        <div class="testimonials__wrapper">
          <div class="testimonials__grid">
            <div
              v-for="(testimonial, index) in paginatedTestimonials"
              :key="index"
              class="testimonial-card"
            >
              <div class="testimonial-card__content">
                <div class="testimonial-card__rating">★★★★★</div>
                <p class="testimonial-card__text">"{{ testimonial.text }}"</p>
                <p class="testimonial-card__author">- {{ testimonial.name }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Next Arrow -->
        <button 
          class="nav-button nav-button--next" 
          @click="nextSlide"
          :disabled="currentSlide >= maxSlides"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <!-- Dots Navigation -->
        <div class="dots-navigation">
          <button
            v-for="n in totalDots"
            :key="n"
            class="dot"
            :class="{ 'dot--active': currentSlide === n - 1 }"
            @click="goToSlide(n - 1)"
          ></button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, onMounted, onUnmounted, watchEffect } from 'vue';

const props = defineProps({
  testimonials: {
    type: Array,
    required: true,
  },
});

const currentSlide = ref(0);
const itemsPerSlide = ref(3);
const windowWidth = ref(window.innerWidth);

const paginatedTestimonials = computed(() => {
  const start = currentSlide.value * itemsPerSlide.value;
  const end = start + itemsPerSlide.value;
  return props.testimonials.slice(start, end);
});

const maxSlides = computed(() => Math.max(Math.ceil(props.testimonials.length / itemsPerSlide.value) - 1, 0));
const totalDots = computed(() => Math.ceil(props.testimonials.length / itemsPerSlide.value));

const goNext = () => {
  if (currentSlide.value < maxSlides.value) {
    currentSlide.value++;
  }
};

const goPrev = () => {
  if (currentSlide.value > 0) {
    currentSlide.value--;
  }
};

const goToSlide = (index) => {
  currentSlide.value = index;
};

const updateItemsPerSlide = () => {
  if (windowWidth.value < 768) {
    itemsPerSlide.value = 1;
  } else if (windowWidth.value < 1024) {
    itemsPerSlide.value = 2;
  } else {
    itemsPerSlide.value = 3;
  }
  currentSlide.value = 0; // Reset to start when resizing
};

onMounted(() => {
  updateItemsPerSlide();
  window.addEventListener('resize', updateItemsPerSlide);

  const interval = setInterval(() => {
    if (currentSlide.value < maxSlides.value) {
      currentSlide.value++;
    } else {
      currentSlide.value = 0;
    }
  }, 5000);

  onUnmounted(() => {
    clearInterval(interval);
    window.removeEventListener('resize', updateItemsPerSlide);
  });
});
</script>
<style scoped>
.testimonials {
  padding: 4rem 2rem;
  background-color: #fff;
  overflow: hidden;
}

.testimonials__container {
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
}

.testimonials__title {
  font-size: 2.5rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 3rem;
}

.testimonials__slider {
  position: relative;
  overflow: hidden;
  padding: 0 40px;
}

.testimonials__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  transition: transform 0.5s ease;
}

.testimonial-card {
  background-color: #fff;
  border: 1px solid #eee;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  height: 100%;
  transition: transform 0.3s ease;
}

.testimonial-card:hover {
  transform: translateY(-5px);
}

.testimonial-card__rating {
  color: #FFD700;
  font-size: 1.2rem;
  margin-bottom: 1rem;
}

.testimonial-card__content {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.testimonial-card__text {
  font-size: 1.1rem;
  color: #555;
  margin-bottom: 1.5rem;
  flex-grow: 1;
  line-height: 1.6;
}

.testimonial-card__author {
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
  text-align: right;
  margin-top: auto;
}

/* Navigation buttons */
.nav-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  z-index: 1;
}

.nav-button:hover:not(:disabled) {
  background: #f8f8f8;
  transform: translateY(-50%) scale(1.1);
}

.nav-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.nav-button svg {
  width: 24px;
  height: 24px;
  color: #333;
}

.nav-button--prev {
  left: 0;
}

.nav-button--next {
  right: 0;
}

/* Dots navigation */
.dots-navigation {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 2rem;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #ddd;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.dot--active {
  background: #333;
  transform: scale(1.2);
}

/* Responsive adjustments */
@media (max-width: 1024px) {
  .testimonials__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .testimonials__grid {
    grid-template-columns: 1fr;
  }

  .testimonials__title {
    font-size: 2rem;
  }

  .nav-button {
    width: 32px;
    height: 32px;
  }

  .nav-button svg {
    width: 20px;
    height: 20px;
  }
}
</style>