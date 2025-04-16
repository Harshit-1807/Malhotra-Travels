<template>
  <form
    @submit.prevent="submitBooking"
    class="booking-form"
  >
    <div class="booking-form__field">
      <label for="name" class="booking-form__label">Name</label>
      <input
        v-model="form.name"
        type="text"
        id="name"
        class="booking-form__input"
        required
        placeholder="Enter your full name"
      />
    </div>
    <div class="booking-form__field">
      <label for="mobile" class="booking-form__label"
        >Mobile Number</label
      >
      <input
        v-model="form.mobile"
        type="tel"
        id="mobile"
        class="booking-form__input"
        required
        placeholder="e.g. 0412 345 678"
      />
    </div>
    <div class="booking-form__field">
      <label for="pickup" class="booking-form__label"
        >Pickup Location</label
      >
      <input
        v-model="form.pickup"
        type="text"
        id="pickup"
        class="booking-form__input"
        required
        placeholder="Enter your pickup address"
      />
    </div>
    <div class="booking-form__field">
      <label for="drop" class="booking-form__label">Drop Location</label>
      <input
        v-model="form.drop"
        type="text"
        id="drop"
        class="booking-form__input"
        required
        placeholder="Enter your destination address"
      />
    </div>
    <div class="booking-form__field">
      <label for="date" class="booking-form__label"
        >Booking Date/Time</label
      >
      <input
        v-model="form.date"
        type="datetime-local"
        id="date"
        class="booking-form__input"
        required
      />
    </div>
    <div class="booking-form__field">
      <label for="type" class="booking-form__label">Booking Type</label>
      <select
        v-model="form.type"
        id="type"
        class="booking-form__input"
        required
      >
        <option value="Outstation">Outstation</option>
        <option value="Wedding">Wedding</option>
        <option value="Tour">Tour</option>
      </select>
    </div>
    <div class="booking-form__field">
      <label for="notes" class="booking-form__label"
        >Notes (Optional)</label
      >
      <textarea
        v-model="form.notes"
        id="notes"
        class="booking-form__input booking-form__textarea"
        placeholder="Any special requests or additional information"
        rows="3"
      ></textarea>
    </div>
    <button
      type="submit"
      class="booking-form__submit-button"
    >
      Submit Booking Request
    </button>
  </form>
</template>

<script setup>
import { reactive } from "vue";

const form = reactive({
  name: "",
  mobile: "",
  pickup: "",
  drop: "",
  date: "",
  type: "Outstation",
  notes: "",
});

const submitBooking = () => {
  console.log("Booking Submitted:", form);
  alert("Booking request submitted! We'll contact you soon.");
  Object.keys(form).forEach((key) => (form[key] = ""));
  form.type = "Outstation";
};
</script>

<style scoped>
.booking-form {
  max-width: 32rem;
  margin: 2rem auto;
  background-color: white;
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
  width: 100%;
  transition: box-shadow 0.3s ease;
}

.booking-form:hover {
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05);
}
@media (min-width: 640px) {
  .booking-form {
    padding: 2rem;
  }
}

.booking-form__field {
  margin-bottom: 1.5rem;
}

.booking-form__label {
  display: block;
  font-size: 0.95rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #374151;
}

.booking-form__input {
  width: 100%;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  padding: 0.75rem 1rem;
    font-size: 1rem;
  line-height: 1.5;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  }

.booking-form__input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.25);
}

.booking-form__input::placeholder {
  color: #9ca3af;
  font-size: 0.875rem;
}

.booking-form__textarea {
  min-height: 6rem;
  resize: vertical;
}

.booking-form__submit-button {
  background-color: #2563eb;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 0.375rem;
  width: 100%;
  font-size: 1rem;
  font-weight: 600;
  transition: background-color 0.2s ease, transform 0.1s ease;
  cursor: pointer;
  border: none;
  margin-top: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06);
}

.booking-form__submit-button:hover {
  background-color: #1d4ed8;
}

.booking-form__submit-button:active {
  transform: translateY(1px);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.booking-form__submit-button:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.4);
}

/* Responsive improvements */
@media (min-width: 768px) {
  .booking-form__submit-button {
    padding: 0.875rem 2rem;
    font-size: 1.125rem;
  }

  .booking-form__label {
    font-size: 1rem;
  }
}

/* Accessibility improvements */
@media (prefers-reduced-motion: reduce) {
  .booking-form,
  .booking-form__input,
  .booking-form__submit-button {
    transition: none;
  }
}
</style>

