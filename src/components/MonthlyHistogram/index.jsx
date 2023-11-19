import { useState, useEffect } from 'react'
import {
  VictoryChart,
  VictoryBar,
  VictoryAxis,
  VictoryZoomContainer,
} from 'victory'

import styles from './styles.module.css'

export function MonthlyHistogram({ data, color = 'green' }) {
  const [zoomDomain, setZoomDomain] = useState({
    x: [0, Math.min(6, data.length)],
  })

  useEffect(() => {
    // Update the zoom domain when the data changes
    setZoomDomain({ x: [0, Math.min(6, data.length)] })
  }, [data])

  // Process the data to group values by month
  const groupedData = data.reduce((acc, entry) => {
    const [year, month, day] = entry.date.split('-')
    const monthYear = `${month}-${year}`
    acc[monthYear] = acc[monthYear] || 0
    acc[monthYear] += entry.value
    return acc
  }, {})

  // Convert grouped data to an array of objects
  const chartData = Object.keys(groupedData).map((monthYear) => ({
    monthYear,
    value: groupedData[monthYear],
  }))

  console.log(chartData)

  return (
    <div className={styles.graphContainer}>
      <VictoryChart
        domainPadding={{ x: 20, y: 10 }} // Added padding to the right side
        width={600}
        height={300}
        containerComponent={
          <VictoryZoomContainer
            zoomDimension="x"
            zoomDomain={zoomDomain}
            onZoomDomainChange={(domain) => setZoomDomain({ x: domain.x })}
            allowZoom={false}
          />
        }
        domain={{ x: zoomDomain.x }}
      >
        <VictoryAxis
          tickFormat={(t) => t} // Display both month and year
        />
        <VictoryAxis dependentAxis />
        <VictoryBar
          data={chartData}
          x="monthYear"
          y="value"
          style={{
            data: { fill: color },
            labels: { fontSize: 10, padding: 5 },
          }}
          barWidth={20} // Adjust the bar width as needed
        />
      </VictoryChart>
    </div>
  )
}
