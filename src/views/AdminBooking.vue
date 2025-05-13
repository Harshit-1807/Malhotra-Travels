<template>
  <div class="bookings">
    <div class="bookings__header">
      <h2 class="bookings__heading">All Bookings</h2>
      <div>
        <button class="bookings__add" @click="openAddForm">Add Booking</button>
      </div>
    </div>

    <div class="bookings__filter">
      <label for="fromDate">From:</label>
      <input
        type="date"
        v-model="fromDate"
        id="fromDate"
        class="bookings__input"
      />
      <label for="toDate">To:</label>
      <input type="date" v-model="toDate" id="toDate" class="bookings__input" />
      <button class="bookings__clear-filter" @click="clearFilters">
        Clear Filter
      </button>
    </div>

    <div class="bookings__search">
      <label for="search">Search:</label>
      <input
        type="text"
        v-model="searchQuery"
        id="search"
        class="bookings__input"
        placeholder="Search by name"
      />
    </div>
    <p class="bookings__scroll-hint">Swipe to scroll the table →</p>
    <div class="bookings__table-container">
      <table class="bookings__table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Mobile</th>
            <th>Pickup</th>
            <th>Destination</th>
            <th>Journey Type</th>
            <th @click="sortByDate" class="bookings__sortable">
              Date
              <span v-if="sortAsc">▲</span>
              <span v-else>▼</span>
            </th>
            <th>Amount</th>
            <th>Notes</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="booking in filteredBookings" :key="booking.id">
            <td>{{ booking.name }}</td>
            <td>{{ booking.mobile }}</td>
            <td>{{ booking.pickup }}</td>
            <td>{{ booking.destination }}</td>
            <td>{{ booking.type }}</td>
            <td>{{ booking.date }}</td>
            <td>{{ booking.amount }}</td>
            <td>{{ booking.notes }}</td>
            <td>
              <i
                class="fas fa-edit bookings__icon"
                @click="editBooking(booking)"
              ></i>
              <i
                class="fas fa-trash-alt bookings__icon"
                @click="deleteBooking(booking.id)"
              ></i>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    

    <div class="bookings__pagination">
      <button
        class="bookings__page-button"
        :disabled="currentPage === 1"
        @click="prevPage"
      >
        Prev
      </button>
      <span class="bookings__page-info"
        >Page {{ currentPage }} of {{ totalPages }}</span
      >
      <button
        class="bookings__page-button"
        :disabled="currentPage === totalPages"
        @click="nextPage"
      >
        Next
      </button>
    </div>

    <BookingForm
      v-if="isModalOpen"
      :isEdit="isEditMode"
      :modelValue="selectedBooking"
      @close="closeModal"
      @submit="handleFormSubmit"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import BookingForm from "../components/BookingForm.vue";
import {
  fetchBookings,
  deleteBooking as deleteBookingFromService,
  updateBooking,
  addBooking,
} from "../firebase/bookingService";

const router = useRouter();
const bookings = ref([]);
const selectedBooking = ref({ amount: "" });
const isModalOpen = ref(false);
const isEditMode = ref(false);
const fromDate = ref("");
const toDate = ref("");
const sortAsc = ref(true);
const searchQuery = ref("");

// Pagination
const currentPage = ref(1);
const pageSize = 10;

const totalPages = computed(() =>
  Math.ceil(filteredBookingsUnpaginated.value.length / pageSize)
);

const filteredBookingsUnpaginated = computed(() => {
  return bookings.value
    .filter(
      (b) =>
        (!fromDate.value || new Date(b.date) >= new Date(fromDate.value)) &&
        (!toDate.value || new Date(b.date) <= new Date(toDate.value)) &&
        (!searchQuery.value ||
          b.name.toLowerCase().includes(searchQuery.value.toLowerCase()))
    )
    .sort((a, b) => {
      return sortAsc.value
        ? new Date(a.date) - new Date(b.date)
        : new Date(b.date) - new Date(a.date);
    });
});

