import { getCustomRepository } from "typeorm";
import { CustomerRepository } from "../typeorm/repositories/CustomerRepository";
import AppError from "@shared/errors/AppError";

interface IRequest {
  id: string;
}

class DeleteCustomerService {
  
  public async execute({ id }: IRequest): Promise<void> {
    const repository = getCustomRepository(CustomerRepository);
    
    const customer = await repository.findById(id);

    if(!customer) throw new AppError('Customer not found!', 404);

    await repository.remove(customer);
  }

}

export default DeleteCustomerService;
