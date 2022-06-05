import { Router} from 'express'

import { CreateProductMain } from '../../../main/products'

const productsRouter = Router()

productsRouter.post('/', CreateProductMain.factory)

export { productsRouter }
