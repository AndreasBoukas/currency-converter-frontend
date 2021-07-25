import React from "react";

import "./CurrencyDropdown.css";

//This component creates the dropdown for the currency exchange
const CurrencyDropdown = (props) => {
  return (
    <React.Fragment>
      <div className="dropdown-main">
        <select onChange={props.onChange}>
          <option value={[""]} disabled selected>
            -- Select a Currency --
          </option>
          {props.loadedCurrencies.map((curr) => (
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
    </React.Fragment>
  );
};

export default CurrencyDropdown;
