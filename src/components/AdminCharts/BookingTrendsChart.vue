```vue
<template>
  <div class="booking-trends">
    <div class="booking-trends__header">
      <h2 class="booking-trends__title">Booking Trends</h2>
      <div class="booking-trends__controls">
        <select class="booking-trends__select" v-model="selectedMonthYear" :disabled="selectedView === 'monthly'">
          <option value="" disabled>Select Month & Year</option>
          <option v-for="monthYear in availableMonthYears" :key="monthYear.value" :value="monthYear.value">
            {{ monthYear.label }}
          </option>
        </select>
        <select class="booking-trends__select" v-model="selectedView">
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>
    </div>

    <Bar
      :data="chartData"
      :options="chartOptions"
      class="booking-trends__chart"
    />
  </div>
</template>

<script setup>
import { ref, watch, onMounted, computed } from "vue";
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
import { fetchBookings } from "@/firebase/bookingService";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

const selectedView = ref("daily");
const selectedMonthYear = ref("");
const chartData = ref({ labels: [], datasets: [] });
const bookingsData = ref([]);

// Compute available month-year combinations
const availableMonthYears = computed(() => {
  const months = new Set();
  bookingsData.value.forEach((b) => {
    const date = b.date?.toDate ? b.date.toDate() : new Date(b.date);
    const yearMonth = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
    months.add(yearMonth);
  });
  return Array.from(months)
    .sort()
    .map((yearMonth) => {
      const [year, month] = yearMonth.split("-").map(Number);
      const date = new Date(year, month - 1);
      return {
        value: yearMonth,
        label: `${date.toLocaleString("default", { month: "long" })} ${year}`,
      };
    });
});

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: true },
  },
  scales: {
    x: {
      grid: { display: false },
      ticks: {
        callback: (val, index) => chartData.value.labels[index],
        autoSkip: true,
        maxTicksLimit: 10,
        maxRotation: 0,
        minRotation: 0,
        font: { size: 12 },
        padding: 5,
      },
    },
    y: {
      beginAtZero: true,
      ticks: { stepSize: 1 },
      grid: { drawBorder: false },
    },
  },
  layout: {
    padding: {
      left: 10,
      right: 10,
      bottom: 20,
    },
  },
};

const processData = (bookings, viewType, selectedMonthYear) => {
  let filteredBookings = bookings;

  // Filter by selected month-year for daily and weekly views
  if (viewType !== "monthly" && selectedMonthYear) {
    const [year, month] = selectedMonthYear.split("-").map(Number);
    filteredBookings = bookings.filter((b) => {
      const date = b.date?.toDate ? b.date.toDate() : new Date(b.date);
      return date.getFullYear() === year && date.getMonth() + 1 === month;
    });
  }

  const grouped = {};
  const labels = [];

  filteredBookings.forEach((b) => {
    const dateObj = b.date?.toDate ? b.date.toDate() : new Date(b.date);
    let key;

    switch (viewType) {
      case "weekly": {
        const weekStart = new Date(dateObj);
        weekStart.setDate(dateObj.getDate() - weekStart.getDay());
        key = weekStart.toISOString().split("T")[0];
        break;
      }
      case "monthly":
        key = `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, "0")}`;
        break;
      default:
        key = dateObj.toISOString().split("T")[0];
    }

    grouped[key] = (grouped[key] || 0) + 1;
  });

  const sortedKeys = Object.keys(grouped).sort();

  switch (viewType) {
    case "daily":
      labels.push(...sortedKeys.map((key) => {
        const date = new Date(key);
        return date.getDate().toString();
      }));
      break;
    case "weekly":
      labels.push(...sortedKeys.map((key) => {
        const startDate = new Date(key);
        const endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + 6);
        const startDay = startDate.getDate();
        const endDay = endDate.getDate();
        return `${startDay}-${endDay}`;
      }));
      break;
    case "monthly":
      labels.push(...sortedKeys.map((key) => {
        const date = new Date(key);
        return date.toLocaleString("default", { month: "short" });
      }));
      break;
  }

  // Adjust bar width based on number of data points
  const dataPointCount = sortedKeys.length;
  const barPercentage = dataPointCount === 1 ? 0.2 : 0.5; // Thinner bar for single data point
  const categoryPercentage = dataPointCount === 1 ? 0.3 : 0.6; // Less spacing for single data point

  return {
    labels,
    datasets: [
      {
        label: "Bookings",
        data: sortedKeys.map((k) => grouped[k]),
        backgroundColor: "#0984e3",
        borderRadius: 4,
        barPercentage, // Dynamic bar width
        categoryPercentage, // Dynamic spacing
      },
    ],
  };
};

const loadChartData = async () => {
  if (!bookingsData.value.length) {
    bookingsData.value = await fetchBookings();
    // Set default month-year to the most recent
    if (availableMonthYears.value.length) {
      selectedMonthYear.value = availableMonthYears.value[availableMonthYears.value.length - 1].value;
    }
  }
  chartData.value = processData(bookingsData.value, selectedView.value, selectedMonthYear.value);
};

onMounted(loadChartData);
watch([selectedView, selectedMonthYear], loadChartData);
</script>

<style scoped>
.booking-trends {
  background-color: #fff;
  border-radius: 8px;
  padding: 16px;
  height: 260px; /* Match Top Affiliates container height */
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}

.booking-trends__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
  flex-wrap: wrap;
  gap: 8px;
}

.booking-trends__title {
  font-size: 15px;
  margin-bottom: 12px;
  color: #333;
}


.booking-trends__controls {
  display: flex;
  gap: 8px;
  align-items: center;
}

.booking-trends__select {
  font-size: 13px;
  padding: 6px 12px;
  border-radius: 4px;
  border: 1px solid #e0e0e0;
  background-color: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  min-width: 100px;
  appearance: none;
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24"><path fill="%23333" d="M7 10l5 5 5-5z"/></svg>');
  background-repeat: no-repeat;
  background-position: right 8px center;
  background-size: 12px;
}

.booking-trends__select:focus {
  outline: none;
  border-color: #0984e3;
}

.booking-trends__chart {
  flex-grow: 1;
  min-height: 180px;
  max-height: 300px;
}

@media (max-width: 480px) {
  .booking-trends__header {
    flex-direction: column;
    align-items: flex-start;
  }

  .booking-trends__controls {
    width: 100%;
    flex-direction: column;
    align-items: stretch;
  }

  .booking-trends__select {
    width: 100%;
  }

  /* Add this: Increase chart height on mobile */
  .booking-trends__chart {
    height: 180px; /* or more if needed */
  }

  /* Optional: reduce overall container height to prevent overflow */
  .booking-trends {
    height: auto;
  }
}

</style>