const express = require("express");
const cors = require("cors");
const {
  register,
  login,
  logout,
  editPost,
  getProfile,
  createPost,
  getPost,
  getAllPost,
  addComment,
  deletePost
} = require("./authController");
const router = express.Router();
const multer = require("multer");
const uploadMiddleware = multer({ dest: "uploads/" });
const cookieParser = require("cookie-parser");
router.use(cookieParser());
router.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
router.post("/register", register);
router.post("/login", login);
router.post("/create", uploadMiddleware.single("file"), createPost);
router.get("/post/:postId", getPost);
router.get("/post", getAllPost);
router.get("/profile", getProfile);
router.post("/comment", addComment);
router.post("/logout", logout);
router.put("/edit/:postId", uploadMiddleware.single("file"), editPost);
router.delete("/delete/:postId", uploadMiddleware.single("file"), deletePost);

module.exports = router;
