<template>
  <form @submit.prevent="submitFormLocal" class="max-w-lg mx-auto bg-white p-4 sm:p-6 rounded shadow w-full">
    <div class="mb-4">
      <label for="name" class="block text-sm font-medium">Name</label>
      <input v-model="form.name" type="text" id="name" class="w-full border rounded px-3 py-2 text-sm sm:text-base" required />
    </div>
    <div class="mb-4">
      <label for="carType" class="block text-sm font-medium">Car Type & Model</label>
      <input v-model="form.carType" type="text" id="carType" class="w-full border rounded px-3 py-2 text-sm sm:text-base" required />
    </div>
    <div class="mb-4">
      <label for="carNumber" class="block text-sm font-medium">Car Number</label>
      <input v-model="form.carNumber" type="text" id="carNumber" class="w-full border rounded px-3 py-2 text-sm sm:text-base" required />
    </div>
    <div class="mb-4">
      <label for="location" class="block text-sm font-medium">Location</label>
      <input v-model="form.location" type="text" id="location" class="w-full border rounded px-3 py-2 text-sm sm:text-base" required />
    </div>
    <div class="mb-4">
      <label for="mobile" class="block text-sm font-medium">Mobile Number</label>
      <input v-model="form.mobile" type="tel" id="mobile" class="w-full border rounded px-3 py-2 text-sm sm:text-base" required />
    </div>
    <div class="mb-4">
      <label for="availability" class="block text-sm font-medium">Availability</label>
      <select v-model="form.availability" id="availability" class="w-full border rounded px-3 py-2 text-sm sm:text-base" required>
        <option value="Weekdays">Weekdays</option>
        <option value="Weekends">Weekends</option>
        <option value="Both">Both</option>
      </select>
    </div>
    <button type="submit" class="bg-yellow-600 text-white px-4 sm:px-6 py-2 rounded hover:bg-yellow-700 w-full text-sm sm:text-base">Submit Your Car Details</button>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { submitForm } from '../utils/formHandler'

const form = ref({
  name: '',
  carType: '',
  carNumber: '',
  location: '',
  mobile: '',
  availability: 'Weekdays',
})

const submitFormLocal = async () => {
  try {
    await submitForm('carOwners', form.value)
    alert('Car details submitted successfully!')
    form.value = { name: '', carType: '', carNumber: '', location: '', mobile: '', availability: 'Weekdays' }
  } catch (error) {
    alert('Error submitting car details. Please try again.')
  }
}
</script>