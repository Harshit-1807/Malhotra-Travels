<template>
    <div class="testimonials">
      <div class="testimonials__container">
        <h2 class="testimonials__title">What Our Clients Say</h2>
        <div class="testimonials__grid">
          <div
            v-for="(testimonial, index) in testimonials"
            :key="index"
            class="testimonial-card"
          >
            <div class="testimonial-card__content">
              <p class="testimonial-card__text">"{{ testimonial.text }}"</p>
              <p class="testimonial-card__author">- {{ testimonial.name }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "TestimonialsSection",
    props: {
      testimonials: {
        type: Array,
        required: true,
      },
    },
  };
  </script>
  
  <style scoped>
  .testimonials {
    padding: 2rem;
    background-color: #fff;
  }
  
  .testimonials__container {
    max-width: 1200px;
    margin: 0 auto;
    text-align: center;
  }
  
  .testimonials__title {
    font-size: 2rem;
    font-weight: bold;
    color: #333;
    margin-bottom: 2rem;
  }
  
  .testimonials__grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
  }
  
  .testimonial-card {
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 1.5rem;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  
  .testimonial-card__content {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }
  
  .testimonial-card__text {
    font-size: 1rem;
    color: #666;
    margin-bottom: 1rem;
    flex-grow: 1;
  }

  .testimonial-card__author {
    font-size: 1rem;
    font-weight: bold;
    color: #333;
    text-align: right;
    margin-top: auto;
    align-self: flex-end;
  }
  </style>