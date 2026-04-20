"use server";

import { ContactSchema, type ContactInput } from "../validations/contact";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const DESTINATION_EMAIL = process.env.RESEND_TO_EMAIL || "zardiconstruction@gmail.com";

export type ActionResponse = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
};

export async function sendContactForm(data: ContactInput): Promise<ActionResponse> {
  // 1. Logic to check Honeypot (Anti-Spam)
  if (data.company && data.company.length > 0) {
    // Silent fail for bots
    return { success: true, message: "Thank you for your message!" };
  }

  // 2. Server-side validation
  const result = ContactSchema.safeParse(data);
  if (!result.success) {
    return {
      success: false,
      message: "Please fix the errors in the form",
      errors: result.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  const { name, email, phone, message } = result.data;

  try {
    // 3. Send Email via Resend
    const { error } = await resend.emails.send({
      from: `Zardi Contact <${process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev"}>`,
      to: [DESTINATION_EMAIL],
      subject: `New Message from ${name}`,
      text: `
        Name: ${name}
        Email: ${email || "Not provided"}
        Phone: ${phone || "Not provided"}
        Message: ${message}
      `,
      replyTo: email || undefined,
    });

    if (error) {
      console.error("Resend Error:", error);
      return {
        success: false,
        message: "Could not send email. Please try again later.",
      };
    }

    return {
      success: true,
      message: "Your message has been sent successfully. We will get back to you soon!",
    };
  } catch (error) {
    console.error("General Error:", error);
    return {
      success: false,
      message: "Something went wrong. Please try again later.",
    };
  }
}
