import ticketsService from "@/services/tickets-service";
import { AuthenticatedRequest } from "@/middlewares";
import { Response } from "express";
import httpStatus from "http-status";

export async function findTicketTypes(req: AuthenticatedRequest, res: Response) {
  try {
    const type = await ticketsService.findTicketTypes();
    return res.status(httpStatus.OK).send(type);
  } catch {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function findTicketsByUserId(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  try {
    const tickets = await ticketsService.findTicketsByUser(userId);
    return res.status(httpStatus.OK).send(tickets);
  } catch {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}
