import propTypes from 'prop-types'
import { TableCell } from "./partials"

import styles from './index.module.css'

function StockTable({ stocks = [], onStockClick = () => { }, onStockHover = () => { }, pagination = { limit: 10, page: 1 }, setPagination = () => { } }) {
  if (!stocks) return null;
  if (!stocks.length) return <div>Loading...</div>

  return (
    <div className={styles['table-wrapper']}>
      <div className={styles['table-controls']}>
        <div className={styles['pagination']}>
          <button onClick={() => setPagination({ ...pagination, page: pagination.page - 1 })} disabled={pagination.page === 1}>Previous</button>
          <button onClick={() => setPagination({ ...pagination, page: pagination.page + 1 })} disabled={pagination.page === Math.ceil(pagination.count / pagination.limit)}>Next</button>
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

        {stocks.map((stock, index) => <TableCell key={stock.symbol} stock={stock} index={index + 1} onClick={onStockClick} onHover={onStockHover} pagination={pagination} />)}
      </div>
      <p>{pagination.page} of {Math.ceil(pagination.count / pagination.limit)}</p>
    </div>
  )
}

StockTable.propTypes = {
  stocks: propTypes.array,
  onStockClick: propTypes.func,
  onStockHover: propTypes.func,
  pagination: propTypes.object,
  setPagination: propTypes.func,
}

export default StockTable