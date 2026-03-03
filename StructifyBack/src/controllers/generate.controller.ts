import { Request, Response, NextFunction } from "express";
import { generateSchema } from "../validators/generate.validator";
import { generateArchitecture } from "../services/ai.service";
import { ApiResponse, ApiErrorResponse, GeneratedResult } from "../types/generated.types";
import { logger } from "../utils/logger";
import { z } from "zod";

export async function handleGenerate(
    req: Request,
    res: Response<ApiResponse<GeneratedResult> | ApiErrorResponse>,
    next: NextFunction
): Promise<void> {
    try {
        const parsed = generateSchema.parse(req.body);
        logger.info("Generate request received", { description: parsed.description.substring(0, 50) });

        const result = await generateArchitecture(parsed.description);

        res.status(200).json({
            success: true,
            data: result,
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
            const issues = error.issues.map((issue) => issue.message).join(", ");
            res.status(400).json({
                success: false,
                message: issues,
            });
            return;
        }
        next(error);
    }
}
