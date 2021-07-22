import React from "react";

const CurrencyItem = (props) => {
  let currencyName = props.currencyName;

  const createCurrItems = () => {
    let currItems = [];
    for (let i = 0; i < props.items.length; i++) {
      currItems.push(
        <option key={i} value={props.items.i}>
          {props.items.label}
        </option>
      );
      return currItems;
    }
  };

  return <option>{currencyName}</option>;
};

export default CurrencyItem;
