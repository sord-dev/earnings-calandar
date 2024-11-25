import styles from './index.module.css';
import Bars from "../../assets/poortrim-bars.svg?react";

import { TickerItem } from './partials';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useRefetch } from '../../hooks';
import { useEffect, useState } from 'react';

const siteMap = {
    '/': 'Earnings Calendar',
    '/watch-list': 'Watch List',
    '/trends': 'Stock Trends',
    '/stocks': 'Stocks',
    '/settings': 'Preferences'
}

export default function Header({
    setAsideActive
}) {
    const { data: watchListData, error, loading, refetch } = useRefetch({ method: 'GET', url: 'http://localhost:3003/api/v1/tickers/watch-list' });
    
    const location = useLocation()
    const nav = useNavigate()

    const [title, setTitle] = useState(siteMap[location.pathname]);

    useEffect(() => {
        const tick = setInterval(async () => await refetch(), 30000)
        return () => clearInterval(tick);
    }, [])


    useEffect(() => {
        if(!error) return;
        if (error) console.error(error);
        if(error?.status === 401) nav('/authenticate');
    }, [error])

    useEffect(() => {
        setTitle(siteMap[location.pathname]);
    }, [location])


    return (
        <>
            <header className={styles['header']}>
                <div className={styles['header-nav']}>
                    <div className={styles['header-title-container']}>

                        <div className={styles['header-title']} onClick={() => setAsideActive(prev => !prev)}>
                            <div className={styles['header-logo']}>
                                <Bars />
                                <h1>poortrim</h1>
                            </div>
                            <span>{'>'}</span>
                        </div>
                        <div>
                            <h2>{title}</h2>
                        </div>
                    </div>

                    <div className={styles['header-nav-popout']}>
                        <p>Don't worry about this right now...</p>
                    </div>
                </div>

                <div className={styles['header-menu']}>
                    {loading ? <p>Loading...</p> : error ? <p>Error: {error.message}</p> : renderTickers(watchListData)}
                </div>
            </header>

            <Outlet />
        </>
    )
}

export const renderTickers = (tickerData) => {
    if (!tickerData) return null;
    if (!tickerData.length) return null;
    return tickerData.map((ticker, index) => {
        const { price: { symbol, currencySymbol, regularMarketPrice, regularMarketChange } } = ticker;
        return <TickerItem key={index} ticker={symbol} price={currencySymbol + regularMarketPrice} change={regularMarketChange.toFixed(2) + '%'} />
    })
};
