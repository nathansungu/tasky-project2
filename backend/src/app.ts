import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import errorHandler from "./middleware/errorHandler";
import auth from "./routes/auth.route";
import tasks from "./routes/tasks.route";
import user from "./routes/user.routes";
import authenticateLogin from "./middleware/isLoggedIn.middleware";
import group from "./routes/groups.route";

const app = express();
app.use(express.json());
app.use(cookieParser());
// app.use(
//   cors({
//     origin: "http:localhost:4000",
//     credentials: true,
//   })
// );

app.use("/api/auth", auth);
app.use("/api/task",authenticateLogin,tasks)
app.use("/api/user",authenticateLogin,user)
app.use("/api/group",authenticateLogin,group)
app.use(errorHandler);

const port = process.env.port || 4000;
app.listen(port, (e) => {
  e
    ? console.log(`Port ${port} is in use`)
    : console.log(`app is live on port ${port}`);
});
