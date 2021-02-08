const models = require("../models/model.js");

//create object to put methods on
const controller = {};

//get all subPosts
controller.getAllSubPosts = (req, res, next) => {
  const id = req.params.postId;

  models.SubPost.find({ subPostId: id })
    .then((data) => {
      res.locals.subPosts = data;
      return next();
    })
    .catch((err) => {
      console.log(err);
      return next(err);
    });
};

controller.addSubPost = (req, res, next) => {
  const body = req.body;

  models.SubPost.create({ ...body })
    .then((data) => {
      res.locals.subPost = data;
      return next();
    })
    .catch((err) => {
      console.log(err);
      return next(err);
    });
};

//define middleware methods
//works - get all posts
controller.getAllPosts = (req, res, next) => {
  models.Post.find({})
    .then((data) => {
      res.locals.posts = data;
      return next();
    })
    .catch((err) => {
      console.log(err);
      return next(err);
    });
};

//works - make new post
controller.addPost = (req, res, next) => {
  const body = req.body;
  models.Post.create({ ...body })
    .then((data) => {
      res.locals.post = data;
      return next();
    })
    .catch((err) => {
      console.log(err);
      return next(err);
    });
};

//works - push post into discussion
controller.addDiscussion = (req, res, next) => {
  const id = req.params.postId;
  const body = req.body;

  models.Post.findOneAndUpdate(
    { _id: id },
    { $push: { discussion: { ...body } } }
  )
    .then((data) => {
      console.log(data)
      res.locals.post = data;
      return next();
    })
    .catch((err) => {
      console.log("error");
      return next(err);
    });
};

controller.addDiscussionSubPost = (req, res, next) => {
  const id = req.params.postId;
  const body = req.body;

  models.SubPost.findOneAndUpdate(
    { _id: id },
    { $push: { discussion: { ...body } } }
  )
    .then((data) => {
      console.log(data)
      res.locals.post = data;
      return next();
    })
    .catch((err) => {
      console.log("error");
      return next(err);
    });
}

//edit image and updateDate
controller.editPost = (req, res, next) => {
  const id = req.params.postId;
  const body = req.body;
  models.Post.findOneAndUpdate({ _id: id }, { $set: { ...body } })
    .then((data) => {
      res.locals.post = data;
      return next();
    })
    .catch((err) => {
      console.log("error");
      return next(err);
    });
};

controller.deletePost = () => {};

controller.getPost = (req, res, next) => {
  const id = req.params.postId;
  models.Post.findOne({ _id: id })
    .then((data) => {
      res.locals.post = data;
      return next();
    })
    .catch((err) => {
      console.log("error");
      return next(err);
    });
};

//export controller
module.exports = controller;
