require("dotenv").config();
const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/userRouter");
const errorHandler = require("./middlewares/errorHandler")
const cookieParser = require('cookie-parser')
const authRouter = require('./routes/authRouter')

const app = express();

const corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

const db = require("./models");
db.sequelize.sync()

app.get("/", (req, res) => {
  res.json({ message: "Hi!" });
});
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server started at http://localhost:${PORT}`));