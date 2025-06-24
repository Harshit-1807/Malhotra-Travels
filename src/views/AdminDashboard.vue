<template>
  <div class="dashboard">
    <div class="dashboard__stats">
      <StatCard
        class="dashboard__stats__totalbookings"
        label="Total Bookings"
        :value="totalBookings"
      >
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
      <StatCard
        label="Affiliate Earnings"
        :value="`₹${affiliateEarnings.toLocaleString()}`"
      >
        <template #icon>👥</template>
      </StatCard>
    </div>
    <div class="dashboard__analytics-row">
      <!-- Left Column: Booking Trends and Recent Bookings -->
      <div class="dashboard__column">
        <BookingTrendsChart />
        <button class="action-button-bookings" @click="openBookingForm">
          Add Booking
        </button>
        <BookingsTable />
      </div>
      <!-- Middle Column: Earnings by Source and Affiliate Performance -->
      <div class="dashboard__column">
        <EarningsBySourceChart />
        <button class="action-button-carPartner" @click="openCarOwnerForm">
          Add Partner
        </button>
        <CarPartnersTable />
      </div>
      <!-- Right Column: Top Affiliates and Car Partners -->
      <div class="dashboard__column">
        <TopAffiliatesChart />
        <button class="action-button-affiliates" @click="openAffiliateForm">
          Add Affiliate
        </button>
        <AffiliatesTable />
      </div>
    </div>
    <BookingForm
      v-if="isBookingModalOpen"
      :isEdit="isBookingEditMode"
      :modelValue="selectedBooking"
      @close="closeModal"
      @submit="handleFormSubmit"
    />
    <AdminCarOwnerForm
      v-if="isCarOwnerModalOpen"
      :isEdit="isCarOwnerEdit"
      :modelValue="selectedOwner"
      @submit="handleFormSubmit"
      @close="closeModal"
    />
    <AffiliateForm
      v-if="isAffiliateModalOpen"
      :isEdit="isAffiliatesEditMode"
      :modelValue="selectedAffiliate"
      @submit="handleFormSubmit"
      @close="closeModal"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import StatCard from "../components/AdminCharts/StatCard.vue";
import BookingTrendsChart from "../components/AdminCharts/BookingTrendsChart.vue";
import EarningsBySourceChart from "../components/AdminCharts/EarningsBySourceChart.vue";
import TopAffiliatesChart from "../components/AdminCharts/TopAffiliatesChart.vue";

import BookingsTable from "../components/AdminComponents/BookingsTable.vue";
import CarPartnersTable from "../components/AdminComponents/CarPartnersTable.vue";
import AffiliatesTable from "../components/AdminComponents/AffiliatesTable.vue";
import BookingForm from "../components/AdminComponents/BookingForm.vue";
import AdminCarOwnerForm from "../components/AdminComponents/AdminCarOwnerForm.vue";
import AffiliateForm from "../components/AdminComponents/AffiliateForm.vue";

import {
  fetchBookings,
  addBooking,
  updateBooking,
} from "../firebase/bookingService";
import {
  fetchCarOwners,
  saveCarOwner,
  updateCarOwner,
} from "../firebase/carOwnerService";
import {
  fetchAffiliates,
  saveAffiliate,
  updateAffiliate,
} from "../firebase/affiliateService";

// Stats
const totalBookings = ref(0);
const upcomingBookings = ref(0);
const totalEarnings = ref(0);
const affiliateEarnings = ref(0);

// Booking State
const bookingList = ref([]);
const isBookingModalOpen = ref(false);
const isBookingEditMode = ref(false);
const selectedBooking = ref({});

// Car Owner State
const carOwnerList = ref([]);
const isCarOwnerModalOpen = ref(false);
const isCarOwnerEditMode = ref(false);
const selectedCarOwner = ref({});

// Affiliate State
const affiliateList = ref([]);
const isAffiliateModalOpen = ref(false);
const isAffiliateEditMode = ref(false);
const selectedAffiliate = ref(null);

