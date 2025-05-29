<template>
  <div class="admin-car-owner">
    <h2 class="admin-car-owner__title">Car Owners</h2>

    <div class="admin-car-owner__controls">
      <input
        type="text"
        class="admin-car-owner__input admin-car-owner__input--search"
        placeholder="Search by name or location"
        v-model.trim="searchTerm"
        aria-label="Search car owners"
      />
      <input
        type="date"
        class="admin-car-owner__input admin-car-owner__input--date-filter"
        v-model="filterDate"
        aria-label="Filter by creation date"
      />
      <button
        class="admin-car-owner__button admin-car-owner__button--clear"
        @click="clearFilters"
      >
        Clear Filters
      </button>
      <button
        class="admin-car-owner__button admin-car-owner__button--add"
        @click="openAddForm"
      >
        Add Car Owner
      </button>
    </div>

    <p v-if="errorMessage" class="admin-car-owner__error">{{ errorMessage }}</p>
    <p v-if="successMessage" class="admin-car-owner__success">
      {{ successMessage }}
    </p>
    <p class="admin-car-owner__scroll-hint">Swipe to scroll the table →</p>

    <div class="admin-car-owner__table-container">
      <table class="admin-car-owner__table">
        <thead>
          <tr>
            <th
              @click="sortBy('name')"
              class="admin-car-owner__table-header"
              aria-sort="none"
            >
              Name
              <span
                v-if="sortField === 'name'"
                class="admin-car-owner__sort-icon"
              >
                {{ sortAsc ? "▲" : "▼" }}
              </span>
            </th>
            <th
              @click="sortBy('carNumber')"
              class="admin-car-owner__table-header"
            >
              Car Number
            </th>
            <th
              @click="sortBy('carType')"
              class="admin-car-owner__table-header"
            >
              Car Type
            </th>
            <th
              @click="sortBy('location')"
              class="admin-car-owner__table-header"
            >
              Location
            </th>
            <th @click="sortBy('mobile')" class="admin-car-owner__table-header">
              Mobile
            </th>
            <th
              @click="sortBy('availability')"
              class="admin-car-owner__table-header"
            >
              Availability
            </th>
            <th
              @click="sortBy('createdAt')"
              class="admin-car-owner__table-header"
            >
              Created At
            </th>
            <th class="admin-car-owner__table-header">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="isLoading" class="admin-car-owner__table-row">
            <td colspan="8" class="admin-car-owner__table-cell">Loading...</td>
          </tr>
          <tr
            v-else
            v-for="owner in paginatedOwners"
            :key="owner.id"
            class="admin-car-owner__table-row"
          >
            <td class="admin-car-owner__table-cell">{{ owner.name }}</td>
            <td class="admin-car-owner__table-cell">{{ owner.carNumber }}</td>
            <td class="admin-car-owner__table-cell">{{ owner.carType }}</td>
            <td class="admin-car-owner__table-cell">{{ owner.location }}</td>
            <td class="admin-car-owner__table-cell">{{ owner.mobile }}</td>
            <td class="admin-car-owner__table-cell">
              {{ owner.availability }}
            </td>
            <td class="admin-car-owner__table-cell">
              {{ formatDate(owner.createdAt) }}
            </td>
            <td class="admin-car-owner__table-cell">
              <i
                class="fas fa-edit admin-car-owner__icon admin-car-owner__icon--edit"
                @click="openEditForm(owner)"
                aria-label="Edit car owner"
              ></i>
              <i
                class="fas fa-trash-alt admin-car-owner__icon admin-car-owner__icon--delete"
                @click="deleteOwner(owner.id)"
                aria-label="Delete car owner"
              ></i>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="admin-car-owner__pagination">
      <button
        @click="prevPage"
        :disabled="currentPage === 1"
        class="admin-car-owner__button admin-car-owner__button--pagination"
      >
        Prev
      </button>
      <span class="admin-car-owner__pagination-info"
        >Page {{ currentPage }} of {{ totalPages }}</span
      >
      <button
        @click="nextPage"
        :disabled="currentPage === totalPages"
        class="admin-car-owner__button admin-car-owner__button--pagination"
      >
        Next
      </button>
    </div>

    <AdminCarOwnerForm
      v-if="showModal"
      :isEdit="isEdit"
      :modelValue="selectedOwner"
      @submit="handleFormSubmit"
      @close="closeModal"
    />
  </div>
