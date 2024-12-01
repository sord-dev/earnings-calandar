import styles from '../index.module.css'
import PropTypes from 'prop-types';

export const Ticker = ({ ticker, previewTicker }) => {
    const { symbol, displayName, regularMarketChange, regularMarketPrice, currency } = ticker;
    const { color, sign } = regularMarketChange > 0 ? { color: 'green', sign: '+' } : { color: 'red', sign: '' };


    const price = Intl.NumberFormat('en-US', { style: 'currency', currency }).format(regularMarketPrice);

    return (
        <div className={styles['ticker']} onMouseEnter={() => previewTicker(ticker)} onMouseLeave={() => previewTicker(null)}>
            <div className={styles['ticker-meta']}>
                <div>
                    <h4>{symbol}</h4>
                    <p>{displayName}</p>
                    <p className={styles['ticker-price']} style={{ color }}>{sign && sign}{regularMarketChange.toFixed(2)}%</p>
                </div>
                <div>
                    <p>{price}</p>
                </div>
            </div>
        </div>
    )
}

export const TickerEmpty = () => {
    return (
        <div className={styles['ticker']}>
            <div className={styles['ticker-meta']}>
                <div>
                    <h4></h4>
                    <p></p>
                    <p className={styles['ticker-price']}></p>
                </div>
                <div>
                    <p></p>
                </div>
            </div>
        </div>
    )
}

Ticker.propTypes = {
    ticker: PropTypes.object.isRequired,
    previewTicker: PropTypes.func.isRequired,
};
