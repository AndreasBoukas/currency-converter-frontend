import React, { useState, useEffect } from "react";

import CurrencyDropdown from "../components/CurrencyDropdown";
import Card from "../../shared/components/UIELEMENTS/Card";
import Input from "../../shared/components/FormElements/Input";
import { useForm } from "../../shared/hooks/form-hook";
import { VALIDATOR_NUMBER } from "../../shared/util/validators";
import { useHttpClient } from "../../shared/hooks/http-hook";
import "./CurrencyConvert.css";

const CurrencyConvert = () => {
  //exchange rate is based on euro for example 0.7265USD to buy 1 Euro

  const [formState, inputHandler, setFormData] = useForm(
    {
      amount: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const [firstSelectedCurrency, setFirstSelectedCurrency] = useState([
    0,
    "Select a Currency",
  ]);
  const [secondSelectedCurrency, setSecondSelectedCurrency] = useState([
    0,
    "Select a Currency",
  ]);

  const firstCurrencyChangeHandler = (event) => {
    //The selection returns a string with all the data seperated by a comma.
    //The data is converted to an object
    const arrayData = event.target.value.split(",");
    setFirstSelectedCurrency(arrayData); //Currency name)
  };

  const secondCurrencyChangeHandler = (event) => {
    const arrayData = event.target.value.split(",");
    setSecondSelectedCurrency(arrayData);
  };

  //Converts the Currencies and rounds the result to 4 decimal places
  const ConvertRound = (amount, firstValue, secondValue) => {
    if (firstValue == 1) {
      const result = amount * secondValue;
      const roundResult = Math.round((result + Number.EPSILON) * 10000) / 10000;
      console.log(roundResult);
      return roundResult;
    } else if (secondValue == 1) {
      const result = amount * (secondValue / firstValue);
      const roundResult = Math.round((result + Number.EPSILON) * 10000) / 10000;
      console.log(roundResult);
      return roundResult;
    } else {
      const result = amount * (secondValue / firstValue);
      const roundResult = Math.round((result + Number.EPSILON) * 10000) / 10000;
      console.log(roundResult);
      return roundResult;
    }
  };

  return (
    <React.Fragment>
      <Card className="currency-convert">
        <div className="currency-convert__selection-result">
          <h2>Select a Currency</h2>
        </div>
        <br />
        <form>
          <Input
            id="amount"
            element="input"
            type="text"
            label="Amount"
            validators={[VALIDATOR_NUMBER()]}
            errorText="Please enter an valid amount"
            onInput={inputHandler}
          />
          <CurrencyDropdown
            currency={firstSelectedCurrency}
            onChange={firstCurrencyChangeHandler}
          />

          <CurrencyDropdown
            currency={secondSelectedCurrency}
            onChange={secondCurrencyChangeHandler}
          />
        </form>
        <div className="result-div">
          {formState.inputs.amount.isValid &&
            firstSelectedCurrency[1] !== "Select a Currency" &&
            secondSelectedCurrency[1] !== "Select a Currency" && (
              <React.Fragment>
                <h3>
                  {formState.inputs.amount.value} {firstSelectedCurrency[1]} ={" "}
                  {ConvertRound(
                    formState.inputs.amount.value,
                    firstSelectedCurrency[0],
                    secondSelectedCurrency[0]
                  )}{" "}
                  {secondSelectedCurrency[1]}
                </h3>
                <br />
                <p>
                  {formState.inputs.amount.value} {secondSelectedCurrency[1]} ={" "}
                  {ConvertRound(
                    formState.inputs.amount.value,
                    secondSelectedCurrency[0],
                    firstSelectedCurrency[0]
                  )}{" "}
                  {firstSelectedCurrency[1]}
                </p>
              </React.Fragment>
            )}
        </div>
      </Card>
    </React.Fragment>
  );
};

export default CurrencyConvert;
