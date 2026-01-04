import cls from './CartProductsItem.module.scss';
import clsx from "clsx";
import {ICartProduct} from "../../model/types/product";
import {useNavigate} from "react-router";
import {useCallback} from "react";
import {observer} from "mobx-react-lite";
import cartStore from "../../../../shared/store/cart/cart";

interface ProductCardProps {
    product?: ICartProduct;
    tableHeader?: boolean;
    className?: string
}

export const CartProductsItem = observer((props: ProductCardProps) => {
    const {product, tableHeader, className} = props;
    const navigate = useNavigate();

    const handleClickCard = useCallback(() => {
        if (product) {
            navigate(`/products/${product.productId}`)
        }

    }, [navigate, product])

    const handleRemoveProduct = useCallback(() => {
        if (product) {
            cartStore.removeProductFromCart(product.id)
        }
    }, [product])

    if (tableHeader) {
        return (
            <div className={clsx(cls.container, cls.header, className)}>
                <h4 className={cls.name}>Изображение</h4>
                <h4 className={cls.name}>Название</h4>
                <h4 className={cls.price}>Цена</h4>
                <h4 className={cls.name}>Цвет</h4>
                <h4 className={cls.size}>Размер</h4>
                <h4 className={cls.name}> </h4>
            </div>
        )
    }

    if (product) {
        return (
            <div className={clsx(cls.container, className)} key={product.id} onClick={handleClickCard}>
                <img alt='card' src={product.imageSrc} />
                <p className={cls.name}>{product.name}</p>
                <p className={cls.price}>{product.price}</p>
                <p className={cls.name}>{product.colorName}</p>
                <p className={cls.size}>{product.sizeName}</p>
                <button onClick={e => {
                    e.stopPropagation()
                    handleRemoveProduct()
                }} onMouseEnter={e => e.stopPropagation()}>Убрать из корзины</button>
            </div>
        )
    }
})

