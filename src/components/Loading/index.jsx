import { DotLoader } from 'react-spinners'

export function Loading() {
  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <DotLoader color="#fff" />
    </div>
  )
}
