import { getCustomRepository } from "typeorm";
import { UserRepository } from "../typeorm/repositories/UserRepository";
import User from "../typeorm/entities/User";

class ListUsersService {
  
  public async execute(): Promise<User[]> {
    const repository = getCustomRepository(UserRepository);
    
    const users = await repository.find();

    return users;
  }

}

export default ListUsersService;
