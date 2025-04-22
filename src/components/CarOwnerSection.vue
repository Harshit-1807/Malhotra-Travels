<template>
  <section class="car-owner-section">
    <div class="car-owner-section__container">
      <div class="car-owner-section__header">
        <h1 class="car-owner-section__title">Partner with Us</h1>
        <p class="car-owner-section__description">
          Got an idle car? Partner with us and earn by letting us use your car
          for bookings. Fill out the form below to get started!
        </p>
      </div>

      <form @submit.prevent="submitCarOwner" class="car-owner-form">
        <div class="car-owner-form__grid">
          <div class="car-owner-form__field">
            <label for="name" class="car-owner-form__label">Name</label>
            <input
              v-model="form.name"
              type="text"
              id="name"
              class="car-owner-form__input"
              required
              placeholder="Enter your full name"
            />
          </div>

          <div class="car-owner-form__field">
            <label for="mobile" class="car-owner-form__label"
              >Mobile Number</label
            >
            <input
              v-model="form.mobile"
              type="tel"
              id="mobile"
              class="car-owner-form__input"
              pattern="[0-9]*"
              inputmode="numeric"
              required
              placeholder="Enter your mobile number"
            />
          </div>

          <div class="car-owner-form__field">
            <label for="carType" class="car-owner-form__label"
              >Car Type & Model</label
            >
            <input
              v-model="form.carType"
              type="text"
              id="carType"
              class="car-owner-form__input"
              required
              placeholder="e.g. Toyota Camry, Honda Civic"
            />
          </div>

          <div class="car-owner-form__field">
            <label for="carNumber" class="car-owner-form__label"
              >Car Number</label
            >
            <input
              v-model="form.carNumber"
              type="text"
              id="carNumber"
              class="car-owner-form__input"
              required
              placeholder="Enter your car's license plate number"
            />
          </div>

          <div class="car-owner-form__field">
            <label for="location" class="car-owner-form__label">Location</label>
            <input
              v-model="form.location"
              type="text"
              id="location"
              class="car-owner-form__input"
              required
              placeholder="Enter your current location"
            />
          </div>

          <div class="car-owner-form__field">
            <label for="availability" class="car-owner-form__label"
              >Availability</label
            >
            <select
              v-model="form.availability"
              id="availability"
              class="car-owner-form__input car-owner-form__select"
              required
            >
              <option value="Weekdays">Weekdays</option>
              <option value="Weekends">Weekends</option>
              <option value="Both">Both</option>
            </select>
          </div>
        </div>

        <div class="car-owner-form__benefits">
          <h3 class="benefits__title">Why Partner with Us?</h3>
          <ul class="benefits__list">
            <li>✅ Earn passive income with your idle car</li>
            <li>✅ Hassle-free process and quick approvals</li>
            <li>✅ Transparent and secure payments</li>
            <li>✅ Join a trusted network of car owners</li>
          </ul>
        </div>

        <button
          type="submit"
          class="car-owner-form__submit"
          :disabled="isSubmitting"
        >
          <span v-if="isSubmitting">Processing...</span>
          <span v-else>Submit Your Car Details</span>
        </button>
      </form>

      <!-- Success Message -->
      <div v-if="formSubmitted" class="car-owner-form__success">
        <div class="success__content">
          <span class="success__icon">🎉</span>
          <h3 class="success__title">Details Submitted Successfully!</h3>
          <p class="success__message">
            Thank you for partnering with us. We'll contact you shortly.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { reactive, ref } from "vue";

const form = reactive({
  name: "",
  mobile: "",
  carType: "",
  carNumber: "",
  location: "",
  availability: "Weekdays",
});

const isSubmitting = ref(false);
const formSubmitted = ref(false);

const submitCarOwner = async () => {
  isSubmitting.value = true;
  try {
    await new Promise((resolve) => setTimeout(resolve, 800)); // Simulate API call
    console.log("Car Owner Submitted:", form);
    formSubmitted.value = true;
    Object.keys(form).forEach((key) => (form[key] = ""));
    form.availability = "Weekdays";
    setTimeout(() => (formSubmitted.value = false), 5000); // Hide success message after 5 seconds
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style scoped>
.car-owner-section {
  padding: 4rem 2rem;
  background: linear-gradient(135deg, #f6f9fc 0%, #ffffff 100%);
}

.car-owner-section__container {
  max-width: 1200px;
  margin: 0 auto;
}

.car-owner-section__header {
  text-align: center;
  margin-bottom: 3rem;
}

.car-owner-section__title {
  font-size: 2.5rem;
  color: #d97706;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #d97706 0%, #b45309 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.car-owner-section__description {
  font-size: 1.1rem;
  color: #6b7280;
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.6;
}

.car-owner-form {
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.car-owner-form__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.car-owner-form__field {
  margin-bottom: 1.5rem;
}

.car-owner-form__label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #374151;
}

.car-owner-form__input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.car-owner-form__input:focus {
  outline: none;
  border-color: #d97706;
  box-shadow: 0 0 0 3px rgba(217, 119, 6, 0.2);
}

.car-owner-form__select {
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E");
  background-position: right 0.75rem center;
  background-repeat: no-repeat;
  background-size: 1.25rem;
  padding-right: 2.5rem;
}

.car-owner-form__benefits {
  margin: 2rem 0;
  padding: 1.5rem;
  background-color: #f8fafc;
  border-radius: 10px;
}

.benefits__title {
  font-size: 1.2rem;
  color: #d97706;
  margin-bottom: 1rem;
}

.benefits__list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.benefits__list li {
  font-size: 0.95rem;
  color: #4a5568;
}

.car-owner-form__submit {
  width: 100%;
  padding: 1rem;
  background: linear-gradient(135deg, #d97706 0%, #b45309 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.car-owner-form__submit:not(:disabled):hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(217, 119, 6, 0.3);
}

.car-owner-form__submit:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.car-owner-form__success {
  position: fixed;
  top: 20px;
  right: 20px;
  background: white;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  animation: slideIn 0.5s ease;
}

.success__content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.success__icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.success__title {
  color: #065f46;
  margin-bottom: 0.5rem;
}

.success__message {
  color: #065f46;
  font-size: 0.95rem;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@media (max-width: 768px) {
  .car-owner-section {
    padding: 2rem 1rem;
  }

  .car-owner-section__title {
    font-size: 2rem;
  }

  .car-owner-section__description {
    font-size: 1rem;
  }

  .car-owner-form {
    padding: 1.5rem;
  }

  .benefits__list {
    grid-template-columns: 1fr;
  }

  .car-owner-form__success {
    left: 20px;
    right: 20px;
  }
}
</style>
