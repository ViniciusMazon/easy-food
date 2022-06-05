import { Request } from 'express'

class RequestAdapter {
  static adapt (request: Request) {
    return {
      ...(request.body && {body: request.body}),
      ...(request.params && {params: request.params}),
      ...(request.query && {query: request.query}),
      ...(request.headers && {headers: request.headers})
    }
  }
}

export { RequestAdapter }
