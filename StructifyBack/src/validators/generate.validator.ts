import { z } from "zod";

export const generateSchema = z.object({
    description: z
        .string()
        .min(10, "Description must be at least 10 characters"),
});

export type GenerateInput = z.infer<typeof generateSchema>;
