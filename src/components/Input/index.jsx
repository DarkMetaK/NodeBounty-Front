/* eslint-disable react/display-name */
import { forwardRef } from 'react'
import InputMask from 'react-input-mask'

import styles from './styles.module.css'

export const Input = forwardRef(({ label, icon, errors, ...rest }, ref) => {
  return (
    <label className={styles.container}>
      {label}
      <div>
        <InputMask
          {...rest}
          inputRef={ref}
          style={errors && { borderColor: 'red' }}
        />
        {icon && icon}
      </div>
      {errors && <p className={styles.errorMessage}>{errors}</p>}
    </label>
  )
})
