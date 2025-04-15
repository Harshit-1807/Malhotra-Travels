<template>
  <footer class="bg-gray-900 text-white py-6">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div>
          <h3 class="font-bold mb-2 text-sm sm:text-base">Quick Links</h3>
          <ul class="space-y-1 text-sm sm:text-base">
            <li>
              <a
                href="#home"
                @click="scrollToSection('home')"
                class="hover:text-gray-300"
                >Home</a
              >
            </li>
            <li>
              <a
                href="#services"
                @click="scrollToSection('services')"
                class="hover:text-gray-300"
                >Services</a
              >
            </li>
            <li>
              <a
                href="#book-now"
                @click="scrollToSection('book-now')"
                class="hover:text-gray-300"
                >Book Now</a
              >
            </li>
            <li>
              <a
                href="#affiliate"
                @click="scrollToSection('affiliate')"
                class="hover:text-gray-300"
                >Affiliate</a
              >
            </li>
            <li>
              <a
                href="#car-owner"
                @click="scrollToSection('car-owner')"
                class="hover:text-gray-300"
                >Join as Car Owner</a
              >
            </li>
            <li>
              <a
                href="#contact"
                @click="scrollToSection('contact')"
                class="hover:text-gray-300"
                >Contact</a
              >
            </li>
          </ul>
        </div>
        <div>
          <h3 class="font-bold mb-2 text-sm sm:text-base">Legal</h3>
          <ul class="space-y-1 text-sm sm:text-base">
            <li><a href="#" class="hover:text-gray-300">Privacy Policy</a></li>
            <li>
              <a href="#" class="hover:text-gray-300">Terms & Conditions</a>
            </li>
          </ul>
        </div>
        <div>
          <h3 class="font-bold mb-2 text-sm sm:text-base">Follow Us</h3>
          <div class="flex space-x-4">
            <a href="#" class="hover:text-gray-300 text-sm sm:text-base"
              >Instagram</a
            >
            <a href="#" class="hover:text-gray-300 text-sm sm:text-base"
              >Facebook</a
            >
          </div>
        </div>
      </div>
      <p class="text-center mt-6 text-sm sm:text-base">
        © 2025 Malhotra Car Rental. All Rights Reserved.
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
