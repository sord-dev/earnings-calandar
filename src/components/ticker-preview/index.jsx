import { useState, useEffect } from 'react'
import axios from 'axios'
import styles from './index.module.css'
import PropTypes from 'prop-types'
import { LocalStorageCache } from '../../utils'

const cache = new LocalStorageCache('stock_metadata_')

function TickerPreview({ ticker, mousePosition }) {
    const [stock, setStock] = useState({ data: null, loading: true, error: null })
    const [previewStyle, setPreviewStyle] = useState({ top: 0, left: 0 })

    useEffect(() => {
        const fetchStock = async () => {
            try {
                const cachedStock = cache.getItem(ticker.symbol)
                if (cachedStock) return setStock({ data: cachedStock, loading: false, error: null });
                
                const response = await axios.get(`http://localhost:3003/api/v2/tickers/${ticker.symbol}`, { withCredentials: true });
                let data = response.data;
                cache.setItem(ticker.symbol, data, 1000 * 60 * 60); // cache for 1 hour
                setStock({ data, loading: false, error: null })
            } catch (error) {
                console.error(error)
                setStock({ data: null, loading: false, error })
            }
        }
        fetchStock()
    }, [ticker])

    useEffect(() => {
        if (!mousePosition.x || !mousePosition.y) {
            setStock({ data: null, loading: false, error: null })
            return
        }

        // Calculate preview position to keep it within screen bounds
        let left = mousePosition.x
        let top = mousePosition.y

        if (mousePosition.x + 300 > window.innerWidth) {
            left = mousePosition.x - 300
        }

        if (mousePosition.y + 300 > window.innerHeight) {
            top = mousePosition.y - 300
        }

        setPreviewStyle({ top: `${top}px`, left: `${left}px` })
    }, [mousePosition])

    if (stock.loading) {
        return <div style={previewStyle}>Loading...</div>
    }

    const { symbol, longName, regularMarketChange, marketCap, forwardPE } = ticker;
    const summaryProfile = stock.data.summaryProfile;
    const price = stock.data.price;
    
    const cap = isNaN(marketCap) ? 'N/a' : Intl.NumberFormat('en-US', { style: 'currency', currency: price.currency }).format(marketCap);
    const frwdPE = isNaN(forwardPE) ? 'N/a' : forwardPE.toFixed(3);

    return (
        <div className={styles['ticker-preview']} style={previewStyle}>
            <div className={styles['ticker-preview-title']}>
                <h2>{longName} ({symbol})</h2>
            </div>
            <div className={styles['ticker-preview-meta']}>
                <p>Industry: {summaryProfile?.industry || 'N/A'}</p>
                <p>Exchange: {price.exchangeName}</p>
                {summaryProfile?.website && <p>Website: <a href={summaryProfile.website} target="_blank" rel="noreferrer">{summaryProfile.website}</a></p>}
                <p>Market Change: {regularMarketChange ? regularMarketChange.toFixed(3) + '%' : 'N/a'}</p>
                <p>Market Cap: {cap}</p>
                <p>Forward PE: {frwdPE}</p>
            </div>
        </div>
    )
}

TickerPreview.propTypes = {
    ticker: PropTypes.shape({
        symbol: PropTypes.string.isRequired,
        longName: PropTypes.string,
        regularMarketPrice: PropTypes.number,
        regularMarketChange: PropTypes.number,
        marketCap: PropTypes.number,
        forwardPE: PropTypes.number,
    }).isRequired,
    mousePosition: PropTypes.shape({
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
    }).isRequired,
}

export default TickerPreview;