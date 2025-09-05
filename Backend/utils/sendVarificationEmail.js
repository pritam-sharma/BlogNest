const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

const sendVerificationEmail = async (toSendEmail, verificationTocken) => {
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

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${verificationTocken}`;

    const message = {
      from: `"MyApp Support">`,
      to: toSendEmail,
      subject: "Account Verification Token",
      html: `
        <h2>Account Verification Request</h2>
        <p>Use the token below to verify your account (valid for 15 minutes):</p>
        <h3>${verificationTocken}</h3>
        <p>Or click here:</p>
        <a href="${resetUrl}" target="_blank"
           style="background:#2563eb; color:white; padding:10px 16px; border-radius:6px; text-decoration:none;">
           Verify Your Account
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

module.exports = sendVerificationEmail;
