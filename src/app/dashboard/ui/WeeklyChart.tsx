'use client'

import { useEffect, useRef } from 'react'
import Chart from 'chart.js/auto'

export function WeeklyChart() {
  const chartRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!chartRef.current) return

    const chart = new Chart(chartRef.current, {
      type: 'bar',
      data: {
        labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
        datasets: [{
          data: [40, 35, 15, 40, 30, 45, 60],
          backgroundColor: '#2196F3',
          borderRadius: 4
        }]
      },
      options: {
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              display: false
            }
          },
          x: {
            grid: {
              display: false
            }
          }
        }
      }
    })

    return () => chart.destroy()
  }, [])

  return (
    <div className="bg-white rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Weekly Overview</h2>
        <p className="text-sm text-gray-500">Mar 14 - Mar 21</p>
      </div>
      <div className="flex gap-4 mb-4">
        <button className="text-blue-500 border-b-2 border-blue-500 pb-1">Revenue</button>
        <button className="text-gray-500">Appointments</button>
      </div>
      <canvas ref={chartRef} height="200"></canvas>
    </div>
  )
}

