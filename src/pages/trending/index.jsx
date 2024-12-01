/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import styles from './index.module.css'

import { TickerPreview, StockTable, TickerCarousel } from '../../components'
import { useMousePosition, useRefetch } from '../../hooks'
import StockTableLoading from '../../components/stock-table/variants/loading'
import TickerCarouselLoading from '../../components/ticker-carousel/variants/loading';

function StocksPage() {
    const [hoveredTicker, setHoveredTicker] = React.useState(null)
    const [pagination, setPagination] = React.useState({ page: 1, limit: 10, count: 150, total: 0 });
    const query = new URLSearchParams({ page: pagination.page, limit: pagination.limit, count: pagination.count }).toString();
    const { data: stocks, refetch: refetchTrending, error:trendingError, loading: trendingLoad } = useRefetch({ method: 'GET', url: `http://localhost:3003/api/v2/tickers/trending?${query}` });
    const { data: gainers, refetch: refetchGainers, loading: gainerLoad } = useRefetch({ method: 'GET', url: `http://localhost:3003/api/v2/tickers/gainers` });

    const { mousePosition } = useMousePosition();

    useEffect(() => {
        const interval = setInterval(async () => {
            await refetchTrending();
            await refetchGainers();
        }, 30000)

        return () => clearInterval(interval);
    }, [refetchTrending])

    useEffect(() => {
        refetchTrending({ url: `http://localhost:3003/api/v2/tickers/trending?${query}` });
    }, [pagination]);


    return (
        <div className={styles['trending-container']}>
            <h3>Daily Gainers</h3>
            {hoveredTicker && <TickerPreview {...{ ticker: hoveredTicker, mousePosition }} />}
            {gainerLoad && !gainers ? <TickerCarouselLoading /> : <TickerCarousel {...{ tickers: gainers?.dailyGainers, setHoveredTicker }} />}

            <h3>Currently Trending Stocks</h3>
            {trendingLoad && !stocks ? <StockTableLoading /> : <StockTable {...{ stocks, pagination, setPagination, onStockHover: setHoveredTicker }} />}
            {trendingError ? <p className={styles['table-error']}>Crap! There was an error fetching the data: <br /> <b>{trendingError.message}</b></p> : null}

        </div>
    )
}


export default StocksPage