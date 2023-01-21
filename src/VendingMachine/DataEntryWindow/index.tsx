import { Bill, Product} from '../../types'
import { ClientForm } from './ClientForm'
import { ServiceForm } from './ServiceForm'
import style from './style.module.css'

type Props = {
  products: Product[]
  setProductAmount: (id: number, amount: number) => void
  bills: Bill[]
  setBillAmount: (id: number, amount: number) => void
  addCashAmount: (id: number, amount: number) => void
  deposit: number
  getChange: () => void
}

export function DataEntryWindow(props: Props) {
  return (
    <div className={style.dataEntryWindow}>
      <ClientForm
        bills={props.bills}
        addCashAmount={props.addCashAmount}
        deposit={props.deposit}
        getChange={props.getChange}
      />
      <ServiceForm
        products={props.products}
        setProductAmount={props.setProductAmount}
        bills={props.bills}
        setBillAmount={props.setBillAmount}
      />
    </div>
  )
}
