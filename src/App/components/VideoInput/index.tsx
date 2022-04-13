import React, { memo, FC, FormEventHandler, useState } from 'react';
import { usePromiseCall } from '@dogonis/hooks';

import { getMediaInfo } from '../../../api/main/getMediaInfo';
import { getPlaylist } from '../../../api/main/getPlaylist';
import { ParsedURL, parseUrl } from '../../utils/parseUrl';

import cn from "./VideoInput.module.scss";
import PlayIcon from './Play.icon';
import { Playlist } from '../../../Responses';

export interface IVideoInput {
    margin?: string | number;
    onVideoPlay?: (video: { code: string, title: string, displayImage: string }) => void
    onPlaylistPlay?: (playlist: Playlist) => void
}

const VideoInput: FC<IVideoInput> = props => {

    const [value, setValue] = useState("");
    const [target, setTarget] = useState<null | ParsedURL>(null);

    const submit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        
        setTarget(parseUrl(value));
    }

    const [isLoading, data] = usePromiseCall(async (target) => {
        if(!target) return null;
        if(target.type === "VIDEO") return await getMediaInfo(target.code)
        return await getPlaylist(target.code);
    }, [target])

    const play = () => {
        if(!data || !target) return;
        if("list" in data) {
            props.onPlaylistPlay && props.onPlaylistPlay(data)
        } else {
            props.onVideoPlay && props.onVideoPlay({
                code: target.code,
                ...data,
            })
        }
        setValue("")
        setTarget(null)
    }

    return (
        <div className={cn.root}>
            <form style={{ margin: props.margin }} className={cn.form} onSubmit={submit}>
                <div className={data ? cn['input--expanded'] : cn['input--default']}>
                    <input 
                        placeholder="Print video code, link, or playlist" 
                        style={{ opacity: isLoading || data ? 0 : 1 }}
                        value={value} 
                        onChange={e => setValue(e.target.value)} 
                    />
                    <div className={isLoading ? cn["searching--visible"] : cn["searching--hidden"]}>
                        Searching...
                    </div>
                    {data && (
                        <div className={cn.data}>
                            <div className={cn.info}>
                                <div 
                                    style={{ backgroundImage: `url(${"list" in data ? data.display[Math.floor(data.display.length / 2)].url : data.displayImage})` }} 
                                    className={cn.display} 
                                />
                                <h2 className={cn.title}>
                                    {data.title}
                                </h2>
                            </div>
                            <div className={cn.actions}>
                                <PlayIcon onClick={play} />
                            </div>
                        </div>
                    )}
                </div>
                <button type="submit" className={isLoading || data ? cn['button--hidden'] : cn['button--visible']}>
                    Print
                </button>
            </form>
        </div>
    )
}

export default memo(VideoInput)
