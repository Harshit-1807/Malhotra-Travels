<template>
  <form @submit.prevent="submitFormLocal" class="max-w-lg mx-auto bg-white p-4 sm:p-6 rounded shadow w-full">
    <div class="mb-4">
      <label for="name" class="block text-sm font-medium">Name</label>
      <input v-model="form.name" type="text" id="name" class="w-full border rounded px-3 py-2 text-sm sm:text-base" required />
    </div>
    <div class="mb-4">
      <label for="pickupLocation" class="block text-sm font-medium">Pickup Location</label>
      <input v-model="form.pickupLocation" type="text" id="pickupLocation" class="w-full border rounded px-3 py-2 text-sm sm:text-base" required />
    </div>
    <div class="mb-4">
      <label for="dropLocation" class="block text-sm font-medium">Drop Location</label>
      <input v-model="form.dropLocation" type="text" id="dropLocation" class="w-full border rounded px-3 py-2 text-sm sm:text-base" required />
    </div>
    <div class="mb-4">
      <label for="date" class="block text-sm font-medium">Date</label>
      <input v-model="form.date" type="date" id="date" class="w-full border rounded px-3 py-2 text-sm sm:text-base" required />
    </div>
    <button type="submit" class="bg-blue-600 text-white px-4 sm:px-6 py-2 rounded hover:bg-blue-700 w-full text-sm sm:text-base">Book Now</button>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { submitForm } from '../utils/formHandler'

const form = ref({
  name: '',
  pickupLocation: '',
  dropLocation: '',
  date: '',
})

const submitFormLocal = async () => {
  try {
    await submitForm('bookings', form.value)
    alert('Booking submitted successfully!')
    form.value = { name: '', pickupLocation: '', dropLocation: '', date: '' }
  } catch (error) {
    alert('Error submitting booking. Please try again.')
  }
}
</script>