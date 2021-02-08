import React from "react";
import Post from "./Post.js";


function Feed(props) {
  return (
    <div className="feed_container">
      {props.posts.map((post) => {
        return <Post key={post._id} _id={post._id} image={post.image} setCurrentPost={props.setCurrentPost} />;
      })}
    </div>
  );
}

export default Feed;
