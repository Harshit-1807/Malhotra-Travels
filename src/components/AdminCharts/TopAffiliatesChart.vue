<template>
  <div class="top-affiliates">
    <h2 class="top-affiliates__title">Top Affiliates</h2>
    <Line
      :data="chartData"
      :options="chartOptions"
      class="top-affiliates__chart"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { Line } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale
);

// Static example (replace with actual affiliate earnings over time)
const chartData = ref({
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [
    {
      label: "Affiliate Earnings",
      data: [4000, 5000, 4200, 5100, 6000, 5500, 6300],
      fill: false,
      borderColor: "#0984e3",
      tension: 0.4,
    },
  ],
});

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
  },
  scales: {
    x: {
      grid: { display: false },
    },
    y: {
      beginAtZero: true,
      grid: { drawBorder: false },
    },
  },
};

onMounted(() => {
  // You could fetch dynamic affiliate earnings here
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
