import { VictoryPie } from 'victory'

import styles from './styles.module.css'

export function PieGraph({ data }) {
  console.log(data)
  return (
    <div className={styles.graphContainer}>
      <VictoryPie
        data={data}
        height={200}
        style={{
          data: {
            fill: (props) => {
              return props.slice.data.x === 'Entradas' ? 'green' : 'red'
            },
            stroke: '#000',
            strokeWidth: 1,
          },
          labels: {
            fontSize: 16,
          },
        }}
      />
    </div>
  )
}
