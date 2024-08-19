import styles from "./Card.module.css";

/**
 * Компонент карточка
 * @property{props.name} - Название карточки
 * @property{props.description} - Описание карточки
 * @returrns {JSX} Элемент JSX
 */
export const Card = ({ title, subtitle, image }) => {
  return (
    <div className={styles.card}>
      <div className="card_image ">
        <img src={image} alt={title} />
      </div>
      <div className={styles.cardImage}>
        <h3 className={styles.card_title}>{title}</h3>
        <p className={styles.card_subtitle}>{subtitle}</p>
      </div>
    </div>
  );
};
