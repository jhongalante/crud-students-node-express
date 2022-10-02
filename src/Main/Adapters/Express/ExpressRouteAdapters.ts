import { Request, Response } from 'express'
import { Controller, HttpRequest } from '../../../Presentation/protocols'

export const adaptRoute = (controller: Controller) => {
  return async (req: Request, res: Response): Promise<void> => {
    const httpRequest: HttpRequest = {
      body: req.body,
      params: req.params,
      query: req.query
    }
    const httpResponse = await controller.handle(httpRequest)
    res.status(httpResponse.statusCode).json(httpResponse.body)
  }
}
