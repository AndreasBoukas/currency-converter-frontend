import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import ErrorModal from "../../shared/components/UIELEMENTS/ErrorModal";
import LoadingSpinner from "../../shared/components/UIELEMENTS/LoadingSpinner";
import ImageUpload from "../../shared/components/FormElements/ImageUpload";
import { VALIDATOR_REQUIRE } from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import "./CurrencyForm.css";

//In this page the user can create a new currency
const NewCurrency = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler] = useForm(
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
    false
  );

  //Use the history hook to redirect
  const history = useHistory();

  const currencySubmitHandler = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(
        "http://localhost:5000/api/currency",
        "POST",
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
      history.push("/"); // redirect to /
    } catch (err) {}
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <form className="currency-form" onSubmit={currencySubmitHandler}>
        <div className="currency-form__info">
          <h3>Please add the exchange rate based on the Euro</h3>
          <p>For example 1 Euro is 1.17 USD.</p>
          <p>So the USD exhange Rate is 1.17</p>
        </div>
        <Input
          id="title"
          element="input"
          type="text"
          label="Currency Name"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid title."
          onInput={inputHandler}
        />
        <Input
          id="exchangeRate"
          element="input"
          type="number"
          label="exchange Rate"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid exchangeRate."
          onInput={inputHandler}
        />
        <Button type="submit" disabled={!formState.isValid}>
          Add Currency
        </Button>
      </form>
    </React.Fragment>
  );
};

export default NewCurrency;
