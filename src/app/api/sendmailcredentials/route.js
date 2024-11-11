import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Define the email and password for nodemailer
const AUTH_EMAIL = process.env.AUTH_EMAIL
const AUTH_PASS = process.env.AUTH_PASS

// Email validation regex (basic)
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export async function POST(req) {
    try {
        // Get data from the request
        const { userName, userEmail, userPaymentID } = await req.json();
        console.log("userName: ", userName);
        console.log("userEmail: ", userEmail);
        console.log("userPaymentId: ", userPaymentID);

        // Validate the required fields
        if (!userName || !userEmail || !userPaymentID) {
            return NextResponse.json({
                status: 400,
                message: "Missing required fields: userName, userEmail, or paymentId",
            });
        }

        // Validate email format
        if (!emailRegex.test(userEmail)) {
            return NextResponse.json({
                status: 400,
                message: "Invalid email format",
            });
        }

        // Create the email transporter
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: AUTH_EMAIL,
                pass: AUTH_PASS,
            },
        });

        // Prepare the email content
        const mailOptions = {
            from: AUTH_EMAIL,
            to: userEmail,
            subject: "Your Participant Credentials from Footloose Monkey",
            html: `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Participant Credentials</title>
                <style>
                    body {
                        font-family: 'Arial', sans-serif;
                        margin: 0;
                        padding: 0;
                        background-color: #f4f7fb;
                        color: #333;
                    }
                    .container {
                        max-width: 600px;
                        margin: 40px auto;
                        background-color: #ffffff;
                        border-radius: 8px;
                        box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
                        overflow: hidden;
                    }
                    .header {
                        background-color: #1e3a8a; /* Dark Blue */
                        padding: 20px;
                        text-align: center;
                        color: #ffffff;
                    }
                    .header h1 {
                        margin: 0;
                        font-size: 28px;
                        font-weight: bold;
                    }
                    .header p {
                        font-size: 14px;
                        margin: 8px 0 0;
                    }
                    .content {
                        padding: 20px;
                    }
                    h2 {
                        font-size: 22px;
                        color: #333;
                        margin-bottom: 15px;
                    }
                    p {
                        line-height: 1.6;
                        margin-bottom: 16px;
                        color: #444;
                    }
                    .credentials {
                        background-color: #f1faff; /* Light Blue */
                        padding: 20px;
                        border-radius: 8px;
                        margin-bottom: 20px;
                    }
                    .credentials p {
                        margin: 5px 0;
                        font-weight: bold;
                        font-size: 16px;
                    }
                    .cta-button {
                        display: block;
                        width: 200px;
                        padding: 12px 25px;
                        background-color: #1e3a8a; /* Dark Blue */
                        color: #ffffff;
                        border-radius: 5px;
                        text-align: center;
                        font-weight: bold;
                        text-decoration: none;
                        font-size: 18px;
                        margin: 20px auto; /* Center the button */
                    }
                    .cta-button:hover {
                        background-color: #2563eb; /* Light Blue on hover */
                    }
                    .footer {
                        padding: 15px;
                        text-align: center;
                        font-size: 12px;
                        color: #888;
                        background-color: #f4f7fb;
                        margin-top: 30px;
                    }
                    .footer a {
                        color: #1e3a8a;
                        text-decoration: none;
                    }
                    .footer a:hover {
                        text-decoration: underline;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>Welcome to Footloose Monkey!</h1>
                        <p>Your credentials are ready to get started.</p>
                    </div>
                    <div class="content">
                        <h2>Hello, ${userName}!</h2>
                        <p>Thank you for joining Footloose Monkey. We are excited to have you as a part of our community of talented participants.</p>
                        <p>Here are your credentials to access your account and start uploading your videos:</p>
        
                        <div class="credentials">
                            <p><strong>Email:</strong> <span style="color: #1e3a8a;">${userEmail}</span></p>
                            <p><strong>Payment ID:</strong> <span style="color: #1e3a8a;">${userPaymentID}</span></p>
                        </div>
        
                        <h3>Next Steps:</h3>
                        <p>1. Visit our platform to verify your account by clicking the button below.</p>
                        <p>2. Upload your first video to start participating in the community!</p>
                        <p>If you have any questions or need assistance, feel free to contact us at any time.</p>
        
                        <a href="https://www.footloosemonkey.club/verify" class="cta-button">Verify My Account</a>
                    </div>
        
                    <div class="footer">
                        <p>&copy; 2024 Footloose Monkey. All Rights Reserved.</p>
                        <p><a href="https://www.footloosemonkey.club/privacy-policy">Privacy Policy</a> | <a href="https://www.footloosemonkey.club/terms-of-service">Terms of Service</a></p>
                        <p>Need help? <a href="mailto:support@footloosemonkey.club">Contact Support</a></p>
                    </div>
                </div>
            </body>
            </html>
            `,
        };


        // Send the email
        await transporter.sendMail(mailOptions);

        // Return a successful response
        return NextResponse.json({
            status: 200,
            message: "Email sent successfully!",
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            status: 500,
            message: "Error sending email",
        });
    }
}
