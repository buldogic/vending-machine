import { DataEntryWindow } from './DataEntryWindow'
import { WindowGoods } from './WindowGoods'
import { useMachine } from './useMachine'
import style from './style.module.css'

export function VendingMachine() {
  const {
    store,
    pickProduct,
    setProductAmount,
    setBillAmount,
    addCashAmount,
    getChange,
  } = useMachine()

  return (
    <div className={style.root}>
      <div className={style.wrapper}>
        <p className={style.message}>{store.message}</p>
        <div className={style.vendingMachine}>
          <WindowGoods products={store.products} pickProduct={pickProduct} />
          <DataEntryWindow
            products={store.products}
            setProductAmount={setProductAmount}
            bills={store.bills}
            setBillAmount={setBillAmount}
            addCashAmount={addCashAmount}
            deposit={store.deposit}
            getChange={getChange}
          />
        </div>
      </div>
    </div>
  )
}
