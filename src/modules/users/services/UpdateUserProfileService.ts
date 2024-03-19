import { getCustomRepository } from "typeorm";
import { UserRepository } from "../typeorm/repositories/UserRepository";
import User from "../typeorm/entities/User";
import AppError from "@shared/errors/AppError";
import { compare, hash } from "bcryptjs";

interface IRequest {
  user_id: string;
  name: string;
  email: string;
  password?: string;
  oldPassword?: string;
}

class UpdateUserProfileService {
  
  public async execute({ user_id, name, email, password, oldPassword }: IRequest): Promise<User> {
    const repository = getCustomRepository(UserRepository);
    
    const user = await repository.findById(user_id);

    if(!user) throw new AppError('User not found!', 404);

    const userEmailExists = await repository.findByEmail(email);

    if(userEmailExists && userEmailExists.id !== user_id) throw new AppError('There is already an user with the same email!');
    
    if(password && !oldPassword) throw new AppError('Old password is required!');

    if(password && oldPassword) {
      const passowrdCheck = await compare(oldPassword, user.password);

      if(!passowrdCheck) throw new AppError('Incorrect old password!');

      user.password = await hash(password, 10);
    }

    user.name = name;
    user.email = email;

    await repository.save(user);

    return user;
  }

}

export default UpdateUserProfileService;
