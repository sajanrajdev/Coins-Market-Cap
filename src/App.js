import React, { useEffect, useState } from "react";
import './App.css';
import Table from 'react-bootstrap/Table'

var defaultCurrency = 'usd';


function App() {
  const [coindata, setCoindata] = useState();

  var dataArray = [];

  useEffect(()=>{
    dataArray = fetchData(defaultCurrency);
    console.log("tesT:", dataArray);
    buildTable(dataArray, defaultCurrency);
  }, []);

  const fetchData = (defaultCurrency) => {
    var url = new URL ("https://api.coingecko.com/api/v3/coins/markets"),
    params = {vs_currency: defaultCurrency}
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
      fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCoindata(data);
        return data;
    });
  }

  const SearchBar = () => {
    return null;
  }

  const buildTable = (data, currency) => {
    return(
      <Table className="table" striped bordered hover variant="dark">
        <thead>
          <tr>
            <th data-column="image"></th>
            <th data-column="id" data-order="desc">Coin &#9650</th>
            <th data-column="symbol" data-order="desc">Symbol &#9650</th>
            <th data-column="current_price" data-order="desc">Price &#9650</th>
            <th data-column="price_chg" data-order="desc">Price 24h &#9650</th>
            <th data-column="market_cap" data-order="desc">MKT Cap &#9650</th>
            <th data-column="mktcap_chg" data-order="desc">MKT Cap 24h &#9650</th>
          </tr>
        </thead>
        <tbody>
          {data.map(coin => (
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
              <td> 
                {coin.price_change_percentage_24h.toFixed(2) + "%"}
              </td>
              <td>
                {currencyFormatter(coin.market_cap, currency)}
              </td>
              <td>
                {coin.market_cap_change_percentage_24h.toFixed(2) + "%"}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    )
  }

  if(coindata){ //Only calls function once data is fetched
    buildtable(coindata, defaultCurrency);
  } 

  //Function to capitalize a string
  const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
  }

  //Function to format integers into a certain currency
  const currencyFormatter = (number, currency) =>
    new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2
  }).format(number);


  return (
  <div className="App">
    <header>
      Top 100 Coins by Market Cap
    </header>
    <SearchBar/>
  </div>
  );
}

export default App;
