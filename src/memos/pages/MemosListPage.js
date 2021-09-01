import { AuthContext } from "../../shared/context/auth-context";
import React, { useEffect, useState,useContext } from 'react';
import MemosList from "../components/MemosList";
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';

const MemosListPage = () => {
  const [loadedMemos, setLoadedMemos] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const auth = useContext(AuthContext);
  const uid = auth.userID;
  useEffect(() => {
    const fetchMemos = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/users/${uid}/memos`
        );
        setLoadedMemos(responseData);
      } catch (err) {}
    };
    fetchMemos();
  }, [sendRequest, uid]);
  const memoDeleteHandler=deletedMemoId=>{
    setLoadedMemos(memos => memos.filter(memo => memo._id !==deletedMemoId))
  }
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedMemos && <MemosList items={loadedMemos} memoDeleteHandler={memoDeleteHandler} />}
    </React.Fragment>
  );
};

export default MemosListPage;
