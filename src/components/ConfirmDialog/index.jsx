import * as Dialog from '@radix-ui/react-dialog'

import styles from './styles.module.css'
import { Button } from '../Button'

export function ConfirmDialog({
  trigger,
  title,
  description,
  onConfirm,
  isLoading,
}) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className={styles.overlay} />
        <Dialog.Content className={styles.content}>
          <Dialog.Title className={styles.title}>{title}</Dialog.Title>

          {description && (
            <Dialog.Description className={styles.description}>
              {description}
            </Dialog.Description>
          )}

          <div className={styles.buttons}>
            <Button
              title="Confirmar"
              onClick={onConfirm}
              disabled={isLoading}
            />

            <Dialog.Close asChild>
              <Button title="Cancelar" variant="secondary" />
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
