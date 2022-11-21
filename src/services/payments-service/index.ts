import { notFoundError, unauthorizedError } from "@/errors";
import paymentRepository from "@/repositories/payment-repository";
import { Ticket } from "@prisma/client";

async function getPayment(enrollmentId: number, ticket: Ticket) {
  if (ticket.enrollmentId !== enrollmentId) throw unauthorizedError();
  const payment = await paymentRepository.getPaymentByTicketId(ticket.id);
  if (!payment) throw notFoundError();
  return payment;
}

const paymentsService = {
  getPayment,
};

export default paymentsService;
