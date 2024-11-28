import styles from '../index.module.css'
import propTypes from 'prop-types'


export const TableCell = ({ stock, index, onClick, onHover, pagination = { limit: 10, page: 1 } }) => {
    const { symbol, regularMarketPrice, regularMarketChangePercent, marketCap, currency } = stock;
    const calcIndex = (pagination.page - 1) * pagination.limit + index;

    const price = isNaN(regularMarketPrice) ? 'N/a' : Intl.NumberFormat('en-US', { style: 'currency', currency: currency }).format(regularMarketPrice);
    const cap = isNaN(marketCap) ? 'N/a' : Intl.NumberFormat('en-US', { style: 'currency', currency: currency }).format(marketCap);

    return (
        <div className={styles['table-cell']} onClick={() => onClick(stock)}>
            <div className={styles['table-cell-index']}>{calcIndex}</div>
            <div className={styles['table-cell-name']}  onMouseEnter={() => onHover(stock)} onMouseLeave={() => onHover(null)}>{symbol}</div>
            <div className={styles['table-cell-price']}>{price}</div>
            <div className={styles['table-cell-change']} style={{ color: regularMarketChangePercent > 0 ? 'green' : 'red' }}>{regularMarketChangePercent?.toFixed(3) + '%' || 'N/a'}</div>
            <div className={styles['table-cell-volume']}>{cap}</div>
        </div>
    )    
}


export const TableCellEmpty = () => {
    return (
        <div className={styles['table-cell']}>
            <div className={styles['table-cell-index']}></div>
            <div className={styles['table-cell-name']} ></div>
            <div className={styles['table-cell-price']}></div>
            <div className={styles['table-cell-change']}></div>
            <div className={styles['table-cell-volume']}></div>
        </div>
    )    
} 


TableCell.propTypes = {
    stock: propTypes.object.isRequired,
    index: propTypes.number.isRequired,
    onClick: propTypes.func.isRequired,
    onHover: propTypes.func.isRequired,
    pagination: propTypes.object.isRequired,
}