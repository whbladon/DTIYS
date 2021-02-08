import React from "react";

function Discussion(props) {
  return (
    <div className="discussion_container">
      {props.discussion &&
        props.discussion.map((msg) => {
          return (
            <div className="discussion_post" key={msg._id}>
              <b>{msg.author + ": "}</b>
              {msg.text}
            </div>
          );
        })}
      <input
        onChange={props.updateNewComment}
        value={props.newComment}
        placeholder="say something.."
        className="header_input"
      ></input>
      <button onClick={()=>{props.createComment(props.currentPostId)}} className="header_button">
        Add Comment
      </button>
    </div>
  );
}

export default Discussion;
