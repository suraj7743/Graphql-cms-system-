import { User } from "../../entities/user/user.entity";
import sendMailUtil from "../../utils/email.util";
import DotenvConfiguration from "../../config/env.config";

export enum EMAIL_TEMPLATE {
  USER_REGISTER = "USER_REGISTER",
  USER_ACCOUNT_VERIFICATION_STATUS = "USER_ACCOUNT_VERIFICATION_STATUS",
  PROPOSAL_VERIFICATION_STATUS = "PROPOSAL_VERIFICATION_STATUS",
}

export class EmailService {
  private to: string;
  private subject: string;
  private html: string;
  private text: string;
  private templateType: EMAIL_TEMPLATE;
  private user: User | undefined;

  //
  constructor(
    templateType: EMAIL_TEMPLATE,
    user?: User,
    subject?: string,
    text?: string,
    html?: string,
    to?: string
  ) {
    this.to = to || "";
    this.subject = subject || "";
    this.html = html || "";
    this.text = text || "";
    this.user = user;
    this.templateType = templateType;
  }

  async sendEmail() {
    const { subject, html } = this.getEmailMessage();
    await sendMailUtil({
      to: this.to || this.user?.email || "",
      subject: this.subject || subject,
      html: this.html || html,
      text: this.text || "",
      from: process.env.MAIL_FROM?.toString() || "",
    });
  }

  private getEmailMessage() {
    switch (this.templateType) {
      case EMAIL_TEMPLATE.USER_REGISTER:
        return {
          subject: `Welcome to ${DotenvConfiguration.APP_NAME}`,
          html: `<h1>Welcome to  ${
            DotenvConfiguration.APP_NAME
          }</h1>. Thankyou for joining as ${
            this.user?.userType || ""
          }. Your account would be soon verified by the Admin team then you can get started with our services.`,
        };
      default:
        return {
          subject: "",
          html: "",
        };
    }
  }
}
