<template>
  <div class="table-card">
    <h3 class="table-card__title">Recent Bookings</h3>
    <table class="table-card__table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Mobile</th>
          <th @click="sortByDate" style="cursor: pointer">
            Date
            <span v-if="sortOrder === 'desc'">⬇️</span>
            <span v-else>⬆️</span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="booking in paginatedBookings" :key="booking.id">
          <td>{{ booking.name }}</td>
          <td>{{ booking.mobile }}</td>
          <td>{{ booking.date }}</td>
        </tr>
      </tbody>
    </table>

    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { fetchBookings } from "@/firebase/bookingService";

const bookings = ref([]);
const currentPage = ref(1);
const perPage = 5;
const sortOrder = ref("desc"); // default: latest first

onMounted(async () => {
  const data = await fetchBookings();
  bookings.value = data.sort((a, b) =>
    sortOrder.value === "desc"
      ? new Date(b.date) - new Date(a.date)
      : new Date(a.date) - new Date(b.date)
  );
});

const sortByDate = () => {
  sortOrder.value = sortOrder.value === "desc" ? "asc" : "desc";
  bookings.value.sort((a, b) =>
    sortOrder.value === "desc"
      ? new Date(b.date) - new Date(a.date)
      : new Date(a.date) - new Date(b.date)
  );
};

const totalPages = computed(() =>
  Math.ceil(bookings.value.length / perPage)
);

const paginatedBookings = computed(() => {
  const start = (currentPage.value - 1) * perPage;
  return bookings.value.slice(start, start + perPage);
});

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++;
};

const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--;
};
</script>

<style scoped>
.table-card {
  background-color: #fff;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 20px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
}

.table-card__title {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 12px;
}

.table-card__table {
  width: 100%;
  border-collapse: collapse;
}

.table-card__table th,
.table-card__table td {
  padding: 10px;
  text-align: left;
  font-size: 14px;
  border-bottom: 1px solid #eee;
}

.table-card__table th {
  user-select: none;
}

.pagination {
  margin-top: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.pagination button {
  padding: 6px 12px;
  font-size: 13px;
  border: none;
  background-color: #0984e3;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
}

.pagination button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
