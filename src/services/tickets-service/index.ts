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

async function findTicketsById(ticketId: number) {
  const ticket = await ticketsRepository.findTicketById(ticketId);
  if (!ticket) throw notFoundError();
  return ticket;
}

async function createTicket(ticketTypeId: number, enrollmentId: number) {
  const ticket = await ticketsRepository.createTicket(ticketTypeId, enrollmentId);
  if (!ticket) throw notFoundError();
  return ticket;
}

const ticketsService = {
  findTicketTypes,
  findTicketsByUser,
  createTicket,
  findTicketsById,
};

export default ticketsService;
