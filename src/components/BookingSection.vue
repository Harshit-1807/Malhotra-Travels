<!-- filepath: c:\Users\Rahul\Repos\Malhotra-Travels\src\components\BookingSection.vue -->
<template>
  <div class="booking">
    <div class="booking__container">
      <h2 class="booking__title">Book Your Ride Now</h2>
      <p class="booking__description">
        Plan your journey with ease! Whether it's an outstation trip, a wedding, or a tour, our reliable and comfortable rides are just a booking away.
      </p>
      <form @submit.prevent="submitBooking" class="booking-form">
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
          <label for="mobile" class="booking-form__label">Mobile Number</label>
          <input
            v-model="form.mobile"
            type="tel"
            id="mobile"
            class="booking-form__input"
            required
            placeholder="e.g. 0412 345 678"
            pattern="[0-9]*"
            inputmode="numeric"
          />
        </div>
        <div class="booking-form__field">
          <label for="pickup" class="booking-form__label">Pickup Location</label>
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
          <label for="date" class="booking-form__label">Booking Date/Time</label>
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
          <select v-model="form.type" id="type" class="booking-form__input" required>
            <option value="Outstation">Outstation</option>
            <option value="Wedding">Wedding</option>
            <option value="Tour">Tour</option>
          </select>
        </div>
        <div class="booking-form__field">
          <label for="notes" class="booking-form__label">Notes (Optional)</label>
          <textarea
            v-model="form.notes"
            id="notes"
            class="booking-form__input booking-form__textarea"
            placeholder="Any special requests or additional information"
            rows="3"
          ></textarea>
        </div>
        <button type="submit" :disabled="isSubmitting" class="booking-form__submit-button">
          <span v-if="isSubmitting">Processing...</span>
          <span v-else>Submit Booking Request</span>
        </button>
        <p v-if="formSubmitted" class="success-msg">
          🎉 <strong>Success!</strong> Your booking request has been submitted. We'll contact you soon.
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";

const form = reactive({
  name: "",
  mobile: "",
  pickup: "",
  drop: "",
  date: "",
  type: "Outstation",
  notes: "",
});

const isSubmitting = ref(false);
const formSubmitted = ref(false);

const submitBooking = async () => {
  isSubmitting.value = true;
  try {
    await new Promise((resolve) => setTimeout(resolve, 800)); // Simulate API call
    console.log("Booking Submitted:", form);
    formSubmitted.value = true;
    Object.keys(form).forEach((key) => (form[key] = ""));
    form.type = "Outstation";
    setTimeout(() => (formSubmitted.value = false), 5000); // Hide success message after 5 seconds
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style scoped>
.booking {
  padding: 2rem;
  background-color: #f9f9f9;
}

.booking__container {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

.booking__title {
  font-size: 2rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 1rem;
}

.booking__description {
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 1.5rem;
}

.booking-form {
  max-width: 32rem;
  margin: 0 auto;
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

.booking__quick-links {
  margin-top: 2rem;
  text-align: center;
}

.booking__subtitle {
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 0.5rem;
}

.booking__contact {
  font-size: 1rem;
  color: #444;
  margin-bottom: 1rem;
}

.booking__link {
  color: #2563eb;
  text-decoration: none;
  font-weight: bold;
}

.booking__link:hover {
  text-decoration: underline;
}

.booking__whatsapp-button {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background-color: #25d366;
  color: white;
  border-radius: 0.375rem;
  font-size: 1rem;
  font-weight: bold;
  text-decoration: none;
  transition: background-color 0.3s ease;
}

.booking__whatsapp-button:hover {
  background-color: #1da851;
}
.success-msg {
  background-color: #d1fae5;
  color: #065f46;
  border-radius: 0.5rem;
  margin-top: 1.25rem;
  padding: 1rem;
  text-align: center;
}
</style>