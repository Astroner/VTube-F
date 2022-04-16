import React, { memo, FC } from 'react';
import Logo from '../components/Logo';

import cn from "./Sidebar.module.scss";

export interface ISidebar {
    
}

const Sidebar: FC<ISidebar> = props => {

    return (
        <div className={cn.root}>
            <Logo />
        </div>
    )
}

export default memo(Sidebar)
