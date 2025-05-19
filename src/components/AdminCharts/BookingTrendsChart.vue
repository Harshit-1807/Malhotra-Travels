<template>
  <div class="booking-trends">
    <div class="booking-trends__header">
      <h2 class="booking-trends__title">Booking Trends</h2>
      <select class="booking-trends__select" v-model="selectedView">
        <option value="daily">Daily</option>
        <option value="weekly">Weekly</option>
        <option value="monthly">Monthly</option>
      </select>
    </div>

    <Bar
      :data="chartData"
      :options="chartOptions"
      class="booking-trends__chart"
    />
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
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
import { fetchBookings } from "../../firebase/bookingService";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

const selectedView = ref("daily");
const chartData = ref({
  labels: [],
  datasets: [],
});

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
  },
  scales: {
    x: {
      title: { display: false },
      grid: { display: false },
    },
    y: {
      title: { display: false },
      beginAtZero: true,
      ticks: { stepSize: 1 },
      grid: { drawBorder: false },
    },
  },
};

const processData = (bookings, viewType) => {
  const grouped = {};

  bookings.forEach((b) => {
    const dateObj = b.date?.toDate ? b.date.toDate() : new Date(b.date);
    let key;

    switch (viewType) {
      case "weekly": {
        const weekStart = new Date(dateObj);
        weekStart.setDate(dateObj.getDate() - dateObj.getDay());
        key = weekStart.toISOString().split("T")[0];
        break;
      }
      case "monthly":
        key = `${dateObj.getFullYear()}-${String(
          dateObj.getMonth() + 1
        ).padStart(2, "0")}`;
        break;
      default:
        key = dateObj.toISOString().split("T")[0];
    }

    grouped[key] = (grouped[key] || 0) + 1;
  });

  const sortedKeys = Object.keys(grouped).sort();

  return {
    labels: sortedKeys,
    datasets: [
      {
        label: "Bookings",
        data: sortedKeys.map((k) => grouped[k]),
        backgroundColor: "#3498db",
        borderRadius: 4,
        barThickness: 18,
      },
    ],
  };
};

const loadChartData = async () => {
  const bookings = await fetchBookings();
  chartData.value = processData(bookings, selectedView.value);
};

onMounted(loadChartData);
watch(selectedView, loadChartData);
</script>

<style scoped>
.booking-trends {
  background-color: #fff;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  height: 260px;
  min-width: 280px;
}

.booking-trends__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.booking-trends__title {
  font-size: 15px;
  margin: 0;
  color: #333;
}

.booking-trends__select {
  font-size: 13px;
  padding: 4px 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.booking-trends__chart {
  flex-grow: 1;
}
</style>
