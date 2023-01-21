import { Product } from '../../types'
import { formatMoney } from '../utils/formatMoney'
import style from './style.module.css'

type Props = {
  products: Product[]
  pickProduct: (id: number) => void
}

export function WindowGoods(props: Props) {
  const productAmount = props.products.map((element) => {
    return (
      <div
        className={style.blockProducts}
        key={element.id}
        onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
          props.pickProduct(element.id)
        }}
      >
        <img className={style.img} src={element.url} alt={element.name} />
        <span>Осталось: {element.amount} </span>
        <span>Цена: {formatMoney(element.cost)} </span>
      </div>
    )
  })

  return <div className={style.windowGoods}>{productAmount}</div>
}
