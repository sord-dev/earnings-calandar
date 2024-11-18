import styles from '../index.module.css';

export const TickerItem = ({ ticker, price, change }) => {
    const clr = change.includes('-') ? 'down' : 'up';
    return (
        <div className={styles['ticker-item']}>
            <h3>{ticker}</h3>
            <p>{price}</p>
            <p className={styles[clr]}>{change}</p>
        </div>
    )
}