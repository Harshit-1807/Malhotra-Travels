<template>
  <section class="hero">
    <img
      src="/images/Ertiga.png"
      alt="Banner image"
      class="hero__image"
      @error="handleImageError"
    />
    <div class="hero__overlay">
      <div class="hero__content">
        <h1 class="hero__title">
          Your Trusted Travel Partner
        </h1>
        <p class="hero__subtitle">
          Outstation Trips | Weddings | Tour Packages
        </p>
        <div class="hero__buttons">
          <a
            href="#book-now"
            @click.prevent="scrollToSection('book-now')"
            class="hero__button hero__button--blue"
            >Book Now</a
          >
          <a
            href="#affiliate"
            @click.prevent="scrollToSection('affiliate')"
            class="hero__button hero__button--green"
            >Become an Affiliate</a
          >
          <a
            href="#car-owner"
            @click.prevent="scrollToSection('car-owner')"
            class="hero__button hero__button--yellow"
            >Join with Your Car</a
          >
        </div>
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
      const headerHeight = 64; // Match Header.vue
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
<style scoped>
.hero {
  position: relative;
  background-color: #f7f7f7;
  height: 85vh; /* Increased from 60vh for desktop */
  min-height: 500px; /* Increased from 385px */
  overflow: hidden;
}

.hero__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.hero__overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
}

.hero__content {
  width: 90%;
  max-width: 1200px;
  text-align: center;
  padding: 1rem;
}

.hero__title {
  font-size: clamp(1.75rem, 5vw, 3rem);
  font-weight: bold;
  margin-bottom: 0.75rem;
  color: white;
  line-height: 1.2;
}

.hero__subtitle {
  font-size: clamp(1rem, 3vw, 1.5rem);
  margin-bottom: 1.5rem;
  color: white;
  line-height: 1.4;
}

.hero__buttons {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.75rem;
}

.hero__button {
  padding: 0.75rem 1.25rem;
  border-radius: 0.25rem;
  font-size: clamp(0.875rem, 2vw, 1rem);
  text-decoration: none;
  font-weight: 600;
  transition: all 0.2s ease;
  min-width: 120px;
  display: inline-block;
  text-align: center;
}

.hero__button--blue {
  background-color: #2563eb;
  color: white;
}

.hero__button--blue:hover, .hero__button--blue:focus {
  background-color: #1d4ed8;
  transform: translateY(-2px);
}

.hero__button--green {
  background-color: #34c759;
  color: white;
}

.hero__button--green:hover, .hero__button--green:focus {
  background-color: #2ecc71;
  transform: translateY(-2px);
}

.hero__button--yellow {
  background-color: #f7dc6f;
  color: black;
}

.hero__button--yellow:hover, .hero__button--yellow:focus {
  background-color: #f2c464;
  transform: translateY(-2px);
}

@media (max-width: 640px) {
  .hero {
    height: 80vh; /* Kept as is for mobile */
  }

  .hero__buttons {
    flex-direction: column;
    align-items: center;
    width: 100%;
  }

  .hero__button {
    width: 100%;
    max-width: 280px;
    margin-bottom: 0.5rem;
  }
}

@media (max-width: 380px) {
  .hero__title {
    font-size: 1.5rem;
  }

  .hero__subtitle {
    font-size: 0.9rem;
  }

  .hero__button {
    padding: 0.6rem 1rem;
    font-size: 0.875rem;
  }
}
</style>