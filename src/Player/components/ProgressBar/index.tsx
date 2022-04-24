import React, { memo, FC, useState, useEffect } from 'react';

import { Observable } from '../../../helpers/classes/Observable';

import cn from "./ProgressBar.module.scss";

export interface IProgressBar {
    progress: Observable<number>
}

const ProgressBar: FC<IProgressBar> = props => {

    const [value, setValue] = useState(props.progress.value);

    useEffect(() => {
        const sub = props.progress.subscribe(value => setValue(value * 100))

        return () => {
            sub.unsubscribe()
        }
    }, [props.progress])

    return (
        <div className={cn.root}>
            <div className={cn.dot} style={{ left: `${value}%` }} />
        </div>
    )
}

export default memo(ProgressBar)
