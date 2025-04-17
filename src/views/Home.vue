<!-- filepath: c:\Users\Rahul\Repos\Malhotra-Travels\src\views\Home.vue -->
<template>
  <div>
    <!-- Hero Section -->
    <section id="home">
      <HeroSection />
    </section>

    <!-- About Section -->
    <section id="about">
      <AboutSection />
    </section>

    <!-- Services Section -->
    <section id="services">
      <ServicesSection />
    </section>

    <!-- Book Now Section -->
    <section id="book-now">
      <BookingSection />
    </section>

    <!-- Affiliate Section -->
    <section id="affiliate">
      <AffiliateSection />
    </section>

    <!-- Car Owner Section -->
    <section id="car-owner">
      <CarOwnerSection />
    </section>

    <!-- Testimonials Section -->
    <section id="testimonials">
      <TestimonialsSection :testimonials="testimonials" />
    </section>

    <!-- Contact Section -->
    <section id="contact">
      <ContactSection />
    </section>
  </div>
</template>

<script setup>
import HeroSection from "../components/HeroSection.vue";
// import ExploreSection from "../components/ExploreSection.vue";
import AboutSection from "../components/AboutSection.vue";
import ServicesSection from "../components/ServicesSection.vue";
import BookingSection from "../components/BookingSection.vue";
import AffiliateSection from "../components/AffiliateSection.vue";
import CarOwnerSection from "../components/CarOwnerSection.vue";
import TestimonialsSection from "../components/TestimonialsSection.vue";
import ContactSection from "../components/ContactSection.vue";

const testimonials = [
  {
    name: "Priya S., Rohtak",
    text: "Malhotra Travels made our wedding day perfect! The Ertiga was beautifully decorated, and the driver was so polite. Highly recommend!",
  },
  {
    name: "Rajesh K., Bhiwani",
    text: "Booked for a family trip to Haridwar. Comfortable ride, affordable price, and great service. Will book again!",
  },
  {
    name: "Anil M., Kalanaur",
    text: "The affiliate program is awesome! I've earned commissions just by sharing their link with my contacts.",
  },
];
</script>

<style scoped>
/* Add any global styles specific to this page here */
</style>
