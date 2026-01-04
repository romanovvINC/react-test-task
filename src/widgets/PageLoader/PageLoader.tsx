import { Loader } from 'shared/ui/Loader/Loader';
import cls from './PageLoader.module.scss';
import clsx from "clsx";

interface PageLoaderProps {
  className?: string
}

export const PageLoader = ({ className }: PageLoaderProps) => (
    <div className={clsx(cls.PageLoader, className)}>
        <Loader />
    </div>
);
