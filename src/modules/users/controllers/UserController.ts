import { Request, Response } from "express";
import ListUsersService from "../services/ListUserService";
import CreateUserService from "../services/CreateUserService";

export default class UserController {

  public async list(req: Request, res: Response): Promise<Response> {
    const listProductsService = new ListUsersService();

    const users = await listProductsService.execute();

    return res.json({
      status: 200,
      body: users
    });
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body;

    const createUserService = new CreateUserService();

    const user = await createUserService.execute({
      name,
      email,
      password
    });

    return res.json({
      status: 201,
      body: user
    });
  }

}
