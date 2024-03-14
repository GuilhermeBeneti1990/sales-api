import { getCustomRepository } from "typeorm";
import { ProductRepository } from "../typeorm/repositories/ProductRepository";
import AppError from "@shared/errors/AppError";
import Product from "../typeorm/entities/Product";

interface IRequest {
  name: string;
  description: string;
  price: number;
  quantity: number;
}

class CreateProductService {
  
  public async execute({name, description, price, quantity}: IRequest): Promise<Product> {
    const repository = getCustomRepository(ProductRepository);
    
    const productExists = await repository.findByName(name);

    if(productExists) throw new AppError('There is already a product with this name!');

    const product = repository.create({
      name,
      description,
      price,
      quantity
    });

    await repository.save(product);

    return product;
  }

}

export default CreateProductService;
