import React from "react";
import { Link } from "react-router-dom";

//setup onclick that brings you to edit page

function Post(props) {
  return (
    <div className="post_content">
      <Link to = '/edit'>
        <img className = "post_image" src={props.image} onClick={() => props.setCurrentPost(props._id)} />
      </Link>

      
    </div>
  );
}

export default Post;
