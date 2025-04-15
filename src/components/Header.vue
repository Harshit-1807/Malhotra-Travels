<template>
  <header class="bg-gray-800 text-white py-4 sticky top-0 z-50">
    <div class="container mx-auto flex justify-between items-center px-4">
      <!-- Logo/Title on the left -->
      <div class="text-xl sm:text-2xl font-bold">Malhotra Travels</div>

      <!-- Hamburger/Toggle Button on the right -->
      <button
        class="md:hidden flex items-center focus:outline-none"
        @click="toggleMenu"
        :aria-label="isOpen ? 'Close menu' : 'Open menu'"
      >
        <svg
          class="w-6 h-6"
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
          'md:flex',
          isOpen ? 'block' : 'hidden',
          'md:items-center',
          'w-full md:w-auto',
          'absolute md:static top-16 right-4 md:right-auto bg-gray-800 md:bg-transparent p-4 md:p-0 rounded-md md:rounded-none shadow-md md:shadow-none',
        ]"
      >
        <ul
          class="flex flex-col md:flex-row md:space-x-6 space-y-2 md:space-y-0 text-sm text-center mx-auto"
        >
          <li>
            <a
              href="#home"
              @click.prevent="scrollToSection('home')"
              class="hover:text-gray-300 block py-1"
              >Home</a
            >
          </li>
          <li>
            <a
              href="#explore"
              @click.prevent="scrollToSection('explore')"
              class="hover:text-gray-300 block py-1"
              >Explore</a
            >
          </li>
          <li>
            <a
              href="#about"
              @click.prevent="scrollToSection('about')"
              class="hover:text-gray-300 block py-1"
              >About</a
            >
          </li>
          <li>
            <a
              href="#services"
              @click.prevent="scrollToSection('services')"
              class="hover:text-gray-300 block py-1"
              >Services</a
            >
          </li>
          <li>
            <a
              href="#book-now"
              @click.prevent="scrollToSection('book-now')"
              class="hover:text-gray-300 block py-1"
              >Book Now</a
            >
          </li>
          <li>
            <a
              href="#affiliate"
              @click.prevent="scrollToSection('affiliate')"
              class="hover:text-gray-300 block py-1"
              >Affiliate</a
            >
          </li>
          <li>
            <a
              href="#car-owner"
              @click.prevent="scrollToSection('car-owner')"
              class="hover:text-gray-300 block py-1"
              >Join as Car Owner</a
            >
          </li>
          <li>
            <a
              href="#testimonials"
              @click.prevent="scrollToSection('testimonials')"
              class="hover:text-gray-300 block py-1"
              >Testimonials</a
            >
          </li>
          <li>
            <a
              href="#contact"
              @click.prevent="scrollToSection('contact')"
              class="hover:text-gray-300 block py-1"
              >Contact</a
            >
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { ref } from "vue";

const isOpen = ref(false);

const toggleMenu = () => {
  isOpen.value = !isOpen.value;
};

const scrollToSection = (id) => {
  console.log(`Header: Attempting to scroll to section: ${id}`);
  setTimeout(() => {
    const element = document.getElementById(id);
    if (element) {
      const headerHeight = 64; // Adjust based on header height
      const offset = element.offsetTop - headerHeight;
      console.log(
        `Header: Found element with ID: ${id}, scrolling to offset: ${offset}`
      );
      window.scrollTo({
        top: offset,
        behavior: "smooth",
      });
    } else {
      console.error(`Header: Element with ID ${id} not found`);
    }
  }, 300);
  isOpen.value = false;
};
</script>
