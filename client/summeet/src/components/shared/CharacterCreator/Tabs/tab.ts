export enum Tabs {
    Body = 0,
    Hairstyle = 1,
    Outfit = 2,
    Accessories = 3
}

export interface OnUpdateAssetEvent {
    asset: number,
    color: number
}