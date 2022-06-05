import {UseCase} from "./UseCase"

export interface Controller {
  request: any,
  useCase: UseCase
  validations(): boolean
  handle(): Promise<any>
}

