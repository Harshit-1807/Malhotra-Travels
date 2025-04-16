<template>
  <div>
    <!-- Hero Section -->
    <section id="home">
      <HeroSection />
    </section>

    <!-- Explore Section -->
    <section id="explore" class="explore">
      <div class="explore__container">
        <h2 class="explore__title">
          Explore Hassle-Free Travel
        </h2>
        <p class="explore__description">
          From outstation trips to wedding bookings, we've got your journey
          covered with our premium Ertiga (Petrol + CNG) and professional
          drivers.
        </p>
      </div>
    </section>

    <!-- About Section -->
    <section id="about" class="about">
      <div class="about__container">
        <h2 class="about__title">
          Who We Are
        </h2>
        <div class="about__content">
          <p class="about__paragraph">
            Welcome to Malhotra Travels, your go-to travel partner based in
            Kalanaur, Rohtak, and Bhiwani, Haryana. We specialize in providing
            safe, affordable, and comfortable Travels services for outstation
            trips, weddings, events, and soon, curated tour packages.
          </p>
          <p class="about__paragraph">
            Our well-maintained Ertiga (Petrol + CNG) and experienced drivers
            ensure a smooth ride every time. Beyond rentals, we're building a
            community through our affiliate program, where you can earn by
            referring clients, and our car owner collaboration, where your idle
            car can generate income.
          </p>
          <p class="about__paragraph about__paragraph--bold">
            At Malhotra Travels, your journey matters. Let's travel together!
          </p>
        </div>
      </div>
    </section>

    <!-- Services Section -->
    <section id="services" class="services">
      <div class="services__container">
        <h2 class="services__title">
          What We Offer
        </h2>
        <div class="services__grid">
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
            description="Got an idle car? Partner with us, and we'll use it for bookings while paying you per trip."
            ctaText="Submit Details"
            ctaLink="#car-owner"
          />
        </div>
      </div>
    </section>

    <!-- Book Now Section -->
    <section id="book-now" class="booking">
      <div class="booking__container">
        <h2 class="booking__title">
          Book Your Ride
        </h2>
        <BookingForm />
        <div class="booking__quick-links">
          <p class="booking__subtitle">Quick Booking:</p>
          <p class="booking__contact">
            📞 Call:
            <a href="tel:+9170564xxxxx" class="booking__link">+91-70564xxxxx</a>
            |
            <a href="tel:+9170154xxxxx" class="booking__link">+91-70154xxxxx</a>
          </p>
          <a
            href="https://wa.me/+9170564xxxxx?text=Hi,%20I'd%20like%20to%20book%20a%20car!"
            target="_blank"
            class="booking__whatsapp-button"
          >
            WhatsApp Us
          </a>
        </div>
      </div>
    </section>

    <!-- Affiliate Section -->
    <section id="affiliate" class="affiliate">
      <div class="affiliate__container">
        <div class="affiliate__header">
          <h2 class="affiliate__title">
            💸 Start Earning with Malhotra Travels!
          </h2>
        </div>
        <div class="affiliate__content">
          <p class="affiliate__paragraph">
            Join our affiliate program and turn referrals into income. Share our
            services with friends, family, or clients, and earn 5–10% commission
            on every confirmed booking. Plus, unlock exclusive gifts after 10,
            20, or 50 referrals!
          </p>
          <p class="affiliate__paragraph">It's simple:</p>
          <ul class="affiliate__steps">
            <li>Sign up as an affiliate.</li>
            <li>Share your unique referral link.</li>
            <li>Earn when your referrals book with us.</li>
          </ul>
          <AffiliateForm />
        </div>
      </div>
    </section>

    <!-- Car Owner Section -->
    <section id="car-owner" class="car-owner">
      <div class="car-owner__container">
        <div class="car-owner__header">
          <h2 class="car-owner__title">
            🚙 Got an Idle Car? Let's Make It Work!
          </h2>
        </div>
        <div class="car-owner__content">
          <p class="car-owner__paragraph">
            Have a car sitting unused? Partner with Malhotra Travels and earn
            money every time we use it for a booking. Whether it's a weekday or
            weekend, we'll handle the clients while you get paid per trip.
          </p>
          <p class="car-owner__paragraph">How it works:</p>
          <ul class="car-owner__steps">
            <li>Share your car details.</li>
            <li>We verify and list it.</li>
            <li>You earn when it's booked.</li>
          </ul>
          <CarOwnerForm />
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section id="testimonials" class="testimonials">
      <div class="testimonials__container">
        <h2 class="testimonials__title">
          What Our Clients Say
        </h2>
        <div class="testimonials__grid">
          <div
            v-for="testimonial in testimonials"
            :key="testimonial.name"
            class="testimonial"
          >
            <p class="testimonial__text">
              {{ testimonial.text }}
            </p>
            <p class="testimonial__name">
              {{ testimonial.name }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="contact">
      <div class="contact__container">
        <h2 class="contact__title">
          Get in Touch
        </h2>
        <div class="contact__content">
          <p class="contact__paragraph">
            We're here to make your travel seamless. Reach out for bookings,
            partnerships, or queries!
          </p>
          <p class="contact__info">
            📞 Phone:
            <a href="tel:+9170564xxxxx" class="contact__link">+91-70564xxxxx</a>
            |
            <a href="tel:+9170154xxxxx" class="contact__link">+91-70154xxxxx</a>
          </p>
          <p class="contact__info">
            📍 Location: Kalanaur, Rohtak, Haryana
          </p>
          <a
            href="https://wa.me/+9170564xxxxx"
            target="_blank"
            class="contact__whatsapp-button"
          >
            WhatsApp Us
          </a>
          <p class="contact__social-title">Follow Us:</p>
          <div class="contact__social-links">
            <a href="#" class="contact__social-link">Instagram</a>
            <a href="#" class="contact__social-link">Facebook</a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import HeroSection from "../components/HeroSection.vue";
import ServiceCard from "../components/ServiceCard.vue";
import BookingForm from "../components/BookingForm.vue";
import AffiliateForm from "../components/AffiliateForm.vue";
import CarOwnerForm from "../components/CarOwnerForm.vue";
import {
  TruckIcon,
  HeartIcon,
  MapPinIcon,
  CurrencyDollarIcon,
  KeyIcon,
} from "@heroicons/vue/24/solid";

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

<style>
/* Explore Section */
.explore {
  padding-top: 3rem;
  padding-bottom: 3rem;
  background-color: #f3f4f6;
}
.explore__container {
  max-width: 1280px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  padding-left: 1rem;
  padding-right: 1rem;
}
.explore__title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
}
.explore__description {
  font-size: 1rem;
  max-width: 42rem;
  margin-left: auto;
  margin-right: auto;
}

