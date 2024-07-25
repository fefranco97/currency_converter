'use client'

import { ChangeEvent, useEffect, useState } from 'react'
import { HiArrowsRightLeft } from 'react-icons/hi2'
import CurrencyDropdown from './ui/CurrencyDropdown'
import CurrencyInput from 'react-currency-input-field'

const CurrencyConverter = () => {
  const [currencies, setCurrencies] = useState<any>([])
  const [amount, setAmount] = useState<string | undefined>('1')
  const [fromCurrency, setFromCurrency] = useState<string>('BRL')
  const [toCurrency, setToCurrency] = useState<string>('CAD')
  const [convertedAmount, setConvertedAmount] = useState<any>(null)
  const [converting, setConverting] = useState<boolean>(false)

  const fetchCurrencies = async () => {
    try {
      const res = await fetch('https://api.frankfurter.app/currencies')
      const data = await res.json()

      setCurrencies(Object.keys(data))
    } catch (error) {
      console.error('Error Fetching', error)
    }
  }

  useEffect(() => {
    fetchCurrencies()
  }, [])

  const convertCurrency = async () => {
    if (!amount) return
    setConverting(true)
    try {
      const res = await fetch(
        `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`
      )
      const data = await res.json()
      setConvertedAmount(data.rates[toCurrency] + ' ' + toCurrency)
    } catch (error) {
      console.error('Error Fetching', error)
    } finally {
      setConverting(false)
    }
  }

  const swapCurrencies = () => {
    setFromCurrency(toCurrency)
    setToCurrency(fromCurrency)
  }

  const onNumberChange = (_value: string | undefined) => {
    setAmount(_value)
  }

  return (
    <div className="max-w-2xl mx-auto my-10 p-5 bg-white rounded-xl shadow-md">
      <h2 className="mb-5 text-2xl font-semibold text-gray-700">Currency Converter</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
        <CurrencyDropdown
          currencies={currencies}
          title="From:"
          currency={fromCurrency}
          setCurrency={setFromCurrency}
        />
        <div className="flex justify-center -mb-5 sm:mb-0">
          <button
            onClick={swapCurrencies}
            className="p-2 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300">
            <HiArrowsRightLeft className="text-xl text-gray-700" />
          </button>
        </div>
        <CurrencyDropdown
          currencies={currencies}
          currency={toCurrency}
          setCurrency={setToCurrency}
          title="To:"
        />
      </div>

      <div className="mt-4">
        <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
          Amount:
        </label>
        <CurrencyInput
          intlConfig={{ locale: 'pt-BR', currency: 'BRL' }}
          id={`country-BRL`}
          name={`country-BRL`}
          placeholder="Please enter a value"
          defaultValue={amount}
          decimalsLimit={2}
          decimalScale={2}
          onValueChange={onNumberChange}
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 mt-1"
        />
      </div>

      <div className="flex justify-end mt-6">
        <button
          onClick={convertCurrency}
          className={`px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
          ${converting ? 'animate-pulse' : ''}`}>
          Convert
        </button>
      </div>

      {convertedAmount && (
        <div className="mt-4 text-lg font-medium text-right text-green-600">
          Converted Amount: {convertedAmount}
        </div>
      )}
    </div>
  )
}

export default CurrencyConverter
