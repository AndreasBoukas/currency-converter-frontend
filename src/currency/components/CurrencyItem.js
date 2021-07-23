import React from "react";

import Avatar from "../../shared/components/UIELEMENTS/Avatar";
import Card from "../../shared/components/UIELEMENTS/Card";
import "./CurrencyList";

const CurrencyItem = (props) => {
  return (
    <li className="currency-item">
      <Card className="currency-item__content">
        <div className="currency-item__image">
          <Avatar image={props.image} alt={props.title} />
        </div>
        <div className="currency-item__info">
          <h2>{props.title}</h2>
          <h3>Exchange Rate: {props.exchangeRate}</h3>
        </div>
      </Card>
    </li>
  );
};

export default CurrencyItem;
