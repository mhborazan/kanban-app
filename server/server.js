import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import connect from "./db.js";
import StatusModel from "./model.js";

const app = express();
//express cache ekle
dotenv.config();
connect();
// Middlewares
app.use(express.json());
app.use(express.static("public"));
app.use(
  cors({
    origin: ["http://localhost:5173"],
  })
);
//Routes
app.get("/", async (req, res) => {
  try {
    const allStatuses = await StatusModel.find().sort({ order: 1 });
    res.json({ success: true, data: allStatuses });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
app.put("/", async (req, res) => {
  try {
    const { statuses } = req.body;
    let order = 0;
    statuses.forEach((status) => {
      status.order = order;
      order++;
    });
    for await (let status of statuses) {
      let check = await StatusModel.exists({ id: status.id });
      if (check === null) {
        await new StatusModel(status).save();
      } else {
        await StatusModel.findOneAndUpdate({ id: status.id }, { ...status });
      }
    }

    res.json({ success: true, data: statuses });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await StatusModel.findOneAndDelete({ id });
    res.json({ success: true });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
//Listen Serve1r
const port = process.env.PORT || 9000;
app.listen(port, "0.0.0.0", () => {
  console.log("Server is running on port", port);
});
