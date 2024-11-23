const currencySigns = await import('../data/currency-signs.json')
export const returnCurrencySign = (currency) => currencySigns[currency] || currency;