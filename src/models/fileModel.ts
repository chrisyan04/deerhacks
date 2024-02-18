import { Schema, model, models } from "mongoose";

export interface IRecordings {
  public_id: string;
  secure_url: string;
  // email?: string;
  // topic?: string;
  // audio_title?: string;
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
    // email: {
    //   type: String,
    //   required: true,
    //   unique: true,
    //   trim: true,
    // },
    // topic: {
    //   type: String,
    //   required: true,
    //   trim: true,
    // },
    // audio_title: {
    //   type: String,
    //   required: true,
    //   trim: true,
    // }
  },
  {
    timestamps: true,
  }
);

const Recording = models.Recording || model("Recordings", recordingSchema);

export default Recording;
