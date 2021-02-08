const { response } = require("express");
const express = require("express");
const controller = require("../controllers/controller.js");
const router = express.Router();

//define routes for subPosts
router.get("/subposts/:postId", controller.getAllSubPosts, (req, res) => {
  return res.status(200).json(res.locals.subPosts);
});

router.post("/subposts/:postId", controller.addSubPost, (req, res) => {
  return res.status(200).json(res.locals.subPost);
});

//define routes, add middleware
router.get("/", controller.getAllPosts, (req, res) => {
  return res.status(200).json(res.locals.posts);
});

router.post("/", controller.addPost, (req, res) => {
  return res.status(200).json(res.locals.post);
});

router.get("/:postId", controller.getPost, (req, res) => {
  return res.status(200).json(res.locals.post);
});

router.put("/:postId", controller.editPost, (req, res) => {
  return res.status(200).json(res.locals.post);
});

//add discussion subpost
router.put("/discussion/:postId/", controller.addDiscussionSubPost, controller.addDiscussion, (req, res) => {
  return res.status(200).json(res.locals.post);
});

router.delete("/:postId", controller.deletePost, (req, res) => {});

module.exports = router;
