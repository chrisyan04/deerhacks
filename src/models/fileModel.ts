import { Schema, model, models } from "mongoose";

export interface IRecordings {
  public_id: string;
  secure_url: string;
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
  },
  {
    timestamps: true,
  }
);

const Recording = models.Recording || model("recordings", recordingSchema);

export default Recording;
