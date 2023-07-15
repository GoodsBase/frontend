export type GoodsItem = {
    type: 'item'
    name: string
    barcode: string
    price: number
    measurmentUnit: string
}

export type GoodsFolder = {
    type: 'folder'
    name: string
    itemsCount: number
    childern: GoodsTree
}

export type GoodsTree = Array<GoodsFolder | GoodsItem>
