import cls from './ProductCard.module.scss';
import clsx from "clsx";
import {IProduct} from "../../model/types/product";
import {useNavigate} from "react-router";
import {memo, useCallback} from "react";

interface ProductCardProps {
    className?: string
    product: IProduct;
}

export const ProductCard = memo((props: ProductCardProps) => {
    const {product, className} = props;
    const navigate = useNavigate();

    const handleClickCard = useCallback(() => {
        navigate(`/products/${product.id}`)
    }, [navigate, product.id])

    return (
        <div className={clsx(cls.container, className)} key={product.id} onClick={handleClickCard}>
            <div className={cls.top}>
                <img alt='card' src={product.colors[0].images[0]} />
            </div>
            <div className={cls.bottom}>
                <h3>{product.name}</h3>
            </div>
        </div>
    );
})

