<template>
  <div class="booking-modal">
    <div class="booking-modal__content">
      <h3 class="booking-modal__title">
        {{ isEdit ? "Edit" : "Add" }} Booking
      </h3>
      <form class="booking-modal__form" @submit.prevent="onSubmit">
        <input
          v-model="form.name"
          type="text"
          placeholder="Name"
          class="booking-modal__input"
          required
          autofocus
        />

        <input
          v-model="form.mobile"
          type="text"
          placeholder="Mobile"
          maxlength="10"
          class="booking-modal__input"
          @input="validateMobile"
          required
        />
        <p v-if="mobileError" class="booking-modal__error">
          Enter a valid 10-digit mobile number
        </p>

        <input
          v-model="form.pickup"
          type="text"
          placeholder="Pickup"
          class="booking-modal__input"
          required
        />

        <input
          v-model="form.destination"
          type="text"
          placeholder="Destination"
          class="booking-modal__input"
          required
        />

        <input
          v-model="form.date"
          type="date"
          class="booking-modal__input"
          required
          :min="today"
        />

        <select v-model="form.type" class="booking-modal__select" required>
          <option disabled value="">Select Journey Type</option>
          <option>Round trip</option>
          <option>Wedding/Event</option>
          <option>Tour Package</option>
        </select>

        <textarea
          v-model="form.notes"
          placeholder="Notes"
          class="booking-modal__textarea"
        ></textarea>

        <div class="booking-modal__actions">
          <button
            type="button"
            @click="$emit('close')"
            class="booking-modal__button booking-modal__button--cancel"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="booking-modal__button booking-modal__button--primary"
          >
            {{ isEdit ? "Update" : "Save" }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits } from "vue";

const today = ref(new Date().toISOString().split("T")[0]); // Get today's date in YYYY-MM-DD format

const props = defineProps({
  isEdit: Boolean,
  modelValue: Object,
});

const emit = defineEmits(["submit", "close"]);

const form = ref({ ...props.modelValue });
watch(
  () => props.modelValue,
  (val) => {
    form.value = { ...val };
  }
);

const mobileError = ref(false);

const validateMobile = () => {
  const value = form.value.mobile;
  mobileError.value = !/^\d{10}$/.test(value);
};

const onSubmit = () => {
  validateMobile();
  if (mobileError.value) return;
  emit("submit", { ...form.value });
};
</script>

<style scoped>
.booking-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.booking-modal__content {
  background: #fff;
  padding: 2rem;
  border-radius: 1rem;
  width: 100%;
  max-width: 420px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.booking-modal__title {
  margin-bottom: 1.5rem;
  font-size: 1.25rem;
  font-weight: bold;
  text-align: center;
}

.booking-modal__form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.booking-modal__input,
.booking-modal__select,
.booking-modal__textarea {
  width: 100%;
  padding: 0.6rem 0.75rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  box-sizing: border-box;
}

.booking-modal__textarea {
  min-height: 80px;
  resize: vertical;
}

.booking-modal__actions {
  display: flex;
  justify-content: flex-end; /* Align buttons to the right */
  gap: 1rem; /* Space between buttons */
  margin-top: 1rem;
}

.booking-modal__button {
  padding: 0.6rem 1.2rem;
  font-size: 1rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background 0.3s ease;
}

.booking-modal__button--primary {
  background-color: #007bff;
  color: white;
}

.booking-modal__button--primary:hover {
  background-color: #0056b3;
}

.booking-modal__button--cancel {
  background-color: #e0e0e0;
  color: #333;
}

.booking-modal__button--cancel:hover {
  background-color: #cfcfcf;
}

.booking-modal__error {
  color: #e53935;
  font-size: 0.875rem;
  margin-top: -0.5rem;
  margin-bottom: -0.5rem;
}
</style>
