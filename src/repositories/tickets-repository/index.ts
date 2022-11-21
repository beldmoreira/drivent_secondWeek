import { prisma } from "@/config";

async function findTicketTypes() {
  return prisma.ticketType.findMany({
    orderBy: { id: "asc" },
  });
}

async function findTicketsByUserId(userId: number) {
  return prisma.ticket.findFirst({
    where: {
      Enrollment: {
        userId,
      },
    },
    include: {
      TicketType: true,
    },
  });
}

async function createTicket(ticketTypeId: number, enrollmentId: number) {
  return prisma.ticket.create({
    data: {
      ticketTypeId,
      enrollmentId,
      status: "RESERVED",
    },
    include: {
      TicketType: true,
    },
  });
}

async function findTicketById(ticketId: number) {
  return prisma.ticket.findUnique({
    where: {
      id: ticketId,
    },
  });
}

async function checkTicketByUser(ticketId: number, userId: number) {
  return prisma.ticket.findFirst({
    where: {
      AND: [
        {
          id: ticketId,
        },
        {
          Enrollment: {
            userId: userId,
          },
        },
      ],
    },
  });
}

const ticketsRepository = {
  findTicketTypes,
  findTicketsByUserId,
  createTicket,
  findTicketById,
  checkTicketByUser,
};
export default ticketsRepository;
