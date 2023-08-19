import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import swaggerUI from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import { userRoute } from "./routes/userRoute.js";
import { residencyRoute } from "./routes/residencyRoute.js";
import { newsRoute } from "./routes/newsRoute.js";
dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Real Estate API",
      verision: "1.0.0",
      description: "REST API for real estate",
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const spec = swaggerJSDoc(options);

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(spec));
app.use("/api/user", userRoute);
app.use("api/news", newsRoute);
app.use("/api/residency", residencyRoute);
