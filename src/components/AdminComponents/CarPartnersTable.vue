<template>
  <div class="table-card">
    <h3 class="table-card__title">Car Partners</h3>
    <table class="table-card__table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Car Type</th>
          <th>Location</th>
          <th @click="sortByDate" style="cursor: pointer">
            Date <span>{{ sortOrder === "asc" ? "🔼" : "🔽" }}</span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="owner in paginatedCarOwners" :key="owner.id">
          <td>{{ owner.name }}</td>
          <td>{{ owner.carType }}</td>
          <td>{{ owner.location }}</td>
          <td>{{ formatDate(owner.createdAt) }}</td>
        </tr>
      </tbody>
    </table>

    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">
        Next
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { fetchCarOwners } from "@/firebase/carOwnerService";

const carOwners = ref([]);
const currentPage = ref(1);
const pageSize = 5;
const sortOrder = ref("desc");

onMounted(async () => {
  const data = await fetchCarOwners();
  carOwners.value = data;
  sortOwners();
});

const sortOwners = () => {
  carOwners.value.sort((a, b) => {
    const dateA = a.createdAt?.toDate?.() || new Date(0);
    const dateB = b.createdAt?.toDate?.() || new Date(0);
    return sortOrder.value === "asc" ? dateA - dateB : dateB - dateA;
  });
};

const sortByDate = () => {
  sortOrder.value = sortOrder.value === "asc" ? "desc" : "asc";
  sortOwners();
};

const totalPages = computed(() => {
  return Math.ceil(carOwners.value.length / pageSize);
});

const paginatedCarOwners = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  const end = start + pageSize;
  return carOwners.value.slice(start, end);
});

const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--;
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++;
};

const formatDate = (timestamp) => {
  if (!timestamp?.toDate) return "-";
  const date = timestamp.toDate();
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};
</script>

<style scope>
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
  min-width: 600px;
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
  margin-bottom: 10px;
}

.pagination button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
