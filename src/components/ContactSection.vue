<!-- filepath: c:\Users\Rahul\Repos\Malhotra-Travels\src\components\ContactSection.vue -->
<template>
  <section class="contact">
    <div class="contact__container">
      <h2 class="contact__title">Get In Touch</h2>
      <div class="contact__content">
        <p class="contact__paragraph">
          We're here to make your travel seamless. Reach out for bookings,
          partnerships, or queries!
        </p>
        <p class="contact__info">
          📞 Phone:
          <a href="tel:+917404207896" class="contact__link">7404207896</a>
          |
          <a href="tel:+917015487899" class="contact__link">7015487899</a>
        </p>
        <p class="contact__info">
          📧 Email:
          <a href="mailto:info@malhotratravel.com" class="contact__link">info@malhotratravel.com</a>
          |
          <a href="mailto:rahul@malhotratravel.com" class="contact__link">rahul@malhotratravel.com</a>
        </p>
        <p class="contact__info">📍 Location: Kalanaur, Rohtak, Haryana</p>
        <a
          href="https://wa.me/+918950899123?text=Hi"
          target="_blank"
          rel="noopener noreferrer"
          class="contact__whatsapp-button"
        >
          WhatsApp Us
        </a>
        <p class="contact__social-title">Follow Us:</p>
        <div class="contact__social-links">
          <a
            :href="instagramLink"
            :target="isMobile ? '_self' : '_blank'"
            rel="noopener noreferrer"
            class="contact__social-link contact__social-link--instagram"
          >
            <svg class="social-icon" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
              />
            </svg>
            Instagram
          </a>
          <a
            :href="facebookLink"
            :target="isMobile ? '_self' : '_blank'"
            rel="noopener noreferrer"
            class="contact__social-link contact__social-link--facebook"
          >
            <svg class="social-icon" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
              />
            </svg>
            Facebook
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "ContactSection",
  data() {
    return {
      isMobile: false,
    };
  },
  computed: {
    instagramLink() {
      return this.isMobile
        ? "instagram://user?username=malhotra__travel"
        : "https://www.instagram.com/malhotra__travel/";
    },
    facebookLink() {
      return this.isMobile
        ? "fb://profile/61576055834880"
        : "https://www.facebook.com/profile.php?id=61576055834880";
    },
  },
  mounted() {
    this.checkDevice();
    window.addEventListener("resize", this.checkDevice);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.checkDevice);
  },
  methods: {
    checkDevice() {
      this.isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    },
  },
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
  transition: color 0.3s ease;
}

.contact__link:hover {
  color: #0056b3;
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

.contact__social-link--instagram {
  background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
  color: white;
}

.contact__social-link--facebook {
  background-color: #1877f2;
  color: white;
}

.contact__social-link--instagram:hover {
  background: linear-gradient(45deg, #e78b2c 0%, #d85f36 25%, #cc233c 50%, #bb1f5d 75%, #a9157a 100%);
}

.contact__social-link--facebook:hover {
  background-color: #0d6cf2;
}

.social-icon {
  width: 24px;
  height: 24px;
  margin-right: 8px;
  vertical-align: middle;
  transition: transform 0.3s ease;
}

.contact__social-links {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
}

.contact__social-link {
  display: flex;
  align-items: center;
  padding: 8px 16px;
  border-radius: 6px;
  transition: all 0.3s ease;
  text-decoration: none;
  min-width: 140px;
  justify-content: center;
}

@media (max-width: 768px) {
  .contact__container {
    padding: 0 1rem;
  }

  .contact__title {
    font-size: 1.75rem;
  }

  .contact__info {
    font-size: 0.9rem;
  }

  .contact__social-links {
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
  }

  .contact__social-link {
    width: 100%;
    max-width: 200px;
    justify-content: center;
  }

  .contact__whatsapp-button {
    padding: 0.7rem 1.2rem;
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .contact {
    padding: 1.5rem;
  }

  .contact__title {
    font-size: 1.5rem;
  }

  .contact__paragraph {
    font-size: 0.9rem;
  }
}
</style>