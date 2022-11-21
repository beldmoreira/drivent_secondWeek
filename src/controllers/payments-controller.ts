import paymentsService from "@/services/payments-service";
import ticketsService from "@/services/tickets-service";
import { AuthenticatedRequest } from "@/middlewares";
import { Response } from "express";
import httpStatus from "http-status";
import enrollmentsService from "@/services/enrollments-service";

export async function getPayments(req: AuthenticatedRequest, res: Response) {
  const { ticketId } = req.query;
  if (!ticketId) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
  const { userId } = req;
  try {
    const getEnrollment = await enrollmentsService.findEnrollment(userId);
    const findticketId = await ticketsService.findTicketsById(Number(ticketId));
    const payment = await paymentsService.getPayment(getEnrollment.id, findticketId);
    return res.status(httpStatus.OK).send(payment);
  } catch (error) {
    if (error.name === "NotFoundError") return res.sendStatus(httpStatus.NOT_FOUND);
    if (error.name === "UnauthorizedError") return res.sendStatus(httpStatus.UNAUTHORIZED);
  }
}
