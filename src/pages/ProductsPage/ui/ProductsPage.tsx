import React, {memo} from 'react';
import {ProductsList} from "../../../entities/Products";
import cls from './ProductsPage.module.scss';

const ProductsPage = () => {

    return (
        <div className={cls.container}>
            <ProductsList />
        </div>
    );
};

export default memo(ProductsPage);
