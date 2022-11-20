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

const ticketsRepository = {
  findTicketTypes,
  findTicketsByUserId,
};
export default ticketsRepository;
