import { Presenter } from '../../../core'
import {IJsonAPIData, IJsonAPIError, ResponseAdapterError, ResponseAdapterSuccess} from '../../../infra/express/adapters';

export class CreateProductPresenter implements Presenter {
  constructor (
    private response: any,
  ) {}

  presentSuccess(code: number, data: IJsonAPIData[]): ResponseAdapterSuccess {
    return ResponseAdapterSuccess.adapt(this.response, code, data)
  }
  presentErrors(code: number, errors: IJsonAPIError[]): ResponseAdapterError {
    return ResponseAdapterError.adapt(this.response, code, errors)
  }
}
