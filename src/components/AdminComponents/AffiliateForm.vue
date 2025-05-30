<template>
  <div
    class="affiliate-modal"
    @keydown.esc="emit('close')"
    tabindex="0"
    role="dialog"
    aria-labelledby="affiliate-modal-title"
  >
    <div class="affiliate-modal__content">
      <h3 class="affiliate-modal__title" id="affiliate-modal-title">
        {{ isEdit ? "Edit Affiliate" : "Add Affiliate" }}
      </h3>
      <form class="affiliate-modal__form" @submit.prevent="onSubmit">
        <label class="affiliate-modal__label">
          Name
          <input
            v-model.trim="form.name"
            type="text"
            placeholder="Enter name"
            class="affiliate-modal__input"
            aria-label="Affiliate name"
            required
            autofocus
          />
        </label>

        <label class="affiliate-modal__label">
          Mobile
          <input
            v-model="form.mobile"
            type="text"
            placeholder="Enter mobile number"
            inputmode="numeric"
            pattern="\d{10}"
            maxlength="10"
            class="affiliate-modal__input"
            aria-label="Affiliate mobile number"
            @input="onMobileInput"
            required
          />
          <p
            v-if="mobileError"
            class="affiliate-modal__error"
            role="alert"
            aria-live="assertive"
          >
            Enter a valid 10-digit mobile number
          </p>
        </label>

        <label for="email" class="affiliate-modal__label">
          ✉️ Email (Optional)
        </label>
        <input
          v-model="form.email"
          type="email"
          class="affiliate-modal__input"
          placeholder="e.g. yourname@example.com"
        />

         <label for="amount" class="affiliate-modal__label">
          Amount
        </label>
        <input
          v-model="form.amount"
          type="number"
          class="affiliate-modal__input"
        />

        <div class="affiliate-modal__actions">
          <button
            type="button"
            @click="emit('close')"
            class="affiliate-modal__button affiliate-modal__button--cancel"
            aria-label="Cancel"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="affiliate-modal__button affiliate-modal__button--submit"
            :disabled="isLoading || mobileError"
            aria-label="Save affiliate"
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
  id: "",
  name: "",
  mobile: "",
  email: "",
  amount: "",
});

const isLoading = ref(false);
const mobileError = ref(false);

const validateMobile = () => {
  const value = form.value.mobile;
  mobileError.value = !/^\d{10}$/.test(value);
};

watch(
  () => props.modelValue,
  (val) => {
    form.value = {
      id: val?.id || "",
      name: val?.name || "",
      mobile: val?.mobile || "",
      email: val?.email || "",
      amount: val?.amount || "",
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

const onSubmit = async () => {
  validateMobile();
  if (mobileError.value) return;
  isLoading.value = true;
  try {
    if (props.isEdit && !form.value.id) {
      throw new Error("Missing ID for edit operation");
    }
    await emit("submit", { ...form.value });
  } catch (error) {
    throw error;
  } finally {
    isLoading.value = false;
  }
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
.affiliate-modal {
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

.affiliate-modal__content {
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  width: 100%;
  max-width: 450px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  max-height: 90vh;
  overflow-y: auto;
}

.affiliate-modal__title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  text-align: center;
  color: #333;
}

.affiliate-modal__form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.affiliate-modal__label {
  display: flex;
  flex-direction: column;
  font-size: 0.95rem;
  font-weight: 500;
  color: #333;
}

.affiliate-modal__input,
.affiliate-modal__select {
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid #ced4da;
  border-radius: 5px;
  transition: border-color 0.3s ease;
}

.affiliate-modal__input:focus,
.affiliate-modal__select:focus {
  outline: none;
  border-color: #007bff;
}

.affiliate-modal__error {
  color: #dc3545;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

.affiliate-modal__actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1.5rem;
}

.affiliate-modal__button {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.affiliate-modal__button--submit {
  background-color: #007bff;
  color: white;
}

.affiliate-modal__button--submit:hover {
  background-color: #0056b3;
}

.affiliate-modal__button--submit:disabled {
  background-color: #6c757d;
  cursor: not-allowed;
}

.affiliate-modal__button--cancel {
  background-color: #e0e0e0;
  color: #333;
}

.affiliate-modal__button--cancel:hover {
  background-color: #d0d0d0;
}
</style>
