import { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import { axiosInstance } from "../../lib/axios";
import { API_ENDPOINTS } from "../../services/api";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

interface SummaryData {
  summary_data: { [key: string]: number };
  feedback_count: number;
  model: string;
}

export default function ViewDashboard({ slug }: { slug: string }) {
  const [data, setData] = useState<SummaryData | null>(null);

  useEffect(() => {
    axiosInstance
      .get(API_ENDPOINTS.forms.saveSummary(slug))
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
  }, [slug]);

  if (!data) return <div>Loading...</div>;

  const chartData = {
    labels: Object.keys(data.summary_data),
    datasets: [
      {
        label: "Feedback Summary",
        data: Object.values(data.summary_data),
        backgroundColor: ["#4ade80", "#facc15", "#f87171", "#60a5fa"],
      },
    ],
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Feedback Dashboard</h2>
      <div className="grid grid-cols-2 gap-6">
        <div>
          <Bar data={chartData} />
        </div>
        <div>
          <Pie data={chartData} />
        </div>
      </div>
      <p className="mt-4">Total Feedbacks: {data.feedback_count}</p>
      <p>Model used: {data.model}</p>
    </div>
  );
}
