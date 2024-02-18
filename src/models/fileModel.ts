import { Schema, model, models } from "mongoose";

export interface IRecordings {
  public_id: string;
  secure_url: string;
  email: string;
  title: string;
  topic: string;
}

const recordingSchema = new Schema<IRecordings>(
  {
    public_id: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
    },
    secure_url: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
    },
    topic: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Recording = models.Recording || model("recordings", recordingSchema);

export default Recording;
