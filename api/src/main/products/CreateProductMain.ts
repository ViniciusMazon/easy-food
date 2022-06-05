import { Main } from '../../core'
import {ProductsRepository} from '../../domain/products/repositories/ProductsRepository'
import {CreateProductUseCase} from '../../domain/products/useCases/CreateProductUseCase'
import {
  CreateProductController,
  CreateProductPresenter 
} from '../../presentation/products'

export class CreateProductMain implements Main {
  controller
  presenter

  constructor (
    controller: CreateProductController,
    presenter: CreateProductPresenter,
  ) {
    this.controller = controller
    this.presenter = presenter
  }

  static async factory (request: any, response: any) {
    const productsRepository = new ProductsRepository()
    const useCase = new CreateProductUseCase(productsRepository)
    const controller = new CreateProductController(request, useCase)
    const presenter = new CreateProductPresenter(response)
    const main = new CreateProductMain(controller, presenter)

    return await main.exec()
   }

  public async exec () {
    try {
      const result = await this.controller.handle()
      const payload = {
        type: 'products',
        id: 1,
        attributes: [result]
      }
      return this.presenter.presentSuccess(201, [payload])
    } catch (error) {
      console.log(error)
      const errorMock = {
        status: '500',
        title: 'Opss... ocorreu um erro em orbita',
        detail: 'Parece que estamos enfrentando um problema'
      }
      return this.presenter.presentErrors(500, [errorMock])
    }
  }
}
