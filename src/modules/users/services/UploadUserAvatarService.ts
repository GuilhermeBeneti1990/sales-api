import { getCustomRepository } from "typeorm";
import { UserRepository } from "../typeorm/repositories/UserRepository";
import AppError from "@shared/errors/AppError";
import User from "../typeorm/entities/User";
import path from "path";
import fs from "fs";
import uploadConfig from "@config/upload"

interface IRequest {
  user_id: string;
  avatarFilename: string;
}

class UploadUserAvatarService {
  
  public async execute({user_id, avatarFilename}: IRequest): Promise<User> {
    const repository = getCustomRepository(UserRepository);
    
    const user = await repository.findById(user_id);

    if(!user) throw new AppError('User not found!', 404);

    if(user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if(userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);        
      }
    }

    user.avatar = avatarFilename;

    await repository.save(user);

    return user;
  }

}

export default UploadUserAvatarService;
