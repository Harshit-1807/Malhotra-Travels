

// TermsAndConditions.vue
<template>
  <div class="container">
    <h1>Terms and Conditions</h1>
    <p>
      Welcome to Malhotra Travel. By using our services, you agree to the following terms
      and conditions. Please read them carefully.
    </p>

    <h2>Booking & Payment</h2>
    <ul>
      <li>All bookings must be made in advance via our website or whatsapp.</li>
      <li>10% advance payment must be completed before the car is dispatched.</li>
      <li>We reserve the right to cancel bookings in case of non-payment or incorrect details.</li>
    </ul>

    <h2>Cancellation & Refunds</h2>
    <ul>
      <li>Cancellations made at least 12 hours in advance are eligible for a full refund.</li>
      <li>No refunds for last-minute cancellations unless due to exceptional circumstances.</li>
    </ul>

    <h2>Customer Responsibilities</h2>
    <ul>
      <li>Customers must carry a valid ID(Aadhar card, Pan card etc).</li>
      <li>Any damage to the car during travel must be reported immediately.</li>
    </ul>

    <h2>Disclaimer</h2>
    <p>
      We do our best to provide timely and reliable services. However, delays due to traffic or
      unforeseen events are not our responsibility.
    </p>

    <h2>Contact</h2>
    <p>
      For any disputes or clarifications, contact us at info@malhotratravel.com
    </p>
  </div>
</template>

<style scoped>
.container {
  max-width: 800px;
  margin: auto;
  padding: 1rem;
  font-family: 'Arial', sans-serif;
  line-height: 1.6;
}

h1, h2 {
  color: #1f2937;
}

ul {
  list-style-type: disc;
  padding-left: 1.5rem;
}

@media (max-width: 600px) {
  .container {
    padding: 0.8rem;
  }
}
</style>
