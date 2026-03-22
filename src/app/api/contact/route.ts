import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    // 1. Save to Database using Prisma
    const newContactMessage = await prisma.contactMessage.create({
      data: {
        name,
        email,
        message,
      },
    });

    // 2. Setup Nodemailer Transporter
    // Note: The user will need to configure SMTP settings in .env for emails to actually send.
    // We will attempt to send, but handle errors gracefully if env vars are missing.
    const smtpHost = process.env.SMTP_HOST;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    if (smtpHost && smtpUser && smtpPass) {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      // Send email to Prince, with Reply-To set to the user who submitted the form
      await transporter.sendMail({
        from: `"Portfolio Contact Form" <${smtpUser}>`, // sender address
        to: "8567prince@gmail.com", // Prince's target email
        replyTo: email, // This enables automatic reply to the user's email
        subject: `New Portfolio Query from ${name}`,
        text: `You have received a new message from your portfolio website.\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
        html: `
          <h3>New Portfolio Contact Message</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <hr />
          <p>${message.replace(/\n/g, "<br>")}</p>
        `,
      });
    }

    return NextResponse.json(
      { success: true, message: "Message sent and stored successfully!", data: newContactMessage },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact API Error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred while processing your request." },
      { status: 500 }
    );
  }
}
