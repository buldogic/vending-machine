import { Product } from '../../types'

export const serializeProductChange = (products: Product[]) =>
  products
    .map((product) => {
      return ` ${product.name} ×  ${product.amount}`
    })
    .join(', ')
