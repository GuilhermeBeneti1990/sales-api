import { getCustomRepository } from "typeorm";
import { UserRepository } from "../typeorm/repositories/UserRepository";
import User from "../typeorm/entities/User";
import AppError from "@shared/errors/AppError";

interface IRequest {
  user_id: string;
}

class ShowUserProfileService {
  
  public async execute({ user_id }: IRequest): Promise<User> {
    const repository = getCustomRepository(UserRepository);
    
    const user = await repository.findById(user_id);

    if(!user) throw new AppError('User not found!', 404);

    return user;
  }

}

export default ShowUserProfileService;
