import cron from "node-cron";
import moment from "moment";
import schedulingModel from "../models/schedulingModel.js"; // Import the scheduling schema
import  transporter  from "../config/nodemailer.js";

const scheduledTasks = []; // To track active scheduled tasks in memory

// Convert the scheduled time to a cron expression
const convertToCron = (scheduleDateTime) => {
  const date = moment(scheduleDateTime); // Parse the date
  return `${date.minutes()} ${date.hours()} ${date.date()} ${date.month() + 1} *`; // Generate cron expression
};

// Schedule an email
export const scheduleEmail = async (req, res) => {
  try {
    const { recipients, subject, body, scheduleTime } = req.body;

    // Validate required fields
    if (!recipients || !subject || !body || !scheduleTime) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const { email, id: userId } = req.user; // Assuming req.user contains logged-in user's info

    // Save the email schedule to the database
    const newSchedule = new schedulingModel({
      userId,
      recipients,
      subject,
      body,
      scheduleTime,
    });

    await newSchedule.save();

    // Convert the schedule time to a cron expression
    const cronExpression = convertToCron(scheduleTime);

    // Schedule the email
    const task = cron.schedule(
      cronExpression,
      async () => {
        try {
          const mailOptions = {
            from: email, // Sender's email (from logged-in user)
            to: recipients,
            subject,
            text: body,
          };

          await transporter.sendMail(mailOptions);
          console.log(`Email sent to: ${recipients.join(", ")}`);

          // Update the email's status in the database
          await schedulingModel.findByIdAndUpdate(newSchedule._id, { status: "sent" });
        } catch (error) {
          console.error("Error sending scheduled email:", error.message);
        }
      },
      { scheduled: false } // Initially, the task is not running
    );

    // Start the scheduled task
    task.start();

    // Save task details in memory for runtime management
    scheduledTasks.push({
      id: newSchedule._id,
      task,
    });

    res.status(201).json({
      success: true,
      message: "Email scheduled successfully",
      emailId: newSchedule._id,
    });
  } catch (error) {
    console.error("Error scheduling email:", error.message);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};


// Get all scheduled emails for a user
export const getScheduledEmails = async (req, res) => {
  try {
    const { id: userId } = req.user; // Use userId from the authenticated user's details

    // Fetch scheduled emails for the logged-in user
    const scheduledEmails = await schedulingModel.find({ userId, status: "scheduled" });

    res.status(200).json({ success: true, tasks: scheduledEmails });
  } catch (error) {
    console.error("Error fetching scheduled emails:", error.message);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// Cancel a scheduled email
export const cancelScheduledEmail = async (req, res) => {
  try {
    const { emailId } = req.params;


    // Find the scheduled email in the database
    const scheduledEmail = await schedulingModel.findOne({ _id: emailId, status: "scheduled" });

    if (!scheduledEmail) {
      console.log("Task not found or already canceled:", emailId);
      return res.status(404).json({ success: false, message: "Task not found or already canceled" });
    }

    // Find the task in memory (if using in-memory scheduling for cron)
    const taskIndex = scheduledTasks.findIndex((task) => String(task.id) === String(emailId));
    if (taskIndex !== -1) {
      scheduledTasks[taskIndex].task.stop(); // Stop the task
      scheduledTasks.splice(taskIndex, 1);   // Remove the task from memory
    }

    // Remove the email from the database
    await schedulingModel.deleteOne({ _id: emailId });

    console.log("Task canceled and removed from database successfully:", emailId);
    res.status(200).json({ success: true, message: "Scheduled email canceled  successfully" });
  } catch (error) {
    console.error("Error canceling scheduled email:", error.message);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};


export default [scheduleEmail, getScheduledEmails, cancelScheduledEmail];
