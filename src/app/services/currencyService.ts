import axios from 'axios'
const mockResult = {
  success: true,
  timestamp: 1720195024,
  base: 'EUR',
  date: '2024-07-05',
  rates: {
    AUD: 1.60608,
    BRL: 5.936225,
    CAD: 1.476428,
    USD: 1.231,
  },
}

const CurrencyService = {
  apiKey: process.env.CURRENCY_API,
  baseUrl: process.env.CURRENCY_BASE_URL,

  allCurrencyRates: {},
  cachedRates: new Map(),

  getAllCurrencyRates: async function (baseCurrency: string) {
    try {
      const options = {
        method: 'GET',
        url: `${this.baseUrl}/latest?access_key=${this.apiKey}`,
        params: {
          base: baseCurrency,
        },
      }
      //   const response = await axios.request(options)
      //   this.currencyRates = response.data.rates
      this.allCurrencyRates = mockResult
    } catch (error) {
      console.error('Error fetching currency rates:', error)
    }
  },

  getCurrencyBySymbol: async function (symbols: string[]) {
    const options = {
      method: 'GET',
      url: `${this.baseUrl}/latest?access_key=${this.apiKey}`,
      params: {
        symbols: symbols.join(', '),
      },
    }
  },

  getCachedRates: () => {},
}

export default CurrencyService
