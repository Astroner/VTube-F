import React, { memo, FC, ReactNode } from 'react';
import Logo from '../Logo';

import cn from "./Sidebar.module.scss";

export interface ISidebar {
    noBorder?: boolean
    children?: ReactNode
}

const Sidebar: FC<ISidebar> = props => {

    return (
        <div className={cn.root}>
            <Logo />
            <div className={props.noBorder ? cn['list--none'] : cn['list--dashed']}>
                {props.children}
            </div>
        </div>
    )
}

export default memo(Sidebar)
