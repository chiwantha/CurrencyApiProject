import React , {useEffect, useState} from 'react'
import axios from "axios";

export default function MainPage() {

  //state for the form fields ( store values )
  const [date, setdate] = useState(null);
  const [saurceCurrency, setsaurceCurrency] = useState("");
  const [targetCurrency, settargetCurrency] = useState("");
  const [amountInsaurceCurrency, setamountInsaurceCurrency] = useState(0);
  const [amountIntargetCurrency, setamountIntargetCurrency] = useState(0);
  const [currencyNames, setcurrencyNames] = useState([]);
  const [loading, setLoading] = useState(true);

  // use effect to get currency names
  useEffect(()=>{
    const getCurrencyNames = async()=>{
      try{

        const response = await axios.get(
          "http://localhost:5000/getAllCurrencies"
        );
        setcurrencyNames(response.data);

      } 
      catch(err){
        console.error(err);
      }
    }
    getCurrencyNames();
  }, [])

  //handle submit method

  const handleSubmit = async(e)=>{
    e.preventDefault();
    console.log(
      date,
      saurceCurrency,
      targetCurrency,
      amountInsaurceCurrency
    )

    try{
      const response = await axios.get(
        "http://localhost:5000/convert", {
          params:{
            date,
            saurceCurrency,
            targetCurrency,
            amountInsaurceCurrency
          }
        }
      );
      setamountIntargetCurrency(response.data);
      setLoading(false);
    }catch(err){
      console.error(err);
    }
  }

  return (
    <div>
        <h1 className='lg:mx-32 text-5xl font-bold text-green-500'>Convert Your Currenciew Today</h1>
        <p className='lg:mx-32 opacity-40 py-6'>
          Welcome to K-Currency_Convertor! Easily convert between currencies with real-time exchange rates.
          Whether you're traveling, shopping online, or managing finances, K-Currency_Convertor 
          provides fast and accurate conversions at your fingertips. Stay updated
          with the latest rates, and switch between multiple currencies effortlessly. Simplify your global transactions today with K-Currency_Convertor!
        </p>

        <div className='mt-5 flex items-center justify-center flex-col'>
          <section className='w-full lg:w-1/2'>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor={date} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date</label>
                <input onChange={(e)=>setdate(e.target.value)}
                 id={date} name={date} type="date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                focus:ring-green-500 focus:border-green-500 block w-full p-2.5
                  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                  dark:focus:ring-green-500 dark:focus:border-green-500" required />
              </div>
              <div className="mb-4">
                <label htmlFor="saurceCurrency" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Source Currency
                </label>
                <select
                  onChange={(e) => setsaurceCurrency(e.target.value)} 
                  name="saurceCurrency"
                  id="saurceCurrency"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                  value={saurceCurrency}
                >
                  <option value="">Select Source Currency</option>
                  {Object.keys(currencyNames).map((currency) => (
                    <option className='p-1' key={currency} value={currency}>
                      {currencyNames[currency]}
                    </option>
                  ))}
                  {/* Add other options here */}
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="targetCurrency" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Target Currency
                </label>
                <select
                  onChange={(e) => settargetCurrency(e.target.value)}
                  name="targetCurrency"
                  id="targetCurrency"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                  value={targetCurrency}
                >
                  <option value="">Select Target Currency</option>
                  {Object.keys(currencyNames).map((currency) => (
                    <option className='p-1' key={currency} value={currency}>
                      {currencyNames[currency]}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor={amountInsaurceCurrency} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Amount in Saurce Currency</label>
                <input onChange={(e)=>setamountInsaurceCurrency(e.target.value)}
                 id={amountInsaurceCurrency} name={amountInsaurceCurrency} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                focus:ring-green-500 focus:border-green-500 block w-full p-2.5
                  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                  dark:focus:ring-green-500 dark:focus:border-green-500" placeholder='Amount in Saurce Currency' value={amountInsaurceCurrency} required />
              </div>
              <button className='bg-green-500 hover:bg-green-700
               text-white font-medium py-2 px-4 rounded-md'>Get the Target Currency</button>
            </form>

            {!loading ?(
              <section className='mt-10 text-xl'>
                {amountInsaurceCurrency} {currencyNames[saurceCurrency]} is equals to {" "}
                <span className='text-green-500'>{amountIntargetCurrency}</span> in {currencyNames[targetCurrency]}
              </section>
            ) : (
              null
            )}

          </section>
        </div>
    </div>
  )
}
