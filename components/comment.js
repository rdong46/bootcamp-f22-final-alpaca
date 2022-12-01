import React from "react";

const Comment = (props) => {
  const { info } = props;

  return (
    <div>
      <p>{info.body}</p>
      <p>{`${info.date.substr(0, 10)} ${info.date.substr(11, 8)}`}</p>
    </div>
  );
};

export default Comment;
