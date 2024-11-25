import axios from 'axios'
import React from 'react'
import styles from './index.module.css'

import { NotificationTrey, TickerCarousel, TickerPreview } from '../../components'
import { useMousePosition } from '../../hooks'

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
    const [messages, setMessages] = React.useState([])

    const { mousePosition } = useMousePosition()

    React.useEffect(() => {
        const fetchStocks = async () => {
            try {
                const trending = await fetchData('http://localhost:3003/api/v1/tickers/trending');
                const dailyGainers = await fetchData('http://localhost:3003/api/v1/tickers/gainers');

                const data = { ...trending, ...dailyGainers }
                setStocks(data)

                setMessages(prev => [...prev, { type: 'success', notification: 'Stocks fetched successfully' }])
            } catch (error) {
                if (error.code === "ERR_BAD_REQUEST") {
                    setMessages(prev => [...prev, { type: 'error', notification: 'Failed to fetch stocks' }])
                } else if (error.code === "ERR_NETWORK") {
                    setMessages(prev => [...prev, { type: 'error', notification: 'Failed to connect to the server' }])
                } else {
                    setMessages(prev => [...prev, { type: 'error', notification: 'An unknown error occurred' }])
                }
            }
        }

        fetchStocks()
    }, [])

    return (
        <div>
            <CarouselList {...{ setHoveredTicker, tickers: stocks }} />
            <TickerPreview {...{ ticker: hoveredTicker, mousePosition }} />
            <NotificationTrey {...{ messages, setMessages }} />
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