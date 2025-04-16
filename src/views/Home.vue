<template>
  <div>
    <!-- Hero Section -->
    <section id="home">
      <HeroSection />
    </section>

    <!-- Explore Section -->
    <section id="explore" class="py-12 bg-gray-100">
      <div class="container mx-auto text-center px-4">
        <h2 class="text-2xl sm:text-3xl font-bold mb-6">Explore Hassle-Free Travel</h2>
        <p class="text-base sm:text-lg max-w-2xl mx-auto">
          From outstation trips to wedding bookings, we’ve got your journey covered with our premium Ertiga (Petrol + CNG) and professional drivers.
        </p>
      </div>
    </section>

    <!-- About Section -->
    <section id="about" class="py-12">
      <div class="container mx-auto px-4">
        <h2 class="text-2xl sm:text-3xl font-bold text-center mb-8">Who We Are</h2>
        <div class="max-w-3xl mx-auto text-center">
          <p class="text-base sm:text-lg mb-4">
            Welcome to Malhotra Travels, your go-to travel partner based in Kalanaur, Rohtak, and Bhiwani, Haryana. We specialize in providing safe, affordable, and comfortable car rental services for outstation trips, weddings, events, and soon, curated tour packages.
          </p>
          <p class="text-base sm:text-lg mb-4">
            Our well-maintained Ertiga (Petrol + CNG) and experienced drivers ensure a smooth ride every time. Beyond rentals, we’re building a community through our affiliate program, where you can earn by referring clients, and our car owner collaboration, where your idle car can generate income.
          </p>
          <p class="text-base sm:text-lg font-semibold">
            At Malhotra Travels, your journey matters. Let’s travel together!
          </p>
        </div>
      </div>
    </section>

    <!-- Services Section -->
    <section id="services" class="py-12 bg-gray-100">
      <div class="container mx-auto px-4">
        <h2 class="text-2xl sm:text-3xl font-bold text-center mb-8">What We Offer</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <ServiceCard
            :icon="TruckIcon"
            title="Outstation Bookings"
            description="Planning a family trip or airport transfer? Book our AC Ertiga for a comfortable outstation journey. Affordable rates, reliable service."
            ctaText="Book Now"
            ctaLink="#book-now"
          />
          <ServiceCard
            :icon="HeartIcon"
            title="Wedding & Event Bookings"
            description="Make your special day unforgettable with our clean, spacious, and decorated Ertiga for weddings and events."
            ctaText="Book Now"
            ctaLink="#book-now"
          />
          <ServiceCard
            :icon="MapPinIcon"
            title="Tour Packages (Coming Soon)"
            description="Explore Manali, Haridwar, Jaipur, Shimla, and more with our upcoming tour packages, including car + stay deals."
            ctaText="Notify Me"
            ctaLink="#"
          />
          <ServiceCard
            :icon="CurrencyDollarIcon"
            title="Affiliate Program"
            description="Earn 5–10% commission per booking by referring clients to us. Special rewards after 10, 20, or 50 referrals!"
            ctaText="Join Now"
            ctaLink="#affiliate"
          />
          <ServiceCard
            :icon="KeyIcon"
            title="Idle Car Owner Collaboration"
            description="Got an idle car? Partner with us, and we’ll use it for bookings while paying you per trip."
            ctaText="Submit Details"
            ctaLink="#car-owner"
          />
        </div>
      </div>
    </section>

    <!-- Book Now Section -->
    <section id="book-now" class="py-12">
      <div class="container mx-auto px-4">
        <h2 class="text-2xl sm:text-3xl font-bold text-center mb-8">Book Your Ride</h2>
        <BookingForm />
        <div class="text-center mt-6">
          <p class="font-semibold text-base sm:text-lg">Quick Booking:</p>
          <p class="mb-2 text-sm sm:text-base">
            📞 Call:
            <a href="tel:+917015487899" class="text-blue-600 hover:underline">+91-7015487899</a>
            |
            <a href="tel:+918950899123" class="text-blue-600 hover:underline">+91-8950899123</a>
          </p>
          <a
            href="https://wa.me/+917015487899?text=Hi,%20I’d%20like%20to%20book%20a%20car!"
            target="_blank"
            class="inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-sm sm:text-base"
          >
            WhatsApp Us
          </a>
        </div>
      </div>
    </section>

    <!-- Affiliate Section -->
    <section id="affiliate" class="py-12 bg-gray-100">
      <div class="container mx-auto px-4">
        <div class="bg-green-100 text-center py-8 mb-8 rounded-lg">
          <h2 class="text-2xl sm:text-3xl font-bold">💸 Start Earning with Malhotra Travels!</h2>
        </div>
        <div class="max-w-3xl mx-auto text-center">
          <p class="text-base sm:text-lg mb-4">
            Join our affiliate program and turn referrals into income. Share our services with friends, family, or clients, and earn 5–10% commission on every confirmed booking. Plus, unlock exclusive gifts after 10, 20, or 50 referrals!
          </p>
          <p class="text-base sm:text-lg mb-6">It’s simple:</p>
          <ul class="list-decimal list-inside text-left max-w-md mx-auto mb-6 text-sm sm:text-base">
            <li>Sign up as an affiliate.</li>
            <li>Share your unique referral link.</li>
            <li>Earn when your referrals book with us.</li>
          </ul>
          <AffiliateForm />
        </div>
      </div>
    </section>

    <!-- Car Owner Section -->
    <section id="car-owner" class="py-12">
      <div class="container mx-auto px-4">
        <div class="bg-yellow-100 text-center py-8 mb-8 rounded-lg">
          <h2 class="text-2xl sm:text-3xl font-bold">🚙 Got an Idle Car? Let’s Make It Work!</h2>
        </div>
        <div class="max-w-3xl mx-auto text-center">
          <p class="text-base sm:text-lg mb-4">
            Have a car sitting unused? Partner with Malhotra Travels and earn money every time we use it for a booking. Whether it’s a weekday or weekend, we’ll handle the clients while you get paid per trip.
          </p>
          <p class="text-base sm:text-lg mb-6">How it works:</p>
          <ul class="list-decimal list-inside text-left max-w-md mx-auto mb-6 text-sm sm:text-base">
            <li>Share your car details.</li>
            <li>We verify and list it.</li>
            <li>You earn when it’s booked.</li>
          </ul>
          <CarOwnerForm />
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section id="testimonials" class="py-12 bg-gray-100">
      <div class="container mx-auto px-4">
        <h2 class="text-2xl sm:text-3xl font-bold text-center mb-8">What Our Clients Say</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div v-for="testimonial in testimonials" :key="testimonial.name" class="bg-white p-6 rounded-lg shadow-md">
            <p class="text-gray-600 mb-4 text-sm sm:text-base">{{ testimonial.text }}</p>
            <p class="font-semibold text-sm sm:text-base">{{ testimonial.name }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="py-12">
      <div class="container mx-auto px-4">
        <h2 class="text-2xl sm:text-3xl font-bold text-center mb-8">Get in Touch</h2>
        <div class="max-w-lg mx-auto text-center">
          <p class="text-base sm:text-lg mb-4">
            We’re here to make your travel seamless. Reach out for bookings, partnerships, or queries!
          </p>
          <p class="mb-2 text-sm sm:text-base">
            📞 Phone:
            <a href="tel:+917015487899" class="text-blue-600 hover:underline">+91-7015487899</a>
            |
            <a href="tel:+918950899123" class="text-blue-600 hover:underline">+91-8950899123</a>
          </p>
          <p class="mb-4 text-sm sm:text-base">📍 Location: Kalanaur, Rohtak, Haryana</p>
          <a
            href="https://wa.me/+917015487899"
            target="_blank"
            class="inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 mb-4 text-sm sm:text-base"
          >
            WhatsApp Us
          </a>
          <p class="font-semibold text-sm sm:text-base">Follow Us:</p>
          <div class="flex justify-center space-x-4">
            <a href="#" class="text-blue-600 hover:underline text-sm sm:text-base">Instagram</a>
            <a href="#" class="text-blue-600 hover:underline text-sm sm:text-base">Facebook</a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import HeroSection from "../components/HeroSection.vue"
import ServiceCard from "../components/ServiceCard.vue"
import BookingForm from "../components/BookingForm.vue"
import AffiliateForm from "../components/AffiliateForm.vue"
import CarOwnerForm from "../components/CarOwnerForm.vue"
import {
  TruckIcon,
  HeartIcon,
  MapPinIcon,
  CurrencyDollarIcon,
  KeyIcon,
} from "@heroicons/vue/24/solid"

const testimonials = [
  {
    name: "Priya S., Rohtak",
    text: "Malhotra Car Rental made our wedding day perfect! The Ertiga was beautifully decorated, and the driver was so polite. Highly recommend!",
  },
  {
    name: "Rajesh K., Bhiwani",
    text: "Booked for a family trip to Haridwar. Comfortable ride, affordable price, and great service. Will book again!",
  },
  {
    name: "Anil M., Kalanaur",
    text: "The affiliate program is awesome! I’ve earned commissions just by sharing their link with my contacts.",
  },
]
</script>