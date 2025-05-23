<template>
  <div
    class="car-owner-modal"
    @keydown.esc="emit('close')"
    tabindex="0"
    role="dialog"
    aria-labelledby="car-owner-modal-title"
  >
    <div class="car-owner-modal__content">
      <h3 class="car-owner-modal__title" id="car-owner-modal-title">
        {{ isEdit ? "Edit Car Owner" : "Add Car Owner" }}
      </h3>
      <form class="car-owner-modal__form" @submit.prevent="onSubmit">
        <label class="car-owner-modal__label">
          Name
          <input
            v-model.trim="form.name"
            type="text"
            placeholder="Enter name"
            class="car-owner-modal__input"
            aria-label="Car owner name"
            required
            autofocus
          />
        </label>

        <label class="car-owner-modal__label">
          Mobile
          <input
            v-model="form.mobile"
            type="text"
            placeholder="Enter mobile number"
            inputmode="numeric"
            pattern="\d{10}"
            maxlength="10"
            class="car-owner-modal__input"
            aria-label="Car owner mobile number"
            @input="onMobileInput"
            required
          />
          <p
            v-if="mobileError"
            class="car-owner-modal__error"
            role="alert"
            aria-live="assertive"
          >
            Enter a valid 10-digit mobile number
          </p>
        </label>

        <label class="car-owner-modal__label">
          Car Number
          <input
            v-model="form.carNumber"
            type="text"
            placeholder="Enter car number (e.g., ABC123)"
            class="car-owner-modal__input"
            aria-label="Car number"
            required
            @input="onCarNumberInput"
          />
        </label>

        <label class="car-owner-modal__label">
          Car Type
          <input
            v-model.trim="form.carType"
            type="text"
            placeholder="Enter car type (e.g., Sedan)"
            class="car-owner-modal__input"
            aria-label="Car type"
            required
          />
        </label>

        <label class="car-owner-modal__label">
          Location
          <input
            v-model.trim="form.location"
            type="text"
            placeholder="Enter location"
            class="car-owner-modal__input"
            aria-label="Car owner location"
            required
          />
        </label>

        <label class="car-owner-modal__label">
          Availability
          <select
            v-model="form.availability"
            class="car-owner-modal__select"
            aria-label="Car owner availability"
            required
          >
            <option disabled value="">Select Availability</option>
            <option value="Weekdays">Weekdays</option>
            <option value="Weekends">Weekends</option>
            <option value="Both">Both</option>
          </select>
        </label>

        <div class="car-owner-modal__actions">
          <button
            type="button"
            @click="emit('close')"
            class="car-owner-modal__button car-owner-modal__button--cancel"
            aria-label="Cancel"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="car-owner-modal__button car-owner-modal__button--submit"
            :disabled="isLoading || mobileError"
            aria-label="Save car owner"
          >
            {{ isLoading ? "Saving..." : isEdit ? "Update" : "Save" }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import {
  ref,
  watch,
  defineProps,
  defineEmits,
  onMounted,
  onUnmounted,
} from "vue";

const props = defineProps({
  isEdit: Boolean,
  modelValue: Object,
});

const emit = defineEmits(["submit", "close"]);

const form = ref({
  id: props.modelValue?.id ?? "",
  name: props.modelValue?.name ?? "",
  mobile: props.modelValue?.mobile ?? "",
  carNumber: props.modelValue?.carNumber ?? "",
  carType: props.modelValue?.carType ?? "",
  location: props.modelValue?.location ?? "",
  availability: props.modelValue?.availability ?? "",
});

const isLoading = ref(false);
const mobileError = ref(false);

// Define validateMobile before the watch blocks
const validateMobile = () => {
  const value = form.value.mobile;
  mobileError.value = !/^\d{10}$/.test(value);
};

// Now the watch blocks can safely call validateMobile
watch(
  () => props.modelValue,
  (val) => {
    form.value = {
      id: val?.id ?? "",
      name: val?.name ?? "",
      mobile: val?.mobile ?? "",
      carNumber: val?.carNumber ?? "",
      carType: val?.carType ?? "",
      location: val?.location ?? "",
      availability: val?.availability ?? "",
    };
    validateMobile();
  },
  { immediate: true }
);

watch(
  () => form.value.mobile,
  () => validateMobile()
);

const onMobileInput = (e) => {
  form.value.mobile = e.target.value.replace(/\D/g, "").slice(0, 10);
};

const onCarNumberInput = (e) => {
  form.value.carNumber = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "");
};

const onSubmit = async () => {
  validateMobile();
  if (mobileError.value) return;
  isLoading.value = true;
  try {
    await emit("submit", { ...form.value });
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  console.log("AdminCarOwnerForm mounted");
  const handleKey = (e) => {
    if (e.key === "Escape") emit("close");
  };
  window.addEventListener("keydown", handleKey);
  onUnmounted(() => window.removeEventListener("keydown", handleKey));
});
</script>

<style scoped>
.car-owner-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000;
  outline: none;
}

.car-owner-modal__content {
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  width: 100%;
  max-width: 450px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  max-height: 90vh;
  overflow-y: auto;
}

.car-owner-modal__title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  text-align: center;
  color: #333;
}

.car-owner-modal__form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.car-owner-modal__label {
  display: flex;
  flex-direction: column;
  font-size: 0.95rem;
  font-weight: 500;
  color: #333;
}

.car-owner-modal__input,
.car-owner-modal__select {
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid #ced4da;
  border-radius: 5px;
  transition: border-color 0.3s ease;
}

.car-owner-modal__input:focus,
.car-owner-modal__select:focus {
  outline: none;
  border-color: #007bff;
}

.car-owner-modal__error {
  color: #dc3545;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

.car-owner-modal__actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1.5rem;
}

.car-owner-modal__button {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.car-owner-modal__button--submit {
  background-color: #007bff;
  color: white;
}

.car-owner-modal__button--submit:hover {
  background-color: #0056b3;
}

.car-owner-modal__button--submit:disabled {
  background-color: #6c757d;
  cursor: not-allowed;
}

.car-owner-modal__button--cancel {
  background-color: #e0e0e0;
  color: #333;
}

.car-owner-modal__button--cancel:hover {
  background-color: #d0d0d0;
}
</style>
