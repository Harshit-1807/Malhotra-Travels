<template>
  <form
    @submit.prevent="submitCarOwner"
    class="car-owner-form"
  >
    <div class="car-owner-form__field">
      <label for="name" class="car-owner-form__label">Name</label>
      <input
        v-model="form.name"
        type="text"
        id="name"
        class="car-owner-form__input"
        required
        placeholder="Enter your full name"
        autocomplete="name"
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
        autocomplete="tel"
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
    <button
      type="submit"
      class="car-owner-form__submit"
    >
      Submit Your Car Details
    </button>
  </form>
</template>

<script setup>
import { reactive } from "vue";

const form = reactive({
  name: "",
  carType: "",
  carNumber: "",
  location: "",
  mobile: "",
  availability: "Weekdays",
});

const submitCarOwner = () => {
  console.log("Car Owner Submitted:", form);
  alert("Car owner request submitted! We'll contact you soon.");
  Object.keys(form).forEach((key) => (form[key] = ""));
  form.availability = "Weekdays";
};
</script>

<style scoped>
.car-owner-form {
  max-width: 32rem;
  margin: 2rem auto;
  background-color: white;
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  width: 100%;
  transition: all 0.3s ease;
}

.car-owner-form:focus-within {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}
.car-owner-form__field {
  margin-bottom: 1.5rem;
}

.car-owner-form__label {
  display: block;
  font-size: 0.95rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #374151;
}

.car-owner-form__input {
  width: 100%;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  background-color: #f9fafb;
}

.car-owner-form__input:focus {
  outline: none;
  border-color: #d97706;
  box-shadow: 0 0 0 3px rgba(217, 119, 6, 0.2);
  background-color: white;
}

.car-owner-form__input::placeholder {
  color: #9ca3af;
  opacity: 0.7;
}

.car-owner-form__select {
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E");
  background-position: right 0.75rem center;
  background-repeat: no-repeat;
  background-size: 1.25rem;
  padding-right: 2.5rem;
}
  .car-owner-form__submit {
  background-color: #d97706;
  color: white;
  padding: 0.75rem 1.25rem;
  border-radius: 0.375rem;
  width: 100%;
    font-size: 1rem;
  font-weight: 600;
  transition: all 0.2s ease;
  cursor: pointer;
  border: none;
  margin-top: 0.5rem;
  }

.car-owner-form__submit:hover {
  background-color: #b45309;
  transform: translateY(-1px);
}

.car-owner-form__submit:active {
  transform: translateY(0);
}

.car-owner-form__submit:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(217, 119, 6, 0.4);
}

/* Responsive improvements */
@media (max-width: 640px) {
  .car-owner-form {
    padding: 1.25rem;
    margin: 1rem auto;
  }

  .car-owner-form__field {
    margin-bottom: 1.25rem;
  }

  .car-owner-form__input,
  .car-owner-form__submit {
    padding: 0.625rem 0.875rem;
  }
}

/* Accessibility improvements */
@media (prefers-reduced-motion: reduce) {
  .car-owner-form,
  .car-owner-form__input,
  .car-owner-form__submit {
    transition: none;
  }

  .car-owner-form__submit:hover {
    transform: none;
  }
}
</style>
