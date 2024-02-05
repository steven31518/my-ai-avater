import nodemailer from "nodemailer";
export async function sendMail({
  to,
  subject,
  body,
}: {
  to: string;
  subject: string;
  body: string;
}) {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SERVER_HOST,
    port: Number(process.env.EMAIL_SERVER_PORT),
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_SERVER_USER, // generated ethereal user
      pass: process.env.EMAIL_SERVER_PASSWORD, // generated ethereal password
    },
  });
  await transporter.sendMail({});
}
