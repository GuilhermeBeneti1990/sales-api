import { Request, Response } from "express";
import UploadUserAvatarService from "../services/UploadUserAvatarService";

export default class UserAvatarController {

  public async upload(req: Request, res: Response): Promise<Response> {
   const uploadAvatar = new UploadUserAvatarService();

   const user = uploadAvatar.execute({
    user_id: req.user.id,
    avatarFilename: req.file!.filename
   });

   return res.json({
    status: 200,
    body: {
      message: 'Avatar uploaded!'
    }
   })
  }

}
