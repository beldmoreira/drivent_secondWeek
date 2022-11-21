import { notFoundError, unauthorizedError } from "@/errors";
import { paymentData } from "@/protocols";
import enrollmentRepository from "@/repositories/enrollment-repository";
import paymentRepository from "@/repositories/payment-repository";
import ticketsRepository from "@/repositories/tickets-repository";
import { Ticket } from "@prisma/client";
import enrollmentsService from "../enrollments-service";

async function getPayment(enrollmentId: number, ticket: Ticket) {
  if (ticket.enrollmentId !== enrollmentId) throw unauthorizedError();
  const payment = await paymentRepository.getPaymentByTicketId(ticket.id);
  if (!payment) throw notFoundError();
  return payment;
}

async function createPayment(userId: number, ticketId: number, cardData: paymentData, enrollmentId: number) {
  const ticket = await ticketsRepository.findTicketById(ticketId);
  if (ticket.enrollmentId !== enrollmentId) throw unauthorizedError();
  if (!ticket) throw notFoundError();

  const payment = await paymentRepository.createPayment(ticketId, { ...cardData });
  await ticketsRepository.updateTicket(ticketId);
  return payment;
}

const paymentsService = {
  getPayment,
  createPayment,
};

export default paymentsService;
