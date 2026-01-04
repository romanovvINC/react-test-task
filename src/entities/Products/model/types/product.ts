export interface IProduct {
    id: number;
    name: string;
    colors: IProductColor[];
}

export interface IProductColor {
    id: number;
    name: string;
    images: string[];
    price: string;
    description: string;
    sizes: number[];
}

export interface ICartProduct {
    id: string;
    productId: number;
    sizeId: number;
    colorId: number;
    name: string;
    price: string;
    colorName: string;
    sizeName: string;
    imageSrc: string;
}