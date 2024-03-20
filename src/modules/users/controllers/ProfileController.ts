import { Request, Response } from "express";
import ShowUserProfileService from "../services/ShowUserProfileService";
import UpdateUserProfileService from "../services/UpdateUserProfileService";
import { instanceToInstance } from "class-transformer";

export default class ProfileController {

  public async show(req: Request, res: Response): Promise<Response> {
    const showUserProfileService = new ShowUserProfileService();
    const user_id = req.user.id;

    const user = await showUserProfileService.execute({ user_id });

    return res.json({
      status: 200,
      body: instanceToInstance(user)
    });
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;
    const { name, email, password, oldPassword } = req.body;

    const updateUserProfileService = new UpdateUserProfileService();

    const user = await updateUserProfileService.execute({
      user_id,
      name,
      email,
      password,
      oldPassword
    });

    return res.json({
      status: 200,
      body: instanceToInstance(user)
    });
  }

}
