import React, { memo, FC } from 'react';

import { QueueItem } from '../../../Types';
import Item from './components/Item';

export interface IQueue {
    cursor: number;
    items: QueueItem[]

    margin?: string | number

    onItemSelect?: (index: number) => void;
}

const Queue: FC<IQueue> = props => {

    return (
        <div style={{ margin: props.margin }}>
            <div>
                {props.items.map((item, index) => (
                    <Item key={item.code} active={props.cursor === index} index={index} display={item.display} title={item.title} onClick={props.onItemSelect} />
                ))}
            </div>
        </div>
    )
}

export default memo(Queue)
