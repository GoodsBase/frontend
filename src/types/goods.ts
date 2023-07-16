export type GoodsItem = {
    name: string
    barcode: string
    price: number
    measurmentUnit: string
    folderId: string | null
}

export type GoodsFolder = {
    name: string
    itemsCount: number
    folderId: string | null
}
