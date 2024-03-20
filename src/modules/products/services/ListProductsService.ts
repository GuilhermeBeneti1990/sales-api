import { getCustomRepository } from "typeorm";
import { ProductRepository } from "../typeorm/repositories/ProductRepository";
import Product from "../typeorm/entities/Product";

interface IPaginateProducts {
  from: number;
  to: number;
  per_page: number;
  total: number;
  current_page: number;
  prev_page: number | null;
  next_page: number | null;
  data: Product[]
}

class ListProductsService {
  
  public async execute(): Promise<IPaginateProducts> {
    const repository = getCustomRepository(ProductRepository);
    
    const products = await repository.createQueryBuilder().paginate();

    return products as IPaginateProducts;
  }

}

export default ListProductsService;
