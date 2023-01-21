import { Bill, Product } from '../../../types'
import { formatMoney } from '../../utils/formatMoney'
import style from './style.module.css'

type Props = {
  products: Product[]
  setProductAmount: (id: number, amount: number) => void
  bills: Bill[]
  setBillAmount: (id: number, amount: number) => void
}

export function ServiceForm(props: Props) {
  const serviceChange = props.bills.map((element) => {
    return (
      <div key={element.id} className={style.Change}>
        {' '}
        <span>{element.value} </span>
        <input
          value={element.amount}
          className={style.inputChange}
          onChange={(e) => {
            const amount = Number(e.target.value)
            if (amount < 0) return
            props.setBillAmount(element.id, amount)
          }}
        />
      </div>
    )
  })

  const total = props.bills.reduce((accum, bill) => {
    const subTotal = bill.value * bill.amount
    return accum + subTotal
  }, 0)

  const serviceProduct = props.products.map((element) => {
    return (
      <div key={element.id} className={style.blockServiceProduct}>
        {' '}
        <span>{element.name}</span>
        <input
          className={style.inputProduct}
          value={element.amount}
          onChange={(e) => {
            const amount = Number(e.target.value)
            if (amount < 0) return
            props.setProductAmount(element.id, amount)
          }}
        />
      </div>
    )
  })

  return (
    <div>
      <div className={style.serviceForm}>
        <div className={style.blockServiceChange}>{serviceChange}</div>
        <div>{serviceProduct}</div>
      </div>
      <div className={style.blockServiceSum}>
        <span className={style.inputSum}>{formatMoney(total)}</span>
      </div>
      <div className={style.nameApparat}>
        <h1>Apparat</h1>
      </div>
    </div>
  )
}
