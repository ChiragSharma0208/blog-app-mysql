const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const authRoutes = require("./authRoutes");
const cors = require("cors");
const connectDB = require("./db");
const port = process.env.PORT;

const cookieParser = require("cookie-parser");

const app = express();

const corsOption = {
  origin: ["http://localhost:3000"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
};
app.use(cors(corsOption));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
connectDB();
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use("/", authRoutes);

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
