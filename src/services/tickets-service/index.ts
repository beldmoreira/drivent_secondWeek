import { notFoundError } from "@/errors";
import ticketsRepository from "@/repositories/tickets-repository";

async function findTicketTypes() {
  const types = await ticketsRepository.findTicketTypes();
  if (!types) throw notFoundError();
  return types;
}

async function findTicketsByUser(userId: number) {
  const tickets = await ticketsRepository.findTicketsByUserId(userId);
  if (!tickets) throw notFoundError();
  return tickets;
}

const ticketsService = {
  findTicketTypes,
  findTicketsByUser,
};

export default ticketsService;
