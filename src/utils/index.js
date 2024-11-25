const currencySigns = await import('../data/currency-signs.json')
export const returnCurrencySign = (currency) => currencySigns[currency] || currency;

export { default as LocalStorageCache } from './cache';

export const convertDate = (date) => {
    // we need to convert the date to a string that the server can understand 
    // YYYY-MM-DD (2021-09-01)
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return `${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}`;
}
