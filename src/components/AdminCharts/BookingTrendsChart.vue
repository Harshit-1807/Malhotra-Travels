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
const chartData = ref({ labels: [], datasets: [] });

// Track months for each label
const labelMonths = ref([]);

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: true }, // Enable legend to show "Bookings"
    bottomMonthLabel: {
      months: [], // Array of { month, startIndex, endIndex }
    },
  },
  layout: {
    padding: {
      bottom: 50,
    },
  },
  scales: {
    x: {
      grid: { display: false },
      ticks: {
        callback: (val, index) => {
          return chartData.value.labels[index];
        },
        autoSkip: false,
        maxRotation: 0,
        minRotation: 0,
        font: {
          size: 12,
        },
      },
    },
    y: {
      beginAtZero: true,
      ticks: {
        stepSize: 1,
      },
      grid: { drawBorder: false },
    },
  },
};

// Plugin to draw month names below x-axis for multiple months
const bottomMonthLabelPlugin = {
  id: "bottomMonthLabel",
  afterDraw(chart, args, options) {
    const { ctx, chartArea, scales } = chart;
    const { bottom } = chartArea;
    const xScale = scales.x;
    const monthGroups = options.months;

    if (!monthGroups || monthGroups.length === 0) return;

    ctx.save();
    ctx.font = "bold 13px sans-serif";
    ctx.fillStyle = "#666";
    ctx.textAlign = "center";

    monthGroups.forEach((group) => {
      const { month, startIndex, endIndex } = group;
      // Ensure indices are within bounds
      const startPos = xScale.getPixelForTick(startIndex);
      const endPos =
        endIndex === chart.data.labels.length - 1
          ? xScale.getPixelForTick(endIndex) +
            (xScale.getPixelForTick(endIndex) -
              xScale.getPixelForTick(endIndex - 1)) /
              2
          : xScale.getPixelForTick(endIndex);
      const middle = (startPos + endPos) / 2;
      ctx.fillText(month, middle, bottom + 40);
    });

    ctx.restore();
  },
};

ChartJS.register(bottomMonthLabelPlugin);

const getDateSuffix = (d) => {
  if (d > 3 && d < 21) return "th";
  switch (d % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};

const processData = (bookings, viewType) => {
  const grouped = {};
  const monthMap = []; // Store month for each key

  bookings.forEach((b) => {
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
        key = `${dateObj.getFullYear()}-${String(
          dateObj.getMonth() + 1
        ).padStart(2, "0")}`;
        break;
      default:
        key = dateObj.toISOString().split("T")[0];
    }

    grouped[key] = (grouped[key] || 0) + 1;
    monthMap.push({
      key,
      month: dateObj.toLocaleString("default", { month: "long" }),
    });
  });

  const sortedKeys = Object.keys(grouped).sort();
  let labels = [];

  switch (viewType) {
    case "daily":
      labels = sortedKeys.map((key) => {
        const date = new Date(key);
        const day = date.getDate();
        return `${day}${getDateSuffix(day)}`;
      });
      break;
    case "weekly":
      labels = sortedKeys.map((key) => {
        const startDate = new Date(key);
        const endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + 6);
        const startDay = startDate.getDate();
        const endDay = endDate.getDate();
        return `${startDay}-${endDay}`;
      });
      break;
    case "monthly":
      labels = sortedKeys.map((key) => {
        const date = new Date(key);
        return date.toLocaleString("default", { month: "long" });
      });
      break;
  }

  // Group months by consecutive labels
  const monthGroups = [];
  let currentMonth = null;
  let startIndex = 0;

  sortedKeys.forEach((key, index) => {
    const entry = monthMap.find((m) => m.key === key);
    const month = entry ? entry.month : "";

    if (month !== currentMonth) {
      if (currentMonth !== null) {
        monthGroups.push({
          month: currentMonth,
          startIndex,
          endIndex: index - 1,
        });
      }
      currentMonth = month;
      startIndex = index;
    }

    if (index === sortedKeys.length - 1) {
      monthGroups.push({
        month: currentMonth,
        startIndex,
        endIndex: index,
      });
    }
  });

  // For monthly view, skip the bottom label since months are already on the x-axis
  // For daily and weekly, ensure month names are shown
  chartOptions.plugins.bottomMonthLabel.months =
    viewType === "monthly" ? [] : monthGroups;

  // Update labelMonths for external reference if needed
  labelMonths.value = monthMap;

  return {
    labels,
    datasets: [
      {
        label: "Bookings",
        data: sortedKeys.map((k) => grouped[k]),
        backgroundColor: "#3498db",
        borderRadius: 4,
        barThickness: 20,
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
