<template>
  <div class="dashboard">
    <div class="dashboard__stats">
      <StatCard label="Total Bookings" :value="totalBookings">
        <template #icon>📅</template>
      </StatCard>
      <StatCard label="Upcoming Bookings" :value="upcomingBookings">
        <template #icon>🗓️</template>
      </StatCard>
      <StatCard
        label="Total Earnings"
        :value="`₹${totalEarnings.toLocaleString()}`"
      >
        <template #icon>💰</template>
      </StatCard>
      <StatCard label="Active Affiliates" :value="activeAffiliates">
        <template #icon>👥</template>
      </StatCard>
    </div>
    <div class="dashboard__analytics-row">
      <BookingTrendsChart />
      <EarningsBySourceChart />
      <TopAffiliatesChart />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import StatCard from "../components/AdminCharts/StatCard.vue";
import BookingTrendsChart from "../components/AdminCharts/BookingTrendsChart.vue";
import EarningsBySourceChart from "../components/AdminCharts/EarningsBySourceChart.vue";
import TopAffiliatesChart from "../components/AdminCharts/TopAffiliatesChart.vue";
import { fetchBookings } from "../firebase/bookingService";

// Refs
const totalBookings = ref(0);
const upcomingBookings = ref(0);
const totalEarnings = ref(0);
const activeAffiliates = ref(89); // Set this from another source if dynamic

// Logic
onMounted(async () => {
  const bookings = await fetchBookings();

  totalBookings.value = bookings.length;

  // Handle Timestamp or ISO string formats
  const now = new Date();

  upcomingBookings.value = bookings.filter((b) => {
    const bookingDate = b.date?.toDate ? b.date.toDate() : new Date(b.date);
    return bookingDate > now;
  }).length;

  totalEarnings.value = bookings.reduce(
    (sum, b) => sum + (parseFloat(b.amount) || 0),
    0
  );
});
</script>

<style scoped>
.dashboard {
  padding: 24px;
  background-color: #f5f6fa;
  min-height: 100vh;
}

.dashboard__stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
}

.dashboard__analytics-row {
  margin-top: 24px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 16px;
}

</style>
