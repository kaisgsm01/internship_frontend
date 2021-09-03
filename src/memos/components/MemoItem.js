import React, { useCallback, useEffect} from "react";
import { useHistory } from "react-router-dom";
import Card from "../../shared/components/UIElements/Card";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import { useHttpClient, useHttpmemo } from "../../shared/hooks/http-hook";
import "./MemoItem.css";

const MemoItem = (props) => {
  let history = useHistory();
  const mid = props.id;
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const deleteMemoHandler = async () => {
    try {
      await sendRequest(`http://localhost:5000/api/memos/${mid}`, "DELETE");
    } catch (err) {}
    props.memoDeleteHandler(mid);
  };
  const updateMemoHandler=()=>{
    history.push(`/updatememo/${mid}`);
  }
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <li className="memo-item">
        <Card className="memo-item__content">
          <div className="memo-item__info">
            <h2>Title: {props.title}</h2>
          </div>
          <p className="content-conf">Description: {props.description}</p>
          <button
            type="button"
            class="btn btn-outline-info"
            onClick={updateMemoHandler}
          >
            Update
          </button>
          <button
            type="button"
            class="btn btn-outline-dark"
            onClick={deleteMemoHandler}
          >
            Delete
          </button>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default MemoItem;