/* About Section */
.about {
  padding-top: 3rem;
  padding-bottom: 3rem;
}
.about__container {
  max-width: 1280px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1rem;
  padding-right: 1rem;
}
.about__title {
  font-size: 1.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 2rem;
}
.about__content {
  max-width: 48rem;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
}
.about__paragraph {
  font-size: 1rem;
  margin-bottom: 1rem;
}
.about__paragraph--bold {
  font-weight: 600;
}

/* Services Section */
.services {
  padding-top: 3rem;
  padding-bottom: 3rem;
  background-color: #f3f4f6;
}
.services__container {
  max-width: 1280px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1rem;
  padding-right: 1rem;
}
.services__title {
  font-size: 1.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 2rem;
}
.services__grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1.5rem;
}

/* Booking Section */
.booking {
  padding-top: 3rem;
  padding-bottom: 3rem;
}
.booking__container {
  max-width: 1280px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1rem;
  padding-right: 1rem;
}
.booking__title {
  font-size: 1.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 2rem;
}
.booking__quick-links {
  text-align: center;
  margin-top: 1.5rem;
}
.booking__subtitle {
  font-weight: 600;
  font-size: 1rem;
}
.booking__contact {
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
}
.booking__link {
  color: #2563eb;
}
.booking__link:hover {
  text-decoration: underline;
}
.booking__whatsapp-button {
  display: inline-block;
  background-color: #16a34a;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  font-size: 0.875rem;
}
.booking__whatsapp-button:hover {
  background-color: #15803d;
}

