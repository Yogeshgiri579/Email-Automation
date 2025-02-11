import mongoose from "mongoose";

const schedulingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    recipients: {
      type: [String],
      required: true,
      validate: {
        validator: function (emails) {
          return emails.every((email) => /^\S+@\S+\.\S+$/.test(email));
        },
        message: (props) => `One or more email addresses are invalid: ${props.value}`,
      },
    },
    subject: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    scheduleTime: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["scheduled", "sent", "canceled"],
      default: "scheduled",
    },
  },
  { timestamps: true }
);

// No unique indexes to avoid conflicts
const schedulingModel = mongoose.models.scheduling || mongoose.model("scheduling", schedulingSchema);
export default schedulingModel;
