<template>
  <form
    @submit.prevent="submitBooking"
    class="max-w-lg mx-auto bg-white p-4 sm:p-6 rounded shadow w-full"
  >
    <div class="mb-4">
      <label for="name" class="block text-sm font-medium">Name</label>
      <input
        v-model="form.name"
        type="text"
        id="name"
        class="w-full border rounded px-3 py-2 text-sm sm:text-base"
        required
      />
    </div>
    <div class="mb-4">
      <label for="mobile" class="block text-sm font-medium"
        >Mobile Number</label
      >
      <input
        v-model="form.mobile"
        type="tel"
        id="mobile"
        class="w-full border rounded px-3 py-2 text-sm sm:text-base"
        required
      />
    </div>
    <div class="mb-4">
      <label for="pickup" class="block text-sm font-medium"
        >Pickup Location</label
      >
      <input
        v-model="form.pickup"
        type="text"
        id="pickup"
        class="w-full border rounded px-3 py-2 text-sm sm:text-base"
        required
      />
    </div>
    <div class="mb-4">
      <label for="drop" class="block text-sm font-medium">Drop Location</label>
      <input
        v-model="form.drop"
        type="text"
        id="drop"
        class="w-full border rounded px-3 py-2 text-sm sm:text-base"
        required
      />
    </div>
    <div class="mb-4">
      <label for="date" class="block text-sm font-medium"
        >Booking Date/Time</label
      >
      <input
        v-model="form.date"
        type="datetime-local"
        id="date"
        class="w-full border rounded px-3 py-2 text-sm sm:text-base"
        required
      />
    </div>
    <div class="mb-4">
      <label for="type" class="block text-sm font-medium">Booking Type</label>
      <select
        v-model="form.type"
        id="type"
        class="w-full border rounded px-3 py-2 text-sm sm:text-base"
        required
      >
        <option value="Outstation">Outstation</option>
        <option value="Wedding">Wedding</option>
        <option value="Tour">Tour</option>
      </select>
    </div>
    <div class="mb-4">
      <label for="notes" class="block text-sm font-medium"
        >Notes (Optional)</label
      >
      <textarea
        v-model="form.notes"
        id="notes"
        class="w-full border rounded px-3 py-2 text-sm sm:text-base"
      ></textarea>
    </div>
    <button
      type="submit"
      class="bg-blue-600 text-white px-4 sm:px-6 py-2 rounded hover:bg-blue-700 w-full text-sm sm:text-base"
    >
      Submit Booking Request
    </button>
  </form>
</template>

<script setup>
import { reactive } from "vue";

const form = reactive({
  name: "",
  mobile: "",
  pickup: "",
  drop: "",
  date: "",
  type: "Outstation",
  notes: "",
});

const submitBooking = () => {
  console.log("Booking Submitted:", form);
  alert("Booking request submitted! We’ll contact you soon.");
  Object.keys(form).forEach((key) => (form[key] = ""));
  form.type = "Outstation";
};
</script>
