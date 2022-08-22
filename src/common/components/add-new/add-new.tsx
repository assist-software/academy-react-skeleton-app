import componentImgSrc from 'common/assets/add-new.jpg'

import styles from './add-new.module.scss'

export const AddNew = () => {
  return (
    <div className={styles.optionAddNew}>
      <h2>AddNew</h2>

      <img src={componentImgSrc} alt='' />
    </div>
  )
}
