import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import { logger } from "./utils/logger";

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    logger.info(`Structify API running on port ${PORT}`);
    logger.info(`Environment: ${process.env.NODE_ENV || "development"}`);
});
