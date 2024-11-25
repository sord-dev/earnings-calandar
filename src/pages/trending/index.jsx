import axios from 'axios'
import React from 'react'
import styles from './index.module.css'

import { NotificationTrey, TickerCarousel, TickerPreview } from '../../components'
import { useMousePosition, useNotificationQueue } from '../../hooks'

const fetchData = async (url = '') => {
    if (!url) return null;

    try {
        const res = await axios.get(url);
        return res.data;
    } catch (error) {
        return null;
    }
}

function StocksPage() {
    const [hoveredTicker, setHoveredTicker] = React.useState(null)
    const [stocks, setStocks] = React.useState({})
    const { messages, appendNotification, removeLastNotification } = useNotificationQueue();
    const { mousePosition } = useMousePosition();

    React.useEffect(() => {
        const fetchStocks = async () => {
            try {
                const trending = await fetchData('http://localhost:3003/api/v1/tickers/trending');
                const dailyGainers = await fetchData('http://localhost:3003/api/v1/tickers/gainers');

                const data = { ...trending, ...dailyGainers }
                setStocks(data)

                appendNotification('Stocks fetched successfully', 'success')
            } catch (error) {
                if (error.code === "ERR_BAD_REQUEST") {
                    return appendNotification('Stocks fetched successfully', 'success')
                } else if (error.code === "ERR_NETWORK") {
                    return appendNotification('Failed to connect to server', 'error')
                } else {
                    return appendNotification('An unknown error occurred', 'error')
                }
            }
        }

        fetchStocks()
    }, [])

    return (
        <div>
            <CarouselList {...{ setHoveredTicker, tickers: stocks }} />
            <TickerPreview {...{ ticker: hoveredTicker, mousePosition }} />
            <NotificationTrey {...{ messages, clearNotification: removeLastNotification }} />
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