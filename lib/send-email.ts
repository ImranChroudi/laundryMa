import nodemailer from 'nodemailer';



export async function sendEmail(
  to: string,
  subject: string,
  html: string
): Promise<void> {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false,
    auth: {
      user: "smtpjobboard@gmail.com",
      pass: "ynfdnavqhsbgjkbq",
    },
  });

  const mailOptions = {
    from: "smtpjobboard@gmail.com",
    to : "chroudiimran@gmail.com",
    subject,
    html,
  };

  await transporter.sendMail(mailOptions);
}

