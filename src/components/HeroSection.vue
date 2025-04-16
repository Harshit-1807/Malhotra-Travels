<template>
  <section class="relative h-[400px] sm:h-[500px] bg-gray-200">
    <img
      src="/images/ertiga.jpg"
      alt="Ertiga Car"
      class="absolute inset-0 w-full h-full object-cover"
      @error="handleImageError"
    />
    <div
      class="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white px-4 z-10"
    >
      <h1 class="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-center">
        Your Trusted Travel Partner
      </h1>
      <p class="text-lg sm:text-xl mb-6 text-center">
        Outstation Trips | Weddings | Tour Packages
      </p>
      <div class="flex flex-wrap gap-4 justify-center">
        <a
          href="#book-now"
          @click.prevent="scrollToSection('book-now')"
          class="bg-blue-600 text-white px-4 sm:px-6 py-2 rounded hover:bg-blue-700 text-sm sm:text-base"
          >Book Now</a
        >
        <a
          href="#affiliate"
          @click.prevent="scrollToSection('affiliate')"
          class="bg-green-600 text-white px-4 sm:px-6 py-2 rounded hover:bg-green-700 text-sm sm:text-base"
          >Become an Affiliate</a
        >
        <a
          href="#car-owner"
          @click.prevent="scrollToSection('car-owner')"
          class="bg-yellow-600 text-white px-4 sm:px-6 py-2 rounded hover:bg-yellow-700 text-sm sm:text-base"
          >Join with Your Car</a
        >
      </div>
    </div>
  </section>
</template>

<script setup>
const scrollToSection = (id) => {
  console.log(`HeroSection: Attempting to scroll to ${id}`);
  setTimeout(() => {
    const element = document.getElementById(id);
    if (element) {
      const headerHeight = 64; 
      const offset = element.offsetTop - headerHeight;
      console.log(
        `HeroSection: Found element with ID: ${id}, scrolling to offset: ${offset}`
      );
      window.scrollTo({
        top: offset,
        behavior: "smooth",
      });
    } else {
      console.error(`HeroSection: Element with ID ${id} not found`);
    }
  }, 300);
};

const handleImageError = () => {
  console.error("Failed to load ertiga.jpg");
};
</script>
