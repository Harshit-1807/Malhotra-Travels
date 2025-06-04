<template>
  <div class="admin-affiliates">
    <header class="admin-affiliates__header">
      <h2 class="admin-affiliates__title">All Affiliates</h2>
      <button class="admin-affiliates__add-btn" @click="openAddModal">
        + Add Affiliate
      </button>
    </header>

    <div class="admin-affiliates__controls">
      <input
        v-model="searchTerm"
        class="admin-affiliates__search"
        type="text"
        placeholder="Search by name or mobile"
      />
      <button class="admin-affiliates__clear-filter" @click="clearSearch">
        Clear Search
      </button>
    </div>

    <p class="admin-affiliates__scroll-hint">Swipe to scroll the table →</p>

    <div v-if="errorMessage" class="admin-affiliates__error" role="alert">
      {{ errorMessage }}
    </div>

    <div class="admin-affiliates__table-container">
      <table class="admin-affiliates__table">
        <thead>
          <tr>
            <th
              @click="sortBy('name')"
              :class="[
                'admin-affiliates__sortable',
                sortKey === 'name' ? 'admin-affiliates__active' : '',
              ]"
            >
              Name
              <span v-if="sortKey === 'name' && sortAsc">▲</span>
              <span v-else-if="sortKey === 'name'">▼</span>
            </th>
            <th
              @click="sortBy('mobile')"
              :class="[
                'admin-affiliates__sortable',
                sortKey === 'mobile' ? 'admin-affiliates__active' : '',
              ]"
            >
              Mobile
              <span v-if="sortKey === 'mobile' && sortAsc">▲</span>
              <span v-else-if="sortKey === 'mobile'">▼</span>
            </th>
            <th
              @click="sortBy('email')"
              :class="[
                'admin-affiliates__sortable',
                sortKey === 'email' ? 'admin-affiliates__active' : '',
              ]"
            >
              Email
              <span v-if="sortKey === 'email' && sortAsc">▲</span>
              <span v-else-if="sortKey === 'email'">▼</span>
            </th>
            <th
              @click="sortBy('amount')"
              :class="[
                'admin-affiliates__sortable',
                sortKey === 'amount' ? 'admin-affiliates__active' : '',
              ]"
            >
              Amount
              <span v-if="sortKey === 'amount' && sortAsc">▲</span>
              <span v-else-if="sortKey === 'amount'">▼</span>
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="affiliate in paginatedAffiliates" :key="affiliate.id">
            <td>{{ affiliate.name }}</td>
            <td>{{ affiliate.mobile }}</td>
            <td>{{ affiliate.email }}</td>
            <td>{{ affiliate.amount }}</td>
            <td>
              <i
                class="fas fa-edit affiliates__icon"
                @click="openEditModal(affiliate)"
              ></i>
              <i
                class="fas fa-trash-alt affiliates__icon"
                @click="deleteAffiliate(affiliate.id)"
              ></i>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="admin-affiliates__pagination">
      <button @click="prevPage" :disabled="currentPage === 1">Prev</button>
      <span class="admin-affiliates__page-info">
        Page {{ currentPage }} of {{ totalPages }}
      </span>
      <button @click="nextPage" :disabled="currentPage === totalPages">
        Next
      </button>
    </div>

    <AffiliateForm
      v-if="showModal"
      :isEdit="isEditMode"
      :modelValue="selectedAffiliate"
      @submit="handleFormSubmit"
      @close="closeModal"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import {
  saveAffiliate,
  fetchAffiliates as fetchAffiliatesFromService,
  deleteAffiliate as deleteAffiliateFromService,
  updateAffiliate,
} from "../firebase/affiliateService";
import AffiliateForm from "../components/AdminComponents/AffiliateForm.vue";

const affiliates = ref([]);
const searchTerm = ref("");
const sortKey = ref("name");
const sortAsc = ref(true);
const currentPage = ref(1);
const itemsPerPage = 10;
const showModal = ref(false);
const selectedAffiliate = ref(null);
const errorMessage = ref("");
const isEditMode = ref(false);

const fetchAffiliates = async () => {
  try {
    affiliates.value = await fetchAffiliatesFromService();
    errorMessage.value = "";
  } catch (error) {
    errorMessage.value = `Failed to load affiliates: ${error.message}`;
  }
};

onMounted(fetchAffiliates);

const filteredAffiliates = computed(() => {
  const term = searchTerm.value.toLowerCase();
  return affiliates.value
    .filter(
      (a) => a.name.toLowerCase().includes(term) || a.mobile.includes(term)
    )
    .sort((a, b) => {
      const aVal = a[sortKey.value]?.toLowerCase?.() ?? a[sortKey.value];
      const bVal = b[sortKey.value]?.toLowerCase?.() ?? b[sortKey.value];
      if (aVal < bVal) return sortAsc.value ? -1 : 1;
      if (aVal > bVal) return sortAsc.value ? 1 : -1;
      return 0;
    });
});

