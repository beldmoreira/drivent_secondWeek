import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { findTicketTypes } from "@/controllers";

const ticketsRouter = Router();

ticketsRouter.all("/*", authenticateToken).get("/types", findTicketTypes).get("/").post("/");

export { ticketsRouter };
