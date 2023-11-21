import EmailRequestConfirmTemplate from "@/components/EmailRequestConfirmTemplate";
import { createTransport } from "nodemailer";
import { MailOptions } from "nodemailer/lib/sendmail-transport";

export async function sendConfirmCodeEmail(
  to: string,
  subject: string,
  text: string,
  html: string
) {
  const transporter = createTransport({
    service: "gmail",
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PASSWORD,
    },
  });

  const mailOptions: MailOptions = {
    from: process.env.NODEMAILER_EMAIL,
    to,
    subject,
    text,
    html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Message sent: %s", info.messageId);
    return info;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to send email: " + error);
  }
}

export async function renderConfirmCodeEmail(
  firstName: string,
  confirmCode: string
) {
  const ReactDOMServer = (await import("react-dom/server")).default;
  const html = ReactDOMServer.renderToString(
    EmailRequestConfirmTemplate({ firstName, confirmCode })
  );
  return html;
}
