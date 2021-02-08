import React from "react";
import Discussion from "./Discussion";
import SubPost from "./SubPost";
import CreateSubPost from "./CreateSubPost";
import Paint from "./Paint";

function EditPost(props) {
  return (
    <div className="editPost_big_container">
      <CreateSubPost
        createSubPost={props.createSubPost}
        updateNewSubPostUrl={props.updateNewSubPostUrl}
        newSubPostUrl={props.newSubPostUrl}
      />
      <div className="editPost_container">
        {props.paint && (
          <Paint
            updateState={props.updateState}
            currentPostId={props.currentPostId}
            username={props.username}
          />
        )}
        <div className="editPost_image">
          <img className="editPost_image" src={props.currentPost.image} />
        </div>
        <Discussion
          createComment={props.createComment}
          updateNewComment={props.updateNewComment}
          newComment={props.newComment}
          currentPostId={props.currentPost._id}
          discussion={props.currentPost.discussion}
        />
      </div>
      {props.subPosts.length < 1
        ? null
        : props.subPosts.map((subPost) => {
            return (
              <SubPost
                createComment={props.createComment}
                createSubComment={props.createSubComment}
                updateNewComment={props.updateNewComment}
                newComment={props.newComment}
                currentPostId={subPost._id}
                discussion={subPost.discussion}
                image={subPost.image}
                key={subPost._id}
              />
            );
          })}
    </div>
  );
}

export default EditPost;
