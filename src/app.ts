import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import config from "./config";
import { notFound } from "./middleware/notFound";
import { globalErrorHandler } from "./middleware/globalErrorHandler";
import { userRoutes } from "./user/user.route";
import { authRoutes } from "./auth/auth.route";
import { categoryRoutes } from "./category/category.route";
import { propertyRoutes } from "./property/property.route";
import { rentalRquestRoutes } from "./rentalRequest/rentalRequest.route";

const app: Application = express();

app.use(
  cors({
    origin: config.app_url,
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

app.use("/api/auth", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", propertyRoutes);
app.use("/api", rentalRquestRoutes);

app.use(notFound);

app.use(globalErrorHandler);

export default app;
