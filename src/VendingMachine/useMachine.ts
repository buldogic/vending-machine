import { useState } from 'react'
import { Bill, Product } from '../types'
import { formatMoney } from './utils/formatMoney'
import { serializeBillChange } from './utils/serializeBillChange'
import { serializeProductChange } from './utils/serializeProductChange'
import { updateBillAmount } from './utils/updateBillAmount'
import { updateProductAmount } from './utils/updateProductAmount'
import milkaImgUrl from './img/milka.png'
import cookieImgUrl from './img/cookie.png'
import laysImgUrl from './img/lays.png'
import marmaladeImgUrl from './img/marmalade.webp'
import waterImgUrl from './img/water.png'
import sodaImgUrl from './img/soda.webp'
import lemonadeImgUrl from './img/lemonade.png'
import gingerbreadImgUrl from './img/gingerbread.png'

const INITIAL_PRODUCTS: Product[] = [
  { id: 1, name: 'Шоколад', amount: 5, cost: 20, url: milkaImgUrl },
  { id: 2, name: 'Печенье', amount: 5, cost: 34, url: cookieImgUrl },
  { id: 3, name: 'Чипсы', amount: 5, cost: 14, url: laysImgUrl },
  { id: 4, name: 'Мармелад', amount: 5, cost: 84, url: marmaladeImgUrl },
  { id: 5, name: 'Пряник', amount: 5, cost: 134, url: gingerbreadImgUrl },
  { id: 6, name: 'Вода', amount: 5, cost: 97, url: waterImgUrl },
  { id: 7, name: 'Газировка', amount: 5, cost: 45, url: sodaImgUrl },
  { id: 8, name: 'Лимонад', amount: 5, cost: 56, url: lemonadeImgUrl },
]

const INITIAL_BILLS: Bill[] = [
  { id: 1, value: 1, amount: 5 },
  { id: 2, value: 5, amount: 3 },
  { id: 3, value: 10, amount: 2 },
  { id: 4, value: 50, amount: 2 },
  { id: 5, value: 100, amount: 2 },
  { id: 6, value: 500, amount: 2 },
  { id: 7, value: 1000, amount: 0 },
]

const BILLS_FOR_CHANGE = [1, 2, 3, 4, 5, 6]

// TODO use Redux
export const useMachine = () => {
  const [store, updateStore] = useState({
    products: INITIAL_PRODUCTS,
    bills: INITIAL_BILLS,
    deposit: 0,
    message: 'Добро пожаловать!',
  })

  const addCashAmount = (id: number, amount: number) =>
    updateStore((store) => {
      let deposit = store.deposit

      const bills = store.bills.map((c) => {
        if (id !== c.id) return c
        deposit = deposit + c.value * amount
        return { ...c, amount: c.amount + amount }
      })

      return {
        ...store,
        deposit,
        bills,
        message: `Вы внесли ${formatMoney(deposit - store.deposit)}`,
      }
    })

  const setProductAmount = (id: number, amount: number) => {
    updateStore((store) => {
      return {
        ...store,
        products: updateProductAmount(id, amount, store.products),
      }
    })
  }

  const setBillAmount = (id: number, amount: number) => {
    updateStore((store) => {
      return {
        ...store,
        bills: updateBillAmount(id, amount, store.bills),
      }
    })
  }

  const pickProduct = (id: number) => {
    updateStore((store) => {
      const product = store.products.find((product) => {
        return id === product.id
      })

      if (product === undefined)
        return { ...store, message: 'Такой продук не найден' }

      if (product.amount === 0) return { ...store, message: 'Товар закончился' }

      if (product.cost > store.deposit) {
        return { ...store, message: 'Не хватает денежных средств' }
      }

      const products = updateProductAmount(
        product.id,
        product.amount - 1,
        store.products
      )

      const deposit = store.deposit - product.cost

      return {
        ...store,
        products,
        deposit,
        message: `Вы получили ${product.name}`,
      }
    })
  }

  const getChange = () => {
    updateStore((store) => {
      if (store.deposit === 0)
        return {
          ...store,
          message: 'Нет денег - нет сдачи 😉',
        }
      const billChange: Bill[] = []
      const productChange: Product[] = []

      let deposit = store.deposit
      let bills = store.bills
      let products = store.products

      store.bills
        .filter((bill) => {
          const canUse = bill.value <= deposit
          const isAllowed = BILLS_FOR_CHANGE.includes(bill.id)
          return isAllowed && canUse
        })
        .sort((a, b) => b.value - a.value)
        .forEach((bill) => {
          const estimatedAmount = Math.trunc(deposit / bill.value)
          const availableAmount = bill.amount
          const amount = Math.min(estimatedAmount, availableAmount)

          // Есть ли смысл?
          if (amount === 0) return

          // Запоминаем сдачу
          billChange.push({
            ...bill,
            amount,
          })

          // Убавляем депозит
          deposit = deposit - bill.value * amount

          // Уменьшаем кол во денег в автомате
          bills = updateBillAmount(bill.id, bill.amount - amount, bills)
        })

      if (deposit === 0)
        return {
          ...store,
          bills,
          deposit: 0,
          message: `Вы получили сдачу: ${serializeBillChange(billChange)}.`,
        }

      store.products
        .filter((product) => {
          const canUse = product.cost <= deposit
          return canUse
        })
        .sort((a, b) => b.cost - a.cost)
        .forEach((product) => {
          const estimatedAmount = Math.trunc(deposit / product.cost)
          const availableAmount = product.amount
          const amount = Math.min(estimatedAmount, availableAmount)

          // Есть ли смысл?
          if (amount === 0) return

          // Запоминаем сдачу
          productChange.push({ ...product, amount })

          // Убавляем депозит
          deposit = deposit - product.cost * amount

          // Уменьшаем кол во денег в автомате
          products = updateProductAmount(
            product.id,
            product.amount - amount,
            products
          )
        })

      let message = `Сдача деньгами: ${serializeBillChange(
        billChange
      )}.\nСдача продуктами: ${serializeProductChange(productChange)}.`

      if (deposit !== 0)
        message =
          message +
          `\nОставшаяся сдача: ${formatMoney(
            deposit
          )}.\nОбратитесь в поддержку.`

      return {
        ...store,
        bills,
        products,
        deposit,
        message,
      }
    })
  }

  return {
    store,
    addCashAmount,
    setProductAmount,
    setBillAmount,
    pickProduct,
    getChange,
  }
}
