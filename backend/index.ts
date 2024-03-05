import express, { Express } from "express";
import { router as usersRouter } from "./routers/users";
import { router as postsRouter } from "./routers/posts";
import morgan from "morgan";

const app: Express = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/users", usersRouter);
app.use("/api/posts", postsRouter);

app.use(morgan("combined"));
app.listen(3000, () => console.log("Listening on Port 3000"));
