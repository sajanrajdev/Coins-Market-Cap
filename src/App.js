import React, { useEffect, useState } from "react";
import './App.css';
import CoinTable from './Cointable.js';

var defaultCurrency = 'USD';

var renderedData = [];

function App() {
  const [coindata, setCoindata] = useState([]);
  const [coindataDefault, setCoindataDefault] = useState([]);
  const [currency, setCurrency] = useState(defaultCurrency);
  const [searchval, setSearchval] = useState("");
  

  // Function to fetch coin data based on a currency input
  const fetchData = (currency) => {
    var url = new URL ("https://api.coingecko.com/api/v3/coins/markets"),
    params = {vs_currency: currency, price_change_percentage: '1h,24h,7d'}
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
      fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCoindata(data);
        setCoindataDefault(data);       
    });
    renderedData = coindata;
  }

  // On Mount 
  useEffect(()=>{
    fetchData(currency);
  }, []);

  // Updates table tada upon new search value input
  const searchUpdate = async (searchval) => {
    const filteredData = coindataDefault.filter(coin => {
     return coin.id.toLowerCase().includes(searchval.toLowerCase())
    })
    setSearchval(searchval);
    setCoindata(filteredData);
    console.log(searchval)
 }

 const currencyUpdate = async (currency) => {
  setCurrency(currency);
  fetchData(currency);
}

  return (
  <div className="App">
    <header>
      <h1>
        Top 100 Coins by Market Cap
      </h1>
    </header>
    <div className="container">
    <form>
        <div className="form-row">
          <div className="form-group col-md-6">
            <input key="random1" id="search-input" className="form-control" type="text" placeholder="Search by name..." value={searchval} onChange={(e) => searchUpdate(e.target.value)}/>
          </div>
          <div className="form-group col-md-4">
            <select id="currency-input" className="form-control" value={currency} onChange={(e) => currencyUpdate(e.target.value)}>
              <optgroup label="Fiat Currencies">
                <option>USD</option>
                <option>EUR</option>
                <option>MXN</option>
                <option>CAD</option>
                <option>GBP</option>
                <option>JPY</option>
                <option>RUB</option>
                <option>IDR</option>
                <option>KRW</option>
                <option>CNY</option>
                <option>TWD</option>
              </optgroup>
              <optgroup label="Cryptocurrencies">
                <option>BTC</option>
                <option>BCH</option>
                <option>ETH</option>
                <option>XRP</option>
                <option>DOT</option>
                <option>BNB</option>               
                <option>XLM</option>
                <option>YFI</option>
                <option>LTC</option>
                <option>EOS</option>
              </optgroup>
            </select>
          </div>    
        </div>
      </form> 
      <CoinTable coindata={coindata} currency={currency}/>
    </div>
  </div>
  );
}

export default App;
