import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

// Create a "transporter" - this is the object that actually sends emails
// We are configuring it to use Gmail (or any other service via .env)
const transporter = nodemailer.createTransport({
    service: 'gmail', // easy setup for gmail
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS ? process.env.EMAIL_PASS.replace(/\s+/g, '') : '' // Remove spaces if present
    }
});

// The main function to handle the request
export const sendEmail = async (req, res) => {
    const { fromName, subject, message } = req.body;

    // Validation: Make sure we have the info we need
    if (!fromName || !message) {
        return res.status(400).json({ success: false, message: 'Name and Message are required!' });
    }

    try {
        // Define the email options
        const mailOptions = {
            from: process.env.EMAIL_USER, // Sender address (must be authenticated user)
            to: process.env.EMAIL_USER,   // Sending to YOURSELF (it's a contact form)
            subject: `[Portfolio] ${subject || 'New Message'}`, // Prefix to spot it easily
            text: `
From: ${fromName}

Message:
${message}

-------------------------
Sent from your Retro Portfolio
            `
        };

        // Send it!
        await transporter.sendMail(mailOptions);
        
        console.log(`Email sent from ${fromName}`);
        res.status(200).json({ success: true, message: 'Email transmitted successfully! 📨' });

    } catch (error) {
        console.error('Email Error:', error);
        res.status(500).json({ success: false, message: 'Transmission failed. Satellites down.' });
    }
};
