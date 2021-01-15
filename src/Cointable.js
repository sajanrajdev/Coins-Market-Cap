import React from 'react';
import {percentageFormatter, currencyFormatter, capitalize} from './utils.js';

const CoinTable = ({coindata, currency}) => {
  const [filterState, setFiterState] = React.useState();
    return (
    <table className="table table-hover">
            <thead>
            <tr className="big-info">
                <th>#</th>
                <th onClick={(e) => console.log(order)} order='desc'>Coin</th>
                <th>Symbol</th>
                <th>Price</th>
                <th>1h</th>
                <th>24h</th>
                <th>7d</th>
                <th>MKT Cap</th>
                <th>24h</th>
            </tr>
            </thead>
            <tbody>
            {coindata.map(coin => (
                <tr key={coin.id}>
                <td>{coin.market_cap_rank}</td>
                <td align="left">
                <img 
                    src={coin.image} 
                    style={{width: 18, height: 18, marginRight: 20}} 
                    />
                    <b>{capitalize(coin.id)}</b>
                </td>
                <td>
                    {coin.symbol.toUpperCase()}
                </td>
                <td>
                    {currencyFormatter(coin.current_price, currency)}
                </td>
                <td className={(coin.price_change_percentage_1h_in_currency != "NULL" && coin.price_change_percentage_1h_in_currency > 0) ? "text-success" : "text-danger"}> 
                    {percentageFormatter(coin.price_change_percentage_1h_in_currency)}
                </td>
                <td className={(coin.price_change_percentage_24h_in_currency != "NULL" && coin.price_change_percentage_24h_in_currency > 0) ? "text-success" : "text-danger"}> 
                    {percentageFormatter(coin.price_change_percentage_24h_in_currency)}
                </td>
                <td className={(coin.price_change_percentage_7d_in_currency != "NULL" && coin.price_change_percentage_7d_in_currency > 0) ? "text-success" : "text-danger"}> 
                    {percentageFormatter(coin.price_change_percentage_7d_in_currency)}
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
    );
  }
  
  export default CoinTable