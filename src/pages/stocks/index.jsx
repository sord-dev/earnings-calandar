import axios from 'axios'
import React from 'react'

import { NotificationTrey, TickerCarousel, TickerPreview } from '../../components'

function StocksPage() {
    const [hoveredTicker, setHoveredTicker] = React.useState(null)
    const [stocks, setStocks] = React.useState({})
    const [messages, setMessages] = React.useState([])

    const mousePosition = React.useRef({ x: 0, y: 0 })

    React.useEffect(() => {
        const fetchStocks = async () => {
            try {
                const response = await axios.get('http://localhost:3003/api/v1/tickers/trending');
                let data = response.data;
                setStocks(data)
                setMessages(prev => [...prev, { type: 'success', notification: 'Stocks fetched successfully' }])
            } catch (error) {
                console.error(error)
                setMessages(prev => [...prev, { type: 'error', notification: 'Failed to fetch stocks' }])
            }
        }

        fetchStocks()
    }, [])

    React.useEffect(() => {
        const handleMouseMove = (event) => {
            mousePosition.current = { x: event.clientX, y: event.clientY }
        }

        window.addEventListener('mousemove', handleMouseMove)

        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
        }
    },[])

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