import { HelloWorldController } from '../../Presentation/Controllers/HelloWorldController'
import { Controller } from '../../Presentation/protocols'

export const makeHelloWorldController = (): Controller => {
  return new HelloWorldController()
}
