import React, { memo } from 'react';
import cls from './ProductDetailsPage.module.scss';
import {useParams} from "react-router-dom";
import {ProductDetails} from "../../../entities/Products/ui/ProductDetails/ProductDetails";

const ProductDetailsPage = () => {
    const { id } = useParams<{id: string}>();

    return (
        <div className={cls.container}>
            <ProductDetails id={id} />
        </div>
    );
};

export default memo(ProductDetailsPage);
