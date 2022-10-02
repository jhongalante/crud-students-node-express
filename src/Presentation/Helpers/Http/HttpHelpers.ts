import { ServerError, UnauthorizedError } from '../../Errors'
import { HttpResponse } from '../../protocols/Http'

export const badRequest = (error: Error | string): HttpResponse => ({
  statusCode: 400,
  body: error
})
export const unauthorized = (): HttpResponse => ({
  statusCode: 401,
  body: new UnauthorizedError()
})
export const internalServerError = (error: Error): HttpResponse => ({
  statusCode: 500,
  body: new ServerError(error)
})
export const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data
})
export const created = (data: any): HttpResponse => ({
  statusCode: 201,
  body: data
})
