<template>
  <div class="service-card">
    <div class="service-card__icon-container">
      <component :is="icon" class="service-card__icon" />
    </div>
    <h3 class="service-card__title">{{ title }}</h3>
    <p class="service-card__description">{{ description }}</p>
    <div class="service-card__actions">
      <a :href="ctaLink" @click="scrollToSection" class="service-card__cta">
        <span>{{ ctaText }}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="service-card__cta-arrow"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </a>
      <a
        v-if="whatsappLink"
        :href="whatsappLink"
        target="_blank"
        rel="noopener noreferrer"
        class="service-card__whatsapp-btn"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="service-card__whatsapp-icon"
        >
          <path
            d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.036c.101-.108.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564c.173.087.288.131.332.202.043.72.043.419-.101.824z"
          />
        </svg>
        <span>Learn More</span>
      </a>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

defineProps({
  icon: {
    type: [Object, Function],
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
  whatsappLink: {
    type: String,
    default: null,
  },
  isComingSoon: {
    type: Boolean,
    default: false,
  },
});

const scrollToSection = (event) => {
  event.preventDefault();
  const id = event.currentTarget.getAttribute("href").slice(1);
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
  background: linear-gradient(135deg, #ffffff 0%, #f7faff 100%);
  padding: 2.5rem 2rem;
  border-radius: 1rem;
  box-shadow: 0 10px 30px -3px rgba(0, 0, 0, 0.05),
    0 4px 6px -2px rgba(0, 0, 0, 0.02);
  text-align: center;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(235, 240, 255, 0.8);
}

.service-card::before {
  content: "";
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(
    circle,
    rgba(37, 99, 235, 0.08) 0%,
    rgba(255, 255, 255, 0) 70%
  );
  opacity: 0;
  transform: scale(0.5);
  transition: opacity 0.5s ease, transform 0.5s ease;
  z-index: 0;
  pointer-events: none;
}

.service-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 25px 50px -12px rgba(0, 42, 255, 0.15);
  border-color: rgba(37, 99, 235, 0.2);
}

.service-card:hover::before {
  opacity: 1;
  transform: scale(1);
}

.service-card__icon-container {
  background: linear-gradient(135deg, #edf2ff 0%, #e6efff 100%);
  width: 5rem;
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 1rem;
  margin: 0 auto 1.8rem;
  position: relative;
  transition: all 0.3s ease;
  box-shadow: 0 10px 15px -3px rgba(37, 99, 235, 0.1);
}

.service-card__icon {
  width: 2.8rem;
  height: 2.8rem;
  color: #2563eb;
  transition: transform 0.3s ease, color 0.3s ease;
  position: relative;
  z-index: 1;
}

.service-card:hover .service-card__icon-container {
  transform: rotateY(180deg);
  background: linear-gradient(135deg, #2563eb 0%, #3b82f6 100%);
}

.service-card:hover .service-card__icon {
  transform: rotateY(180deg);
  color: white;
}

.service-card__title {
  font-size: 1.6rem;
  font-weight: 700;
  margin-bottom: 1.2rem;
  color: #111827;
  line-height: 1.2;
  position: relative;
}

.service-card__description {
  color: #4b5563;
  margin-bottom: 2rem;
  line-height: 1.7;
  flex-grow: 1;
  font-size: 1.05rem;
  position: relative;
}

.service-card__actions {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-top: auto;
}
.service-card__cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(90deg, #2563eb 0%, #3b82f6 100%);
  color: white;
  padding: 0.85rem 1.8rem;
  border-radius: 0.5rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;
  box-shadow: 0 4px 14px -1px rgba(37, 99, 235, 0.3);
  position: relative;
  overflow: hidden;
  width: 100%;
  max-width: 220px;
}

.service-card__cta::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.2) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  transition: left 0.6s ease;
}

.service-card__cta:hover {
  background: linear-gradient(90deg, #1d4ed8 0%, #2563eb 100%);
  transform: translateY(-3px);
  box-shadow: 0 6px 20px -4px rgba(37, 99, 235, 0.4);
}

.service-card__cta:hover::before {
  left: 100%;
}

.service-card__cta:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.5),
    0 6px 20px -4px rgba(37, 99, 235, 0.4);
}

.service-card__cta:active {
  transform: translateY(0);
}

.service-card__cta-arrow {
  width: 1.2rem;
  height: 1.2rem;
  margin-left: 0.5rem;
  transition: transform 0.3s ease;
}

.service-card__cta:hover .service-card__cta-arrow {
  transform: translateX(4px);
}

.service-card__whatsapp-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(90deg, #25d366 0%, #128c7e 100%);
  color: white;
  padding: 0.85rem 1.8rem;
  border-radius: 0.5rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;
  box-shadow: 0 4px 14px -1px rgba(37, 211, 102, 0.3);
  position: relative;
  overflow: hidden;
  width: 100%;
  max-width: 220px;
}

.service-card__whatsapp-btn::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.2) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  transition: left 0.6s ease;
}

.service-card__whatsapp-btn:hover {
  background: linear-gradient(90deg, #128c7e 0%, #075e54 100%);
  transform: translateY(-3px);
  box-shadow: 0 6px 20px -4px rgba(37, 211, 102, 0.4);
}

.service-card__whatsapp-btn:hover::before {
  left: 100%;
}

.service-card__whatsapp-btn:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(37, 211, 102, 0.5),
    0 6px 20px -4px rgba(37, 211, 102, 0.4);
}

.service-card__whatsapp-btn:active {
  transform: translateY(0);
}

.service-card__whatsapp-icon {
  width: 1.6rem;
  height: 1.6rem;
  margin-right: 0.3rem;
  margin-top: 0.1rem;
}

@media (max-width: 768px) {
  .service-card {
    padding: 2rem 1.5rem;
  }

  .service-card__icon-container {
    width: 4.5rem;
    height: 4.5rem;
    margin-bottom: 1.5rem;
  }

  .service-card__icon {
    width: 2.4rem;
    height: 2.4rem;
  }

  .service-card__title {
    font-size: 1.4rem;
    margin-bottom: 1rem;
  }

  .service-card__cta,
  .service-card__whatsapp-btn {
    padding: 0.7rem 1.4rem;
    font-size: 0.95rem;
  }
}

@media (max-width: 640px) {
  .service-card {
    padding: 1.8rem 1.2rem;
  }

  .service-card__icon-container {
    width: 4rem;
    height: 4rem;
    margin-bottom: 1.2rem;
  }

  .service-card__icon {
    width: 2.2rem;
    height: 2.2rem;
  }

  .service-card__title {
    font-size: 1.3rem;
  }

  .service-card__description {
    font-size: 1rem;
    margin-bottom: 1.5rem;
  }

  .service-card__cta,
  .service-card__whatsapp-btn {
    padding: 0.7rem 1.4rem;
    font-size: 0.95rem;
  }
}
</style>
