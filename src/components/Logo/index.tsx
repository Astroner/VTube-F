import React, { memo, FC } from 'react';

import cn from "./Logo.module.scss";

export interface ILogo {}

const Logo: FC<ILogo> = props => {

    return (
        <h2 className={cn.root}>
            <span className={cn.v}>V</span>tube
        </h2>
    )
}

export default memo(Logo)
