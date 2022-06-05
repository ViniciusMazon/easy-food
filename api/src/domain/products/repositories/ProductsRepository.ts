import { Repository } from '../../../core'
import { PrismaClient } from '@prisma/client'

export class ProductsRepository implements Repository {
  private client
  
  constructor () {
    this.client = new PrismaClient().product
  }

  async store (product: any) {
    return await this.client.create({
      data: product
    })
  }
}
