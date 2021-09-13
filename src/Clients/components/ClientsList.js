import React from "react";

import ClientItem from "./ClientItem";
import Card from "../../shared/components/UIElements/Card";
import "./ClientsList.css";

const ClientsList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className="center">
        <Card>
          <h2>No Clients Found.</h2>
        </Card>
      </div>
    );
  }

  return (
    <ul className="clients-list">
      {props.items.map((client) => (
        <ClientItem
          key={client.id}
          id={client.id}
          name={client.name}
          image="https://previews.123rf.com/images/faysalfarhan/faysalfarhan1711/faysalfarhan171147553/90450638-client-member-icon-isolated-on-yellow-round-button-abstract-illustration.jpg"
          linkedin={client.linkedin}
          phoneNumber={client.telephone}
          deleteClientHandler={props.deleteClientHandler}
        />
      ))}
    </ul>
  );
};

export default ClientsList;
