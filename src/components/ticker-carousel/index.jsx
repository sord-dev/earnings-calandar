import PropTypes from 'prop-types';
import styles from './index.module.css'

import { returnCurrencySign } from '../../utils'

function TickerCarousel({ tickers = [], setHoveredTicker }) {
    if(!tickers) return <div>Loading...</div>;
    if (!tickers.length) return <div>Loading...</div>;

    return (
        <div className={styles['ticker-carousel']}>
            {tickers.map((ticker, index) => (<Ticker key={index} ticker={ticker} previewTicker={setHoveredTicker} />))}
        </div>
    )
}

const Ticker = ({ ticker, previewTicker }) => {
    const { symbol, regularMarketPrice, regularMarketChange, currency } = ticker;
    const { color, sign } = regularMarketChange > 0 ? { color: 'green', sign: '+' } : { color: 'red', sign: '' };

    const currSign = returnCurrencySign(currency);

    return (
        <div className={styles['ticker']} onMouseEnter={() => previewTicker(ticker)} onMouseLeave={() => previewTicker(null)}>
            <div className={styles['ticker-meta']}>
                <p>{symbol}</p>
                <p className={styles['ticker-price']} style={{ color }}>{sign && sign}{regularMarketChange.toFixed(2)}%</p>
            </div>
            <h3>{currSign + Intl.NumberFormat().format(regularMarketPrice)}</h3>

        </div>
    )
}

Ticker.propTypes = {
    ticker: PropTypes.object.isRequired,
    previewTicker: PropTypes.func.isRequired,
};

TickerCarousel.propTypes = {
    tickers: PropTypes.array,
    setHoveredTicker: PropTypes.func.isRequired,
};

export default TickerCarousel