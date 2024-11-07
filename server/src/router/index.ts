import { Router } from "express";
import customer from "./customer";

export const routers = Router();

routers.use("/customer", customer);
