<!-- filepath: c:\Users\Rahul\Repos\Malhotra-Travels\src\components\ServicesSection.vue -->
<template>
  <div class="services">
    <div class="services__container">
      <div class="services__header">
        <h2 class="services__title">What We Offer</h2>
        <p class="services__subtitle">Discover our premium services tailored to meet your travel needs</p>
      </div>
      <div class="services__grid">
        <ServiceCard
          :icon="TruckIcon"
          title="Outstation Bookings"
          description="Planning a family trip or airport transfer? Book our AC cars for a comfortable outstation journey. Affordable rates, reliable service."
          ctaText="Book Now"
          ctaLink="#book-now"
          iconColor="#4F46E5"
        />
        <ServiceCard
          :icon="HeartIcon"
          title="Wedding & Event Bookings"
          description="Make your special day unforgettable with our clean, spacious, and decorated Ertiga for weddings and events."
          ctaText="Book Now"
          ctaLink="#book-now"
          iconColor="#EC4899"
        />
        <ServiceCard
          :icon="MapPinIcon"
          title="Tour Packages (Coming Soon)"
          description="Explore Manali, Haridwar, Jaipur, Shimla, and more with our upcoming tour packages, including car + stay deals."
          ctaText="Notify Me"
          ctaLink="#"
          iconColor="#10B981"
          :isComingSoon="true"
        />
        <ServiceCard
          :icon="CurrencyDollarIcon"
          title="Affiliate Program"
          description="Earn 5–10% commission per booking by referring clients to us. Special rewards after 10, 20, or 50 referrals!"
          ctaText="Join Now"
          ctaLink="#affiliate"
          iconColor="#F59E0B"
          :whatsappLink="'https://wa.me/+918950899123?text=I%20want%20to%20know%20more%20about%20the%20Affiliate%20Program'"
        />
        <ServiceCard
          :icon="KeyIcon"
          title="Idle Car Owner Collaboration"
          description="Got an idle car? Partner with us, and we'll use it for bookings while paying you per trip."
          ctaText="Submit Details"
          ctaLink="#car-owner"
          iconColor="#3B82F6"
          :whatsappLink="'https://wa.me/+918950899123?text=I%20want%20to%20know%20more%20about%20Idle%20Car%20Owner%20Collaboration'"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ServiceCard from "./service/ServiceCard.vue";
import {
  TruckIcon,
  HeartIcon,
  MapPinIcon,
  CurrencyDollarIcon,
  KeyIcon,
} from "@heroicons/vue/24/solid";

export default {
  name: "ServicesSection",
  components: {
    ServiceCard,
  },
  setup() {
    return {
      TruckIcon,
      HeartIcon,
      MapPinIcon,
      CurrencyDollarIcon,
      KeyIcon,
    };
  },
};
</script>

<style scoped>
.services {
  padding: 4rem 2rem;
  background-color: #f9fafb;
  position: relative;
  overflow: hidden;
}

.services::before {
  content: "";
  position: absolute;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background-color: rgba(79, 70, 229, 0.05);
  top: -100px;
  left: -100px;
  z-index: 0;
}

.services::after {
  content: "";
  position: absolute;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: rgba(236, 72, 153, 0.05);
  bottom: -50px;
  right: -50px;
  z-index: 0;
}

.services__container {
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
  position: relative;
  z-index: 1;
}

.services__header {
  margin-bottom: 3rem;
}

.services__title {
  font-size: 2.5rem;
  font-weight: 800;
  color: #1f2937;
  margin-bottom: 1rem;
  background: linear-gradient(90deg, #4F46E5, #EC4899);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  display: inline-block;
}

.services__subtitle {
  font-size: 1.1rem;
  color: #6b7280;
  max-width: 700px;
  margin: 0 auto;
}

.services__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
}

@media (max-width: 768px) {
  .services {
    padding: 3rem 1.5rem;
  }

  .services__title {
    font-size: 2rem;
  }

  .services__subtitle {
    font-size: 1rem;
  }

  .services__grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .services__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Animation keyframes */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.services__grid > * {
  animation: fadeIn 0.5s ease-out forwards;
  opacity: 0;
}

.services__grid > *:nth-child(1) { animation-delay: 0.1s; }
.services__grid > *:nth-child(2) { animation-delay: 0.2s; }
.services__grid > *:nth-child(3) { animation-delay: 0.3s; }
.services__grid > *:nth-child(4) { animation-delay: 0.4s; }
.services__grid > *:nth-child(5) { animation-delay: 0.5s; }
</style>