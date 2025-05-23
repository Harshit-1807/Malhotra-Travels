<template>
  <header class="header">
    <!-- Logo/Title on the left -->
    <div class="header__branding">
      <div @click="scrollToSection('home')" class="header__logo">
        <img
          src="/images/malhotra-travels-logo.webp"
          alt="Malhotra Travels Logo"
          class="header__logo-image"
        />
        <span class="header__logo-text">Malhotra Travel</span>
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
            href="#about"
            @click.prevent="scrollToSection('about')"
            class="header__menu-link"
            >About Us</a
          >
        </li>
        <li class="header__menu-item">
          <a
            href="#services"
            @click.prevent="scrollToSection('services')"
            class="header__menu-link"
            >Our Services</a
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
            >M-Affiliate</a
          >
        </li>
        <li class="header__menu-item">
          <a
            href="#car-owner"
            @click.prevent="scrollToSection('car-owner')"
            class="header__menu-link"
            >Fleet Partner</a
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
            >Contact Us</a
          >
        </li>
        <li class="header__menu-item header__menu-login">
          <button
            class="header__menu-login-button"
            @click="toggleLoginDropdown"
            aria-label="Login options"
          >
            Login
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 320 512"
              fill="currentColor"
              class="header__menu-login-icon"
            >
              <path
                d="M31.3 192h257.3c28.4 0 42.8 34.5 22.6 54.6l-128.6 128c-12.5 12.5-32.8 12.5-45.3 0L8.7 246.6C-11.6 226.5 2.8 192 31.3 192z"
              />
            </svg>
          </button>

          <ul
            v-if="isLoginDropdownOpen"
            class="header__menu-login-dropdown"
            @click.stop
            ref="loginDropdown"
          >
            <li>
              <router-link
                to="/admin-login"
                class="header__menu-login-link"
                @click="closeLoginDropdown"
              >
                Login as Admin
              </router-link>
            </li>
            <li>
              <router-link
                to="/car-owner-login"
                class="header__menu-login-link"
                @click="closeLoginDropdown"
              >
                Login as Fleet Partner
              </router-link>
            </li>
            <li>
              <router-link
                to="/affiliate-login"
                class="header__menu-login-link"
                @click="closeLoginDropdown"
              >
                Login as M-Affiliate
              </router-link>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from "vue";

const isOpen = ref(false);
const isLoginDropdownOpen = ref(false);
const headerHeight = ref(0);
const scrollOffset = ref(20);
const loginDropdown = ref(null);

const toggleMenu = () => {
  isOpen.value = !isOpen.value;
  if (!isOpen.value) {
    closeLoginDropdown();
  }
};

const toggleLoginDropdown = async () => {
  isLoginDropdownOpen.value = !isLoginDropdownOpen.value;
  if (isLoginDropdownOpen.value) {
    await nextTick();
    if (loginDropdown.value && window.innerWidth < 768) {
      loginDropdown.value.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }
};

const closeLoginDropdown = () => {
  isLoginDropdownOpen.value = false;
};

const scrollToSection = (id) => {
  isOpen.value = false;
  closeLoginDropdown();
  setTimeout(() => {
    const element = document.getElementById(id);
    if (element) {
      const offset =
        element.getBoundingClientRect().top +
        window.pageYOffset -
        headerHeight.value -
        scrollOffset.value;
      window.scrollTo({ top: offset, behavior: "smooth" });
    }
  }, 50);
};

const handleClickOutside = (event) => {
  const dropdown = document.querySelector(".header__menu-login");
  if (dropdown && !dropdown.contains(event.target)) {
    closeLoginDropdown();
  }
};

onMounted(() => {
  const headerElement = document.querySelector(".header");
  if (headerElement) {
    headerHeight.value = headerElement.offsetHeight;
  }

  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<style scoped>
.header {
  background-color: #1f2937;
  color: white;
  width: 100%;
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  position: fixed;
  top: 0;
  z-index: 50;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1350px;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  margin: 0 auto;
}
.header__logo {
  display: flex;
  align-items: center;
  cursor: pointer;
}
.header__logo-image {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  object-fit: cover;
}

@media (min-width: 1530px) {
  .header {
    max-width: 1530px;
  }
}

/* Branding (Logo/Title) */
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

/* Toggle Button */
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

.header__toggle-icon {
  width: 1.5rem;
  height: 1.5rem;
}

@media (min-width: 768px) {
  .header__toggle {
    display: none;
  }
}

/* Navigation Menu */
.header__nav {
  position: absolute;
  top: 100%;
  right: 0;
  left: 0;
  background-color: #1f2937;
  padding: 1rem;
  border-radius: 0 0 0.375rem 0.375rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  width: 100%;
  max-height: 80vh;
  overflow-y: auto;
  transition: all 0.3s ease-in-out;
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

/* Menu Items */
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

.header__menu-item {
  list-style: none;
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

.header__menu-link:focus {
  outline: 2px solid #4299e1;
  outline-offset: 2px;
  border-radius: 0.25rem;
}

@media (max-width: 640px) {
  .header__menu {
    font-size: 0.8125rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .header__menu-link {
    transition: none;
  }

  .header__menu-link:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
}

.header__menu-login {
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
}

.header__menu-login-button {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.5rem 0.75rem;
  background: none;
  border: none;
  color: #d1d5db;
  text-decoration: none;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: inherit;
  line-height: inherit;
}

.header__menu-login-button:hover {
  color: white;
  background-color: rgba(255, 255, 255, 0.1);
}

.header__menu-login-button:focus {
  outline: 2px solid #4299e1;
  outline-offset: 2px;
}

.header__menu-login-icon {
  width: 1.25rem;
  height: 1.25rem;
}

.header__menu-login-dropdown {
  display: block;
  position: absolute;
  top: calc(100% + 0.25rem);
  left: 50%;
  transform: translateX(-50%);
  background-color: #1f2937;
  border-radius: 0.375rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 0.5rem 0;
  list-style: none;
  z-index: 10000;
  min-width: 8.1rem;
  text-align: left;
}

@media (max-width: 767px) {
  .header__menu-login {
    align-items: stretch;
  }

  .header__menu-login-button {
    width: 100%;
    justify-content: center;
  }

  .header__menu-login-dropdown {
    position: static;
    left: auto;
    transform: none;
    min-width: 100%;
    text-align: center;
    margin: 0;
    padding: 0;
    box-shadow: none;
    border-radius: 0;
    background-color: transparent;
  }

  .header__menu-login-link {
    width: 100%;
    text-align: center;
    padding: 0.5rem 0.75rem;
    border-radius: 0.25rem;
  }
}

.header__menu-login-link {
  display: block;
  padding: 0.5rem 1rem;
  color: #d1d5db;
  text-decoration: none;
  transition: background-color 0.2s ease;
}

.header__menu-login-link:hover {
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
}
</style>
