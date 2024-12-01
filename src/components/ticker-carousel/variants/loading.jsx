import { TickerEmpty } from '../partials';
import styles from '../index.module.css';

const TickerCarouselLoading = () => {
    const tickers = Array(10).fill({ symbol: '', displayName: '', regularMarketChange: 0, regularMarketPrice: 0, currency: '' });
    return (
        <div className={styles['ticker-carousel-loading']}>
            {tickers.map((ticker, index) => <TickerEmpty key={index} ticker={ticker} />)}
        </div>
    )
}

export default TickerCarouselLoading;