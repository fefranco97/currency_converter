import axios from 'axios'

interface Country {
  countryName: string | undefined
  countryCode: string | undefined
  currency: string | undefined
}

const countryService = {
  baseUrl: 'https://restcountries.com/v3.1/',

  cachedCountries: new Map(),

  getCountryByCurrency: async function (currency: string) {
    const options = {
      method: 'GET',
      url: `${this.baseUrl}/currency/${currency}`,
    }
    const response = await axios.request(options)
    console.log(response.data)
  },
  getCountryByName: async function (name: string) {
    const options = {
      method: 'GET',
      url: `${this.baseUrl}/name/${name}`,
    }
    const response = await axios.request(options)
    console.log(response.data)
  },
  getCountryByCode: async function (code: string) {
    const options = {
      method: 'GET',
      url: `${this.baseUrl}/alpha/${code}`,
    }
    const response = await axios.request(options)
    console.log(response.data)
  },

  getCountry: function (countryName: string) {
    return this.cachedCountries.get(countryName)
  },

  createCountry: function (countryName: string, countryCode: string, currency: string): Country {
    if (this.cachedCountries.has(countryName)) {
      return this.cachedCountries.get(countryName)
    } else {
      const newCountry = { countryName, countryCode, currency }
      this.cachedCountries.set(countryName, newCountry)
      return newCountry
    }
  },
}

export default countryService
