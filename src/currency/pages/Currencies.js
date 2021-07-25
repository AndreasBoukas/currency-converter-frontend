import React, { useEffect, useState } from "react";

import CurrencyList from "../components/CurrencyList";
import ErrorModal from "../../shared/components/UIELEMENTS/ErrorModal";
import LoadingSpinner from "../../shared/components/UIELEMENTS/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";
import "./currencies.css"

//This page shows a list of all currencies. If the user is logged in the user can edit and delete a currency
const Currencies = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedCurrencies, setLoadedCurrencies] = useState();

  //use effect run certain code only when certain dependecies change
  //Use of sendRequest function because we cant use async in useEffect
  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/currency/list"
        );
        //The default request is GET request
        //Filter out the Euro
        const filteredCurrencies = responseData.currencies.filter(
          (currency) => currency._id !== "60f943b45fc686381523aff5"
        );
        setLoadedCurrencies(filteredCurrencies);
      } catch (err) {}
    };
    fetchCurrencies();
  }, [sendRequest]); //sendRequest is a dependency of the useEffect hook

  //Update list when currency is deleted
  const currencyDeletedHandler = (deletedCurrencyId) => {
    setLoadedCurrencies((prevCurrencies) =>
      prevCurrencies.filter((currency) => currency._id !== deletedCurrencyId)
    );
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedCurrencies && (
        <div>
          <div  className="currencies-info">
            <h3>The Currencies Exchange Rate is based on the Euro</h3>
          </div>
          <CurrencyList
            items={loadedCurrencies}
            onDeleteCurrency={currencyDeletedHandler}
          />
        </div>
      )}
    </React.Fragment>
  );
};

export default Currencies;
