/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import styles from './index.module.css'

import { TickerPreview, StockTable } from '../../components'
import { useMousePosition, useRefetch } from '../../hooks'


function StocksPage() {
    const [hoveredTicker, setHoveredTicker] = React.useState(null)
    const [pagination, setPagination] = React.useState({ page: 1, limit: 10, count: 150 });
    const query = new URLSearchParams({...pagination }).toString();
    const { data: trending, refetch: refetchTrending } = useRefetch({ method: 'GET', url: `http://localhost:3003/api/v2/tickers/trending?${query}` });
    
    const { mousePosition } = useMousePosition();

    useEffect(() => {
        const interval = setInterval(async () => {
            await refetchTrending();
        }, 30000)

        return () => clearInterval(interval);
    }, [refetchTrending])

    useEffect(() => {refetchTrending({ url: `http://localhost:3003/api/v2/tickers/trending?${query}` })}, [pagination]);

    return (
        <div className={styles['trending-container']}>
            {/* <TickerCarousel {...{ tickers: trending, setHoveredTicker }} /> */}
            {hoveredTicker && <TickerPreview {...{ ticker: hoveredTicker, mousePosition }} />}
            <h3>Currently Trending Stocks</h3>
           <StockTable {...{ stocks: trending?.data, onStockHover: setHoveredTicker, pagination, setPagination }} />
        </div>
    )
}


export default StocksPage