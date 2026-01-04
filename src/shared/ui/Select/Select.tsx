import { ChangeEvent, useMemo } from 'react';
import cls from './Select.module.scss';
import clsx from "clsx";

export interface SelectOption<T extends string> {
    title: string;
    disabled: boolean;
    value: T;
}

interface SelectProps<T extends string> {
  className?: string;
  label?: string;
  options?: SelectOption<T>[];
  onChange?: (value: T) => void;
  value?: T;
}

export const Select = <T extends string>(props: SelectProps<T>) => {
    const {
        className,
        label,
        options,
        onChange,
        value,
    } = props;

    const mapOptions = useMemo(() => options?.map(
        (opt) => (
            <option className={cls.selectOption} disabled={opt.disabled} value={opt.value} key={opt.value}>{opt.title}</option>
        ),
    ), [options]);

    const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        if (onChange) {
            onChange(e.target.value as T);
        }
    };

    return (
        <div className={clsx(cls.selectWrapper, className)}>
            {label && <span className={cls.selectLabel}>{`${label}>`}</span>}
            <select

                value={value}
                className={clsx(cls.select)}
                onChange={onChangeHandler}
            >
                {value === '' && <option value=''></option>}
                {mapOptions}
            </select>
        </div>
    );
};
