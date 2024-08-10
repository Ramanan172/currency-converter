import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('LKR');
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [exchangeRate, setExchangeRate] = useState(null);

  useEffect(() => {
    const getExchangeRate = async () => {
      try {
        // Fetch rates from the API
        const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
        const rates = response.data.rates;
        
        // Calculate the rate from `fromCurrency` to `toCurrency`
        const rate = rates[toCurrency];
        setExchangeRate(rate);
        
        // Update the converted amount
        setConvertedAmount((amount * rate).toFixed(2));
      } catch (error) {
        console.error('Error fetching exchange rate:', error);
      }
    };

    getExchangeRate();
  }, [fromCurrency, toCurrency, amount]); // Add `amount` to dependencies to recalculate on change

  const handleAmountChange = (e) => {
    const value = parseFloat(e.target.value);
    setAmount(isNaN(value) ? 0 : value);
  };

  const handleFromCurrencyChange = (e) => {
    setFromCurrency(e.target.value);
  };

  const handleToCurrencyChange = (e) => {
    setToCurrency(e.target.value);
  };

  return (
    <>
      <div className='currency-converter'>
        <div className='box'></div>
        <div className='data'>
          <h1>Currency Converter</h1>
          <div className='input-container'>
            <label htmlFor='amt'>Amount:</label>
            <input type='number' id='amt' value={amount} onChange={handleAmountChange} />
          </div>
          <div className='input-container'>
            <label htmlFor='fromCurrency'>From Currency:</label>
            <select id='fromCurrency' value={fromCurrency} onChange={handleFromCurrencyChange}>
              <option value='USD'>USD - United States Dollar</option>
              <option value='EUR'>EUR - Euro</option>
              <option value='GBP'>GBP - British Pound Sterling</option>
              <option value='JPY'>JPY - Japanese Yen</option>
              <option value='AUD'>AUD - Australian Dollar</option>
              <option value='CAD'>CAD - Canadian Dollar</option>
              <option value='LKR'>LKR - Lankan Rupee</option>
              <option value='INR'>INR - Indian Rupee</option>
              <option value='BRL'>BRL - Brazilian Real</option>
              <option value='ZAR'>ZAR - South African Rand</option>
            </select>
          </div>
          <div className='input-container'>
            <label htmlFor='toCurrency'>To Currency:</label>
            <select id='toCurrency' value={toCurrency} onChange={handleToCurrencyChange}>
              <option value='USD'>USD - United States Dollar</option>
              <option value='EUR'>EUR - Euro</option>
              <option value='GBP'>GBP - British Pound Sterling</option>
              <option value='JPY'>JPY - Japanese Yen</option>
              <option value='AUD'>AUD - Australian Dollar</option>
              <option value='CAD'>CAD - Canadian Dollar</option>
              <option value='LKR'>LKR - Lankan Rupee</option>
              <option value='INR'>INR - Indian Rupee</option>
              <option value='BRL'>BRL - Brazilian Real</option>
              <option value='ZAR'>ZAR - South African Rand</option>
            </select>
          </div>
          <div className='result'>
            <p>
              {amount} {fromCurrency} is equal to {convertedAmount} {toCurrency}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
