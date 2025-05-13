<template>
  <div class="booking-modal" @keydown.esc="emit('close')" tabindex="0">
    <div class="booking-modal__content">
      <h3 class="booking-modal__title">
        {{ isEdit ? "Edit" : "Add" }} Booking
      </h3>

      <form class="booking-modal__form" @submit.prevent="onSubmit">
        <label class="booking-modal__label">
          Name
          <input
            v-model="form.name"
            type="text"
            placeholder="Name"
            class="booking-modal__input"
            aria-label="Name"
            required
            autofocus
          />
        </label>

        <label class="booking-modal__label">
          Mobile
          <input
            v-model="form.mobile"
            type="text"
            placeholder="Mobile"
            inputmode="numeric"
            pattern="\d*"
            maxlength="10"
            class="booking-modal__input"
            aria-label="Mobile"
            @input="onMobileInput"
            required
          />
        </label>
        <p v-if="mobileError" class="booking-modal__error">
          Enter a valid 10-digit mobile number
        </p>

        <label class="booking-modal__label">
          Pickup Location
          <input
            v-model="form.pickup"
            type="text"
            placeholder="Pickup"
            class="booking-modal__input"
            aria-label="Pickup Location"
            required
          />
        </label>

        <label class="booking-modal__label">
          Destination
          <input
            v-model="form.destination"
            type="text"
            placeholder="Destination"
            class="booking-modal__input"
            aria-label="Destination"
            required
          />
        </label>

        <label class="booking-modal__label">
          Journey Date
          <input
            v-model="form.date"
            type="date"
            class="booking-modal__input"
            aria-label="Journey Date"
            required
          />
        </label>

        <label class="booking-modal__label">
          Journey Type
          <select
            v-model="form.type"
            class="booking-modal__select"
            aria-label="Journey Type"
            required
          >
            <option disabled value="">Select Journey Type</option>
            <option>Round trip</option>
            <option>Wedding/Event</option>
            <option>Tour Package</option>
          </select>
        </label>

        <label class="booking-modal__label">
          Amount
          <input
            v-model="form.amount"
            type="number"
            placeholder="Amount"
            class="booking-modal__input"
            aria-label="Amount"
            min="0"
            required
          />
        </label>

        <label class="booking-modal__label">
          Notes
          <textarea
            v-model="form.notes"
            placeholder="Notes"
            class="booking-modal__textarea"
            aria-label="Notes"
          ></textarea>
        </label>

        <div class="booking-modal__actions">
          <button
            type="button"
            @click="emit('close')"
            class="booking-modal__button booking-modal__button--cancel"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="booking-modal__button booking-modal__button--primary"
            :disabled="isLoading"
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
  name: props.modelValue?.name ?? "",
  mobile: props.modelValue?.mobile ?? "",
  pickup: props.modelValue?.pickup ?? "",
  destination: props.modelValue?.destination ?? "",
  date: props.modelValue?.date ?? "",
  type: props.modelValue?.type ?? "",
  notes: props.modelValue?.notes ?? "",
  amount: props.modelValue?.amount ?? "",
});

const isLoading = ref(false);
const mobileError = ref(false);

watch(
  () => props.modelValue,
  (val) => {
    form.value = {
      name: val.name ?? "",
      mobile: val.mobile ?? "",
      pickup: val.pickup ?? "",
      destination: val.destination ?? "",
      date: val.date ?? "",
      type: val.type ?? "",
      notes: val.notes ?? "",
      amount: val.amount ?? "",
    };
    mobileError.value = false;
  },
  { immediate: true }
);

watch(
  () => form.value.mobile,
  () => validateMobile()
);

const validateMobile = () => {
  const value = form.value.mobile;
  mobileError.value = !/^\d{10}$/.test(value);
};

const onMobileInput = (e) => {
  form.value.mobile = e.target.value.replace(/\D/g, "").slice(0, 10);
};

const onSubmit = async () => {
  validateMobile();
  if (mobileError.value) return;
  isLoading.value = true;
  await emit("submit", { ...form.value });
  isLoading.value = false;
};

onMounted(() => {
  const handleKey = (e) => {
    if (e.key === "Escape") emit("close");
  };
  window.addEventListener("keydown", handleKey);
  onUnmounted(() => window.removeEventListener("keydown", handleKey));
});
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
  outline: none;
  
}

.booking-modal__content {
  background: #fff;
  padding: 2rem;
  border-radius: 1rem;
  width: 100%;
  max-width: 420px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  max-height: 500px;
  overflow-y: scroll;
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

.booking-modal__label {
  display: flex;
  flex-direction: column;
  font-weight: 500;
  font-size: 0.95rem;
  color: #333;
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
  justify-content: flex-end;
  gap: 1rem;
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
