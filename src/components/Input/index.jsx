import InputMask from 'react-input-mask'

import styles from './styles.module.css'

export function Input({ label, icon, errors, ...rest }) {
  return (
    <label className={styles.container}>
      {label}
      <div>
        <InputMask {...rest} style={errors && { borderColor: 'red' }} />
        {icon && icon}
      </div>
      {errors && <p className={styles.errorMessage}>{errors}</p>}
    </label>
  )
}
