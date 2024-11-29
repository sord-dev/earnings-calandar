import styles from './index.module.css';
import Bars from "../../assets/poortrim-bars.svg?react";

import { TickerItem } from './partials';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useRefetch } from '../../hooks';
import { useEffect, useState } from 'react';
import { usePreferenceContext } from '../../contexts/preferences.context';

const siteMap = {
    '/': 'Earnings',
    '/watch-list': 'Watch List',
    '/trends': 'Stock Trends',
    '/stocks': 'Stocks',
    '/settings': 'Preferences'
}

export default function Header() {
    const { data: watchListData, error, loading, refetch } = useRefetch({ method: 'GET', url: 'http://localhost:3003/api/v2/tickers/indexes?limit=3' });
    const { toggleAside } = usePreferenceContext();
    
    const location = useLocation()
    const nav = useNavigate()

    const [title, setTitle] = useState(siteMap[location.pathname]);

    useEffect(() => {
        const tick = setInterval(async () => await refetch(), 30000)
        return () => clearInterval(tick);
    }, [refetch])


    useEffect(() => {
        if(!error) return;
        if (error) console.error(error);
        if(error?.status === 401) nav('/authenticate');
    }, [error, nav])

    useEffect(() => {
        setTitle(siteMap[location.pathname]);
    }, [location])

    console.log(watchListData);


    return (
        <>
            <header className={styles['header']}>
                <div className={styles['header-nav']}>
                    <div className={styles['header-title-container']}>

                        <div className={styles['header-title']} onClick={() => toggleAside()}>
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
                </div>

                <div className={styles['header-menu']}>
                    {loading ? <p>Loading...</p> : error ? <p>Error: {error.message}</p> : renderTickers(watchListData?.data)}
                </div>
            </header>

            <Outlet />
        </>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export const renderTickers = (tickerData) => {
    if (!tickerData) return null;
    if (!tickerData.length) return null;
    return tickerData.map((ticker, index) => {
        const { price: { symbol, currency, regularMarketPrice, regularMarketChange, shortName } } = ticker;
        return <TickerItem key={index} ticker={shortName||symbol} price={regularMarketPrice}  currency={currency} change={regularMarketChange.toFixed(2) + '%'} />
    })
};
