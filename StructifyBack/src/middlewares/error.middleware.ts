import { Request, Response, NextFunction } from "express";
import { logger } from "../utils/logger";
import { ApiErrorResponse } from "../types/generated.types";

export function errorMiddleware(
    err: Error,
    _req: Request,
    res: Response<ApiErrorResponse>,
    _next: NextFunction
): void {
    logger.error("Unhandled error", { message: err.message, stack: err.stack });

    const statusCode = res.statusCode !== 200 ? res.statusCode : 500;

    res.status(statusCode).json({
        success: false,
        message: err.message || "Internal Server Error",
    });
}
