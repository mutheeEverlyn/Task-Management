import React, { useEffect, useState } from 'react';
import { useGetTasksQuery, TTasks } from '../features/Tasks/TasksApi';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { format, startOfWeek, parseISO } from 'date-fns';

// Register the Chart.js components
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const TasksSummary: React.FC = () => {
  const { data: tasks, isLoading, isError } = useGetTasksQuery();
  const [chartData, setChartData] = useState<any>(null);

  useEffect(() => {
    if (tasks) {
      // Aggregate tasks by week
      const weeklyTasks: { [weekStart: string]: number } = {};

      tasks.forEach((booking: TTasks) => {
        const taskDate = parseISO(booking.created_at);
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
            label: 'Task',
            data: data,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      };

      setChartData(chartData);
    }
  }, [tasks]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading tasks</div>;
  }

  return (
    <div className="chart-container">
      <h2 className="text-xl mb-4">Tasks Summary</h2>
      {chartData ? <Bar data={chartData} /> : <div>No data available</div>}
    </div>
  );
};

export default TasksSummary;
