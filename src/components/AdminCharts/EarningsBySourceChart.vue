<template>
  <div class="earnings-source">
    <h2 class="earnings-source__title">Earnings by Source</h2>
    <div class="earnings-source__content">
      <div class="earnings-source__chart-wrapper">
        <Doughnut
          :data="chartData"
          :options="chartOptions"
          style="width: 100%; height: 100%"
        />
      </div>

      <div class="earnings-source__legend">
        <p>
          <span
            class="earnings-source__dot earnings-source__dot--direct"
          ></span>
          Direct {{ directPercentage }}%
        </p>
        <p>
          <span
            class="earnings-source__dot earnings-source__dot--affiliate"
          ></span>
          Affiliates {{ affiliatePercentage }}%
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { Doughnut } from "vue-chartjs";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from "chart.js";
import { fetchBookings } from "../../firebase/bookingService";

ChartJS.register(Title, Tooltip, Legend, ArcElement);

// Constants
const AFFILIATE_EARNINGS = 0;

const chartData = ref({
  labels: ["Direct", "Affiliates"],
  datasets: [
    {
      data: [0, 0],
      backgroundColor: ["#00cec9", "#0984e3"],
      borderWidth: 0,
    },
  ],
});

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
  },
};

const directPercentage = ref(0);
const affiliatePercentage = ref(0);

onMounted(async () => {
  const bookings = await fetchBookings();

  const directEarnings = bookings.reduce((sum, booking) => {
    const amount =
      parseFloat(booking.amount?.toString().replace(/[^\d.-]/g, "")) || 0;
    return sum + amount;
  }, 0);

  const total = directEarnings + AFFILIATE_EARNINGS;

  // Add hardcoded fallback for testing
  const finalDirect = directEarnings || 1000;
  const finalAffiliate = AFFILIATE_EARNINGS;

  chartData.value = {
    labels: ["Direct", "Affiliates"],
    datasets: [
      {
        data: [finalDirect, finalAffiliate],
        backgroundColor: ["#00cec9", "#0984e3"],
        borderWidth: 0,
      },
    ],
  };

  console.log("Chart data set to:", chartData.value);

  directPercentage.value = Math.round((finalDirect / (finalDirect + finalAffiliate)) * 100);
  affiliatePercentage.value = 100 - directPercentage.value;
});

</script>

<style scoped>
.earnings-source {
  background-color: #fff;
  border-radius: 8px;
  padding: 16px;
  height: 260px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}

.earnings-source__title {
  font-size: 15px;
  margin-bottom: 12px;
  color: #333;
}

.earnings-source__content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-grow: 1;
  gap: 20px;
}

.earnings-source__chart-wrapper {
  width: 140px;
  height: 140px;
  position: relative;
  min-width: 140px;
  min-height: 140px;
}


.earnings-source__chart {
  width: 60%;
  height: 180px;
}

.earnings-source__legend {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
}

.earnings-source__dot {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-right: 6px;
  vertical-align: middle;
}

.earnings-source__dot--direct {
  background-color: #00cec9;
}

.earnings-source__dot--affiliate {
  background-color: #0984e3;
}
</style>
