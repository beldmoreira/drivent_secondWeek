import { Ticket } from "@prisma/client";
import { prisma } from "@/config";

async function findTicketTypes() {
  return prisma.ticketType.findMany({
    orderBy: { id: "asc" },
  });
}

const ticketsRepository = {
  findTicketTypes,
};
export default ticketsRepository;
