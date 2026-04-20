import { z } from "zod";

export const ContactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Invalid email address" }).optional().or(z.literal("")),
  phone: z.string().min(5, { message: "Invalid phone number" }).optional().or(z.literal("")),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
  // Honeypot field - should be empty
  company: z.string().max(0).optional(),
}).refine((data) => {
  // Check if either email or phone is provided
  return (data.email && data.email.length > 0) || (data.phone && data.phone.length > 0);
}, {
  message: "Please provide either an email address or a phone number",
  path: ["email"], // Show error on email field by default
});

export type ContactInput = z.infer<typeof ContactSchema>;
