<template>
  <div>
    <form @submit.prevent="submitFormLocal" class="max-w-lg mx-auto bg-white p-4 sm:p-6 rounded shadow w-full">
      <div class="mb-4">
        <label for="name" class="block text-sm font-medium">Name</label>
        <input v-model="form.name" type="text" id="name" class="w-full border rounded px-3 py-2 text-sm sm:text-base" required />
      </div>
      <div class="mb-4">
        <label for="email" class="block text-sm font-medium">Email</label>
        <input v-model="form.email" type="email" id="email" class="w-full border rounded px-3 py-2 text-sm sm:text-base" required />
      </div>
      <button type="submit" class="bg-green-600 text-white px-4 sm:px-6 py-2 rounded hover:bg-green-700 w-full text-sm sm:text-base">Become an Affiliate</button>
    </form>
    <div v-if="referralLink" class="mt-4 text-center">
      <p class="text-sm sm:text-base font-semibold">Your Unique Referral Link:</p>
      <p class="text-blue-600 break-all">{{ referralLink }}</p>
      <button @click="copyLink" class="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm sm:text-base">Copy Link</button>
    </div>
    <div v-if="errorMessage" class="mt-4 text-center text-red-600 text-sm sm:text-base">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { submitForm } from '../utils/formHandler'

const form = ref({
  name: '',
  email: '',
})

const referralLink = ref('')
const errorMessage = ref('')
const submitFormLocal = async () => {
  try {
    const result = await submitForm('affiliates', form.value)
    if (result.success) {
      if (result.existing) {
        referralLink.value = `https://malhotratravels.com/refer?code=${result.id}`
        errorMessage.value = 'You already have a referral link. It has been retrieved for you.'
      } else {
        referralLink.value = `https://malhotratravels.com/refer?code=${result.id}`
        errorMessage.value = ''
      }
      console.log('Generated referral link:', referralLink.value)
      alert('Affiliate application processed successfully!')
    }
    form.value = { name: '', email: '' }
  } catch (error) {
    console.error('Submission error:', error)
    errorMessage.value = 'Error processing your request. Please try again.'
    alert('Error submitting affiliate application. Please try again.')
  }
}

const copyLink = () => {
  navigator.clipboard.writeText(referralLink.value)
  alert('Referral link copied to clipboard!')
}
</script>