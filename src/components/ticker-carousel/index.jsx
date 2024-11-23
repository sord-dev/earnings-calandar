import React from 'react'
import styles from './index.module.css'

import { returnCurrencySign } from '../../utils'

function TickerCarousel({ tickers = [] }) {
    if (!tickers.length) return <div>Loading...</div>;

    return (
        <div className={styles['ticker-carousel']}>
            {tickers.map((ticker, index) => (<Ticker key={index} ticker={ticker} />))}
        </div>
    )
}

const Ticker = ({ ticker }) => {
    const { symbol, longName, regularMarketPrice, regularMarketChange, currency } = ticker;
    const { color, sign } = regularMarketChange > 0 ? { color: 'green', sign: '+' } : { color: 'red', sign: '' };

    const currSign = returnCurrencySign(currency);
    return (
        <div className={styles['ticker']}>
            <div className={styles['ticker-meta']}>
                <p>{symbol}</p>
                <p className={styles['ticker-price']} style={{ color }}>{sign && sign}{regularMarketChange.toFixed(2)}%</p>
            </div>
            <h3>{currSign + regularMarketPrice}</h3>

        </div>
    )
}

export default TickerCarousel