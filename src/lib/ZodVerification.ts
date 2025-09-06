
import { z } from "zod";


// Define login schema
export const loginSchema = z.object({
    phone: z.string().min(10, "Enter a valid number").max(13, "Enter a valid number"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});