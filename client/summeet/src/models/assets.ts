interface Assets {
    body: Asset,
    hairstyle: Asset[],
    outfits: Asset[],
    accessories: Asset[]
}

interface Asset {
    key: string,
    variants: AssetVariant[]
}

interface AssetVariant {
    color: string,
    fileUrl: string
}