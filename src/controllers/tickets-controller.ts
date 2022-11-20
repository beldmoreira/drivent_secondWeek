import ticketsService from "@/services/tickets-service";
import { Request, Response } from "express";
import httpStatus from "http-status";

export async function findTicketTypes(_req: Request, res: Response) {
  try {
    const type = await ticketsService.findTicketTypes();
    return res.status(httpStatus.OK).send(type);
  } catch {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}
