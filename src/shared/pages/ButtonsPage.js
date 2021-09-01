import React from "react";
import Button from "../../shared/components/FormElements/Button";
import "./ButtonsPage.css";
//props(buttons = [{buttonName,path} , ...])
const ButtonsPage = (props) => {
  return (
    <ul className="">
      {props.buttons.map((e) => {
        return (
          <li className="listed-buttons">
            <Button size="big" to={e.path}>
              <div class="size-text">{e.buttonName}</div>
            </Button>
          </li>
        );
      })}
    </ul>
  );
};

export default ButtonsPage;
