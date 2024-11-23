import React from 'react';
import { Radar } from 'react-chartjs-2';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const RadarChart = ({ varki }) => {
  const data = {
    labels: ['V', 'A', 'R', 'K', 'I'],
    datasets: [
      {
        label: 'VARKI',
        data: [varki.v, varki.a, varki.r, varki.k, varki.i],
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        borderColor: 'black',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      r: {
        beginAtZero: true,
        ticks: {
          display: false,
        },
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
  };

  return (
    <div className="w-[200px] h-[200px]">
      <Radar data={data} options={options} />
    </div>
  );
};

export default RadarChart;
