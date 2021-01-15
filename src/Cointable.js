import React from 'react';
import {percentageFormatter, currencyFormatter, capitalize} from './utils.js';

const CoinTable = ({coindata, currency}) => {
    return (
    <table className="table table-hover">
            <thead>
            <tr className="big-info">
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
                <td align="left">
                <img 
                    src={coin.image} 
                    style={{width: 18, height: 18, marginRight: 10}} 
                    />
                    <b>{capitalize(coin.id)}</b>
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
    );
  }
  
  export default CoinTable