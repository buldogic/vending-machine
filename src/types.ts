export type Product = {
    id: number
    name: string
    amount: number
    cost: number
    url: string
}

export type Bill ={
    id: number,
    value:number
    amount: number
}


export type SetProducts =(amount:string)=>void 