import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { createTicket, findTicketsByUserId, findTicketTypes } from "@/controllers";

const ticketsRouter = Router();

ticketsRouter
  .all("/*", authenticateToken)
  .get("/types", findTicketTypes)
  .get("/", findTicketsByUserId)
  .post("/", createTicket);

export { ticketsRouter };
