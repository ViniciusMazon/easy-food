import { Response } from 'express'

export interface IJsonAPIData {
  type: string
  id: number
  attributes: object
}

export class ResponseAdapterSuccess {
  static adapt (response: Response, statusCode: number, data: IJsonAPIData[]) {
    return response.status(statusCode).json({
      data: [
        ...data
      ]
    })
  }
}

export interface IJsonAPIError {
  status: string
  title: string
  detail: string
}

export class ResponseAdapterError {
  static adapt (response: Response, statusCode: number, errors: IJsonAPIError[]) {
    return response.status(statusCode).json({
      errors: [
        ...errors
      ]
    }) 
  }
}
