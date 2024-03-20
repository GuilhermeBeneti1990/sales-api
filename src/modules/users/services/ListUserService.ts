import { getCustomRepository } from "typeorm";
import { UserRepository } from "../typeorm/repositories/UserRepository";
import User from "../typeorm/entities/User";

interface IPaginateUsers {
  from: number;
  to: number;
  per_page: number;
  total: number;
  current_page: number;
  prev_page: number | null;
  next_page: number | null;
  data: User[]
}

class ListUsersService {
  
  public async execute(): Promise<IPaginateUsers> {
    const repository = getCustomRepository(UserRepository);
    
    const users = await repository.createQueryBuilder().paginate();

    return users as IPaginateUsers;
  }

}

export default ListUsersService;
