import React from "react";

function Something() {
  return (
    <div className = "navbar_container">
      <Link to="/user">
        <button className = "navbar_item">Home</button>
      </Link>
      <Link to="/update">
        <button className = "navbar_item">Update Info</button>
      </Link>
      <Link to="/user">
        <button className = "navbar_item">Find Events</button>
      </Link>
      <input placeholder = "searchbar"></input>
      <Link to="/user">
        <button className = "navbar_item">Create Event</button>
      </Link>
    </div>
  );
}

export default Something;

.navbar_container {
    display: flex;
  justify-content: center;
  align-items: center;
}