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

  export {percentageFormatter, currencyFormatter, capitalize}