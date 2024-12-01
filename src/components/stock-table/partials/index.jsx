import styles from '../index.module.css'
import propTypes from 'prop-types'

export const TableCell = ({ stock, index, onClick, onHover, pagination = { limit: 10, page: 1 } }) => {
    const { symbol, regularMarketPrice, regularMarketChangePercent, regularMarketChange, marketCap, currency, quoteType } = stock;
    const calcIndex = (pagination.page - 1) * pagination.limit + index;

    let price = isNaN(regularMarketPrice) ? 'N/a' : Intl.NumberFormat('en-US', { style: 'currency', currency: currency }).format(regularMarketPrice);
    if (quoteType === 'CRYPTOCURRENCY') price = currency + ' ' + regularMarketPrice.toFixed(8);

    const cap = isNaN(marketCap) ? 'N/a' : Intl.NumberFormat('en-US', { style: 'currency', currency: currency }).format(marketCap);

    return (
        <div className={styles['table-cell']} onClick={() => onClick(stock)}>
            <div className={styles['table-cell-index']}>{calcIndex}</div>
            <div className={styles['table-cell-img']}>
                <img src={quoteType === 'CRYPTOCURRENCY' ? stock.coinImageUrl : ''} alt="thumbnail n/a" />
            </div>
            <div className={styles['table-cell-name']} onMouseEnter={() => onHover(stock)} onMouseLeave={() => onHover(null)}>{symbol}</div>
            <div className={styles['table-cell-price']}>{price}</div>
            <ChangeDisplay changePercent={regularMarketChangePercent} changeCapital={regularMarketChange} />
            <div className={styles['table-cell-volume']}>{cap}</div>
            <div>{quoteType}</div>
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

export const ChangeDisplay = ({ changePercent = 0, changeCapital = 0 }) => {
    const style = { color: changePercent > 0 ? 'green' : 'red' };
    const percentage = changePercent.toFixed(3);
    const capital = changeCapital.toFixed(3);

    return (
        <div className={styles['table-cell-change']}>
            <div style={style} >{percentage}%</div>
            :
            <div style={style} >{capital}</div>
        </div>
    )
}

ChangeDisplay.propTypes = {
    changePercent: propTypes.number.isRequired,
    changeCapital: propTypes.number.isRequired,
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
