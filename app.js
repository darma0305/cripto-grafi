const express = require("express");
const app = express();

app.use(express.json());

// hubungkan route
const userRouter = require("./router/router_user"); // sesuaikan path
app.use("/api", userRouter);

app.listen(3000, () => console.log("Server running on port 3000"));
