<template>
  <form
    @submit.prevent="submitAffiliate"
    class="affiliate-form"
  >
    <div class="affiliate-form__field">
      <label for="name" class="affiliate-form__label">Name</label>
      <input
        v-model="form.name"
        type="text"
        id="name"
        class="affiliate-form__input"
        required
        placeholder="Enter your full name"
      />
    </div>
    <div class="affiliate-form__field">
      <label for="mobile" class="affiliate-form__label"
        >Mobile Number</label
      >
      <input
        v-model="form.mobile"
        type="tel"
        id="mobile"
        class="affiliate-form__input"
        required
        placeholder="Enter your mobile number"
        pattern="[0-9]{10,15}"
        title="Please enter a valid mobile number (10-15 digits)"
      />
    </div>
    <div class="affiliate-form__field">
      <label for="email" class="affiliate-form__label"
        >Email (Optional)</label
      >
      <input
        v-model="form.email"
        type="email"
        id="email"
        class="affiliate-form__input"
        placeholder="Enter your email address"
      />
    </div>
    <button
      type="submit"
      class="affiliate-form__button"
      :disabled="isSubmitting"
    >
      <span v-if="isSubmitting">Processing...</span>
      <span v-else>Join as Affiliate</span>
    </button>
    <p v-if="formSubmitted" class="affiliate-form__success">
      Your application has been submitted successfully! We'll contact you soon.
    </p>
  </form>
</template>

<script setup>
import { reactive, ref } from "vue";

const form = reactive({
  name: "",
  mobile: "",
  email: "",
});

const isSubmitting = ref(false);
const formSubmitted = ref(false);
const submitAffiliate = async () => {
  isSubmitting.value = true;

  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
  console.log("Affiliate Submitted:", form);

    formSubmitted.value = true;
  Object.keys(form).forEach((key) => (form[key] = ""));

    // Reset success message after a delay
    setTimeout(() => {
      formSubmitted.value = false;
    }, 5000);
  } catch (error) {
    console.error("Submission error:", error);
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style scoped>
.affiliate-form {
  max-width: 32rem;
  margin: 2rem auto;
  background-color: white;
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  width: 100%;
  transition: box-shadow 0.3s ease;
}

.affiliate-form:focus-within {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.affiliate-form__field {
  margin-bottom: 1.5rem;
}

.affiliate-form__label {
  display: block;
  font-size: 0.95rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #374151;
}

.affiliate-form__input {
  width: 100%;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  padding: 0.75rem 1rem;
    font-size: 1rem;
  line-height: 1.5;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  }

.affiliate-form__input:focus {
  outline: none;
  border-color: #059669;
  box-shadow: 0 0 0 3px rgba(5, 150, 105, 0.2);
  }

.affiliate-form__input::placeholder {
  color: #9ca3af;
  opacity: 1;
}

.affiliate-form__input:required:invalid:not(:placeholder-shown) {
  border-color: #ef4444;
}

.affiliate-form__button {
  background-color: #059669;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 0.375rem;
  width: 100%;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.1s ease;
  border: none;
  margin-top: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 3rem;
}

.affiliate-form__button:hover:not(:disabled) {
  background-color: #047857;
  transform: translateY(-1px);
}

.affiliate-form__button:active:not(:disabled) {
  transform: translateY(1px);
}

.affiliate-form__button:disabled {
  background-color: #9ca3af;
  cursor: not-allowed;
  opacity: 0.7;
}

.affiliate-form__success {
  margin-top: 1rem;
  padding: 0.75rem;
  background-color: #d1fae5;
  border-radius: 0.375rem;
  color: #065f46;
  font-size: 0.95rem;
  text-align: center;
  animation: fadeIn 0.3s ease-in;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (min-width: 640px) {
  .affiliate-form {
    padding: 2rem;
    border-radius: 0.75rem;
  }

  .affiliate-form__button {
    padding: 0.75rem 2rem;
    font-size: 1.125rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .affiliate-form,
  .affiliate-form__input,
  .affiliate-form__button,
  .affiliate-form__success {
    transition: none;
    animation: none;
  }
}

@media (prefers-color-scheme: dark) {
  .affiliate-form {
    background-color: #1f2937;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2);
  }

  .affiliate-form__label {
    color: #e5e7eb;
  }

  .affiliate-form__input {
    background-color: #374151;
    border-color: #4b5563;
    color: #f3f4f6;
  }

  .affiliate-form__input::placeholder {
    color: #9ca3af;
  }

  .affiliate-form__success {
    background-color: rgba(5, 150, 105, 0.2);
    color: #34d399;
  }
}
</style>
