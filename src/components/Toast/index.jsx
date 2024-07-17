import { useState } from 'react'
import * as ToastComponent from '@radix-ui/react-toast'

import styles from './styles.module.css'

export function Toast({ title, description, isError = false }) {
  const [open, setOpen] = useState(true)

  return (
    <ToastComponent.Provider swipeDirection="right">
      <ToastComponent.Root
        className={isError ? styles.toastError : styles.toast}
        open={open}
        onOpenChange={setOpen}
      >
        <ToastComponent.Title className={styles.title}>
          {title}
        </ToastComponent.Title>
        <ToastComponent.Description asChild>
          <p className={styles.description}>{description}</p>
        </ToastComponent.Description>
      </ToastComponent.Root>
      <ToastComponent.Viewport className={styles.viewPort} />
    </ToastComponent.Provider>
  )
}
