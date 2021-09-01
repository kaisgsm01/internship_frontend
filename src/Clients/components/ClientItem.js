import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import Avatar from "../../shared/components/UIElements/Avatar";
import Card from "../../shared/components/UIElements/Card";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import Modal from "../../shared/components/UIElements/Modal";
import { useHttpClient } from "../../shared/hooks/http-hook";
import "./ClientItem.css";

const UserItem = (props) => {
  let history = useHistory();
  const cid = props.id;
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const deleteClient = async () => {
    try {
      await sendRequest(`http://localhost:5000/api/clients/${cid}`, "DELETE");
    } catch (err) {}
    props.deleteClientHandler(cid);
  };

  const updateClient = () => {
    history.push(`/updateclient/${cid}`);
  };

  const openModal = (event) => {
    event.preventDefault();
    setModalIsOpen(true);
  };

  const onClear = () => {
    setModalIsOpen(false);
  };
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <li className="client-item">
        <Card className="client-item__content">
          <div className="client-item__image">
            <Avatar image={props.image} alt={props.name} />
          </div>
          <div className="client-item__info">
            <h2>Name: {props.name}</h2>
          </div>
          <div
            style={{ display: "block", width: "100%", marginBottom: "2rem" }}
          >
            <div className="spread-hor">
              {props.facebook && (
                <Link
                  className="stop-inher bigger"
                  to={{ pathname: props.facebook }}
                  target="_blank"
                >
                  <i class=" bi bi-facebook"></i>
                </Link>
              )}
              {props.twitter && (
                <Link to={{ pathname: props.twitter }} target="_blank">
                  <i class="bi bi-twitter"></i>
                </Link>
              )}
              {props.linkedin && (
                <Link to={{ pathname: props.linkedin }} target="_blank">
                  <i class="bi bi-linkedin"></i>
                </Link>
              )}
              {props.phoneNumber && (
                <Link onClick={openModal}>
                  <i class="bi bi-telephone"></i>
                </Link>
              )}
            </div>
          </div>
          <Modal
            headerClass="phone-number-header"
            onCancel={onClear}
            header="Client Phone Number"
            show={modalIsOpen}
          >
            {props.phoneNumber}
          </Modal>
          <button
            type="button"
            class="btn btn-outline-info"
            onClick={updateClient}
          >
            Update
          </button>
          <button
            type="button"
            onClick={deleteClient}
            class="btn btn-outline-dark"
          >
            Delete
          </button>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default UserItem;
