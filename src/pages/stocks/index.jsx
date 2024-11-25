import axios from 'axios'
import React from 'react'

import { NotificationTrey, TickerCarousel, TickerPreview } from '../../components'
import { useMousePosition } from '../../hooks'

const fetchData = async (url = '') => {
    if(!url) return null;

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

                setStocks({ ...trending, ...dailyGainers })
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
            <h2>Daily Gainers</h2>
            <TickerCarousel {...{ tickers: stocks?.dailyGainers, setHoveredTicker }} />
            <NotificationTrey {...{ messages, setMessages }} />
            {hoveredTicker && <TickerPreview {...{ ticker: hoveredTicker, mousePosition }} />}


            <h2>Trending</h2>
            <TickerCarousel {...{ tickers: stocks?.trending, setHoveredTicker }} />
        </div>
    )
}

export default StocksPage