import express from "express";
import "dotenv/config";
import { routers } from "./router";

const app = express();
const PORT = process.env.PORT ?? 3000;

// Middlewares
app.use(express.json());

// routes
app.use("/api", routers);

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
});
