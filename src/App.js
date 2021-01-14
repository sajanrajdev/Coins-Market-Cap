import React, { useEffect, useState, useCallback } from "react";
import './App.css';

var defaultCurrency = 'usd';

var renderedData = [];

function App() {
  const [coindata, setCoindata] = useState([]);
  const [coindataDefault, setCoindataDefault] = useState([]);
  const [currency, setCurrency] = useState(defaultCurrency);
  const [searchval, setSearchval] = useState("");
  

  // Function to fetch coin data based on a currency input
  const fetchData = (currency) => {
    var url = new URL ("https://api.coingecko.com/api/v3/coins/markets"),
    params = {vs_currency: currency}
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

  // Function to capitalize a string
  const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
  }

  // Function to format integers into a certain currency
  const currencyFormatter = (number, currency) =>
    new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2
  }).format(number);

  // Function to format numbers into 2 decimal point fixed percentages
  const percentageFormatter = (number) => {
    if(number != null){
      var percentage = number.toFixed(2) + "%";
      return percentage;
   } 
   else{
     return "N/A";
   }
  }

/*   // Returns table with IDs containing searched value
  const searchTable = (value, array) => {
    var filteredData = [];
    for(var i=0; i<array.length; i++){
      value = value.toLowerCase();
      var name = array[i].id.toLowerCase();

      if(name.includes(value)){
        filteredData.push(array[i]);
      }
    }
    return filteredData;
  } */

  const updateData = async (searchval) => {
    const filteredData = coindataDefault.filter(coin => {
     return coin.id.toLowerCase().includes(searchval.toLowerCase())
    })
    setSearchval(searchval);
    setCoindata(filteredData);
    console.log(searchval)
 }


 const InputBar = ({input:keyword, onChange:setKeyword}) => {
    //console.log(keyword)
    return(
      <form>
        <div className="form-row">
          <div className="form-group col-md-6">
            <input id="search-input" className="form-control" type="text" placeholder="Search by name..."  value={keyword} onChange={(e) => setKeyword(e.target.value)}/>
          </div>
          <div className="form-group col-md-4">
            <select id="currency-input" className="form-control">
              <option defaultValue>USD</option>
              <option>EUR</option>
              <option>YEN</option>
              <option>JPN</option>
            </select>
          </div>    
        </div>
      </form> 
    )
  }


  return (
  <div className="App">
    <header>
      <h1>
        Top 100 Coins by Market Cap
      </h1>
    </header>
    <div className="container">
    <InputBar value={searchval} onChange={updateData}/>
      <table className="table table-hover">
        <thead>
          <tr>
            <th></th>
            <th>Coin</th>
            <th>Symbol</th>
            <th>Price</th>
            <th>Price 24h</th>
            <th>MKT Cap</th>
            <th>MKT Cap 24h</th>
          </tr>
        </thead>
        <tbody>
        {coindata.map(coin => (
            <tr key={coin.id}>
              <td>
                <img 
                  src={coin.image} 
                  style={{width: 18, height: 18, marginRight: 10}} 
                />
              </td>
              <td>
                {capitalize(coin.id)}
              </td>
              <td>
                {coin.symbol.toUpperCase()}
              </td>
              <td>
                {currencyFormatter(coin.current_price, currency)}
              </td>
              <td className={(coin.price_change_percentage_24h != "NULL" && coin.price_change_percentage_24h > 0) ? "text-success" : "text-danger"}> 
                {percentageFormatter(coin.price_change_percentage_24h)}
              </td>
              <td>
                {currencyFormatter(coin.market_cap, currency)}
              </td>
              <td className={(coin.market_cap_change_percentage_24h != "NULL" && coin.market_cap_change_percentage_24h > 0) ? "text-success" : "text-danger"}> 
                {percentageFormatter(coin.market_cap_change_percentage_24h)}
              </td>
            </tr>
          ))}
        </tbody>
      </table> 
    </div>
  </div>
  );
}

export default App;
