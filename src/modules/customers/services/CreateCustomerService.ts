import { getCustomRepository } from "typeorm";
import { CustomerRepository } from "../typeorm/repositories/CustomerRepository";
import AppError from "@shared/errors/AppError";
import Customer from "../typeorm/entities/Customer";

interface IRequest {
  name: string;
  email: string;
}

class CreateCustomerService {
  
  public async execute({name, email}: IRequest): Promise<Customer> {
    const repository = getCustomRepository(CustomerRepository);
    
    const customerExists = await repository.findByEmail(email);

    if(customerExists) throw new AppError('There is already a user with this email!');

    const customer = repository.create({
      name,
      email
    });

    await repository.save(customer);

    return customer;
  }

}

export default CreateCustomerService;
