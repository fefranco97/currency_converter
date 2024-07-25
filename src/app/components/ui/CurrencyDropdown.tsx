/* eslint-disable react/prop-types */
import { ChangeEvent } from 'react'

const CurrencyDropdown = ({
  currencies,
  currency,
  setCurrency,
  title = '',
}: {
  currencies: any[]
  currency: string
  setCurrency: (value: string) => void
  title: string
}) => {
  return (
    <div>
      <label htmlFor={title} className="block text-sm font-medium text-gray-700">
        {title}
      </label>

      <div className="mt-1 relative">
        <select
          value={currency}
          onChange={(e: ChangeEvent<HTMLSelectElement>) => setCurrency(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
          {currencies.map((currency) => {
            return (
              <option value={currency} key={currency}>
                {currency}
              </option>
            )
          })}
        </select>
      </div>
    </div>
  )
}

export default CurrencyDropdown
