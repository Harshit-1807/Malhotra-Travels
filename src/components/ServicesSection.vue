<!-- filepath: c:\Users\Rahul\Repos\Malhotra-Travels\src\components\ServicesSection.vue -->
<template>
  <div class="services">
    <div class="services__container">
      <h2 class="services__title">What We Offer</h2>
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
    TruckIcon,
    HeartIcon,
    MapPinIcon,
    CurrencyDollarIcon,
    KeyIcon,
  },
};
</script>

<style scoped>
.services {
  padding: 2rem;
  background-color: #fff;
}

.services__container {
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
}

.services__title {
  font-size: 2rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 2rem;
}

.services__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.service-card {
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1.5rem;
  text-align: center;
  transition: transform 0.3s, box-shadow 0.3s;
}

.service-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.service-card__icon {
  font-size: 2rem;
  color: #007bff;
  margin-bottom: 1rem;
}

.service-card__title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 0.5rem;
}

.service-card__description {
  font-size: 1rem;
  color: #666;
  margin-bottom: 1rem;
}

.service-card__cta {
  display: inline-block;
  padding: 0.8rem 1.5rem;
  background-color: #007bff;
  color: #fff;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.service-card__cta:hover {
  background-color: #0056b3;
}
</style>