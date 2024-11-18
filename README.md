## Stock Earnings Tracker

### Overview
Personal project to track companies earnings and stock prices

### Data Sources
* **Earnings Calendar Data:**
  - StockTwits Intrnal API (found a post on reddit saying it was possible): [api.stocktwits.com/api/2/discover/earnings_calendar](api.stocktwits.com/api/2/discover/earnings_calendar?date_from=2024-11-01&date_to=2024-11-17) 
  - Dolthub Earnings Calendar (all hail post-no-preference, be it incomplete): [https://www.dolthub.com/repositories/post-no-preference/earnings](https://www.dolthub.com/repositories/post-no-preference/earnings)
* **Stock Prices & Future Earnings:**
   - Yahoo Finance API (will use wrapper): [node-yahoo-finance2](https://github.com/gadicc/node-yahoo-finance2)

### Aims

1. login, create watchlist from tickers, be informed* of that companies information from difference sources, primarily yahoo finance at the moment
4. request for information on specific tickers and their current pricing
5. utilize external earnings calandar api to display the earnings information and how that's impacted the stock price 
  
*Being informed: Example notification:
```json
{
   "user_id": 122, 
   "ak": false, 
   "data": { 
      "type": "earnings_post_corralated_price", 
      "ticker": "TLSA", 
      "earnings_posted": "17-11-2024@14:04", 
      "actual_revenue": 25182000000, 
      "estimated_revenue": 25468371161,
      "stock_price": {
         "markets_open": 230,
         "mid_market": 245,
         "markets_close": 238,
         "sentiment": "bullish"
      }
   } 
}
```

### Current Views

- **Earnings Calander**
![image](https://github.com/user-attachments/assets/58e6948f-33c9-4deb-9d5b-216a4dd93a66)


**To get started:**
1. Clone this repository.
2. Set up the required environment (Node.js).
3. Install dependencies using `npm i`.
4. Run the server using `npm run dev` or `npm start`.

**Required Environment Variables:**
| Variable       | Description                                      |
|----------------|--------------------------------------------------|
| `PORT`         | The port number on which the server will listen. |
| `JWT_SECRET`   | Secret key used for signing JSON Web Tokens.     |
| `NODE_ENV`     | Defines the environment (development, production).|
| `SESSION_SECRET` | Secret key used for session management.         |


### Future Improvements 

- **Redundancy & More information:**
Clone and perhaps curate private sources of data for earnings reports and sentiment analysis, with scrapers and webjobs

- **Better caching strategies:**
Currently the earnings portion of the server is saving it's cached data to /src/cache in a json file, 
if we're running on a low memory vm, that can become a problem.
