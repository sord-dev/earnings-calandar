import styles from '../index.module.css';
import propTypes from 'prop-types';

export const TickerItem = ({ ticker, price, change, currency }) => {
    const clr = change.includes('-') ? 'down' : 'up';
    const pric = isNaN(parseInt(price)) ? 'N/a' : Intl.NumberFormat('en-US', { style: 'currency', currency }).format(price);
    return (
        <div className={styles['ticker-item']}>
            <h3>{ticker}</h3>
            <h2>{pric}</h2>
            <p className={styles[clr]}>{change}</p>
        </div>
    )
}

TickerItem.propTypes = {
    ticker: propTypes.string.isRequired,
    price: propTypes.number.isRequired,
    change: propTypes.string.isRequired,
    currency: propTypes.string.isRequired,
}