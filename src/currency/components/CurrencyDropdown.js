import React, { useEffect, useState } from "react";

import ErrorModal from "../../shared/components/UIELEMENTS/ErrorModal";
import LoadingSpinner from "../../shared/components/UIELEMENTS/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";

import "./CurrencyDropdown.css";

const CurrencyDropdown = (props) => {
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
  // const curr = props.currency;
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedCurrencies && (
        <div className="dropdown-main">
          <select onChange={props.onChange}>
            <option value={[""]} disabled selected>
              -- Select a Currency --
            </option>
            {loadedCurrencies.map((curr) => (
              <option key={curr._id} value={[curr.exchangeRate, curr.title]}>
                {curr.title}
              </option>
            ))}
          </select>
          <svg>
            <use href="#select-arrow-down"></use>
          </svg>
          <svg className="sprites">
            <symbol id="select-arrow-down" viewBox="0 0 10 6">
              <polyline points="1 1 5 5 9 1"></polyline>
            </symbol>
          </svg>
        </div>
      )}
    </React.Fragment>
  );
};

export default CurrencyDropdown;
