import express, { Request, Response } from "express";
import TaskModel from "../model/task";
import { boolean, z } from "zod";
const router = express.Router();

const taskSchema = z.object({
  title: z.string().min(4).max(255),
  description: z.string().max(1000),
  done: boolean(),
});

router.get("/todos", async (req: Request, res: Response) => {
  try {
    const todos = await TaskModel.find();
    return res.status(200).json(todos);
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
});

router.post("/add", async (req: Request, res: Response) => {
  try {
    const parseResponse = taskSchema.safeParse(req.body);

    if (!parseResponse.success) {
      return res.status(411).json({
        message: parseResponse.error,
      });
    }

    const todo = await TaskModel.create(parseResponse);
    return res.status(201).json(todo);
  } catch (error: any) {
    return res.status(500).json({
      success: "false",
      message: "something went wrong",
    });
  }
});

export default router;
