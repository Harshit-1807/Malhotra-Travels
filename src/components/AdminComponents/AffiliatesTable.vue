<template>
  <div class="affiliates-table">
    <h3 class="affiliates-table-card__title">Affiliate Performance</h3>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Amount</th>
          <th @click="sortByDate" style="cursor: pointer">
            Date
            <span>{{ sortOrder === "asc" ? "🔼" : "🔽" }}</span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="affiliate in paginatedAffiliates" :key="affiliate.id">
          <td>{{ affiliate.name }}</td>
          <td>₹{{ affiliate.amount }}</td>
          <td>{{ formatDate(affiliate.createdAt) }}</td>
        </tr>
      </tbody>
    </table>

    <!-- Pagination Controls -->
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
import { fetchAffiliates } from "@/firebase/affiliateService";

const affiliates = ref([]);
const currentPage = ref(1);
const pageSize = 5;
const sortOrder = ref("desc");

const loadAffiliates = async () => {
  const data = await fetchAffiliates();
  affiliates.value = data;
  sortAffiliates(); // Initial sort
};

onMounted(() => {
  loadAffiliates();
});

const sortAffiliates = () => {
  affiliates.value.sort((a, b) => {
    const dateA = a.createdAt?.toDate?.() || new Date(0);
    const dateB = b.createdAt?.toDate?.() || new Date(0);
    return sortOrder.value === "asc" ? dateA - dateB : dateB - dateA;
  });
};

const sortByDate = () => {
  sortOrder.value = sortOrder.value === "asc" ? "desc" : "asc";
  sortAffiliates();
};

const totalPages = computed(() => {
  return Math.ceil(affiliates.value.length / pageSize);
});

const paginatedAffiliates = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  const end = start + pageSize;
  return affiliates.value.slice(start, end);
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

<style scoped>
.affiliates-table {
  background-color: #fff;
  padding: 1rem;
  border-radius: 8px;
}
.affiliates-table-card__title {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 12px;
}
table {
  width: 100%;
  border-collapse: collapse;
}
thead th {
  padding: 10px;
  text-align: left;
  font-size: 14px;
  border-bottom: 1px solid #eee;
  user-select: none;
}
tbody td {
  padding: 10px;
  text-align: left;
  font-size: 14px;
  border-bottom: 1px solid #eee;
}
.pagination {
  margin-top: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
button {
  padding: 0.3rem 0.8rem;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: #fff;
}
button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
