<template>
  <div class="floating-buttons">
    <!-- WhatsApp Button -->
    <a
      href="https://wa.me/918950899123?text=Hello!%20I%E2%80%99m%20interested%20in%20booking%20a%20car"
      target="_blank"
      rel="noopener"
      class="contact-btn whatsapp"
      aria-label="Chat on WhatsApp"
    >
      <img src="/images/whatsapp-icon.webp" alt="WhatsApp" />
    </a>

    <!-- Phone Call Button -->
    <a href="tel:8950899123" class="contact-btn phone" aria-label="Call us">
      <img src="/images/call-icon.webp" alt="Phone" />
    </a>
  </div>
</template>

<style scoped>
.floating-buttons {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.contact-btn {
  width: 65px;
  height: 65px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.contact-btn:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
}

.contact-btn img {
  width: 40px;
  height: 40px;
}

.whatsapp {
  background-color: #52e874;
  border: 2px solid #52e874;
}

.phone {
  background-color: #1e90ff;
  border: 2px solid #1e90ff;
}

@media (max-width: 768px) {
  .floating-buttons {
    bottom: 20px;
    right: 20px;
  }

  .contact-btn {
    width: 50px;
    height: 50px;
  }

  .contact-btn img {
    width: 35px;
    height: 35px;
  }
}

@media (max-width: 480px) {
  .floating-buttons {
    bottom: 15px;
    right: 15px;
  }

  .contact-btn {
    width: 50px;
    height: 50px;
  }

  .contact-btn img {
    width: 35px;
    height: 35px;
  }
}
</style>
