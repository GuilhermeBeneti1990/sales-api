import { getCustomRepository } from "typeorm";
import { ProductRepository } from "../typeorm/repositories/ProductRepository";
import Product from "../typeorm/entities/Product";
import AppError from "@shared/errors/AppError";

interface IRequest {
  id: string
}


class ShowProductService {
  
  public async execute({ id }: IRequest): Promise<Product> {
    const repository = getCustomRepository(ProductRepository);
    
    const product = await repository.findOne(id);

    if(!product) throw new AppError('Product not found!', 404);

    return product;
  }

}

export default ShowProductService;
