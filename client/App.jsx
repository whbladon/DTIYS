import React, { Component } from "react";
import Feed from "./components/feed.js";
import Header from "./components/header.js";
import EditPost from "./components/EditPost";
import CreatePost from "./components/CreatePost";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      newPostUrl: "",
      newSubPostUrl: "",
      newComment: "",
      currentPostId: "",
      currentPost: {},
      subPosts: [],
      posts: [],
    };
    this.setCurrentPost = this.setCurrentPost.bind(this);
    this.createPost = this.createPost.bind(this);
    this.createSubPost = this.createSubPost.bind(this);
    this.createComment = this.createComment.bind(this);
    this.updateUsername = this.updateUsername.bind(this);
    this.updateNewPostUrl = this.updateNewPostUrl.bind(this);
    this.updateNewSubPostUrl = this.updateNewSubPostUrl.bind(this);
    this.updateNewComment = this.updateNewComment.bind(this);
    this.updateState = this.updateState.bind(this);
    this.setCurrentPost = this.setCurrentPost.bind(this);
    this.createSubComment = this.createSubComment.bind(this);
  }

  //onmount load db to state
  componentDidMount() {
    fetch("/api/")
      .then((res) => res.json())
      .then((posts) => {
        return this.setState({
          posts: posts,
        });
      })
      .catch((err) => console.log("error on fetching posts"));
  }

  //get for posts
  updateState() {
    this.setCurrentPost(this.state.currentPostId);
    fetch("/api/")
      .then((res) => res.json())
      .then((posts) => {
        return this.setState({
          posts: posts,
        });
      })
      .catch((err) => console.log("error on fetching posts"));
  }

  //get for current post
  setCurrentPost(id) {
    fetch(`/api/${id}`)
      .then((res) => res.json())
      .then((post) => {
        this.setState({ currentPostId: id, currentPost: post });
      })
      .then(() => {
        fetch(`/api/subposts/${id}`)
          .then((res) => res.json())
          .then((subPosts) => {
            return this.setState({ subPosts: subPosts });
          })
          .catch((err) => console.log("error getting subposts"));
      })
      .catch((err) => console.log("error getting current post"));
  }

  //updating state input vars
  updateUsername(e) {
    let username = e.target.value;
    this.setState({ username: username });
  }

  updateNewPostUrl(e) {
    let url = e.target.value;
    this.setState({ newPostUrl: url });
  }

  updateNewSubPostUrl(e) {
    let url = e.target.value;
    this.setState({ newSubPostUrl: url });
  }

  updateNewComment(e) {
    let comment = e.target.value;
    this.setState({ newComment: comment });
  }

  //Creating new nodes
  createPost() {
    const body = {
      author: this.state.username,
      createDate: "123",
      updateDate: "321",
      image: this.state.newPostUrl,
      discussion: [],
    };
    fetch("/api/", {
      method: "POST",
      headers: {
        "Content-Type": "Application/JSON",
      },
      body: JSON.stringify(body),
    })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log(err));
    this.setState({ newPostUrl: "" });
    //here
    this.updateState();
  }

  createSubPost() {
    const body = {
      author: this.state.username,
      subPostId: this.state.currentPostId,
      createDate: "123",
      updateDate: "321",
      image: this.state.newSubPostUrl,

      discussion: [],
    };
    fetch("/api/subposts/4", {
      method: "POST",
      headers: {
        "Content-Type": "Application/JSON",
      },
      body: JSON.stringify(body),
    })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log(err));
    this.setState({ newSubPostUrl: "" });
    this.updateState();
  }

  createComment(id) {
    const body = {
      author: this.state.username,
      text: this.state.newComment,
    };
    // const id = this.state.currentPostId;
    fetch(`/api/discussion/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "Application/JSON",
      },
      body: JSON.stringify(body),
    })
      .then((data) => {
        this.updateState();
      })
      .catch((err) => console.log(err));
    this.setState({ newComment: "" });
  }

  createSubComment(id) {
    const body = {
      author: this.state.username,
      text: this.state.newComment,
    };

    fetch(`/api/discussion/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "Application/JSON",
      },
      body: JSON.stringify(body),
    })
      .then((data) => {
        this.updateState();
      })
      .catch((err) => console.log(err));
    this.setState({ newComment: "" });
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Header
            updateUsername={this.updateUsername}
            username={this.state.username}
          />
          <Switch>
            <Route path="/edit">
              <EditPost
                createSubComment={this.createSubComment}
                currentPostId={this.state.currentPostId}
                username={this.state.username}
                createSubPost={this.createSubPost}
                updateNewSubPostUrl={this.updateNewSubPostUrl}
                newSubPostUrl={this.state.newSubPostUrl}
                subPosts={this.state.subPosts}
                currentPost={this.state.currentPost}
                updateNewComment={this.updateNewComment}
                newComment={this.state.newComment}
                createComment={this.createComment}
              />
            </Route>

            <Route path="/paint">
              <EditPost
                createSubComment={this.createSubComment}
                updateState={this.updateState}
                currentPostId={this.state.currentPostId}
                createSubPost={this.createSubPost}
                updateNewSubPostUrl={this.updateNewSubPostUrl}
                newSubPostUrl={this.state.newSubPostUrl}
                subPosts={this.state.subPosts}
                currentPost={this.state.currentPost}
                updateNewComment={this.updateNewComment}
                newComment={this.state.newComment}
                createComment={this.createComment}
                paint={true}
              />
            </Route>

            <Route path="/">
              <CreatePost
                createPost={this.createPost}
                updateNewPostUrl={this.updateNewPostUrl}
                newPostUrl={this.state.newPostUrl}
              />
              <Feed
                posts={this.state.posts}
                setCurrentPost={this.setCurrentPost}
              />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
