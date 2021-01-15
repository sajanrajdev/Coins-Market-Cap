import React, { useEffect, useState } from "react";
import './App.css';
import CoinTable from './Cointable.js';

var defaultCurrency = 'USD';

function App() {
  const [coindata, setCoindata] = useState([]);
  const [coindataDefault, setCoindataDefault] = useState([]);
  const [currency, setCurrency] = useState(defaultCurrency);
  const [searchval, setSearchval] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [paglimit, setPaglimit] = useState(1);
  

  // Function to fetch coin data based on a currency input
  const fetchData = (currency, page) => {
    var url = new URL ("https://api.coingecko.com/api/v3/coins/markets"),
    params = {vs_currency: currency, price_change_percentage: '1h,24h,7d', page: page, per_page:100}
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
      fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCoindata(data);
        setCoindataDefault(data);       
    });
  }

    // Function to fetch coin data and set pagination limit from list size
    const fetchCoinListLength = () => {
      var url = new URL ("https://api.coingecko.com/api/v3/coins/list")
        fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setPaglimit(Math.round(data.length/100));     
        });
    }

  // On Mount 
  useEffect(()=>{
    fetchData(currency, currentPage);
    fetchCoinListLength();
  }, []);

  // Updates table tada upon new search value input
  const searchUpdate = async (searchval) => {
    const filteredData = coindataDefault.filter(coin => {
     return coin.id.toLowerCase().includes(searchval.toLowerCase())
    })
    setSearchval(searchval);
    setCoindata(filteredData);
  }

  // Fetches new data based on currency input
  const currencyUpdate = async (currency) => {
    setCurrency(currency);
    setCurrentPage(1);
    fetchData(currency, currentPage);
  }

  // Updates currentPage and its respective data
  const pageUpdate = async (direction) => {
    if(direction=='next'){
      setCurrentPage(currentPage+1);
      fetchData(currency, currentPage+1);
    }
    else{
      setCurrentPage(currentPage-1);
      fetchData(currency, currentPage-1);
    }
  }

  return (
  <div className="App">
    <header>
      <h1>
        Coins Market Cap
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
            <div className="btn-group col-md-1" role="group">
              <button type="button" className="btn btn-outline-secondary" disabled={currentPage==1} value={"previous"} onClick={(e) => pageUpdate("previous")}><b>{"<"}</b></button>
              <button type="button" className="btn btn-outline-secondary" disabled={currentPage==61} value={"next"} onClick={(e) => pageUpdate("next")}><b>{">"}</b></button>
            </div> 
        </div>
      </form> 
      
      <CoinTable coindata={coindata} currency={currency}/>
      <div className="btn-group col-md-1" role="group">
        <button type="button" className="btn btn-outline-secondary" disabled={currentPage==1} value={"previous"} onClick={(e) => pageUpdate("previous")}><b>{"<"}</b></button>
        <button type="button" className="btn btn-outline-secondary" disabled={currentPage==paglimit} value={"next"} onClick={(e) => pageUpdate("next")}><b>{">"}</b></button>
      </div> 
    </div>
  </div>
  );
}

export default App;
