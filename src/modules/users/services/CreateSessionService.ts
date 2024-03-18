import { getCustomRepository } from "typeorm";
import { UserRepository } from "../typeorm/repositories/UserRepository";
import AppError from "@shared/errors/AppError";
import User from "../typeorm/entities/User";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import authConfig from "@config/auth";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

class CreateSessionService {
  
  public async execute({email, password}: IRequest): Promise<IResponse> {
    const repository = getCustomRepository(UserRepository);
    
    const user = await repository.findByEmail(email);

    if(!user) throw new AppError('Incorrect credentials!', 401);

    const passwordMatches = await compare(password, user.password);

    if(!passwordMatches) throw new AppError('Password does not matches!', 401);

    const token = sign({}, authConfig.jwt.secret, {
      subject: user.id,
      expiresIn: authConfig.jwt.expiresIn
    });

    return {
      user,
      token
    };
  }

}

export default CreateSessionService;
