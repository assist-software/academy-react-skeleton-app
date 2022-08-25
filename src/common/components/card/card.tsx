import styles from './card.module.scss'

interface Props {
  children: JSX.Element | JSX.Element[]
}
export const Card = ({ children }: Props) => {
  return (
    <div className={styles.cardSomethingElse}>
      <h1 className={styles.cardTitle}>Card Tittle</h1>
      {children}
    </div>
  )
}
