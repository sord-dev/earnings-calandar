/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import styles from './index.module.css'

import { TickerPreview, StockTable } from '../../components'
import { useMousePosition, useRefetch } from '../../hooks'
import StockTableLoading from '../../components/stock-table/variants/loading'


function StocksPage() {
    const [hoveredTicker, setHoveredTicker] = React.useState(null)
    const [pagination, setPagination] = React.useState({ page: 1, limit: 10, count: 150, total: 0 });
    const query = new URLSearchParams({ page: pagination.page, limit: pagination.limit, count: pagination.count }).toString();
    const { data: stocks, refetch: refetchTrending, error, loading } = useRefetch({ method: 'GET', url: `http://localhost:3003/api/v2/tickers/trending?${query}` });

    const { mousePosition } = useMousePosition();

    useEffect(() => {
        const interval = setInterval(async () => {
            await refetchTrending();
        }, 30000)

        return () => clearInterval(interval);
    }, [refetchTrending])

    useEffect(() => {
        refetchTrending({ url: `http://localhost:3003/api/v2/tickers/trending?${query}` });
    }, [pagination]);

    useEffect(() => {
        if (error) console.error(error);
    }, [error])

    return (
        <div className={styles['trending-container']}>
            {/* <TickerCarousel {...{ tickers: trending, setHoveredTicker }} /> */}
            {hoveredTicker && <TickerPreview {...{ ticker: hoveredTicker, mousePosition }} />}
            <h3>Currently Trending Stocks</h3>
            {loading && !stocks ? <StockTableLoading /> : <StockTable {...{ stocks, pagination, setPagination, onStockHover: setHoveredTicker }} />}
            {error ? <p className={styles['table-error']}>Crap! There was an error fetching the data: <br/> <b>{error.message}</b></p> : null}

        </div>
    )
}


export default StocksPage