import { Product } from '../../types'

export const updateProductAmount = (
  id: number,
  amount: number,
  products: Product[]
) => {
  const newProducts = products.map((p) => {
    if (id !== p.id) return p
    return { ...p, amount }
  })

  return newProducts
}