</template>

<script setup>
import { onMounted, ref, computed, watch } from "vue";
import AdminCarOwnerForm from "../components/AdminComponents/AdminCarOwnerForm.vue";
import {
  fetchCarOwners,
  deleteCarOwner,
  updateCarOwner,
  saveCarOwner,
} from "../firebase/carOwnerService";

const carOwners = ref([]);
const searchTerm = ref("");
const filterDate = ref("");
const currentPage = ref(1);
const pageSize = 10;
const sortField = ref("");
const sortAsc = ref(true);
const showModal = ref(false);
const isEdit = ref(false);
const selectedOwner = ref({});
const isLoading = ref(false);
const errorMessage = ref("");
const successMessage = ref("");

// Debug reactivity
watch(showModal, (newValue) => {
  console.log("showModal changed to:", newValue);
});

const loadCarOwners = async () => {
  try {
    isLoading.value = true;
    errorMessage.value = "";
    carOwners.value = await fetchCarOwners();
  } catch (error) {
    errorMessage.value = "Failed to fetch car owners. Please try again.";
    console.error("Error fetching car owners:", error);
  } finally {
    isLoading.value = false;
  }
};

const deleteOwner = async (id) => {
  if (!confirm("Are you sure you want to delete this car owner?")) return;
  try {
    isLoading.value = true;
    errorMessage.value = "";
    await deleteCarOwner(id);
    successMessage.value = "Car owner deleted successfully.";
    await loadCarOwners();
    setTimeout(() => (successMessage.value = ""), 3000);
  } catch (error) {
    errorMessage.value = "Failed to delete car owner. Please try again.";
    console.error("Error deleting car owner:", error);
  } finally {
    isLoading.value = false;
  }
};

const handleFormSubmit = async (data) => {
  try {
    isLoading.value = true;
    errorMessage.value = "";
    if (isEdit.value) {
      await updateCarOwner(data.id, {
        name: data.name.trim(),
        mobile: data.mobile,
        carNumber: data.carNumber.trim().toUpperCase(),
        carType: data.carType.trim(),
        location: data.location.trim(),
        availability: data.availability,
      });
      successMessage.value = "Car owner updated successfully.";
    } else {
      await saveCarOwner({
        name: data.name.trim(),
        mobile: data.mobile,
        carNumber: data.carNumber.trim().toUpperCase(),
        carType: data.carType.trim(),
        location: data.location.trim(),
        availability: data.availability,
      });
      successMessage.value = "Car owner added successfully.";
    }
    await loadCarOwners();
    showModal.value = false;
    setTimeout(() => (successMessage.value = ""), 3000);
  } catch (error) {
    errorMessage.value = isEdit.value
      ? "Failed to update car owner. Please try again."
      : "Failed to add car owner. Please try again.";
    console.error("Error saving car owner:", error);
  } finally {
    isLoading.value = false;
  }
};

const formatDate = (timestamp) => {
  if (!timestamp?.toDate) return "";
  const date = timestamp.toDate();
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const filteredOwners = computed(() => {
  let list = carOwners.value;

  if (searchTerm.value) {
    const term = searchTerm.value.toLowerCase().trim();
    list = list.filter(
      (o) =>
        o.name?.toLowerCase().includes(term) ||
        o.location?.toLowerCase().includes(term)
    );
  }

  if (filterDate.value) {
    const selectedDate = new Date(filterDate.value).toDateString();
    list = list.filter(
      (o) => o.createdAt?.toDate().toDateString() === selectedDate
    );
  }

  if (sortField.value) {
    list = [...list].sort((a, b) => {
      let valA = a[sortField.value];
      let valB = b[sortField.value];

      if (sortField.value === "createdAt") {
        valA = valA?.toDate ? valA.toDate() : new Date(valA);
        valB = valB?.toDate ? valB.toDate() : new Date(valB);
        return sortAsc.value ? valA - valB : valB - valA;
      }

      if (typeof valA === "number" && typeof valB === "number") {
        return sortAsc.value ? valA - valB : valB - valA;
      }

      return sortAsc.value
        ? String(valA).localeCompare(String(valB))
        : String(valB).localeCompare(String(valA));
    });
  }

  return list;
});

const totalPages = computed(() =>
  Math.ceil(filteredOwners.value.length / pageSize)
);

const paginatedOwners = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  return filteredOwners.value.slice(start, start + pageSize);
});

