import React, { useState } from "react";

import Card from "../../shared/components/UIELEMENTS/Card";
import Button from "../../shared/components/FormElements/Button";
import "./CurrenctConvert.css";

const CurrencyConvert = () => {
  //exchange rate is based on euro for example 0.7265USD to buy 1 Euro
  const CURRENCY = [
    {
      id: "c1",
      label: "US Dollar",
      image: "",
      exchangeRate: 0.7265,
    },
    {
      id: "c2",
      label: "Euro",
      image: "",
      exchangeRate: 1,
    },
    {
      id: "c3",
      label: "JPY",
      image: "",
      exchangeRate: 0.0094, // 1 euro is 1/0.0094 = 106.38JPY
    },
  ];

  const [firstSelectedCurrency, setFirstSelectedCurrency] =
    useState("Select a Currency");
  const [secondSelectedCurrency, setSecondSelectedCurrency] =
    useState("Select a Currency");

  const firstCurrencyChangeHandler = (event) => {
    console.log(event.target.value);
    setFirstSelectedCurrency(event.target.value);
  };

  const secondCurrencyChangeHandler = (event) => {
    console.log(event.target.value);
    setSecondSelectedCurrency(event.target.value);
  };

  const convertSubmitHandler = (event) => {
    event.preventDefault();
    console.log(firstSelectedCurrency);
    console.log(secondSelectedCurrency);
  };

  return (
    <Card className="currency-list">
      <h2>{firstSelectedCurrency}</h2>
      <h2>{secondSelectedCurrency}</h2>
      <br />
      <form onSubmit={convertSubmitHandler}>
        <select onChange={firstCurrencyChangeHandler}>
          <option value="Select a Currency">-- Select a Currency --</option>
          {CURRENCY.map((firstSelectedCurrency) => (
            <option
              key={firstSelectedCurrency.id}
              value={firstSelectedCurrency.id}
            >
              {firstSelectedCurrency.label}
            </option>
          ))}
        </select>
        <select onChange={secondCurrencyChangeHandler}>
          <option value="Select a Currency">-- Select a Currency --</option>
          {CURRENCY.map((secondSelectedCurrency) => (
            <option
              key={secondSelectedCurrency.id}
              value={secondSelectedCurrency.label}
            >
              {secondSelectedCurrency.label}
            </option>
          ))}
        </select>
        <Button type="submit">Convert</Button>
      </form>
    </Card>
  );
};

export default CurrencyConvert;
