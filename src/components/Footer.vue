<!-- filepath: c:\Users\Rahul\Repos\Malhotra-Travels\src\components\Footer.vue -->
<template>
  <footer class="footer">
    <div class="footer__container">
      <div class="footer__grid">
        <div class="footer__column">
          <h3 class="footer__heading">Quick Links</h3>
          <ul class="footer__list">
            <li class="footer__list-item">
              <a href="#home" @click="scrollToSection('home')" class="footer__link">Home</a>
            </li>
            <li class="footer__list-item">
              <a href="#services" @click="scrollToSection('services')" class="footer__link">Services</a>
            </li>
            <li class="footer__list-item">
              <a href="#book-now" @click="scrollToSection('book-now')" class="footer__link">Book Now</a>
            </li>
            <li class="footer__list-item">
              <a href="#affiliate" @click="scrollToSection('affiliate')" class="footer__link">Affiliate</a>
            </li>
            <li class="footer__list-item">
              <a href="#car-owner" @click="scrollToSection('car-owner')" class="footer__link">Join as Car Owner</a>
            </li>
            <li class="footer__list-item">
              <a href="#contact" @click="scrollToSection('contact')" class="footer__link">Contact</a>
            </li>
          </ul>
        </div>
        <div class="footer__column">
          <h3 class="footer__heading">Legal</h3>
          <ul class="footer__list">
            <li class="footer__list-item"><a href="#" class="footer__link">Privacy Policy</a></li>
            <li class="footer__list-item"><a href="#" class="footer__link">Terms & Conditions</a></li>
          </ul>
        </div>
        <div class="footer__column">
          <h3 class="footer__heading">Follow Us</h3>
          <ul class="footer__list footer__list--social">
            <li class="footer__list-item">
              <a href="#" class="footer__link footer__social-link" aria-label="Instagram">Instagram</a>
            </li>
            <li class="footer__list-item">
              <a href="#" class="footer__link footer__social-link" aria-label="Facebook">Facebook</a>
            </li>
          </ul>
        </div>
      </div>
      <p class="footer__copyright">
        © 2025 Malhotra Travels. All Rights Reserved.
      </p>
    </div>
  </footer>
</template>

<script setup>
const scrollToSection = (id) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};
</script>

<style scoped>
.footer {
  background-color: #1a202c;
  color: white;
  padding: 3rem 0 2rem;
  width: 100%;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

.footer__container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.footer__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* Ensure all columns have equal width */
  gap: 2rem; /* Consistent gap between all columns */
  justify-content: space-between;
}

.footer__column {
  display: flex;
  flex-direction: column;
}

.footer__heading {
  font-weight: 700;
  margin-bottom: 1rem;
  font-size: 1rem;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  color: #f8f9fa;
}

.footer__list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding-left: 0;
  list-style-type: none;
  margin: 0;
}

.footer__list--social {
  gap: 0.75rem;
}

.footer__list-item {
  font-size: 0.9375rem;
  line-height: 1.5;
}

.footer__link {
  color: #d1d5db;
  text-decoration: none;
  transition: color 0.3s ease, transform 0.2s ease;
  display: inline-block;
  padding: 0.25rem 0;
  position: relative;
}

.footer__link:hover {
  color: #ffffff;
  transform: translateX(3px);
}

.footer__social-link:hover {
  transform: translateY(-2px);
}

.footer__link:focus {
  outline: 2px solid #4299e1;
  outline-offset: 2px;
  border-radius: 2px;
}

.footer__link::after {
  content: '';
  position: absolute;
  width: 0;
  height: 1px;
  bottom: 0;
  left: 0;
  background-color: #ffffff;
  transition: width 0.3s ease;
}

.footer__link:hover::after {
  width: 100%;
}

.footer__copyright {
  text-align: center;
  margin-top: 3rem;
  font-size: 0.875rem;
  color: #9ca3af;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

@media (min-width: 640px) {
  .footer {
    padding: 4rem 0 2.5rem;
  }

  .footer__grid {
    grid-template-columns: repeat(3, 1fr); /* Ensure all columns are visible and equal width */
    gap: 2rem; /* Consistent gap between columns */
  }

  .footer__heading {
    font-size: 1.125rem;
  }

  .footer__list-item {
    font-size: 1rem;
  }

  .footer__copyright {
    font-size: 0.9375rem;
  }
}

@media (min-width: 768px) {
  .footer {
    padding: 5rem 0 3rem;
  }

  .footer__grid {
    grid-template-columns: repeat(3, 1fr); /* Ensure equal width for all columns */
    gap: 20.5rem; /* Consistent gap for larger screens */
  }

  .footer__copyright {
    margin-top: 4rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .footer__link {
    transition: none;
  }

  .footer__link::after {
    transition: none;
  }

  .footer__link:hover,
  .footer__social-link:hover {
    transform: none;
  }
}
</style>