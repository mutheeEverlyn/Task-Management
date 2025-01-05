import React, { useEffect, useState } from 'react';
import { useGetTasksQuery, TTasks } from '../features/Tasks/TasksApi';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { format, startOfWeek, parseISO } from 'date-fns';

// Register the Chart.js components
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface MyTasksChartProps {
  user_id: number;
}

const MyTasksChart: React.FC<MyTasksChartProps> = ({ user_id }) => {
  const { data: Tasks, error, isLoading, isError } = useGetTasksQuery();
  const [chartData, setChartData] = useState<any>(null);

  useEffect(() => {
    if (Tasks) {
      // Filter Tasks by user_id and aggregate by week
      const userTasks = Tasks.filter((task: TTasks) => task.user_id === user_id);
      const weeklyTasks: { [weekStart: string]: number } = {};

      userTasks.forEach((task: TTasks) => {
        const taskDate = parseISO(task.created_at);
        const weekStart = format(startOfWeek(taskDate, { weekStartsOn: 1 }), 'yyyy-MM-dd');

        if (!weeklyTasks[weekStart]) {
          weeklyTasks[weekStart] = 0;
        }

      });

      // Prepare chart data
      const labels = Object.keys(weeklyTasks);
      const data = Object.values(weeklyTasks);

      const chartData = {
        labels: labels,
        datasets: [
          {
            label: 'Tasks',
            data: data,
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      };

      setChartData(chartData);
    }
  }, [Tasks, user_id]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error?.data?.message || 'An error occurred'}</div>;

  return (
    <div className="chart-container">
      <h2>task Summary</h2>
      {chartData ? <Bar data={chartData} options={{ responsive: true, scales: { y: { beginAtZero: true } } }} /> : <div>No data available</div>}
    </div>
  );
};

export default MyTasksChart;
