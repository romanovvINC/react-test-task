import cls from './CartProductsList.module.scss';
import clsx from "clsx";
import {observer} from "mobx-react-lite";
import cartStore from "../../../../shared/store/cart/cart";
import {CartProductsItem} from "../CartProductsItem/CartProductsItem";

interface ProductListProps {
    className?: string
}

export const CartProductsList = observer(({ className }: ProductListProps) => {

    return (
        <div className={clsx(cls.container, className)}>
            {
                cartStore.cartProducts.length === 0 ?
                    <div className={cls.noProductsContainer}>
                        <h1>Корзина пока пуста</h1>
                    </div> :
                    <>
                        <CartProductsItem tableHeader />
                        {
                            cartStore.cartProducts.map((i) => (
                                <CartProductsItem product={i} key={i.id} />
                            ))
                        }
                    </>
            }
        </div>
    )
});
