import { useState, useEffect, useRef } from 'react'
import { Toast } from '@components/Toast'

export const useToast = () => {
  const [toasts, setToasts] = useState([])
  const timerRef = useRef(0)

  const showToast = (title, description, isError = false) => {
    const newToast = { id: Date.now(), title, description, isError }
    setToasts((prevToasts) => [...prevToasts, newToast])

    clearTimeout(timerRef.current)
    timerRef.current = window.setTimeout(() => {
      closeToast(newToast.id)
    }, 5000)
  }

  const closeToast = (id) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id))
  }

  useEffect(() => {
    return () => clearTimeout(timerRef.current)
  }, [])

  const ToastComponents = toasts.map((toast) => (
    <Toast
      key={toast.id}
      title={toast.title}
      description={toast.description}
      isError={toast.isError}
    />
  ))

  return { showToast, ToastComponents }
}
