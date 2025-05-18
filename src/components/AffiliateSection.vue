<template>
  <section class="affiliate-section">
    <!-- Heading -->
    <h1 class="affiliate-section__heading">Become Our Affiliate Partner</h1>

    <!-- Content Wrapper -->
    <div class="affiliate-section__content">
      <!-- Affiliate Program Explanation -->
      <div class="affiliate-intro">
        <h2 class="affiliate-intro__title">📢 What is M-Affiliate Program?</h2>
        <p class="affiliate-intro__desc">
          It’s simple. Just refer new bookings to Malhotra Car Rental. When a
          booking is successfully completed, you earn a
          <strong>flat 10% commission</strong> — no investment, no car required.
          Earn more through exciting bonuses and referral rewards!
        </p>

        <!-- 3-Step Visual Guide -->
        <div class="affiliate-steps">
          <div class="step-box">
            <div class="step-icon">🔗</div>
            <h3>Refer Bookings</h3>
            <p>Share our service with people looking for reliable travel.</p>
          </div>
          <div class="arrow">➡️</div>
          <div class="step-box">
            <div class="step-icon">✅</div>
            <h3>Booking Completed</h3>
            <p>We handle everything from confirmation to service.</p>
          </div>
          <div class="arrow">➡️</div>
          <div class="step-box">
            <div class="step-icon">💰</div>
            <h3>Earn Commission</h3>
            <p>Get paid weekly via UPI. Minimum 10%, plus bonuses!</p>
          </div>
        </div>
      </div>

      <!-- Motivation / Bonus Section and Affiliate Form -->
      <div class="affiliate-info-and-form">
        <div class="affiliate-info">
          <h2 class="affiliate-info__title">🔥 Why Become an Affiliate?</h2>
          <ul class="affiliate-info__list">
            <li>
              🎯 <strong>Monthly leaderboard:</strong> Top 3 get ₹1000 bonus
            </li>
            <li>🛻 <strong>No car required:</strong> Just refer & earn</li>
            <li>
              📲 <strong>Refer easily:</strong> Share via WhatsApp or mobile
            </li>
            <li>💸 <strong>Easy payouts:</strong> UPI every week</li>
            <li>
              🏆 <strong>Rewards:</strong> Bonus for first 3 bookings in 7 days
            </li>
            <li>
              🎯 <strong>Referral Rewards:</strong> Earn ₹200 for each successful
              affiliate referral
            </li>
            <!-- <li>
              📈 <strong>High earning potential:</strong> Earn up to ₹50,000 per
              month
            </li>
            <li>
              🌐 <strong>Global reach:</strong> Refer bookings from anywhere in
              the world
            </li> -->
            <li>
              📈 <strong>Exclusive promotions:</strong> Special offers for top
              affiliates
            </li>
          </ul>
          <div class="affiliate-note">
            🔐 Takes less than 2 minutes<br />
            📞 Questions?
            <a
              :href="'https://wa.me/+918950899123?text=Hi,%20%I%20want%20to%20know%20more%20about%20M-Affiliate%20Program'"
              target="_blank"
              class="whatsapp-link"
              >WhatsApp us directly</a
            >
          </div>
        </div>

        <!-- Affiliate Form -->
        <form
          @submit.prevent="submitAffiliate"
          ref="formRef"
          class="affiliate-form"
        >
          <h2 class="affiliate-form__title">🚀 Join Now</h2>
          <p class="affiliate-form__subtitle">
            Earn from your network with zero investment!
          </p>

          <div class="affiliate-form__field">
            <label for="name">👤 Full Name</label>
            <input
              v-model="form.name"
              type="text"
              id="name"
              required
              placeholder="e.g. Aman Malhotra"
            />
          </div>

          <div class="affiliate-form__field">
            <label for="mobile">📱 Mobile Number</label>
            <input
              v-model="form.mobile"
              type="tel"
              id="mobile"
              required
              placeholder="10-digit mobile number"
              pattern="[0-9]{10,15}"
              title="Enter a valid mobile number (10 digits)"
            />
          </div>

          <div class="affiliate-form__field">
            <label for="email">✉️ Email (Optional)</label>
            <input
              v-model="form.email"
              type="email"
              id="email"
              placeholder="e.g. yourname@example.com"
            />
          </div>

          <button type="submit" :disabled="isSubmitting">
            <span v-if="isSubmitting">Processing...</span>
            <span v-else>Notify Me</span>
          </button>

          <p v-if="formSubmitted" class="success-msg">
            🎉 <strong>Success!</strong> We’ll notify you once our M-Affiliate
            program is launched.
          </p>
        </form>
      </div>
    </div>
  </section>
</template>
<script setup>
import { reactive, ref } from "vue";

const form = reactive({ name: "", mobile: "", email: "" });
const isSubmitting = ref(false);
const formSubmitted = ref(false);
const formRef = ref(null);

