import Router from "express";
import {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
} from "./handlers";

const router = Router();

router.get("/", getPosts);
router.get("/:id", getPost);
router.post("/", createPost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);

export { router };
