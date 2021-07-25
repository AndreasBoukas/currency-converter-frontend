import React, { useReducer, useEffect } from "react";

import { validate } from "../../util/validators";
import "./Input.css";

//inputReducer handles the validation logic for the input field 
const inputReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators),
      };
    case "TOUCH":
      return { ...state, isTouched: true };
    default:
      return state;
  }
};


//This component is an input component
const Input = (props) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue || '',
    isTouched: false,
    isValid: props.initialValid || false,
  });

  //object destructuring. e.g. getting id and onInput from props.
  const { id, onInput } = props;
  const { value, isValid } = inputState;

  useEffect(() => {  //Runs loggic when component rerenders
    onInput(id, value, isValid);
  }, [id, value, isValid, onInput]);

  //When user writes in the input field runs the inputReducer with type CHANGE.
  //This checks if the input field is valid with every keystroke.
  const changeHandler = (event) => {
    dispatch({
      type: "CHANGE",
      val: event.target.value,
      validators: props.validators,
    });
  };

  //When user clicks out of the input runs the inputReducer with type TOUCH
  //This sets the input field seem valid until the user clicks on it once
  const touchHandler = () => {
    dispatch({
      type: "TOUCH",
    });
  };

  const element =
    props.element === "input" ? (
      <input
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      />
    ) : (
      <textarea
        id={props.id}
        rows={props.rows || 3}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      />
    );

  return (
    <div
      className={`form-control ${
        !inputState.isValid && inputState.isTouched && "form-control--invalid"
      }`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      {element}
      {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
    </div>
  );
};

export default Input;
