import styles from './index.module.css';
import Bars from "../../assets/poortrim-bars.svg?react";

import { TickerItem } from './partials';
import { Outlet } from 'react-router-dom';

export default function Header({
    pageTitle = 'Earnings Calander',
    watchListData = [] }) {

    return (
        <>
            <header className={styles['header']}>
                <div className={styles['header-nav']}>
                    <div className={styles['header-title-container']}>

                        <div className={styles['header-title']}>
                            <Bars />
                            <h1>poortrim</h1>
                            <span>{'>'}</span>
                        </div>
                        <div>
                            <h2>{pageTitle}</h2>
                        </div>
                    </div>

                    <div className={styles['header-nav-popout']}>
                        <p>Don't worry about this right now...</p>
                    </div>
                </div>

                <div className={styles['header-menu']}>
                    {renderTickers(watchListData)}
                </div>
            </header>

            <Outlet />
        </>
    )
}

export const renderTickers = (tickerData) => {
    if(!tickerData.length) return null;
    return tickerData.map((ticker, index) => {
        const {price: { symbol, currencySymbol, regularMarketPrice, regularMarketChange } } = ticker;
        return <TickerItem key={index} ticker={symbol} price={currencySymbol+regularMarketPrice} change={regularMarketChange.toFixed(2) + '%'} />
    })
};
