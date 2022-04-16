import React, { memo, FC, useCallback } from 'react';
import { getMidImage } from '../../../../../helpers/functions/getMidImage';

import { YTImage } from '../../../../../Responses';

import cn from "./Item.module.scss";

export interface IItem {
    index: number;
    title: string;
    display: YTImage[]
    active?: boolean;
        
    onClick?: (index: number) => void;
}

const Item: FC<IItem> = ({ onClick, ...props }) => {

    const click = useCallback(() => {
        onClick && onClick(props.index)
    }, [onClick, props.index])

    return (
        <div style={{ animationDelay: `${props.index * 100}ms` }} onClick={click} className={cn.root}>
            <div className={props.active ? cn['content--active'] : cn['content--default']}>
                <div style={{ backgroundImage: `url(${getMidImage(props.display).url})` }} className={cn.display} />
                <p className={cn.text}>
                    {props.title}
                </p>
            </div>
        </div>
    )
}

export default memo(Item)
