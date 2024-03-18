import { getCustomRepository } from "typeorm";
import AppError from "@shared/errors/AppError";
import { UserRepository } from "../typeorm/repositories/UserRepository";
import { UserTokensRepository } from "../typeorm/repositories/UserTokensRepository";
import { addHours, isAfter } from "date-fns";
import { hash } from "bcryptjs";

interface IRequest {
  token: string;
  password: string;
}

class ResetPasswordService {
  
  public async execute({token, password}: IRequest): Promise<void> {
    const userRepository = getCustomRepository(UserRepository);
    const userTokenRepository = getCustomRepository(UserTokensRepository);

    const userToken = await userTokenRepository.findByToken(token);

    if(!userToken) throw new AppError('User token not found!', 404);

    const user = await userRepository.findById(userToken.user_id);

    if(!user) throw new AppError('User not found!', 404);

    const tokenCreatedAt = userToken.created_at;
    const compareDate = addHours(tokenCreatedAt, 2);

    if(isAfter(Date.now(), compareDate)) throw new AppError('Token expired!');

    user.password = await hash(password, 10);

    await userRepository.save(user);
    
  }

}

export default ResetPasswordService;
