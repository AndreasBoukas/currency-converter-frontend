import React, { useState } from "react";

import CurrencyDropdown from "../components/CurrencyDropdown";
import Card from "../../shared/components/UIELEMENTS/Card";
import Button from "../../shared/components/FormElements/Button";
import Input from "../../shared/components/FormElements/Input";
import { useForm } from "../../shared/hooks/form-hook";
import { VALIDATOR_NUMBER } from "../../shared/util/validators";
import { useHttpClient } from "../../shared/hooks/http-hook";
import "./CurrencyConvert.css";

const CurrencyConvert = () => {
  //exchange rate is based on euro for example 0.7265USD to buy 1 Euro
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

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


  //Rounds the conversion result to 4 decimal places
  const roundResult = (result) => {
    const roundResult = Math.round((result + Number.EPSILON) * 10000) / 10000;
    return roundResult;
  };

  return (
    <React.Fragment>
      <h2 className="currency-convert__selection-result">
        {firstSelectedCurrency[1]}
      </h2>
      <h2 className="currency-convert__selection-result">
        {secondSelectedCurrency[1]}
      </h2>
      <Card className="currency-convert">
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
              <h3>
                {formState.inputs.amount.value} {firstSelectedCurrency[1]} ={" "}
                {roundResult(
                  formState.inputs.amount.value *
                    (firstSelectedCurrency[0] / secondSelectedCurrency[0])
                )}{" "}
                {secondSelectedCurrency[1]}
              </h3>
            )}
        </div>
      </Card>
    </React.Fragment>
  );
};

export default CurrencyConvert;
