import { Request, Response } from "express";
import ListProductsService from "../services/ListProductsService";
import ShowProductService from "../services/ShowProductService";
import CreateProductService from "../services/CreateProductService";
import UpdateProductService from "../services/UpdateProductService";
import DeleteProductService from "../services/DeleteProductService";

export default class ProductController {

  public async list(req: Request, res: Response): Promise<Response> {
    const listProductsService = new ListProductsService();

    const products = await listProductsService.execute();

    return res.json({
      status: 200,
      body: products
    });
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const showProductService = new ShowProductService();

    const product = await showProductService.execute({ id });

    return res.json({
      status: 200,
      body: product
    });
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { name, description, price, quantity } = req.body;

    const createProductService = new CreateProductService();

    const product = await createProductService.execute({
      name,
      description,
      price,
      quantity
    });

    return res.json({
      status: 201,
      body: product
    });
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { name, description, price, quantity } = req.body;

    const updateProductService = new UpdateProductService();

    const product = await updateProductService.execute({
      id,
      name,
      description,
      price,
      quantity
    });

    return res.json({
      status: 200,
      body: product
    });
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const deleteProductService = new DeleteProductService();

    await deleteProductService.execute({ id });

    return res.json({
      status: 200,
      body: {
        message: `Product ID ${id} deleted with successfully!`
      }
    });
  }

}
