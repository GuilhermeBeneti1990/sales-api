import { getCustomRepository } from "typeorm";
import { ProductRepository } from "../typeorm/repositories/ProductRepository";
import Product from "../typeorm/entities/Product";

class ListProductsService {
  
  public async execute(): Promise<Product[]> {
    const repository = getCustomRepository(ProductRepository);
    
    const products = await repository.find();

    return products;
  }

}

export default ListProductsService;
