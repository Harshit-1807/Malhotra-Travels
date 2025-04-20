<template>
    <div class="about">
      <div class="about__container">
        <h2 class="about__title">Who We Are</h2>
        <div class="about__content">
          <p class="about__paragraph">
            Welcome to Malhotra Travels, your go-to travel partner based in
            Rohtak-Dadri-Bhiwani. We specialize in providing
            safe, affordable, and comfortable travel services for outstation
            trips, weddings, events, and soon, curated tour packages.
          </p>
          <p class="about__paragraph">
            Our well-maintained cars and experienced drivers
            ensure a smooth ride every time. Beyond rentals, we're building a
            community through our affiliate program, where you can earn by
            referring clients, and our car owner collaboration, where your idle
            car can generate income.
          </p>
          <p class="about__paragraph about__paragraph--bold">
            At Malhotra Travels, your journey matters. Let's travel together!
          </p>
        </div>

      <div class="initiatives">
        <h2 class="initiatives__title">Special Initiatives</h2>

        <div class="initiative-card">
          <div class="initiative-card__header">
            <h3 class="initiative-card__title">Medical Emergency Support</h3>
            <p class="initiative-card__subtitle">We're With You When It Matters Most</p>
          </div>
          <div class="initiative-card__content">
            <p>Need to travel urgently for a medical emergency? We understand how critical time and savings are during tough moments. That's why we offer:</p>
            <p class="initiative-card__highlight">✅ Flat 30% Additional Discount on all medical emergency bookings.</p>
            <p>Whether it's a hospital visit, surgery support, or emergency relocation, our team ensures fast dispatch, courteous service, and priority handling.</p>
            <p>Simply let us know at the time of booking and get the care you deserve.</p>
            <div class="initiative-card__actions">
              <a href="https://wa.me/919876543210?text=Medical%20Emergency%20Support%20Required" class="action-button action-button--whatsapp">
                <i class="fa-brands fa-whatsapp"></i> WhatsApp Us
              </a>
              <a href="tel:+919876543210" class="action-button action-button--call">
                <i class="fa-solid fa-phone"></i> Call Now
              </a>
            </div>
          </div>
        </div>

        <div class="initiative-card">
          <div class="initiative-card__header">
            <h3 class="initiative-card__title">One Booking = One Tree Planted</h3>
            <p class="initiative-card__subtitle">Travel Green with Us</p>
          </div>
          <div class="initiative-card__content">
            <div class="tree-counter">
              <div class="tree-counter__label">Trees Planted So Far:</div>
              <div class="tree-counter__value">1,245</div>
            </div>
            <p>Every time you book a ride with Malhotra Travels, you help build a greener future.</p>
            <ul class="initiative-card__list">
              <li>For every confirmed booking, we plant one tree in your name.</li>
              <li>You ride, we plant.</li>
              <li>Receive a digital certificate as proof of contribution.</li>
              <li>Track the positive impact you're creating with every journey.</li>
            </ul>
            <p>Together, we're building a better tomorrow, one trip at a time.</p>
            <p>Choose us not just for a smooth ride — but to leave the planet a little better.</p>
            <div class="initiative-card__actions">
              <a href="https://wa.me/919876543210?text=I'm%20interested%20in%20the%20tree%20planting%20initiative" class="action-button action-button--whatsapp">
                <i class="fa-brands fa-whatsapp"></i> Learn More on WhatsApp
              </a>
              <a href="tel:+919876543210" class="action-button action-button--call">
                <i class="fa-solid fa-phone"></i> Call for Details
              </a>
            </div>
          </div>
        </div>

        <div class="initiative-card">
          <div class="initiative-card__header">
            <h3 class="initiative-card__title">First Ride Surprise</h3>
            <p class="initiative-card__subtitle">Welcome Gift for New Customers!</p>
          </div>
          <div class="initiative-card__content">
            <p>New to Malhotra Travels? We've got a surprise for you.</p>
            <p class="initiative-card__highlight">Get a special welcome gift on your first ride!</p>
            <p>It could be:</p>
            <ul class="initiative-card__list">
              <li>A ₹100 fuel voucher</li>
              <li>Handy travel pouch</li>
              <li>Or a lucky entry into our "Win a Free Trip" draw</li>
            </ul>
            <p>Because your first journey with us should be unforgettable.</p>
            <p class="initiative-card__cta">Book now and unwrap your surprise!</p>
            <div class="initiative-card__actions">
              <a href="https://wa.me/919876543210?text=I'm%20interested%20in%20the%20First%20Ride%20Surprise" class="action-button action-button--whatsapp">
                <i class="fa-brands fa-whatsapp"></i> Book via WhatsApp
              </a>
              <a href="tel:+919876543210" class="action-button action-button--call">
                <i class="fa-solid fa-phone"></i> Call to Book
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </template>
  
  <script>
  export default {
    name: "AboutSection",
  };
  </script>
  
  <style scoped>
