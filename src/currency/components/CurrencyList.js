import React from "react";

import CurrencyItem from "./CurrencyItem";
import Card from "../../shared/components/UIELEMENTS/Card";
import "./CurrencyList.css";

//This component is a list of all currencies
const CurrencyList = (props) => {
  //either message no users found
  //or list of our users
  // expect to get array data from props
  if (props.items.length === 0) {
    return (
      <div className="center">
        <Card>
          <h2>No Currencies found</h2>
        </Card>
      </div>
    );
  }

  return (
    <React.Fragment>
      <ul className="currency-list">
        {props.items.map((currency) => (
          <CurrencyItem
            key={currency.id}
            id={currency._id}
            // image={currency.image}
            title={currency.title}
            exchangeRate={currency.exchangeRate}
            onDelete={props.onDeleteCurrency}
          />
        ))}
      </ul>
    </React.Fragment>
  );
};

export default CurrencyList;
