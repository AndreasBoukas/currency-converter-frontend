import React, { useEffect, useState } from "react";

import CurrencyList from "../components/CurrencyList";
import ErrorModal from "../../shared/components/UIELEMENTS/ErrorModal";
import LoadingSpinner from "../../shared/components/UIELEMENTS/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";

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
        setLoadedCurrencies(responseData.currencies);
      } catch (err) {}
    };
    fetchCurrencies();
  }, [sendRequest]); //sendRequest is a dependency of the useEffect hook

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedCurrencies && (
        <CurrencyList items={loadedCurrencies} />
      )}
    </React.Fragment>
  );
};

export default Currencies;
