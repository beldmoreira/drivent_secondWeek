import { prisma } from "@/config";
import { paymentData } from "@/protocols";
import { Ticket } from "@prisma/client";
import { TicketType } from "@prisma/client";

async function getPaymentByTicketId(ticketId: number) {
  return prisma.payment.findFirst({
    where: { ticketId },
  });
}

async function createPayment(ticketId: number, cardData: paymentData) {
  return prisma.payment.create({
    data: {
      ticketId,
      value: cardData.value,
      cardIssuer: cardData.issuer,
      cardLastDigits: cardData.number.slice(-4),
    },
  });
}

const paymentRepository = {
  getPaymentByTicketId,
  createPayment,
};
export default paymentRepository;
