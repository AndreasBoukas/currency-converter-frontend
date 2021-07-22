import React, { useState } from "react";

import CurrencyItem from "./CurrencyItem";

const CurrencyList = (props) => {

    let [currency, setCurrency] = useState("Select a Currency")

    let currencyChangeHandler = (event) => {
        setCurrency(event.target.label)
    }

  return (
    <div>
        {currency}
        <br />
        <option></option>
    </div>
  );
};

export default CurrencyList;