.about {
  padding: 2rem;
  background-color: #f9f9f9;
}

.about__container {
  max-width: 1000px;
  margin: 0 auto;
  text-align: center;
}

.about__title {
  font-size: 2.5rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 1.5rem;
}

.about__content {
  font-size: 1.1rem;
  color: #666;
  line-height: 1.6;
  margin-bottom: 3rem;
}

.about__paragraph {
  margin-bottom: 1rem;
}

.about__paragraph--bold {
  font-weight: bold;
  color: #444;
}

.initiatives {
  margin-top: 3rem;
}

.initiatives__title {
  font-size: 2.2rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 2rem;
  position: relative;
  display: inline-block;
}

.initiatives__title:after {
  content: "";
  display: block;
  width: 80px;
  height: 3px;
  background-color: #4caf50;
  margin: 0.5rem auto 0;
}

.initiative-card {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  margin-bottom: 2.5rem;
  text-align: left;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.initiative-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}

.initiative-card__header {
  border-bottom: 1px solid #eee;
  padding-bottom: 1rem;
  margin-bottom: 1.5rem;
}

.initiative-card__title {
  font-size: 1.8rem;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.initiative-card__subtitle {
  font-size: 1.2rem;
  color: #4caf50;
  font-style: italic;
}

.initiative-card__content {
  color: #555;
  line-height: 1.7;
  font-size: 1.05rem;
}

.initiative-card__content p {
  margin-bottom: 1rem;
}

.initiative-card__highlight {
  font-weight: bold;
  color: #4caf50;
  padding: 0.5rem;
  background-color: rgba(76, 175, 80, 0.1);
  border-radius: 5px;
  display: inline-block;
  margin: 0.5rem 0;
}

.initiative-card__list {
  list-style-type: none;
  padding-left: 1.5rem;
  margin: 1rem 0;
}

.initiative-card__list li {
  position: relative;
  padding-left: 1.5rem;
  margin-bottom: 0.5rem;
}

.initiative-card__list li:before {
  content: "✓";
  color: #4caf50;
  position: absolute;
  left: 0;
  font-weight: bold;
}

.initiative-card__cta {
  font-weight: bold;
  color: #2c3e50;
  margin-top: 1rem;
  font-size: 1.1rem;
}

.tree-counter {
  background-color: #f0f7f0;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1.5rem;
  text-align: center;
  border: 2px solid #4caf50;
  }

.tree-counter__label {
  font-size: 1.1rem;
  color: #333;
  margin-bottom: 0.5rem;
  font-weight: 600;
  }

.tree-counter__value {
  font-size: 2.5rem;
  font-weight: bold;
  color: #4caf50;
  background-color: rgba(255, 255, 255, 0.7);
  padding: 0.5rem 1rem;
  border-radius: 5px;
  display: inline-block;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  font-family: 'Courier New', monospace;
  }

.initiative-card__actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1.5rem;
  }
  .action-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  border-radius: 50px;
  font-weight: 600;
  font-size: 0.9rem;
  text-decoration: none;
  transition: all 0.2s ease;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }

.action-button i {
  margin-right: 0.4rem;
  font-size: 1rem;
  }

.action-button--whatsapp {
  background-color: #25D366;
  color: white;
  border: 1px solid #1da851;
  }

.action-button--whatsapp:hover {
  background-color: #1da851;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(37, 211, 102, 0.3);
  }

.action-button--call {
  background-color: #3498db;
  color: white;
  border: 1px solid #2980b9;
  }

.action-button--call:hover {
  background-color: #2980b9;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(52, 152, 219, 0.3);
  }

@media (max-width: 768px) {
  .about {
    padding: 1.5rem 1rem;
  }

  .about__title {
    font-size: 2rem;
  }

  .initiatives__title {
    font-size: 1.8rem;
  }

  .initiative-card {
    padding: 1.5rem;
}

  .initiative-card__title {
    font-size: 1.5rem;
  }

  .initiative-card__subtitle {
    font-size: 1.1rem;
  }

  .tree-counter__value {
    font-size: 2rem;
  }

  .initiative-card__actions {
    flex-wrap: wrap;
  }

  .action-button {
    padding: 0.4rem 0.9rem;
    font-size: 0.85rem;
  }
}

@media (max-width: 480px) {
  .about__title {
    font-size: 1.8rem;
  }

  .about__content {
    font-size: 1rem;
  }

  .initiatives__title {
    font-size: 1.6rem;
  }

  .initiative-card__title {
    font-size: 1.3rem;
  }

  .initiative-card__content {
    font-size: 1rem;
  }

  .tree-counter {
    padding: 0.8rem;
  }

  .tree-counter__label {
    font-size: 1rem;
  }

  .tree-counter__value {
    font-size: 1.8rem;
    padding: 0.3rem 0.8rem;
  }

  .action-button {
    padding: 0.35rem 0.8rem;
    font-size: 0.8rem;
  }

  .action-button i {
    font-size: 0.9rem;
  }
}
</style>
