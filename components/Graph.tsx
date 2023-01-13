'use client'

import React, { useContext } from 'react';
import { CreatePageContext } from "../lib/CreatePageContext"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { FormState } from '../lib/types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend:{
      display: false
    }
  },
  scales: {
    x:{
      type: 'linear',
      grid:{
        display: false
      },
      min: 1995,
    },
    y:{
      type: 'linear',
      grid:{
        display: false
      },
    }
  },
  cubicInterpolationMode: 'monotone',
  //tension: 0.4
};

export default function Graph() {
  const { userInput, updateUserInput } = useContext(CreatePageContext)

  userInput.sort((a: FormState, b: FormState) => a.xValue - b.yValue);

  const data = {
    datasets: [
      {
        data: userInput,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        parsing: {
          xAxisKey: 'year',
          yAxisKey: 'value'
        }
      },
    ],
  };
  // @ts-expect-error
  return <Line options={options} data={data} />;
}
