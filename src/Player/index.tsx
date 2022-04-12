import React, { memo, FC, useEffect, useState } from 'react';
import { env } from '../env';

import { axios } from '../helpers/axios';
import { VideoFormat, VideoInfo } from './Player.model';

import cn from "./Player.module.scss";

export interface IPlayer {
    code: string;
}

const Player: FC<IPlayer> = props => {

    const [itag, setItag] = useState<null | number>(null)
    const [info, setInfo] = useState<null | VideoInfo>(null);

    useEffect(() => {
        let mounted = true;

        (async () => {
            const [{ data: info }, { data: formats }] = await Promise.all([
                axios.get<VideoInfo>(`/player/info/${props.code}`),
                axios.get<VideoFormat[]>(`/player/formats/${props.code}`, {
                    params: {
                        type: "audio"
                    }
                })
            ])
            if(!mounted) return;
            setInfo(info)
            setItag(formats[Math.floor(formats.length / 2)].itag)
        })()


        return () => {
            mounted = false
        }
    }, [props.code])

    return (
        <div className={cn.root} >
            {info && (
                <>
                    {info.title}
                    <img src={info.displayImage} alt="" />
                </>
            )}
            {itag && <audio src={`${env.API_URL}player/${props.code}/?itag=${itag}`} controls />}
        </div>
    )
}

export default memo(Player)
