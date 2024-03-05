import { Prisma } from "@prisma/client";
import db from "../../../db";
import { Request, Response } from "express";

export const getPosts = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const posts = await db.post.findMany({
      include: {
        author: true,
      },
      orderBy: {
        createdOn: "desc",
      },
    });
    return res.status(200).send(posts);
  } catch (e) {
    return res.status(500).send(e);
  }
};

export const getPost = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;

  try {
    const post = await db.post.findUnique({
      where: { id },
    });

    if (post) {
      return res.status(200).send(post);
    }
    return res.status(404).send({ message: "Not Found" });
  } catch (e) {
    return res.status(500).send(e);
  }
};

export const createPost = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { title, content, image, published, authorId } = req.body;

  try {
    const user: Prisma.UserWhereUniqueInput = (await db.user.findUnique({
      where: {
        id: "b2ed47e2-9ce3-4cbc-b15b-43ea71be7095",
      },
    })) as Prisma.UserWhereUniqueInput;

    if (user) {
      const post = await db.post.create({
        data: {
          title,
          content,
          image,
          published,
          authorId: authorId,
        },
      });
      if (post) {
        return res.status(200).send(post);
      }
    }
    return res.status(500).send({ message: "Something went wrong" });
  } catch (e: any) {
    return res.status(500).send({ message: e });
  }
};

export const updatePost = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;

  try {
    const post = await db.post.update({
      where: {
        id,
      },
      data: req.body,
    });

    if (post) {
      return res.status(200).send(post);
    }
    return res.status(500).send({ message: "Something went wrong" });
  } catch (e: any) {
    return res.status(500).send({ message: e });
  }
};

export const deletePost = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deletedItem = await db.post.delete({
      where: {
        id,
      },
    });

    if (deletedItem)
      return res.status(200).send({ message: "Deleted ❌", deletedItem });
    return res.status(404).send({ message: "Not Found 😐" });
  } catch (e) {
    return res.status(500).send({ message: e });
  }
};
