import React, { useState, useEffect } from "react";
import axios from "axios";

const CurrencyConverter = () => {
  const [currencies, setCurrencies] = useState([]);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [amount, setAmount] = useState(1);
  const [exchangeRate, setExchangeRate] = useState(1);
  const [result, setResult] = useState(0);

  useEffect(() => {
    axios
      .get("https://api.exchangerate-api.com/v4/latest/USD")
      .then((response) => {
        const currencyArray = Object.keys(response.data.rates);
        setCurrencies(currencyArray);
        setExchangeRate(response.data.rates[toCurrency]);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [toCurrency]);

  useEffect(() => {
    setResult((amount * exchangeRate).toFixed(2));
  }, [amount, exchangeRate]);

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleFromCurrencyChange = (e) => {
    setFromCurrency(e.target.value);
  };

  const handleToCurrencyChange = (e) => {
    setToCurrency(e.target.value);
  };

  const handleConvert = () => {
    axios
      .get(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
      .then((response) => {
        const rate = response.data.rates[toCurrency];
        setExchangeRate(rate);
        setResult((amount * rate).toFixed(2));
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  return (
    <div>
      <h2>Currency Converter</h2>
      <div>
        <input
          type="number"
          value={amount}
          onChange={handleAmountChange}
        />
        <select value={fromCurrency} onChange={handleFromCurrencyChange}>
          {currencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
        <span> to </span>
        <select value={toCurrency} onChange={handleToCurrencyChange}>
          {currencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
        <button onClick={handleConvert}>Convert</button>
      </div>
      <h3>
        {amount} {fromCurrency} = {result} {toCurrency}
      </h3>
    </div>
  );
};

export default CurrencyConverter;
