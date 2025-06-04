<template>
  <div class="top-affiliates">
    <h2 class="top-affiliates__title">Top Affiliates</h2>
    <Bar
      v-if="chartData.labels.length"
      :data="chartData"
      :options="chartOptions"
      class="top-affiliates__chart"
    />
    <p v-else>Loading chart data...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { fetchTopAffiliatesByAmount } from "@/firebase/affiliateService";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

const chartData = ref({
  labels: [],
  datasets: [
    {
      label: "Total Earnings",
      data: [],
      backgroundColor: "#0984e3",
      borderRadius: 4,
      barPercentage: 0.5, // Makes bars thinner
      categoryPercentage: 0.6, // Spaces bars like in Booking Trends
    },
  ],
});

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
  },
  layout: {
    padding: {
      bottom: 20, // Add more padding to push labels up slightly
    },
  },
  scales: {
    x: {
      grid: { display: false },
      ticks: {
        callback: (val, index) => {
          const label = chartData.value.labels[index];
          return label.length > 8 ? label.substring(0, 8) + "..." : label;
        },
        autoSkip: false,
        maxRotation: 0,
        minRotation: 0,
        padding: 5, // Moves labels slightly upward
        font: {
          size: 12,
          style: "normal",
        },
      },
    },
    y: {
      beginAtZero: true,
      grid: { drawBorder: false },
      ticks: {
        stepSize: 1000,
        font: {
          size: 12,
        },
      },
    },
  },
};

onMounted(async () => {
  try {
    const { labels, values } = await fetchTopAffiliatesByAmount();
    chartData.value.labels = labels;
    chartData.value.datasets[0].data = values;
  } catch (error) {
    console.error(error.message);
  }
});
</script>

<style scoped>
.top-affiliates {
  background-color: #fff;
  border-radius: 8px;
  padding: 16px;
  height: 260px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}

.top-affiliates__title {
  font-size: 15px;
  margin-bottom: 12px;
  color: #333;
}

.top-affiliates__chart {
  height: 180px;
}
</style>
