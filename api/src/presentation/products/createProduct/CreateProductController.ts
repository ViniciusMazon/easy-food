import { Controller } from '../../../core'
import { CreateProductUseCase } from '../../../domain/products/useCases/CreateProductUseCase'
import { RequestAdapter } from '../../../infra/express/adapters'

export class CreateProductController implements Controller {
  request
  useCase: CreateProductUseCase

  constructor (request: any, useCase: CreateProductUseCase){
    this.request = RequestAdapter.adapt(request)
    this.useCase = useCase 
  }

  validations (): boolean {
    if (!this.request.body) return false
    return true
  }

  async handle () {
    const isValid = this.validations()
    if (!isValid) throw new Error('Bad Request')

    return await this.useCase.handle(this.request.body)
  }
}
