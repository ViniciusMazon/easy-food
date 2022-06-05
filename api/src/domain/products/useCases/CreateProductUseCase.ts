import { UseCase } from '../../../core/UseCase'
import { Product } from '../entities/Product'
import {ProductsRepository} from '../repositories/ProductsRepository'

export class CreateProductUseCase implements UseCase {
  constructor (
    private productsRepository: ProductsRepository
  ) {}

  async handle (productInfo: any) {
    const product = new Product(productInfo.title)
    return await this.productsRepository.store(product.get())
  }
}
