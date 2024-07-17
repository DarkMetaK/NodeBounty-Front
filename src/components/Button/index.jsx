import { Link } from 'react-router-dom'

import styles from './styles.module.css'

export function Button({ title, link, icon, size, variant, ...rest }) {
  if (link) {
    return (
      <Link
        to={link}
        className={`${styles.container} ${size === 'lg' && styles.lg}`}
        type="button"
      >
        {title}
      </Link>
    )
  }

  return (
    <button
      className={`${styles.container} ${size === 'lg' && styles.lg} ${
        variant === 'secondary' && styles.secondary
      }`}
      {...rest}
    >
      {title} {icon}
    </button>
  )
}