// Modal Openers
function openBookingForm() {
  selectedBooking.value = {
    id: "",
    name: "",
    mobile: "",
    pickup: "",
    destination: "",
    date: "",
    type: "",
    notes: "",
    amount: "",
  };
  isBookingEditMode.value = false;
  isBookingModalOpen.value = true;
}

function openCarOwnerForm() {
  selectedCarOwner.value = {};
  isCarOwnerEditMode.value = false;
  isCarOwnerModalOpen.value = true;
}

function openAffiliateForm() {
  selectedAffiliate.value = null;
  isAffiliateEditMode.value = false;
  isAffiliateModalOpen.value = true;
}

// Modal Closer
function closeModal() {
  isBookingModalOpen.value = false;
  selectedBooking.value = {};

  isCarOwnerModalOpen.value = false;
  selectedCarOwner.value = {};
  isCarOwnerEditMode.value = false;

  isAffiliateModalOpen.value = false;
  selectedAffiliate.value = null;
  isAffiliateEditMode.value = false;
}

// Helpers to detect form types
function isBookingData(data) {
  return "pickup" in data && "destination" in data;
}

function isCarOwnerData(data) {
  return "carNumber" in data && "carType" in data;
}

// Form Submission
async function handleFormSubmit(data) {
  const { id, ...payload } = data;
  try {
    if (isBookingData(data)) {
      if (isBookingEditMode.value && id) {
        await updateBooking(id, payload);
      } else {
        const docRef = await addBooking(payload);
        payload.id = docRef.id;
      }
      await loadBookings();
    } else if (isCarOwnerData(data)) {
      const cleanData = {
        name: data.name.trim(),
        mobile: data.mobile,
        carNumber: data.carNumber.trim().toUpperCase(),
        carType: data.carType.trim(),
        location: data.location.trim(),
        availability: data.availability,
      };
      if (isCarOwnerEditMode.value && id) {
        await updateCarOwner(id, cleanData);
      } else {
        await saveCarOwner(cleanData);
      }
      await loadCarOwners();
    } else {
      if (isAffiliateEditMode.value && id) {
        await updateAffiliate(data);
      } else {
        await saveAffiliate(data);
      }
      await loadAffiliates();
    }
  } catch (err) {
    console.error("Form submission failed:", err);
  } finally {
    closeModal();
  }
}

// Loaders
async function loadBookings() {
  bookingList.value = await fetchBookings();
}

async function loadCarOwners() {
  carOwnerList.value = await fetchCarOwners();
}

async function loadAffiliates() {
  affiliateList.value = await fetchAffiliates();
}

async function loadStats() {
  const bookings = await fetchBookings();
  totalBookings.value = bookings.length;

  const now = new Date();
  upcomingBookings.value = bookings.filter((b) => new Date(b.date) > now).length;

  totalEarnings.value = bookings.reduce(
    (sum, b) => sum + (parseFloat(b.amount) || 0),
    0
  );
}

async function loadAffiliateEarnings() {
  const affiliates = await fetchAffiliates();
  affiliateEarnings.value = affiliates.reduce(
    (sum, a) => sum + (parseFloat(a.amount) || 0),
    0
  );
}

// On Mount
onMounted(async () => {
  await Promise.all([
    loadStats(),
    loadAffiliateEarnings(),
    loadBookings(),
    loadCarOwners(),
    loadAffiliates(),
  ]);
});
</script>

<style scoped>
.dashboard {
  padding: 24px;
  background-color: #f5f6fa;
  min-height: 100vh;
  overflow-x: auto; /* Enable horizontal scrolling for the entire dashboard */
}

.dashboard__stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
}

/* Stat Cards */
.dashboard__stats__totalbookings {
  background-color: #013661; /* Dark blue for Total Bookings */
  color: #fff; /* White text for label and value */
}

/* Upcoming Bookings */
.dashboard__stats > :nth-child(2) {
  background-color: #015c92; /* Lighter blue for Upcoming Bookings */
  color: #fff; /* White text for label and value */
}

