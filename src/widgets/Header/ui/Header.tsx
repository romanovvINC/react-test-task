import React from 'react';
import clsx from "clsx";
import styles from './Header.module.scss';
import {HeaderNavElement} from "./HeaderNavElement/HeaderNavElement";
import {observer} from "mobx-react-lite";

interface NavbarProps {
  className?: string
}

export type IHeaderRoute = {
    title: string;
    value: string;
    route: string;
}

const headerRoutes: IHeaderRoute[] = [
    {
        value: 'main',
        title: 'Главная',
        route: '/',
    },
    {
        value: 'products',
        title: 'Товары',
        route: '/products',
    },
    {
        value: 'cart',
        title: 'Корзина',
        route: '/cart',
    },
]

export const Header = observer(({ className }: NavbarProps) => {
    return (
        <header className={clsx(styles.container, className)}>
            <nav className={styles.nav}>
                {
                    headerRoutes.map((i) =>
                        <HeaderNavElement headerRoute={i} key={i.value} />
                    )
                }
            </nav>
        </header>
    );
});

export default Header;
