import React, { memo } from 'react';
import cls from './CartPage.module.scss';
import {CartProductsList} from "../../../entities/Products/ui/CartProductsList/CartProductsList";

const CartPage = () => {
    return (
        <div className={cls.container}>
            <h2>Корзина</h2>
            <CartProductsList />
        </div>
    );
};

export default memo(CartPage);
