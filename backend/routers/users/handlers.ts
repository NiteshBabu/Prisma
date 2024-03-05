import db from "../../../db";
import { User } from "@prisma/client";
import { Request, Response } from "express";

export const getUsers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const users = await db.user.findMany();
    return res.status(200).send(users);
  } catch (e) {
    return res.status(500).send(e);
  }
};

export const getUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;
  try {
    const user = await db.user.findUnique({
      where: { id },
    });

    if (user) {
      return res.status(200).send(user);
    }
    return res.status(404).send({ message: "Not Found" });
  } catch (e) {
    return res.status(500).send(e);
  }
};

export const createUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { name, email } = req.body;

  try {
    const user = await db.user.create({
      data: {
        name,
        email,
      },
    });

    if (user) {
      return res.status(200).send(user);
    }
    return res.status(500).send({ message: "Something went wrong" });
  } catch (e: any) {
    return res.status(500).send({ message: e });
  }
};

export const updateUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;

  try {
    const user = await db.user.update({
      where: {
        id,
      },
      data: req.body,
    });

    if (user) {
      return res.status(200).send(user);
    }
    return res.status(500).send({ message: "Something went wrong" });
  } catch (e: any) {
    return res.status(500).send({ message: e });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deletedItem = await db.user.delete({
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
