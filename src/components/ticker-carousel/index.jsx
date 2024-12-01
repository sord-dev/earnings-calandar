import PropTypes from 'prop-types';
import styles from './index.module.css'
import { Ticker } from './partials';

function TickerCarousel({ tickers = [], setHoveredTicker, limit = 10 }) {
    if (!tickers) return <div>Loading...</div>;
    if (!tickers.length) return <div>Loading...</div>;

    const window = tickers.slice(0, limit);

    return (
        <div className={styles['ticker-carousel']}>
            {window.map((ticker, index) => (<Ticker key={index} ticker={ticker} previewTicker={setHoveredTicker} />))}
        </div>
    )
}

TickerCarousel.propTypes = {
    tickers: PropTypes.array,
    setHoveredTicker: PropTypes.func.isRequired,
    limit: PropTypes.number,
};

export default TickerCarousel