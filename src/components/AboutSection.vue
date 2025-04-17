<!-- filepath: c:\Users\Rahul\Repos\Malhotra-Travels\src\components\AboutSection.vue -->
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
            Our well-maintained Ertiga (Petrol + CNG) and experienced drivers
            ensure a smooth ride every time. Beyond rentals, we're building a
            community through our affiliate program, where you can earn by
            referring clients, and our car owner collaboration, where your idle
            car can generate income.
          </p>
          <p class="about__paragraph about__paragraph--bold">
            At Malhotra Travels, your journey matters. Let's travel together!
          </p>
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
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

.about__title {
  font-size: 2rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 1rem;
}

.about__content {
  font-size: 1rem;
  color: #666;
  line-height: 1.6;
}

.about__paragraph {
  margin-bottom: 1rem;
}

.about__paragraph--bold {
  font-weight: bold;
  color: #444;
}  </style>