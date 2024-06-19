require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const connectToDB = require("./connection/db.js");

connectToDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/categories", require("./routes/categoryRoutes"));
app.use("/api/ads", require("./routes/adRoutes"));
app.use("/api/comments", require("./routes/commentRoutes"));
app.use("/api/favorites", require("./routes/favoriteRoutes"));

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server launched at: http://localhost:${PORT}`);
});
