import { Link } from 'react-router-dom'

import styles from './styles.module.css'

export function Button({ title, link, ...rest }) {
  if (link) {
    return (
      <Link to={link} className={styles.container} type="button">
        {title}
      </Link>
    )
  }

  return (
    <button className={styles.container} {...rest}>
      {title}
    </button>
  )
}
