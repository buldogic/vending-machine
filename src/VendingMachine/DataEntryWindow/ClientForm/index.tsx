import { Bill } from '../../../types'
import { formatMoney } from '../../utils/formatMoney'
import style from './style.module.css'

type Props = {
  bills: Bill[]
  addCashAmount: (id: number, amount: number) => void
  deposit: number
  getChange: () => void
}

const ALLOWED_BILLS = [4, 5, 6, 7]

export function ClientForm(props: Props) {
  const clientCash = props.bills
    .filter((element) => {
      const isAllowed = ALLOWED_BILLS.includes(element.id)
      return isAllowed
    })
    .map((element) => {
      return (
        <div key={element.id}>
          <button
            className={style.depositValue}
            value={element.value}
            onClick={() => {
              props.addCashAmount(element.id, 1)
            }}
          >
            {formatMoney(element.value)}
          </button>
        </div>
      )
    })

  return (
    <div className={style.clientInputForm}>
      {' '}
      <div className={style.depositSum}>{formatMoney(props.deposit)}</div>
      {clientCash}
      <button className={style.change} onClick={props.getChange}>
        Сдача
      </button>
    </div>
  )
}