const filteredBookings = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  return filteredBookingsUnpaginated.value.slice(start, start + pageSize);
});

function nextPage() {
  if (currentPage.value < totalPages.value) currentPage.value++;
}

function prevPage() {
  if (currentPage.value > 1) currentPage.value--;
}

function sortByDate() {
  sortAsc.value = !sortAsc.value;
}

function openAddForm() {
  selectedBooking.value = {
    name: "",
    mobile: "",
    pickup: "",
    destination: "",
    date: "",
    type: "",
    notes: "",
    amount: "",
  };
  isEditMode.value = false;
  isModalOpen.value = true;
}

function editBooking(booking) {
  console.log("Booking data in editBooking:", booking);
  selectedBooking.value = { ...booking };
  isEditMode.value = true;
  isModalOpen.value = true;
}

async function deleteBooking(id) {
  if (confirm("Are you sure you want to delete this booking?")) {
    await deleteBookingFromService(id);
    await loadBookings();
  }
}

function closeModal() {
  isModalOpen.value = false;
  selectedBooking.value = {};
}

async function handleFormSubmit(data) {
  console.log("Received data from BookingForm:", data);
  console.log("isEditMode:", isEditMode.value);
  const { id, ...bookingData } = data;
  console.log("Extracted id:", id);
  console.log("Booking data without id:", bookingData);

  if (isEditMode.value && id) {
    console.log("Updating booking with id:", id);
    await updateBooking(id, bookingData);
  } else {
    console.log("Adding new booking");
    await addBooking(bookingData);
  }
  closeModal();
  await loadBookings();
}

async function loadBookings() {
  bookings.value = await fetchBookings();
  currentPage.value = 1; // reset to first page after load
}

function clearFilters() {
  fromDate.value = "";
  toDate.value = "";
  searchQuery.value = "";
}

onMounted(loadBookings);
</script>

<style scoped>
.bookings {
  padding: 1.5rem;
  font-family: Arial, sans-serif;
  background: #f9f9f9;
}

.bookings__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.bookings__heading {
  font-size: 1.8rem;
  font-weight: bold;
}

.bookings__add {
  background-color: #28a745;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  margin-right: 0.5rem;
}

.bookings__filter {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  align-items: center;
}

.bookings__clear-filter {
  background-color: #dc3545;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  cursor: pointer;
  border-radius: 4px;
}

.bookings__input {
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid #ccc;
}
.bookings__table-container {
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  background-color: white;
  border-radius: 6px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
}

.bookings__table {
  width: 100%;
  min-width: 800px;
  border-collapse: collapse;
  background-color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.bookings__table th,
.bookings__table td {
  border: 1px solid #ddd;
  padding: 0.75rem;
  text-align: left;
}

.bookings__table th {
  background-color: #f1f1f1;
  cursor: pointer;
}

.bookings__sortable {
  color: #007bff;
  user-select: none;
}
.bookings__scroll-hint {
  font-size: 0.85rem;
  color: #666;
  margin-bottom: 0.5rem;
  display: none;
}

@media (max-width: 768px) {
  .bookings__scroll-hint {
    display: block;
  }
}

.bookings__icon {
  cursor: pointer;
  margin-right: 0.5rem;
  color: #007bff;
}

.bookings__icon:hover {
  color: #0056b3;
}

.bookings__pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
  gap: 1rem;
}

.bookings__page-button {
  background-color: #007bff;
  color: white;
  padding: 0.4rem 0.8rem;
  border: none;
  cursor: pointer;
  border-radius: 4px;
}

.bookings__page-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.bookings__page-info {
  font-weight: bold;
}

.bookings__search {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  align-items: center;
}

@media (max-width: 768px) {
  .bookings__header {
    flex-direction: column;
    align-items: flex-start;
  }

  .bookings__filter,
  .bookings__search {
    flex-direction: column;
    align-items: flex-start;
  }

  .bookings__input {
    width: 100%;
  }

  .bookings__pagination {
    flex-direction: column;
    align-items: center;
  }
}
</style>
