import React from 'react'
import styles from './index.module.css'

import { returnCurrencySign } from '../../utils'

function TickerCarousel({ tickers = [], setHoveredTicker }) {
    if (!tickers.length) return <div>Loading...</div>;

    return (
        <div className={styles['ticker-carousel']}>
            {tickers.map((ticker, index) => (<Ticker key={index} ticker={ticker} previewTicker={setHoveredTicker} />))}
        </div>
    )
}

const Ticker = ({ ticker, previewTicker }) => {
    const { symbol, longName, regularMarketPrice, regularMarketChange, currency } = ticker;
    const { color, sign } = regularMarketChange > 0 ? { color: 'green', sign: '+' } : { color: 'red', sign: '' };

    const currSign = returnCurrencySign(currency);
    return (
        <div className={styles['ticker']} onMouseOver={(() => previewTicker(ticker))} onMouseLeave={() => previewTicker(null)}>
            <div className={styles['ticker-meta']}>
                <p>{symbol}</p>
                <p className={styles['ticker-price']} style={{ color }}>{sign && sign}{regularMarketChange.toFixed(2)}%</p>
            </div>
            <h3>{currSign + regularMarketPrice}</h3>

        </div>
    )
}

export default TickerCarousel