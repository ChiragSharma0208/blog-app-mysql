const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const fs = require("fs");

const {
  insertRecord,
  updateRecord,
  checkRecordExists,
  getAllRecords,
  getInfo,
  delPost
} = require("./function");
const { response } = require("express");

const register = async (req, res) => {
  const { user, password, email, dob } = req.body;
  console.log(req.body);

  if (!user || !password) {
    res.status(400).json({ error: "Fields cannot be empty!" });
    return;
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const userInfo = {
    user_name: user,
    email: email,
    password: hashedPassword,
    dob: dob,
  };

  try {
    const userAlreadyExists = await checkRecordExists(
      "user",
      "user_name",
      user
    );
    if (userAlreadyExists) {
      res.status(409).json({ error: "Email already exists" });
    } else {
      await insertRecord("user", userInfo);
      res.status(201).json({ message: "User created successfully!" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const login = async (req, res) => {
  const { user, password } = req.body;
  console.log(req.body);

  if (!user || !password) {
    res.status(400).json({ error: "Fields cannot be empty!" });
    return;
  }

  try {
    const existingUser = await checkRecordExists("user", "user_name", user);
    console.log(existingUser.id);
    if (existingUser) {
      if (!existingUser.password) {
        res.status(401).json({ error: "Invalid credentials" });
      }
    }
    const passwordMatched = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (passwordMatched) {
      jwt.sign(
        {
          email: existingUser.email,
          id: existingUser.id,
          name: existingUser.user_name,
        },
        process.env.JWT_SECRET,
        {},
        (err, token) => {
          if (err) throw err;
          res.cookie("token", token).status(201).json(user);
        }
      );
    } else {
      res.status(401).json({ error: "Wrong password" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createPost = async (req, res) => {
  console.log(req.body);
  console.log(req.file);
  const { originalname, path } = req.file;
  const parts = originalname.split(".");
  const ext = parts[parts.length - 1];
  const newPath = path + "." + ext;
  fs.renameSync(path, newPath);

  const { title, content, summary, id } = req.body;

  const postInfo = {
    title: title,
    content: content,
    id: id,
    summary: summary,
    cover: newPath,
    likes: "15",
  };

  try {
    await insertRecord("posts", postInfo);
    res.status(201).json({ message: "Blog created successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const editPost = async (req, res) => {
  const { postId } = req.params;
  console.log(req.file);
  const { originalname, path } = req.file;
  const parts = originalname.split(".");
  const ext = parts[parts.length - 1];
  const newPath = path + "." + ext;
  fs.renameSync(path, newPath);

  const { title, content, summary } = req.body;

  const postInfo = {
    title: title,
    content: content,
    summary: summary,
    cover: newPath,
    post_id: postId,
  };
  console.log(postInfo);
  try {
    await updateRecord("posts", postInfo);
    res.status(201).json({ message: "Blog created successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getProfile = (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, process.env.JWT_SECRET, {}, (err, info) => {
    if (err) console.log(err);
    res.json(info);
  });
};

const getPost = async (req, res) => {
  const { postId } = req.params;

  try {
    const postInfo = await getInfo("posts", postId);
    console.log(postInfo);
    if (postInfo) {
      res.status(201).json(postInfo);
    } else {
      res.status(401).json({ error: "Not able to get Posts" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAllPost = async (req, res) => {
  try {
    const postInfo = await getAllRecords("posts");
    console.log(postInfo);
    if (postInfo) {
      res.status(201).json(postInfo);
    } else {
      res.status(401).json({ error: "Not able to get all records" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const addComment = async (req, res) => {
  console.log(req.body);

  const { post_id, comment } = req.body;

  const commentInfo = {
    post_id,
    comment,
  };

  try {
    await insertRecord("comments", commentInfo);
    res.status(201).json(commentInfo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const logout = (req, res) => {
  try {
    res.cookie("token", "").json({ message: "logged out" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deletePost=async(req,res)=>{
  const {postId}=req.params;

  try {
    
    const commentInfo = await delPost("comments", postId);
    const postInfo = await delPost("posts", postId);
    console.log(postInfo);
    if (postInfo) {
      res.status(201).json(postInfo);
    } else {
      res.status(401).json({ error: "Not delete Post" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
  

}

module.exports = {
  register,
  login,
  createPost,
  editPost,
  logout,
  getPost,
  getAllPost,
  getProfile,
  addComment,
  deletePost
};
