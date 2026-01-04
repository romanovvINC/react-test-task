import React, {memo, useCallback} from 'react';
import cls from './MainPage.module.scss';
import {useNavigate} from "react-router";

const MainPage = () => {
    const navigate = useNavigate();

    const handleNavigateToProducts = useCallback(() => {
        navigate('/products')
    }, [navigate])

    return (
        <div className={cls.container}>
            <h1>Здесь пока пусто</h1>
            <button onClick={handleNavigateToProducts}>Перейти к товарам</button>
        </div>
    );
};

export default memo(MainPage);
