import { type RouteProps } from 'react-router-dom';
import { MainPage } from 'pages/MainPage';
import { NotFoundPage } from 'pages/NotFoundPage';
import {ProductDetailsPage} from "pages/ProductDetailsPage";
import {CartPage} from "pages/CartPage";
import {ProductsPage} from "../../../pages/ProductsPage";

export type AppRoutesProps = RouteProps & {
    authOnly?: boolean;
    roles?: string[];
}

export enum AppRoutes {
    MAIN = 'main',
    PRODUCT_DETAILS = 'product_details',
    CART = 'cart',
    NOT_FOUND = 'not_found',
    PRODUCTS = 'products'
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: '/',
    [AppRoutes.CART]: '/cart',
    [AppRoutes.PRODUCTS]: '/products',
    [AppRoutes.PRODUCT_DETAILS]: '/products/',
    [AppRoutes.NOT_FOUND]: '*'
};

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
    [AppRoutes.MAIN]: {
        path: RoutePath.main,
        element: <MainPage />,
    },
    [AppRoutes.PRODUCT_DETAILS]: {
        path: `${RoutePath.product_details}:id`,
        element: <ProductDetailsPage />,
    },
    [AppRoutes.CART]: {
        path: RoutePath.cart,
        element: <CartPage />,
    },
    [AppRoutes.PRODUCTS]: {
        path: RoutePath.products,
        element: <ProductsPage />,
    },
    [AppRoutes.NOT_FOUND]: {
        path: RoutePath.not_found,
        element: <NotFoundPage />,
    },
};
