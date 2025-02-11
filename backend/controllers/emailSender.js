import transporter from "../config/nodemailer.js";

const sendEmail = async (req, res) => {
    try {
      const { recipients, subject, body } = req.body;
       
       const { email } = req.user;

      // Validate required fields
      if (!recipients || !subject || !body) {
        return res.status(400).json({ success: false, message: "All fields are required" });
      }

      // Send the email
      const info = await transporter.sendMail({
        from: email,
        to: recipients,
        subject,
        text: body,
      });

      res.status(200).json({ success: true, message: "Email sent successfully", info });
    } catch (error) {
      console.error("Error sending email:", error.message);
      res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
  };

  export default sendEmail 
