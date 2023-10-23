import DotenvConfiguration from "../config/env.config";
import nodemailer from "nodemailer";

interface IMailOptions {
  to: string;
  subject: string;
  text: string;
  from: string;
  html?: string;
}

// const sendMailUtil = async ({ to, html, subject, text, from }: IMailOptions) => {
const sendMailUtil = ({ to, html, subject, text, from }: IMailOptions) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: DotenvConfiguration.MAIL_USERNAME,
      pass: DotenvConfiguration.MAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from,
    text,
    to,
    html,
    subject,
  };

  transporter.sendMail(mailOptions, (error: any, info: any) => {
    if (error) {
      console.log(error);
    } else {
      console.log(info);
    }
  });
};

export default sendMailUtil;
