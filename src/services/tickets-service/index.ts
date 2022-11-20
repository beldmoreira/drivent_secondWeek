import { notFoundError } from "@/errors";
import ticketsRepository from "@/repositories/tickets-repository";

async function findTicketTypes() {
  const types = await ticketsRepository.findTicketTypes();
  if (!types) throw notFoundError();
  return types;
}

const ticketsService = {
  findTicketTypes,
};

export default ticketsService;
