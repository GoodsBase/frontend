export type GoodsItem = {
    id: string
    name: string
    barcode: string
    price: number
    measurmentUnit: string
    folderId: string | null
}

export type GoodsFolder = {
    id: string
    name: string
    itemsCount: number
    folderId: string | null
}
