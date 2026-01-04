import cls from './ProductDetails.module.scss';
import clsx from "clsx";
import {useCallback, useEffect, useState} from "react";
import {ICartProduct, IProduct, IProductColor} from "../../model/types/product";
import {getProduct, getSizes} from "../../../../app/services/api";
import Skeleton from "react-loading-skeleton";
import {Select, SelectOption} from "../../../../shared/ui/Select/Select";
import {IProductSize} from "../../model/types/size";
import {observer} from "mobx-react-lite";
import cartStore from "../../../../shared/store/cart/cart";
import { v4 as uuidv4 } from 'uuid';

interface ProductListProps {
    id?: string;
    className?: string
}

export const ProductDetails = observer(({ id, className }: ProductListProps) => {
    const [product, setProduct] = useState<IProduct>();
    const [isProductLoading, setIsProductLoading] = useState<boolean>(true);
    const [currentColor, setCurrentColor] = useState<IProductColor>();
    const [currentImageSrc, setCurrentImageSrc] = useState<string>();
    const [isAddedToCart, setIsAddedToCart] = useState<boolean>(false);
    //sizes

    const [productSizes, setProductSizes] = useState<IProductSize[]>();
    const [currentProductSizeId, setCurrentProductSizeId] = useState<string>('');
    const [isSizesLoading, setIsSizesLoading] = useState<boolean>(true);

    const handleChangeCurrentColor = useCallback((newColor: IProductColor) => {
        setCurrentColor(newColor);
        setCurrentProductSizeId('');
        setCurrentImageSrc(newColor.images[0]);
    }, [])

    const handleCartButton = useCallback(() => {
        if (product && currentProductSizeId && currentColor && currentImageSrc && productSizes) {
            setIsAddedToCart(!isAddedToCart);
            if (isAddedToCart) {
                cartStore.removeLastProductFromCart()
            } else {
                const newCartProduct: ICartProduct = {
                    name: product.name,
                    id: uuidv4(),
                    productId: product.id,
                    colorId: currentColor?.id,
                    imageSrc: currentImageSrc,
                    price: currentColor.price,
                    colorName: currentColor.name,
                    sizeId: Number(currentProductSizeId),
                    sizeName: productSizes.find((i) => i.id === Number(currentProductSizeId))?.label || '',
                }
                cartStore.addProductToCart(newCartProduct)
            }
        }
    }, [isAddedToCart, product, currentProductSizeId, currentColor, currentImageSrc, productSizes])

    useEffect(() => {
        if (id) {
            setIsProductLoading(true)
            getProduct(id).then((res) => {
                setProduct(res as IProduct);
                handleChangeCurrentColor(res.colors[0]);
            }).finally(() => setIsProductLoading(false));
            getSizes().then((res) => {
                setProductSizes(res);
            }).finally(() => {
                setIsSizesLoading(false)
            });
        }
    }, [id, handleChangeCurrentColor])

    useEffect(() => {
        setIsAddedToCart(false);
    }, [product, currentProductSizeId, currentColor, productSizes])

    if (isProductLoading) {
        return (
            <div className={clsx(cls.container, cls.loading)}>
                <div className={cls.left}>
                    <Skeleton borderRadius={8} width={300} height={400} />
                </div>
                <div className={cls.right}>
                    <div className={cls.controls}>
                        {
                            Array(4)
                                .fill("")
                                .map((_, index) => (
                                    <Skeleton borderRadius={8} width={300} height={70} key={index} />
                                ))
                        }
                    </div>
                    <Skeleton borderRadius={8} width={300} height={200} />
                </div>
            </div>
        )
    }

    if (product && currentColor) {
        return (
            <div className={clsx(cls.container, className)}>
                <div className={cls.left}>
                    <div className={cls.imagePicker}>
                        {
                            currentColor.images.map((i) =>
                                <button onClick={() => setCurrentImageSrc(i)} className={clsx(i === currentImageSrc && cls.active)} key={i}>
                                    <img alt='choose product' src={i} />
                                </button>
                            )
                        }
                    </div>
                    <img alt='product' className={cls.productImage} src={currentImageSrc} />
                </div>
                <div className={cls.right}>
                    <div className={cls.controls}>
                        <div className={cls.title}>
                            <h3>{product.name}</h3>
                        </div>
                        <div className={cls.price}>
                            <h3>Цена: <span>{currentColor.price}</span></h3>
                        </div>
                        <div className={cls.positionSelect}>
                            {
                                product.colors.map((c) =>
                                    <button onClick={() => handleChangeCurrentColor(c)} className={clsx(c.id === currentColor.id && cls.active)} key={c.id}>
                                        <img alt='product' src={c.images[0]} />
                                        <p>{c.name}</p>
                                    </button>
                                )
                            }

                        </div>
                        {
                            isSizesLoading ?
                                <Skeleton height={50} width={200} borderRadius={8} /> :
                                productSizes && (
                                    <Select
                                        label='Выберите размер'
                                        options={
                                            productSizes.map((size) => {
                                                const o: SelectOption<string> = {
                                                    title: `${size.label} ${size.number}`,
                                                    value: size.id.toString(),
                                                    disabled: size.id in currentColor.sizes
                                                }
                                                return o;
                                            })
                                        }
                                        onChange={setCurrentProductSizeId}
                                        value={currentProductSizeId}
                                    />
                                )
                        }
                        <button
                            disabled={!product || !currentProductSizeId || !currentColor || !currentImageSrc || !productSizes}
                            className={cls.cartButton}
                            onClick={handleCartButton}>{isAddedToCart ? 'Убрать из корзины' : 'Добавить в корзину'}
                        </button>
                    </div>
                    <div className={cls.description}>
                        <h4>Описание товара:</h4>
                        <p>{currentColor.description}</p>
                    </div>
                </div>
            </div>
        )
    }
});