const totalPages = computed(() =>
  Math.ceil(filteredAffiliates.value.length / itemsPerPage)
);

const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage);
const endIndex = computed(() => startIndex.value + itemsPerPage);
const paginatedAffiliates = computed(() =>
  filteredAffiliates.value.slice(startIndex.value, endIndex.value)
);

const sortBy = (key) => {
  if (sortKey.value === key) {
    sortAsc.value = !sortAsc.value;
  } else {
    sortKey.value = key;
    sortAsc.value = true;
  }
};

const openAddModal = () => {
  selectedAffiliate.value = null;
  isEditMode.value = false;
  showModal.value = true;
};

const openEditModal = (affiliate) => {
  selectedAffiliate.value = { ...affiliate };
  isEditMode.value = true;
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  selectedAffiliate.value = null;
  isEditMode.value = false;
  errorMessage.value = "";
};

const handleFormSubmit = async (affiliate) => {
  try {
    if (isEditMode.value && affiliate.id) {
      await updateAffiliate(affiliate);
    } else if (!affiliate.id) {
      await saveAffiliate(affiliate);
    } else {
      throw new Error("Invalid affiliate ID for update operation");
    }
    await fetchAffiliates();
    closeModal();
  } catch (error) {
    errorMessage.value = `Failed to ${
      isEditMode.value ? "update" : "add"
    } affiliate: ${error.message}`;
  }
};

const deleteAffiliate = async (id) => {
  if (!id) {
    errorMessage.value = "Cannot delete: Invalid affiliate ID";
    return;
  }
  if (confirm("Are you sure you want to delete this affiliate?")) {
    try {
      await deleteAffiliateFromService(id);
      await fetchAffiliates();
    } catch (error) {
      errorMessage.value = `Failed to delete affiliate: ${error.message}`;
    }
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const clearSearch = () => {
  searchTerm.value = "";
  currentPage.value = 1;
};
</script>

<style scoped>
.admin-affiliates {
  padding: 1.5rem;
  font-family: Arial, sans-serif;
  background: #f9f9f9;
}

.admin-affiliates__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.admin-affiliates__title {
  font-size: 1.8rem;
  font-weight: bold;
}

.admin-affiliates__add-btn {
  background-color: #28a745;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  margin-top: 0.5rem;
}

.admin-affiliates__controls {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: 1rem;
}

.admin-affiliates__search {
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid #ccc;
  max-width: 400px;
}

.admin-affiliates__clear-filter {
  background-color: #dc3545;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  cursor: pointer;
  border-radius: 4px;
}

.admin-affiliates__table-container {
  width: 100%;
  overflow-x: auto;
  background-color: white;
  border-radius: 6px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
}

.admin-affiliates__table {
  width: 100%;
  min-width: 600px;
  border-collapse: collapse;
  background-color: white;
}

.admin-affiliates__table th,
.admin-affiliates__table td {
  border: 1px solid #ddd;
  padding: 0.75rem;
  text-align: left;
}

.admin-affiliates__table th {
  background-color: #f1f1f1;
  cursor: pointer;
}

.admin-affiliates__sortable {
  color: #666;
  user-select: none;
}

.admin-affiliates__active {
  color: #007bff;
}

.affiliates__icon {
  cursor: pointer;
  margin-right: 0.5rem;
  color: #007bff;
}

.affiliates__icon:hover {
  color: #0056b3;
}

.admin-affiliates__pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
  gap: 1rem;
  flex-wrap: wrap;
}

.admin-affiliates__pagination button {
  background-color: #007bff;
  color: white;
  padding: 0.4rem 0.8rem;
  border: none;
  cursor: pointer;
  border-radius: 4px;
}

.admin-affiliates__pagination button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.admin-affiliates__page-info {
  font-weight: bold;
}

.admin-affiliates__error {
  color: #dc3545;
  font-size: 0.875rem;
  margin-bottom: 1rem;
}

.admin-affiliates__scroll-hint {
  font-size: 0.85rem;
  color: #666;
  margin-bottom: 0.5rem;
  display: none;
}

@media (max-width: 768px) {
  .admin-affiliates__scroll-hint {
    display: block;
  }

  .admin-affiliates__header {
    flex-direction: column;
    align-items: flex-start;
  }

  .admin-affiliates__controls {
    flex-direction: column;
    align-items: flex-start;
  }

  .admin-affiliates__pagination {
    flex-direction: column;
    align-items: center;
  }

  .admin-affiliates__search {
    width: 100%;
  }
}
</style>
