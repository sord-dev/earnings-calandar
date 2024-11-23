import axios from 'axios'
import React from 'react'

import { NotificationTrey, TickerCarousel } from '../../components'

function StocksPage() {
    const [stocks, setStocks] = React.useState({})
    const [messages, setMessages] = React.useState([])

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

    return (
        <div>
            <h2>Daily Gainers</h2>
            <TickerCarousel {...{ tickers: stocks?.dailyGainers }} />
            <NotificationTrey {...{ messages, setMessages }} />
        </div>
    )
}

export default StocksPage