import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  done: {
    type: Boolean,
  },
});

const TaskModel = mongoose.model("Task", taskSchema);
export default TaskModel;
