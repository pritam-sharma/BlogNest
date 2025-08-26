const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

const sendEmail = async (toSendEmail, resetToken) => {
  try {
    // Debug credentials
    if (!process.env.GMAIL_USER || !process.env.APP_PASSWORD) {
      throw new Error("Missing Gmail credentials. Check your .env file.");
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.APP_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false, // ✅ bypass self-signed certs
      },
    });

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    const message = {
      from: `"MyApp Support">`,
      to: toSendEmail,
      subject: "Password Reset Token",
      html: `
        <h2>Password Reset Request</h2>
        <p>Use the token below to reset your password (valid for 15 minutes):</p>
        <h3>${resetToken}</h3>
        <p>Or click here:</p>
        <a href="${resetUrl}" target="_blank"
           style="background:#2563eb; color:white; padding:10px 16px; border-radius:6px; text-decoration:none;">
           Reset Password
        </a>
      `,
    };

    const info = await transporter.sendMail(message);
    console.log("✅ Email sent:", info.messageId);
  } catch (err) {
    console.error("❌ Email sending failed:", err.message);
    throw new Error("Email sending failed!");
  }
};

module.exports = sendEmail;
