import { TableCellEmpty } from '../partials'
import styles from '../index.module.css'

const blankStock = {
    symbol: '',
    name: '',
    price: '',
    change: '',
    marketCap: '',
    currency: ''
}

const blankStocks = Array(10).fill(blankStock)

function StockTableLoading() {
    const stocks = { data: blankStocks, total: 0 }
    return (
        <div className={`${styles['table-wrapper']} ${styles['loading']}`}>
            <div className={styles['table-controls']}>
                <div className={styles['pagination']}>
                    <button >Previous</button>
                    <button>Next</button>
                </div>

                <div className={styles['filters']}>
                    <button>Filter by marketcap</button>
                    <button>Filter by change %</button>
                    <button>Filter by currency</button>
                </div>
            </div>
            <div className={styles['trending-table']}>
                <div className={styles['table-header']}>
                    <div>#</div>
                    <div>Name</div>
                    <div>Price</div>
                    <div>Change</div>
                    <div>Market Cap</div>
                </div>

                {stocks.data.map((stock, index) => <TableCellEmpty key={index} stock={stock} index={index + 1} />)}
            </div>
        </div>
    )
}

export default StockTableLoading