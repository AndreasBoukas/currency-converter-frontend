import React, { useEffect, useState, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIELEMENTS/Card";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_NUMBER,
} from "../../shared/util/validators";

import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import LoadingSpinner from "../../shared/components/UIELEMENTS/LoadingSpinner";
import ErrorModal from "../../shared/components/UIELEMENTS/ErrorModal";
import { AuthContext } from "../../shared/context/auth-context";
import "./CurrencyForm.css";

//In this page the user can edit an existing currency
const UpdateCurrency = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedCurrencies, setLoadedCurrencies] = useState();
  const currencyId = useParams().currencyId;
  const history = useHistory();

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      exchangeRate: {
        value: "",
        isValid: false,
      },
    },
    true
  );

  //use effect run certain code only when certain dependecies change
  //Use of sendRequest function because we cant use async in useEffect
  useEffect(() => {
    const fetchCurrency = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/currency/update/${currencyId}`
          //The default request is GET request
        );
        setLoadedCurrencies(responseData.selectedCurrency);

        setFormData(
          {
            title: {
              value: responseData.selectedCurrency.title,
              isValid: true,
            },
            exchangeRate: {
              value: responseData.selectedCurrency.exchangeRate,
              isValid: true,
            },
          },
          true
        );
      } catch (err) {}
    };
    fetchCurrency();
  }, [sendRequest, currencyId, setFormData]); //sendRequest, currencyId and setFormData is a dependency of the useEffect hook

  // use effect run certain code only when certain dependecies change
  // Use of sendRequest function because we cant use async in useEffect

  const currencyUpdateSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(
        `http://localhost:5000/api/currency/update/${currencyId}`,
        "PATCH",
        JSON.stringify({
          title: formState.inputs.title.value,
          exchangeRate: formState.inputs.exchangeRate.value,
          creator: auth.userId,
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );
      //The default request is GET request
      history.push("/currency/list");
    } catch (err) {}
  };

  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!loadedCurrencies && !error) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find currency!</h2>
        </Card>
      </div>
    );
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {!isLoading && loadedCurrencies && (
        <div>
          <form
            className="currency-form"
            onSubmit={currencyUpdateSubmitHandler}
          >
            <div className="currency-info">
              <h2>Updating {loadedCurrencies.title}</h2>
            </div>
            <Input
              id="title"
              element="input"
              type="text"
              label="Title"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please ender a valid Title"
              onInput={inputHandler}
              initialValue={loadedCurrencies.title}
              initialValid={true}
            />
            <Input
              id="exchangeRate"
              element="input"
              type="number"
              label="Exchange Rate"
              validators={[VALIDATOR_NUMBER()]}
              errorText="Please ender a valid Exchange Rate."
              onInput={inputHandler}
              initialValue={loadedCurrencies.exchangeRate}
              initialValid={true}
            />
            <Button type="submit" disabled={!formState.isValid}>
              UPDATE CURRENCY
            </Button>
          </form>
        </div>
      )}
    </React.Fragment>
  );
};

export default UpdateCurrency;
