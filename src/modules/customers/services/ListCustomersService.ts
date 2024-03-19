import { getCustomRepository } from "typeorm";
import { CustomerRepository } from "../typeorm/repositories/CustomerRepository";
import Customer from "../typeorm/entities/Customer";

class ListCustomersService {
  
  public async execute(): Promise<Customer[]> {
    const repository = getCustomRepository(CustomerRepository);
    
    const customers = await repository.find();

    return customers;
  }

}

export default ListCustomersService;
