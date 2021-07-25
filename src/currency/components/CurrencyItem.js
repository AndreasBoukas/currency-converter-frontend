import React, { useState, useContext } from "react";

import Card from "../../shared/components/UIELEMENTS/Card";
import Button from "../../shared/components/FormElements/Button";
import Modal from "../../shared/components/UIELEMENTS/Modal";
import ErrorModal from "../../shared/components/UIELEMENTS/ErrorModal";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";
import "./CurrencyList";

//This Component is a single currency in a list of currencies.
const CurrencyItem = (props) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const auth = useContext(AuthContext);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const showDeleteWarningHandler = () => setShowConfirmModal(true);
  const cancelDeleteHandler = () => setShowConfirmModal(false);

  const confirmDeleteHandler = async () => {
    setShowConfirmModal(false);
    try {
      await sendRequest(
        `http://localhost:5000/api/currency/delete/${props.id}`,
        "DELETE",
        null,
        {
          Authorization: "Bearer " + auth.token,
        }
      );
      props.onDelete(props.id);
    } catch (err) {}
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />

      {/* Delete Modal Fragment */}
      <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}
        header="Are you sure?"
        footerClass="currency-item__modal-actions"
        footer={
          <React.Fragment>
            <Button inverse onClick={cancelDeleteHandler}>
              CANCEL
            </Button>
            <Button danger onClick={confirmDeleteHandler}>
              DELETE
            </Button>
          </React.Fragment>
        }
      >
        <p>
          Do you want to proceed and delete this currency? Please note that it
          cant be undone after
        </p>
      </Modal>

      <li className="currency-item">
        <Card className="currency-item__content">
          <div className="currency-item__info">
            <h2>{props.title}</h2>
            <h3>Exchange Rate: {props.exchangeRate}</h3>
            {auth.token != null && (
              <Button to={`/currency/${props.id}`}>EDIT</Button>
            )}
            {auth.token != null && (
              <Button danger onClick={showDeleteWarningHandler}>
                DELETE
              </Button>
            )}
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default CurrencyItem;
