<template>
  <form
    @submit.prevent="submitAffiliate"
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
      <label for="email" class="block text-sm font-medium"
        >Email (Optional)</label
      >
      <input
        v-model="form.email"
        type="email"
        id="email"
        class="w-full border rounded px-3 py-2 text-sm sm:text-base"
      />
    </div>
    <button
      type="submit"
      class="bg-green-600 text-white px-4 sm:px-6 py-2 rounded hover:bg-green-700 w-full text-sm sm:text-base"
    >
      Join as Affiliate
    </button>
  </form>
</template>

<script setup>
import { reactive } from "vue";

const form = reactive({
  name: "",
  mobile: "",
  email: "",
});

const submitAffiliate = () => {
  console.log("Affiliate Submitted:", form);
  alert("Affiliate request submitted! We’ll contact you soon.");
  Object.keys(form).forEach((key) => (form[key] = ""));
};
</script>
