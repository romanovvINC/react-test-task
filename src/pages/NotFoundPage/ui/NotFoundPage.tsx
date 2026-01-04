import { memo } from 'react';
import cls from './NotFoundPage.module.scss';
import clsx from "clsx";

interface NotFoundPageProps {
    className?: string
}

const NotFoundPage = ({ className }: NotFoundPageProps) => {
    return (
        <div className={clsx(cls.NotFoundPage, className)}>
            Страница не найдена
        </div>
    );
};

export default memo(NotFoundPage);