/* Total Earnings */
.dashboard__stats > :nth-child(3) {
  background-color: #087a83; /* Teal for Total Earnings */
  color: #fff; /* White text for label and value */
}

/* Affiliate Earnings */
.dashboard__stats > :nth-child(4) {
  background-color: #9f7605; /* Gold for Affiliate Earnings */
  color: #fff; /* White text for label and value */
}

/* Override all text inside StatCard to ensure labels and values are white */
:deep(.stat-card__label) {
  color: #fff !important; /* Force white color for all text inside StatCard */
}

.dashboard__analytics-row {
  margin-top: 24px;
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* Three equal columns */
  gap: 16px;
  width: 100%;
  box-sizing: border-box;
  min-width: 768px; /* Ensure horizontal scrolling on mobile */
  overflow-x: auto; /* Enable horizontal scrolling for analytics row */
}

/* Ensure smooth scrolling behavior */
.dashboard__analytics-row::-webkit-scrollbar {
  height: 8px;
}

.dashboard__analytics-row::-webkit-scrollbar-thumb {
  background-color: #888;
  border-radius: 4px;
}

.dashboard__analytics-row::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.dashboard__column {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  min-width: 250px; /* Minimum width for each column to prevent squashing */
  box-sizing: border-box;
}

/* Style for the action buttons */
.action-button-bookings,
.action-button-carPartner,
.action-button-affiliates {
  padding: 10px 20px;
  margin: 0 100px;
  font-size: 14px;
  font-weight: 600;
  color: #fff;
  background-color: #015c92; /* Blue for buttons */
  border: none;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.action-button-carPartner {
  background-color: #087a83;
}

/* Add icons to buttons using pseudo-elements */
.action-button-bookings::before {
  content: "+";
  font-size: 16px;
}

.action-button-carPartner::before {
  content: "+";
  font-size: 16px;
}

.action-button-affiliates::before {
  content: "🔍"; /* Magnifying glass for Edit Affiliate */
  font-size: 16px;
}

/* Ensure tables and charts take full width but respect container */
:deep(.table-card),
:deep(.chart-container) {
  width: 100%;
  box-sizing: border-box;
  overflow-x: auto; /* Allow horizontal scrolling for tables/charts if needed */
}

/* Ensure tables are responsive */
:deep(.table-card table) {
  width: 100%;
  min-width: 600px; /* Minimum width to maintain table readability */
}

/* Ensure charts are responsive */
:deep(.chart-container canvas) {
  max-width: 100%;
  height: auto !important; /* Ensure charts scale properly */
}

@media (max-width: 768px) {
  .dashboard {
    padding: 16px;
    overflow-x: auto; /* Ensure dashboard is scrollable */
  }

  .dashboard__stats {
    grid-template-columns: 1fr; /* Stack stat cards vertically */
  }

  .dashboard__analytics-row {
    grid-template-columns: 1fr; /* Stack columns vertically */
    min-width: 100%; /* Fit to viewport width */
    overflow-x: visible; /* Disable horizontal scroll when stacked */
  }

  .dashboard__column {
    min-width: 100%; /* Full width for each column */
    gap: 12px;
  }

  .action-button-bookings,
  .action-button-carPartner,
  .action-button-affiliates {
    margin: 0 auto; /* Center the button */
    width: 100%; /* Full width */
    max-width: 300px; /* Optional max-width */
  }

  /* Ensure tables and charts are fully responsive on mobile */
  :deep(.table-card) {
    overflow-x: auto;
  }

  :deep(.chart-container) {
    overflow-x: auto;
    max-width: 100%;
  }
}

@media (max-width: 480px) {
  .dashboard {
    padding: 12px;
  }

  .dashboard__stats {
    gap: 12px;
  }

  .dashboard__column {
    gap: 10px;
  }

  .action-button-bookings,
  .action-button-carPartner,
  .action-button-affiliates {
    font-size: 12px;
    padding: 8px 16px;
  }
}
</style>
