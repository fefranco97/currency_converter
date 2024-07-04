'use client'

import ConverterCard from './components/converterCard'
export default function Home() {
  const countryToConvert = [
    {
      name: 'Brazil',
      shortName: 'BR',
      currency: 'BRL',
      amount: '100',
    },
    {
      name: 'Canada',
      shortName: 'CA',
      currency: 'CAD',
    },
    {
      name: 'United States',
      shortName: 'US',
      currency: 'USD',
    },
  ]
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-12 ">
      <div className="border rounded-xl p-8 w-fit shadow-2xl bg-slate-200">
        <h1 className="text-center text-3xl font-bold mb-8">Currency converter</h1>
        <div className="flex flex-col gap-4">
          {countryToConvert.map((country) => {
            return <ConverterCard key={country.shortName} country={country} />
          })}
        </div>
      </div>
    </main>
  )
}
