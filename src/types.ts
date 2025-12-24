export interface serviceType {
  id: string
  title: string
  price: number
}

export interface serviceTypeItem extends serviceType {
  count: number
}
