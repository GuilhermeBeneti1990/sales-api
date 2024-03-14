import { getCustomRepository } from "typeorm";
import { UserRepository } from "../typeorm/repositories/UserRepository";
import AppError from "@shared/errors/AppError";
import User from "../typeorm/entities/User";
import { hash } from "bcryptjs";

interface IRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  
  public async execute({name, email, password}: IRequest): Promise<User> {
    const repository = getCustomRepository(UserRepository);
    
    const userExists = await repository.findByEmail(email);

    if(userExists) throw new AppError('There is already a user with this email!');

    const hashedPassword = await hash(password, 10);

    const user = repository.create({
      name,
      email,
      password: hashedPassword
    });

    await repository.save(user);

    return user;
  }

}

export default CreateUserService;
