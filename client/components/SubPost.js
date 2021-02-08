import React from "react";
import Discussion from "./Discussion";

function SubPost(props) {
  return (
    <div className="editPost_container">
      <div className="editPost_image">
        <img className="editPost_image" src={props.image} />
      </div>
      <Discussion
        createComment={props.createComment}
        currentPostId={props.currentPostId}
        createSubComment={props.createSubComment}
        updateNewComment={props.updateNewComment}
        newComment={props.newComment}
        discussion={props.discussion}
      />
    </div>
  );
}

export default SubPost;
