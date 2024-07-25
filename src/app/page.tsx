import CurrencyConvertor from './components/CurrencyConvertor'

export default async function Home() {
  return (
    <div className="bg-gray-100 w-full flex flex-col items-center justify-center">
      <div className="container">
        <CurrencyConvertor />
      </div>
    </div>
  )
}