const openAddForm = () => {
  console.log("openAddForm triggered");
  selectedOwner.value = {};
  isEdit.value = false;
  showModal.value = true;
  console.log("showModal:", showModal.value);
};

const openEditForm = (owner) => {
  console.log("openEditForm triggered for owner:", owner);
  selectedOwner.value = { ...owner };
  isEdit.value = true;
  showModal.value = true;
  console.log("showModal:", showModal.value);
};

const closeModal = () => {
  showModal.value = false;
  selectedOwner.value = {};
  isEdit.value = false;
};

const clearFilters = () => {
  searchTerm.value = "";
  filterDate.value = "";
  currentPage.value = 1;
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++;
};

const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--;
};

const sortBy = (field) => {
  if (sortField.value === field) {
    sortAsc.value = !sortAsc.value;
  } else {
    sortField.value = field;
    sortAsc.value = true;
  }
};

onMounted(loadCarOwners);
</script>

<style scoped>
.admin-car-owner {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.admin-car-owner__title {
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: #333;
}

.admin-car-owner__controls {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.admin-car-owner__input {
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  flex: 1;
  max-width: 250px;
  transition: border-color 0.3s ease;
}

.admin-car-owner__input:focus {
  outline: none;
  border-color: #007bff;
}

.admin-car-owner__input--search {
  max-width: 300px;
}

.admin-car-owner__input--date-filter {
  max-width: 200px;
}

.admin-car-owner__button {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.admin-car-owner__button--clear {
  background-color: #dc3545;
  color: white;
}

.admin-car-owner__button--clear:hover {
  background-color: #c82333;
}

.admin-car-owner__button--add {
  background-color: #28a745;
  color: white;
  z-index: 10; /* Ensure button is clickable */
}

.admin-car-owner__button--add:hover {
  background-color: #218838;
}

.admin-car-owner__error {
  color: #dc3545;
  font-size: 0.875rem;
  margin-bottom: 1rem;
}

.admin-car-owner__success {
  color: #28a745;
  font-size: 0.875rem;
  margin-bottom: 1rem;
}

.admin-car-owner__scroll-hint {
  font-size: 0.85rem;
  color: #666;
  margin-bottom: 0.5rem;
  display: none;
}

.admin-car-owner__table-container {
  width: 100%;
  overflow-x: auto;
  background-color: white;
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 1.5rem;
}

.admin-car-owner__table {
  width: 100%;
  border-collapse: collapse;
}

.admin-car-owner__table-header {
  padding: 0.75rem;
  text-align: left;
  background-color: #f8f9fa;
  border-bottom: 2px solid #dee2e6;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.admin-car-owner__table-header:hover {
  background-color: #e9ecef;
}

.admin-car-owner__table-cell {
  padding: 0.75rem;
  border-bottom: 1px solid #dee2e6;
}

.admin-car-owner__sort-icon {
  margin-left: 0.5rem;
}

.admin-car-owner__icon {
  cursor: pointer;
  margin-right: 0.75rem;
  font-size: 1rem;
}

.admin-car-owner__icon--edit {
  color: #007bff;
  z-index: 10; /* Ensure icon is clickable */
}

.admin-car-owner__icon--edit:hover {
  color: #0056b3;
}

.admin-car-owner__icon--delete {
  color: #dc3545;
}

.admin-car-owner__icon--delete:hover {
  color: #c82333;
}

.admin-car-owner__pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;
}

.admin-car-owner__button--pagination {
  background-color: #007bff;
  color: white;
}

.admin-car-owner__button--pagination:hover {
  background-color: #0056b3;
}

.admin-car-owner__button--pagination:disabled {
  background-color: #6c757d;
  cursor: not-allowed;
}

.admin-car-owner__pagination-info {
  font-size: 1rem;
  color: #333;
}

@media (max-width: 768px) {
  .admin-car-owner__scroll-hint {
    display: block;
  }

  .admin-car-owner__controls {
    flex-direction: column;
    align-items: stretch;
  }

  .admin-car-owner__input {
    max-width: 100%;
  }
}
</style>
