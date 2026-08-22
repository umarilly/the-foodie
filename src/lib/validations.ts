import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

export const signupSchema = z
  .object({
    firstName: z.string().trim().min(1, "First name is required").max(60),
    lastName: z.string().trim().min(1, "Last name is required").max(60),
    email: z.email("Enter a valid email address"),
    phone: z
      .string()
      .trim()
      .min(7, "Enter a valid phone number")
      .max(20)
      .optional()
      .or(z.literal("")),
    address: z.string().trim().max(200).optional().or(z.literal("")),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const profileSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(60),
  lastName: z.string().trim().min(1, "Last name is required").max(60),
  phone: z
    .string()
    .trim()
    .min(7, "Enter a valid phone number")
    .max(20)
    .optional()
    .or(z.literal("")),
  address: z.string().trim().max(200).optional().or(z.literal("")),
});

export const passwordChangeSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(120),
  email: z.email("Enter a valid email address"),
  subject: z.string().trim().min(1, "Subject is required").max(150),
  message: z.string().trim().min(1, "Message is required").max(2000),
});

export const newsletterSchema = z.object({
  email: z.email("Enter a valid email address"),
});

export const checkoutSchema = z.object({
  contactName: z.string().trim().min(1, "Name is required").max(120),
  contactPhone: z.string().trim().min(7, "Enter a valid phone number").max(20),
  deliveryAddress: z.string().trim().min(5, "Enter a delivery address").max(300),
  notes: z.string().trim().max(500).optional().or(z.literal("")),
  paymentMethod: z.enum(["CASH_ON_DELIVERY", "CARD"]),
  cardNumber: z.string().optional(),
  cardExpiry: z.string().optional(),
  cardCvc: z.string().optional(),
});

export const menuItemSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(120),
  description: z.string().trim().min(1, "Description is required").max(500),
  priceCents: z.coerce.number().int().min(1, "Price must be greater than 0"),
  imageUrl: z.string().trim().min(1, "Image URL is required"),
  categoryId: z.string().min(1, "Category is required"),
  isAvailable: z.coerce.boolean().default(true),
  isFeatured: z.coerce.boolean().default(false),
});

export const orderStatusSchema = z.object({
  status: z.enum([
    "PENDING",
    "CONFIRMED",
    "PREPARING",
    "OUT_FOR_DELIVERY",
    "DELIVERED",
    "CANCELLED",
  ]),
});
