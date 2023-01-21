import { Bill } from '../../types'
import { formatMoney } from './formatMoney'

export const serializeBillChange = (bills: Bill[]) => {
  return bills
    .map((bill) => {
      return `${formatMoney(bill.value)} × ${bill.amount}`
    })
    .join(', ')
}
