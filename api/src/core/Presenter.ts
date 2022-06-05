import {
  IJsonAPIData,
  IJsonAPIError,
  ResponseAdapterError,
  ResponseAdapterSuccess
} from '../infra/express/adapters'

export interface Presenter {
  presentSuccess (code: number, data: IJsonAPIData[]): ResponseAdapterSuccess
  presentErrors (code: number, errors: IJsonAPIError[]): ResponseAdapterError
}
