import {RequestAdapter, ResponseAdapterError, ResponseAdapterSuccess} from "../infra/express/adapters"
import {Controller} from './Controller'
import {Presenter} from './Presenter'

export interface Main {
  controller: Controller 
  presenter: Presenter
  exec(request: RequestAdapter, response: ResponseAdapterSuccess | ResponseAdapterError): Promise<any>
}