const submitAffiliate = async () => {
  isSubmitting.value = true;
  try {
    await new Promise((resolve) => setTimeout(resolve, 800));
    formSubmitted.value = true;
    Object.keys(form).forEach((key) => (form[key] = ""));
    setTimeout(() => (formSubmitted.value = false), 5000);
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style scoped>
.affiliate-section {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.affiliate-section__heading {
  font-size: 2.5rem;
  font-weight: bold;
  text-align: center;
  color: #059669;
  margin-bottom: 2rem;
}

.affiliate-section__content {
  display: grid;
  grid-template-rows: auto 1fr;
  gap: 2rem;
}

.affiliate-explanation {
  background: #f0fdf4;
  border: 1px solid #d1fae5;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.affiliate-explanation__title {
  font-size: 1.8rem;
  color: #059669;
  font-weight: bold;
  margin-bottom: 1rem;
}

.affiliate-explanation__text {
  font-size: 1rem;
  color: #374151;
  margin-bottom: 2rem;
  text-align: center;
}

.affiliate-steps {
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content: center;
}

.affiliate-step {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.affiliate-step__icon {
  width: 50px;
  height: 50px;
}

.affiliate-step__content {
  text-align: center;
  margin-top: 0.5rem;
}

.affiliate-step__title {
  font-size: 1.2rem;
  font-weight: bold;
  color: #374151;
}

.affiliate-step__description {
  font-size: 0.95rem;
  color: #6b7280;
}

.affiliate-step__arrow {
  font-size: 1.5rem;
  color: #059669;
  font-weight: bold;
}

.affiliate-info-and-form {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}
.affiliate-intro {
  background: #ecfdf5;
  border: 1px solid #d1fae5;
  padding: 2rem;
  border-radius: 1rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.affiliate-intro__title {
  font-size: 1.75rem;
  font-weight: bold;
  color: #047857;
  margin-bottom: 0.75rem;
  text-align: center;
}

.affiliate-intro__desc {
  font-size: 1rem;
  color: #374151;
  line-height: 1.6;
  text-align: center;
  max-width: 720px;
  margin: 0 auto 2rem;
}

/* Step-by-step flow */
.affiliate-steps {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem;
}

.step-box {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  padding: 1.5rem;
  border-radius: 1rem;
  width: 240px;
  text-align: center;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.05);
}

.step-box h3 {
  font-size: 1.2rem;
  margin: 0.75rem 0;
  color: #059669;
}

.step-box p {
  font-size: 0.95rem;
  color: #4b5563;
}

.step-icon {
  font-size: 2rem;
}

.arrow {
  font-size: 1.5rem;
  color: #6b7280;
}

.affiliate-info {
  background: #f0fdf4;
  border: 1px solid #d1fae5;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
}

.affiliate-info__title {
  font-size: 1.8rem;
  color: #059669;
  font-weight: bold;
  margin-bottom: 1rem;
}

.affiliate-info__list {
  list-style: none;
  padding: 0;
  margin: 0 0 1.5rem;
  font-size: 1rem;
  color: #065f46;
}

.affiliate-info__list li {
  margin: 0.5rem 0;
  line-height: 1.6;
}

.affiliate-note {
  font-size: 0.95rem;
  color: #374151;
}

.whatsapp-link {
  color: #10b981;
  text-decoration: underline;
  font-weight: bold;
}

.whatsapp-link:hover {
  color: #047857;
}

.affiliate-form {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
}

.affiliate-form__title {
  font-size: 1.8rem;
  color: #059669;
  font-weight: bold;
  margin-bottom: 1rem;
}

.affiliate-form__subtitle {
  font-size: 1rem;
  color: #6b7280;
  margin-bottom: 2rem;
}

.affiliate-form__field {
  margin-bottom: 1.5rem;
}

.affiliate-form__field label {
  display: block;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #374151;
}

.affiliate-form__field input {
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  background: #f9fafb;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.affiliate-form__field input:focus {
  outline: none;
  border-color: #10b981;
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.3);
}

.affiliate-form button[type="submit"] {
  background-color: #059669;
  color: white;
  font-size: 1rem;
  font-weight: 600;
  padding: 0.9rem;
  width: 100%;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.affiliate-form button[type="submit"]:hover:not(:disabled) {
  background-color: #047857;
  transform: translateY(-2px);
}

.success-msg {
  background-color: #d1fae5;
  color: #065f46;
  border-radius: 0.5rem;
  margin-top: 1.25rem;
  padding: 1rem;
  text-align: center;
}

@media (max-width: 768px) {
  .affiliate-section__content {
    grid-template-rows: auto;
  }

  .affiliate-info-and-form {
    grid-template-columns: 1fr;
  }

  .step-box {
    width: 100%;
    margin-bottom: 1rem;
  }

  .arrow {
    display: none;
  }
}
</style>
