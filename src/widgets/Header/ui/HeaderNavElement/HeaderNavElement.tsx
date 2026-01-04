import React from 'react';
import clsx from "clsx";
import cls from './HeaderNavElement.module.scss';
import {Link} from "react-router-dom";
import {IHeaderRoute} from "../Header";
import cartStore from "../../../../shared/store/cart/cart";
import {observer} from "mobx-react-lite";
import {useLocation} from "react-router";

interface NavbarProps {
  className?: string;
  headerRoute: IHeaderRoute;
}

export const HeaderNavElement = observer((props: NavbarProps) => {
    const {headerRoute, className} = props;
    const location = useLocation();

    return (
        <Link
            to={headerRoute.route}
            className={clsx(cls.container, (
                headerRoute.route === '/' ?
                    location.pathname === headerRoute.route :
                    location.pathname.includes((headerRoute.route))
            ) && cls.active, className)}
        >
            {(headerRoute.value === 'cart' && cartStore.cartProductsCount !== 0) && <span>{cartStore.cartProductsCount}</span>}
            {headerRoute.title}
        </Link>
    );
});

export default HeaderNavElement;
