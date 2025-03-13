import mongoose from "mongoose";

const MemorySchema = new mongoose.Schema({
  title: { type: String, required: true },
  caption: { type: String, required: true },
  imageUrl: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Memory = mongoose.models.Memory || mongoose.model("Memory", MemorySchema);

export default Memory;
