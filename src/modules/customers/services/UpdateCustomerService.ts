import { getCustomRepository } from "typeorm";
import { CustomerRepository } from "../typeorm/repositories/CustomerRepository";
import Customer from "../typeorm/entities/Customer";
import AppError from "@shared/errors/AppError";
import { compare, hash } from "bcryptjs";

interface IRequest {
  id: string;
  name: string;
  email: string;
}

class UpdateCustomerService {
  
  public async execute({ id, name, email }: IRequest): Promise<Customer> {
    const repository = getCustomRepository(CustomerRepository);
    
    const customer = await repository.findById(id);

    if(!customer) throw new AppError('Customer not found!', 404);

    const customerEmailExists = await repository.findByEmail(email);

    if(customerEmailExists && customerEmailExists.email !== customer.email) throw new AppError('There is already a customer with the same email!');
    
    customer.name = name;
    customer.email = email;

    await repository.save(customer);

    return customer;
  }

}

export default UpdateCustomerService;
