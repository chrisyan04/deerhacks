import mongoose, { Schema } from "mongoose";

export interface ITopics {
  email: string,
  topic: string,
}

const topicSchema = new Schema<ITopics>(
  {
    email: {
      type: String,
      required: true,
      index: true,
      trim: true,
    },
    topic: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
    }
  },
  {
    timestamps: true,
  }
);

const Topics = mongoose.models.Topics || mongoose.model("Topics", topicSchema);

export default Topics;
