import { getCustomRepository } from "typeorm";
import { CustomerRepository } from "../typeorm/repositories/CustomerRepository";
import Customer from "../typeorm/entities/Customer";
import AppError from "@shared/errors/AppError";

interface IRequest {
  id: string;
}

class ShowCustomerService {
  
  public async execute({ id }: IRequest): Promise<Customer> {
    const repository = getCustomRepository(CustomerRepository);
    
    const customer = await repository.findById(id);

    if(!customer) throw new AppError('Customer not found!', 404);

    return customer;
  }

}

export default ShowCustomerService;
