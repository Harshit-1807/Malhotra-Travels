<!-- filepath: c:\Users\Rahul\Repos\Malhotra-Travels\src\components\ContactSection.vue -->
<template>
    <section class="contact">
      <div class="contact__container">
        <h2 class="contact__title">Get in Touch</h2>
        <div class="contact__content">
          <p class="contact__paragraph">
            We're here to make your travel seamless. Reach out for bookings,
            partnerships, or queries!
          </p>
          <p class="contact__info">
            📞 Phone:
            <a href="tel:+918950899123" class="contact__link">+91-8950899123</a>
            |
            <a href="tel:+917015487899" class="contact__link">+91-7015487899</a>
          </p>
          <p class="contact__info">
            📍 Location: Kalanaur, Rohtak, Haryana
          </p>
          <a
            href="https://wa.me/+918950899123"
            target="_blank"
            class="contact__whatsapp-button"
          >
            WhatsApp Us
          </a>
          <p class="contact__social-title">Follow Us:</p>
          <div class="contact__social-links">
            <a href="#" class="contact__social-link">Instagram</a>
            <a href="#" class="contact__social-link">Facebook</a>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script>
  export default {
    name: "ContactSection",
  };
  </script>
  
  <style scoped>
  .contact {
    padding: 2rem;
    background-color: #f9f9f9;
  }
  
  .contact__container {
    max-width: 800px;
    margin: 0 auto;
    text-align: center;
  }
  
  .contact__title {
    font-size: 2rem;
    font-weight: bold;
    color: #333;
    margin-bottom: 1rem;
  }
  
  .contact__content {
    font-size: 1rem;
    color: #666;
    margin-bottom: 2rem;
  }
  
  .contact__paragraph {
    margin-bottom: 1rem;
  }
  
  .contact__info {
    font-size: 1rem;
    color: #444;
    margin-bottom: 1rem;
  }
  
  .contact__link {
    color: #007bff;
    text-decoration: none;
    font-weight: bold;
  }
  
  .contact__link:hover {
    text-decoration: underline;
  }
  
  .contact__whatsapp-button {
    display: inline-block;
    padding: 0.8rem 1.5rem;
    background-color: #25d366;
    color: white;
    border-radius: 5px;
    font-size: 1rem;
    font-weight: bold;
    text-decoration: none;
    transition: background-color 0.3s ease;
    margin-bottom: 1rem;
  }
  
  .contact__whatsapp-button:hover {
    background-color: #1da851;
  }
  
  .contact__social-title {
    font-size: 1.2rem;
    font-weight: bold;
    color: #333;
    margin-top: 1rem;
    margin-bottom: 0.5rem;
  }
  
  .contact__social-links {
    display: flex;
    justify-content: center;
    gap: 1rem;
  }
  
  .contact__social-link {
    color: #007bff;
    text-decoration: none;
    font-weight: bold;
  }
  
  .contact__social-link:hover {
    text-decoration: underline;
  }
  </style>