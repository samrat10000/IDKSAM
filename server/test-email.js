import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const password = process.env.EMAIL_PASS ? process.env.EMAIL_PASS.replace(/\s+/g, '') : '';
const user = process.env.EMAIL_USER;

console.log(`Testing with User: ${user}`);
console.log(`Testing with Password Length: ${password.length}`);

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: user,
        pass: password
    }
});

transporter.verify(function (error, success) {
    if (error) {
        console.log('Error connecting to mail server:');
        console.log(error);
    } else {
        console.log('Server is ready to take our messages!');
    }
});
