import { ChangeEvent, useState } from 'react'
import CurrencyInput, { CurrencyInputOnChangeValues } from 'react-currency-input-field'

interface ConverterCardProps {
  country: {
    name: string
    shortName: string
    currency: string
    amount?: string | undefined
  }
}

export default function ConverterCard({ country }: ConverterCardProps) {
  const [value, setValue] = useState<string | undefined>(country.amount)

  const onNumberChange = (
    value: string | undefined,
    name?: string,
    values?: CurrencyInputOnChangeValues
  ) => {
    setValue(value)
  }

  return (
    <div key={country.shortName} className="flex gap-2 w-3/4">
      <img src={`https://flagsapi.com/${country.shortName}/shiny/64.png`} alt={country.name} />
      <CurrencyInput
        id={`country-${country.shortName}`}
        name={`country-${country.name}`}
        placeholder="Please enter a value"
        defaultValue={value}
        decimalsLimit={2}
        onValueChange={onNumberChange}
        className="outline-none rounded-2xl bg-slate-300 p-4"
      />
      <span className="font-bold text-lg self-center">{country.currency}</span>
    </div>
  )
}
