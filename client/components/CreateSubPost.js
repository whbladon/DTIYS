import React from "react";
import { Link } from "react-router-dom";

function CreateSubPost(props) {
  return (
    <div className="createSubPost_container">
      <input
        value={props.newSubPostUrl}
        onChange={props.updateNewSubPostUrl}
        className="header_input"
        placeholder="Enter post img url.."
      ></input>
      <button onClick={props.createSubPost} className="header_button">
        Add Subpost
      </button>
      <Link to="/paint">
        <button className="header_button">Paint new subpost</button>
      </Link>
    </div>
  );
}

export default CreateSubPost;
