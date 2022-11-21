import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { createPayments, getPayments } from "@/controllers";

const paymentsRouter = Router();

paymentsRouter.all("/*", authenticateToken).get("/", getPayments).post("/process", createPayments);

export { paymentsRouter };
