import componentImgSrc from 'common/assets/filter.jpg'
import styles from './filter.module.scss'

export const Filter = () => {
  return (
    <div className={styles.Filter}>
      <h2>Filter</h2>

      <img src={componentImgSrc} alt='' />
    </div>
  )
}
