import React, { useEffect } from 'react'
import styles from './index.module.css'

import { TickerCarousel, TickerPreview } from '../../components'
import { useMousePosition, useRefetch } from '../../hooks'


function StocksPage() {
    const [hoveredTicker, setHoveredTicker] = React.useState(null)
    const { mousePosition } = useMousePosition();

    const { data: trending, refetch: refetchTrending } = useRefetch({ method: 'GET', url: 'http://localhost:3003/api/v2/tickers/trending' });
    const { data: dailyGainers, refetch: refetchGainers } = useRefetch({ method: 'GET', url: 'http://localhost:3003/api/v2/tickers/gainers' });

    useEffect(() => {
        const interval = setInterval(async () => {
            await refetchTrending();
            await refetchGainers();
        }, 30000)

        return () => clearInterval(interval);
    }, [])

    return (
        <div className={styles['trending-container']}>
            <h2>Trending Stocks</h2>
            <TickerCarousel {...{ tickers: trending, setHoveredTicker }} />

            <h2>Daily Gainers</h2>
            <TickerCarousel {...{ tickers: dailyGainers, setHoveredTicker }} />

            {hoveredTicker && <TickerPreview {...{ ticker: hoveredTicker, mousePosition }} />}
        </div>
    )
}

const CarouselList = ({ tickers, setHoveredTicker }) => {
    return (
        <div>
            {Object.entries(tickers).map(([key, value]) => (
                <div key={key} className={styles['carousel-list']}>
                    <h2>{key.replace('-', ' ')}</h2>
                    <TickerCarousel {...{ tickers: value, setHoveredTicker }} />
                </div>
            ))}
        </div>
    )
}

export default StocksPage