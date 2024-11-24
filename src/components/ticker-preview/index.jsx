import React from 'react'
import axios from 'axios'
import styles from './index.module.css'
import { LocalStorageCache } from '../../utils'

const cache = new LocalStorageCache('stock_metadata_')

function TickerPreview({ ticker, mousePosition }) {
    const [stock, setStock] = React.useState({ data: null, loading: true, error: null })
    const [position, setPosition] = React.useState({ x: 0, y: 0 })
    const style = { left: `${position.x}px`, top: `${position.y}px`, position: 'absolute' }

    if (!ticker) {
        return null
    }

    React.useEffect(() => {
        const fetchStock = async () => {
            try {
                const cachedStock = cache.getItem(ticker.symbol)
                if (cachedStock) return setStock({ data: cachedStock, loading: false, error: null });

                const response = await axios.get(`http://localhost:3003/api/v1/tickers/${ticker.symbol}`, {withCredentials: true});
                let data = response.data;

                cache.setItem(ticker.symbol, data, 1000 * 60 * 60 * 24);
                setStock({ data, loading: false, error: null })
            } catch (error) {
                console.error(error)
                setStock({ data: null, loading: false, error })
            }
        }

        fetchStock()
    }, [ticker])

    React.useEffect(() => {
        setPosition({ x: mousePosition.current.x, y: mousePosition.current.y })
    }, [mousePosition])

    if (stock.loading) {
        return <div {...{ style }} >Loading...</div>
    }

    const { symbol, longName, regularMarketPrice, regularMarketChange, marketCap, forwardPE } = ticker;
    const { data: { summaryProfile: { industry, longBusinessSummary, website }, price: { currencySymbol, exchangeName } } } = stock;

    return (
        <div className={styles['ticker-preview']} {...{ style }}>
            <div className={styles['ticker-preview-title']}>
                <h2>{longName} ({symbol})</h2>
                <p>{currencySymbol} {Intl.NumberFormat().format(regularMarketPrice)}</p>
            </div>
            <div className={styles['ticker-preview-meta']}>
                <div>
                    <p>Industry: {industry}</p>
                    <p>Exchange: {exchangeName}</p>
                    <p>Website: <a href={website} target="_blank" rel="noreferrer">{website}</a></p>
                </div>

                <div>
                    <p>Market Change: {regularMarketChange.toFixed(2)}%</p>
                    <p>Market Cap: {currencySymbol} {Intl.NumberFormat().format(marketCap)}</p>
                    <p>Forward PE: {forwardPE}</p>
                </div>
            </div>
        </div>
    )
}

export default TickerPreview