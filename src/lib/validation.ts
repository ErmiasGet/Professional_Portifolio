import { z } from "zod";

/**
 * Shared validation for the contact form. Used both by the client-side form
 * and the API route so the rules always match.
 */
export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(80, "Name must be 80 characters or fewer"),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email")
    .max(120, "Email must be 120 characters or fewer"),
  subject: z
    .string()
    .trim()
    .min(5, "Subject must be at least 5 characters")
    .max(200, "Subject must be 200 characters or fewer"),
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters")
    .max(5000, "Message must be 5000 characters or fewer"),
  purpose: z.string().trim().max(80).optional(),
  website: z.string().trim().max(200).optional(),
});

export type ContactFormData = z.infer<typeof contactSchema>;