/* Affiliate Section */
.affiliate {
  padding-top: 3rem;
  padding-bottom: 3rem;
  background-color: #f3f4f6;
}
.affiliate__container {
  max-width: 1280px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1rem;
  padding-right: 1rem;
}
.affiliate__header {
  background-color: #dcfce7;
  text-align: center;
  padding-top: 2rem;
  padding-bottom: 2rem;
  margin-bottom: 2rem;
  border-radius: 0.5rem;
}
.affiliate__title {
  font-size: 1.5rem;
  font-weight: 700;
}
.affiliate__content {
  max-width: 48rem;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
}
.affiliate__paragraph {
  font-size: 1rem;
  margin-bottom: 1rem;
}
.affiliate__steps {
  list-style-type: decimal;
  list-style-position: inside;
  text-align: left;
  max-width: 28rem;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 1.5rem;
  font-size: 0.875rem;
}

/* Car Owner Section */
.car-owner {
  padding-top: 3rem;
  padding-bottom: 3rem;
}
.car-owner__container {
  max-width: 1280px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1rem;
  padding-right: 1rem;
}
.car-owner__header {
  background-color: #fef9c3;
  text-align: center;
  padding-top: 2rem;
  padding-bottom: 2rem;
  margin-bottom: 2rem;
  border-radius: 0.5rem;
}
.car-owner__title {
  font-size: 1.5rem;
  font-weight: 700;
}
.car-owner__content {
  max-width: 48rem;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
}
.car-owner__paragraph {
  font-size: 1rem;
  margin-bottom: 1rem;
}
.car-owner__steps {
  list-style-type: decimal;
  list-style-position: inside;
  text-align: left;
  max-width: 28rem;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 1.5rem;
  font-size: 0.875rem;
}

/* Testimonials Section */
.testimonials {
  padding-top: 3rem;
  padding-bottom: 3rem;
  background-color: #f3f4f6;
}
.testimonials__container {
  max-width: 1280px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1rem;
  padding-right: 1rem;
}
.testimonials__title {
  font-size: 1.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 2rem;
}
.testimonials__grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1.5rem;
}
.testimonial {
  background-color: white;
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}
.testimonial__text {
  color: #4b5563;
  margin-bottom: 1rem;
  font-size: 0.875rem;
}
.testimonial__name {
  font-weight: 600;
  font-size: 0.875rem;
}

/* Contact Section */
.contact {
  padding-top: 3rem;
  padding-bottom: 3rem;
}
.contact__container {
  max-width: 1280px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1rem;
  padding-right: 1rem;
}
.contact__title {
  font-size: 1.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 2rem;
}
.contact__content {
  max-width: 32rem;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
}
.contact__paragraph {
  font-size: 1rem;
  margin-bottom: 1rem;
}
.contact__info {
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
}
.contact__link {
  color: #2563eb;
}
.contact__link:hover {
  text-decoration: underline;
}
.contact__whatsapp-button {
  display: inline-block;
  background-color: #16a34a;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  margin-bottom: 1rem;
  font-size: 0.875rem;
}
.contact__whatsapp-button:hover {
  background-color: #15803d;
}
.contact__social-title {
  font-weight: 600;
  font-size: 0.875rem;
}
.contact__social-links {
  display: flex;
  justify-content: center;
  gap: 1rem;
}
.contact__social-link {
  color: #2563eb;
  font-size: 0.875rem;
}
.contact__social-link:hover {
  text-decoration: underline;
}

/* Responsive Styles */
@media (min-width: 640px) {
  .explore__title, .about__title, .services__title, .booking__title,
  .affiliate__title, .car-owner__title, .testimonials__title, .contact__title {
    font-size: 1.875rem;
  }

  .explore__description, .about__paragraph, .booking__subtitle,
  .affiliate__paragraph, .car-owner__paragraph, .contact__paragraph {
    font-size: 1.125rem;
  }

  .booking__contact, .booking__whatsapp-button, .affiliate__steps,
  .car-owner__steps, .testimonial__text, .testimonial__name,
  .contact__info, .contact__whatsapp-button, .contact__social-title,
  .contact__social-link {
    font-size: 1rem;
  }
}

@media (min-width: 768px) {
  .services__grid {
    grid-template-columns: repeat(3, 1fr);
  }

  .testimonials__grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 640px) and (max-width: 767px) {
  .services__grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .testimonials__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>