import ticketsService from "@/services/tickets-service";
import { AuthenticatedRequest } from "@/middlewares";
import { Response } from "express";
import httpStatus from "http-status";
import enrollmentsService from "@/services/enrollments-service";

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

export async function createTicket(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { ticketTypeId } = req.body;
  if (!ticketTypeId) res.sendStatus(httpStatus.BAD_REQUEST);
  try {
    const enrollmentId = await enrollmentsService.getOneWithAddressByUserId(userId);
    const newTicket = await ticketsService.createTicket(ticketTypeId, enrollmentId.id);
    return res.status(httpStatus.CREATED).send(newTicket);
  } catch {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}
