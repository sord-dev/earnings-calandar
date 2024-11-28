import React from 'react'
import axios from 'axios'
import styles from './index.module.css'
import PropTypes from 'prop-types'
import { LocalStorageCache } from '../../utils'

const cache = new LocalStorageCache('stock_metadata_')

function TickerPreview({ ticker, mousePosition }) {
    const [stock, setStock] = React.useState({ data: null, loading: true, error: null })
    const style = { left: `${mousePosition.x}px`, top: `${mousePosition.y}px`, position: 'absolute' }


    React.useEffect(() => {
        const fetchStock = async () => {
            try {
                const cachedStock = cache.getItem(ticker.symbol)
                if (cachedStock) return setStock({ data: cachedStock, loading: false, error: null });

                const response = await axios.get(`http://localhost:3003/api/v2/tickers/${ticker.symbol}`, {withCredentials: true});
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


    if (stock.loading) {
        return <div {...{ style }} >Loading...</div>
    }

    const { symbol, longName, regularMarketPrice, regularMarketChange, marketCap, forwardPE } = ticker;
    const summaryProfile = stock.data.summaryProfile;
    const price = stock.data.price;

    return (
        <div className={styles['ticker-preview']} {...{ style }}>
            <div className={styles['ticker-preview-title']}>
                <h2>{longName} ({symbol})</h2>
                <p>{price.currencySymbol} {Intl.NumberFormat().format(regularMarketPrice)}</p>
            </div>
            <div className={styles['ticker-preview-meta']}>
                <div>
                    <p>Industry: {summaryProfile?.industry || 'N/A'}</p>
                    <p>Exchange: {price.exchangeName}</p>
                   {summaryProfile?.website && <p>Website: <a href={summaryProfile.website} target="_blank" rel="noreferrer">{summaryProfile.website}</a></p>}
                </div>

                <div>
                    <p>Market Change: {regularMarketChange.toFixed(2)}%</p>
                    <p>Market Cap: {price.currencySymbol} {Intl.NumberFormat().format(marketCap)}</p>
                    <p>Forward PE: {forwardPE}</p>
                </div>
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