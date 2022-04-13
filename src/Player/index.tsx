import React, { memo, FC, useEffect, useState } from 'react';
import { env } from '../env';

import { QueueItem } from '../Types';

import cn from "./Player.module.scss";

export interface IPlayer {
    video: QueueItem | null;
    autoPlay?: boolean;

    margin?: string | number;

    onEnded?: VoidFunction;
}

const Player: FC<IPlayer> = props => {

    return (
        <div style={{ margin: props.margin }} className={cn.root} >
            {!props.video && (
                <div className={cn.rect} />
            )}
            {
                props.video && (
                    <audio src={`${env.API_URL}player/${props.video.code}`} autoPlay controls onEnded={props.onEnded} />
                )
            }
        </div>
    )
}

export default memo(Player)
