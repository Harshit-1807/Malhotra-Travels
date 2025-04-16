<template>
  <header class="header">
    <div class="header__container">
      <!-- Logo/Title on the left -->
      <div class="header__branding">
        <div class="header__logo">
          <!-- <img src="https://via.placeholder.com/40" alt="Logo" class="header__logo-image" /> -->
          <span class="header__logo-text">Malhotra Travels</span>
        </div>
      </div>

      <!-- Hamburger/Toggle Button on the right -->
      <button
        class="header__toggle"
        @click="toggleMenu"
        :aria-label="isOpen ? 'Close menu' : 'Open menu'"
      >
        <svg
          class="header__toggle-icon"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            v-if="!isOpen"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
          <path
            v-else
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      <!-- Navigation Menu -->
      <nav
        :class="[
          'header__nav',
          isOpen ? 'header__nav--open' : 'header__nav--closed',
        ]"
      >
        <ul class="header__menu">
          <li class="header__menu-item">
            <a
              href="#home"
              @click.prevent="scrollToSection('home')"
              class="header__menu-link"
              >Home</a
            >
          </li>
          <li class="header__menu-item">
            <a
              href="#explore"
              @click.prevent="scrollToSection('explore')"
              class="header__menu-link"
              >Explore</a
            >
          </li>
          <li class="header__menu-item">
            <a
              href="#about"
              @click.prevent="scrollToSection('about')"
              class="header__menu-link"
              >About</a
            >
          </li>
          <li class="header__menu-item">
            <a
              href="#services"
              @click.prevent="scrollToSection('services')"
              class="header__menu-link"
              >Services</a
            >
          </li>
          <li class="header__menu-item">
            <a
              href="#book-now"
              @click.prevent="scrollToSection('book-now')"
              class="header__menu-link"
              >Book Now</a
            >
          </li>
          <li class="header__menu-item">
            <a
              href="#affiliate"
              @click.prevent="scrollToSection('affiliate')"
              class="header__menu-link"
              >Affiliate</a
            >
          </li>
          <li class="header__menu-item">
            <a
              href="#car-owner"
              @click.prevent="scrollToSection('car-owner')"
              class="header__menu-link"
              >Join as Car Owner</a
            >
          </li>
          <li class="header__menu-item">
            <a
              href="#testimonials"
              @click.prevent="scrollToSection('testimonials')"
              class="header__menu-link"
              >Testimonials</a
            >
          </li>
          <li class="header__menu-item">
            <a
              href="#contact"
              @click.prevent="scrollToSection('contact')"
              class="header__menu-link"
              >Contact</a
            >
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted } from "vue";

const isOpen = ref(false);
const headerHeight = ref(0);
const scrollOffset = ref(20); // Additional offset to scroll a bit more down

onMounted(() => {
  // Get the actual header height after the component is mounted
  const headerElement = document.querySelector('.header');
  if (headerElement) {
    headerHeight.value = headerElement.offsetHeight;
  }
});

const toggleMenu = () => {
  isOpen.value = !isOpen.value;
};

const scrollToSection = (id) => {
  console.log(`Header: Attempting to scroll to section: ${id}`);

  // Close the menu first
  isOpen.value = false;

  // Small delay to ensure DOM updates
  setTimeout(() => {
    const element = document.getElementById(id);
    if (element) {
      // Use the dynamic header height plus additional offset
      const offset = element.getBoundingClientRect().top + window.pageYOffset - headerHeight.value - scrollOffset.value;
      console.log(
        `Header: Found element with ID: ${id}, scrolling to offset: ${offset}, header height: ${headerHeight.value}, additional offset: ${scrollOffset.value}`
      );
      window.scrollTo({
        top: offset,
        behavior: "smooth",
      });
    } else {
      console.error(`Header: Element with ID ${id} not found`);
    }
  }, 50);
};
</script>

<style scoped>
.header {
  background-color: #1f2937;
  color: white;
  width: 100%;
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  position: sticky;
  top: 0;
  z-index: 50;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.header__container {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
}

.header__branding {
  display: flex;
  align-items: center;
}

.header__logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.header__logo-image {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
}

.header__logo-text {
  font-size: 1.25rem;
  font-weight: 700;
  background: linear-gradient(45deg, #f59e0b, #ef4444);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

@media (min-width: 640px) {
  .header__logo-text {
    font-size: 1.5rem;
  }
}

.header__toggle {
  display: flex;
  align-items: center;
  background: none;
  border: none;
  color: white;
  cursor: pointer;
}

.header__toggle:focus {
  outline: none;
}

@media (min-width: 768px) {
  .header__toggle {
    display: none;
  }
}

.header__toggle-icon {
  width: 1.5rem;
  height: 1.5rem;
}

.header__nav {
  position: absolute;
  top: 4rem;
  right: 0;
  left: 0;
  background-color: #1f2937;
  padding: 1rem;
  border-radius: 0 0 0.375rem 0.375rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  width: 100%;
  max-height: 80vh;
  overflow-y: auto;
}

.header__nav--closed {
  display: none;
}

.header__nav--open {
  display: block;
}

@media (min-width: 768px) {
  .header__nav {
    position: static;
    width: auto;
    background-color: transparent;
    padding: 0;
    border-radius: 0;
    box-shadow: none;
    max-height: none;
    overflow-y: visible;
  }

  .header__nav--closed {
    display: flex;
  }
}

.header__menu {
  display: flex;
  flex-direction: column;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  font-size: 0.875rem;
  list-style-type: none;
  padding-left: 0;
  gap: 0.75rem;
}

@media (min-width: 768px) {
  .header__menu {
    flex-direction: row;
    align-items: center;
    gap: 1.25rem;
  }
}

.header__menu-link {
  display: block;
  padding: 0.5rem 0.75rem;
  text-decoration: none;
  color: #d1d5db;
  border-radius: 0.25rem;
  transition: all 0.2s ease;
}

.header__menu-link:hover {
  color: white;
  background-color: rgba(255, 255, 255, 0.1);
}
</style>