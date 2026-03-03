import express from "express";
import helmet from "helmet";
import cors from "cors";
import generateRoutes from "./routes/generate.routes";
import { errorMiddleware } from "./middlewares/error.middleware";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/api/generate", generateRoutes);

app.use(errorMiddleware);

export default app;
