import mongoose from "mongoose";
const taskSchema = new mongoose.Schema({
  title: String,
  id: String,
});

const statusSchema = new mongoose.Schema({
  id: String,
  title: String,
  tasks: [taskSchema],
});

const StatusModel = mongoose.model("status", statusSchema);

export default StatusModel;
