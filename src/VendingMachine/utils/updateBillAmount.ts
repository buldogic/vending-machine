import { Bill } from '../../types'

export const updateBillAmount = (id: number, amount: number, bills: Bill[]) => {
  const newBills = bills.map((b) => {
    if (id !== b.id) return b
    return { ...b, amount }
  })
  return newBills
}
