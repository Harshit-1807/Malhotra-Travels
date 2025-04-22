<template>
  <div class="booking">
    <div class="booking__container">
      <div class="booking__header">
        <h2 class="booking__title">Book Your Dream Ride Now!</h2>
        <p class="booking__description">
          Experience the ultimate comfort and convenience with our luxurious
          rides. Whether it's a romantic getaway, a family vacation, or a
          business trip, we've got you covered.
        </p>
      </div>

      <!-- Booking Features -->
      <div class="booking__features">
        <div class="feature">
          <span class="feature__icon">⚡</span>
          <h3 class="feature__title">Instant Confirmation</h3>
          <p class="feature__text">Get booking confirmation within minutes</p>
        </div>
        <div class="feature">
          <span class="feature__icon">💰</span>
          <h3 class="feature__title">Best Price Guarantee</h3>
          <p class="feature__text">Get the best rates in the market</p>
        </div>
        <div class="feature">
          <span class="feature__icon">🌟</span>
          <h3 class="feature__title">Professional Drivers</h3>
          <p class="feature__text">Experienced and courteous chauffeurs</p>
        </div>
      </div>

      <form @submit.prevent="submitBooking" class="booking-form">
        <div class="booking-form__grid">
          <!-- Personal Information -->
          <div class="booking-form__field">
            <label for="name" class="booking-form__label">Your Name</label>
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
              placeholder="Enter your mobile number"
              maxlength="10"
              @input="filterNumericInput"
            />
          </div>

          <!-- Journey Details -->
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
              placeholder="Enter pickup address"
            />
          </div>

          <div class="booking-form__field">
            <label for="destination" class="booking-form__label"
              >Destination</label
            >
            <input
              v-model="form.destination"
              type="text"
              id="destination"
              class="booking-form__input"
              required
              placeholder="Enter destination address"
            />
          </div>

          <div class="booking-form__field">
            <label for="date" class="booking-form__label">Journey Date</label>
            <input
              v-model="form.date"
              type="date"
              id="date"
              class="booking-form__input"
              required
              :min="new Date().toISOString().slice(0, 10)"
            />
          </div>

          <div class="booking-form__field">
            <label for="type" class="booking-form__label">Journey Type</label>
            <select
              v-model="form.type"
              id="type"
              class="booking-form__input"
              required
            >
              <option value="" disabled>Select journey type</option>
              <option value="roundtrip">Round Trip</option>
              <option value="wedding">Wedding/Event</option>
              <option value="tour">Tour Package</option>
            </select>
          </div>

          <!-- Additional Information -->
          <div class="booking-form__field booking-form__field--full">
            <label for="notes" class="booking-form__label"
              >Special Requests (Optional)</label
            >
            <textarea
              v-model="form.notes"
              id="notes"
              class="booking-form__input booking-form__textarea"
              placeholder="Any special requirements or requests?"
              rows="3"
            ></textarea>
          </div>
        </div>

        <!-- Booking Benefits -->
        <div class="booking__benefits">
          <h3 class="benefits__title">Booking Benefits</h3>
          <ul class="benefits__list">
            <li>✅ Free cancellation up to 24 hours before journey</li>
            <li>✅ No hidden charges - transparent pricing</li>
            <li>✅ Clean & sanitized vehicles</li>
            <li>✅ 24/7 customer support</li>
          </ul>
        </div>

        <button
          type="submit"
          class="booking-form__submit"
          :disabled="isSubmitting"
        >
          <span v-if="isSubmitting"> Processing... </span>
          <span v-else> Book Now </span>
        </button>
      </form>

      <!-- Success Message -->
      <div v-if="formSubmitted" class="booking__success">
        <div class="success__content">
          <span class="success__icon">🎉</span>
          <h3 class="success__title">Booking Request Received!</h3>
          <p class="success__message">
            Thank you for choosing Malhotra Travels. We'll confirm your booking
            shortly.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";

const form = reactive({
  name: "",
  mobile: "",
  pickup: "",
  destination: "",
  date: "",
  type: "",
  notes: "",
});

const isSubmitting = ref(false);
const formSubmitted = ref(false);

const filterNumericInput = (event) => {
  const input = event.target;
  input.value = input.value.replace(/\D/g, ""); // Remove all non-numeric characters
  form.mobile = input.value; // Update the reactive form value
};

const validateForm = () => {
  let isValid = true;

  // Validate mobile number
  if (form.mobile.length !== 10) {
    isValid = false;
    document.getElementById("mobile").focus();
  }

  return isValid;
};

const submitBooking = async () => {
  if (!validateForm()) return;

  isSubmitting.value = true;
  try {
    await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate API call
    formSubmitted.value = true;
    setTimeout(() => {
      formSubmitted.value = false;
      Object.keys(form).forEach((key) => (form[key] = ""));
    }, 5000);
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style scoped>
.booking {
  padding: 4rem 2rem;
  background: linear-gradient(135deg, #f6f9fc 0%, #ffffff 100%);
}

.booking__container {
  max-width: 1200px;
  margin: 0 auto;
}

.booking__header {
  text-align: center;
  margin-bottom: 3rem;
}

.booking__title {
  font-size: 2.5rem;
  color: #1a1a1a;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #2c3e50 0%, #3498db 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.booking__description {
  font-size: 1.1rem;
  color: #666;
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.6;
}

.booking__features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.feature {
  text-align: center;
  padding: 1.5rem;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;
}

.feature:hover {
  transform: translateY(-5px);
}

.feature__icon {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.feature__title {
  font-size: 1.2rem;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.feature__text {
  color: #666;
  font-size: 0.95rem;
}

.booking-form {
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.booking-form__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.booking-form__field {
  margin-bottom: 1.5rem;
}

.booking-form__field--full {
  grid-column: 1 / -1;
}

.booking-form__label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #2c3e50;
}

.booking-form__input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.booking-form__input:focus {
  outline: none;
  border-color: #3498db;
  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
}

.booking-form__textarea {
  resize: vertical;
  min-height: 100px;
}

.booking__benefits {
  margin: 2rem 0;
  padding: 1.5rem;
  background-color: #f8fafc;
  border-radius: 10px;
}

.benefits__title {
  font-size: 1.2rem;
  color: #2c3e50;
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

.booking-form__submit {
  width: 100%;
  padding: 1rem;
  background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.booking-form__submit:not(:disabled):hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(52, 152, 219, 0.3);
}

.booking-form__submit:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.booking-form__submit-price {
  font-size: 0.9rem;
  opacity: 0.9;
  margin-left: 0.5rem;
}

.booking__success {
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
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.success__message {
  color: #666;
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
  .booking {
    padding: 2rem 1rem;
  }

  .booking__title {
    font-size: 2rem;
  }

  .booking__description {
    font-size: 1rem;
  }

  .booking-form {
    padding: 1.5rem;
  }

  .benefits__list {
    grid-template-columns: 1fr;
  }

  .booking__success {
    left: 20px;
    right: 20px;
  }
}

@media (max-width: 480px) {
  .booking__features {
    grid-template-columns: 1fr;
  }

  .booking-form__grid {
    grid-template-columns: 1fr;
  }
}
</style>
