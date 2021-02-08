import React from "react";

function CreatePost(props) {
  return (
    <div className="createPost_container">
      <input
        value={props.newPostUrl}
        onChange={props.updateNewPostUrl}
        className="header_input"
        placeholder="Enter topic img url.."
      ></input>
      <button onClick={props.createPost} className="header_button">
        Create Post
      </button>
    </div>
  );
}

export default CreatePost;
