import React from 'react';

import MemoItem from '../components/MemoItem';
import Card from '../../shared/components/UIElements/Card';
import './MemosList.css';

const MemosList = props => {
  if (props.items.length === 0) {
    return (
      <div className="center">
        <Card>
          <h2>No Memos Found.</h2>
        </Card>
      </div>
    );
  }

  return (
    <ul className="memos-list">
      {props.items.map(memo => (
        <MemoItem
          key={memo._id}
          id={memo._id}
          title={memo.title}
          description={memo.description}
          memoDeleteHandler={props.memoDeleteHandler}
        />
      ))}
    </ul>
  );
};

export default MemosList;
