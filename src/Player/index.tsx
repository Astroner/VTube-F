import React, { memo, FC, useState, useMemo, useEffect, useRef } from 'react';
import { useBooleanState } from '@dogonis/hooks';

import { getMediaFormats } from '../api/main/getMediaFormats';
import { env } from '../env';
import { getMidImage } from '../helpers/functions/getMidImage';
import PauseIcon from '../icons/Pause.icon';
import PlayIcon from '../icons/Play.icon';

import { QueueItem } from '../Types';

import { Observable } from '../helpers/classes/Observable';
import ForwardIcon from '../icons/Forward.icon';
import BackwardIcon from '../icons/Backward.icon';
import { createDoubleTapHandler } from './utils/createDoubleTapHandler';
import ProgressBar from './components/ProgressBar';

import cn from "./Player.module.scss";

export interface IPlayer {
    video: QueueItem | null;

    margin?: string | number;

    onEnded?: VoidFunction;

    onNext?: VoidFunction;
    onPrev?: VoidFunction;
}

const Player: FC<IPlayer> = props => {

    const [itag, setItag] = useState<number | null>(null)
    const [isPlaying, play, pause, toggle] = useBooleanState(true);
    
    const progress = useMemo(() => new Observable(0), [])
    const audio = useRef<HTMLAudioElement>(null)

    const src = useMemo(() => {
        if(!props.video || !itag) return null;

        const url = new URL(`/player/${props.video.code}`, env.API_URL);

        url.searchParams.append("itag", itag + "");

        return url.toString();
    }, [itag, props.video])

    const forward = useMemo(() => createDoubleTapHandler(() => {
        if(audio.current) audio.current.currentTime += 10;
    }), [])

    const backward = useMemo(() => createDoubleTapHandler(() => {
        if(audio.current) audio.current.currentTime -= 10;
    }), [])

    useEffect(() => {
        if(!props.video) return;

        let active = true;

        getMediaFormats(props.video.code, "audio")
            .then(formats => {
                if(!active) return;
                setItag(formats[0].itag)
            })
            .catch(console.error)

        return () => {
            active = false;
        }
    }, [props.video])

    useEffect(() => {
        if(!audio.current || !src) return;
        isPlaying 
            ? audio.current.play()
            : audio.current.pause()
    }, [isPlaying, src])

    useEffect(() => {
        if(audio.current) audio.current.currentTime = 0
    }, [src])

    return (
        <div style={{ margin: props.margin }} className={cn.root} >
            {props.video && (
                <div className={cn.media} style={{ backgroundImage: `url(${getMidImage(props.video.display).url})` }}>
                    <div className={cn.half} onTouchEnd={backward} />
                    <div className={cn.half} onTouchEnd={forward}/>
                    <div className={cn.buttons}>
                        <button className={cn['button']} onClick={props.onPrev}>
                            <BackwardIcon />
                        </button>
                        <button className={cn['button']} onClick={toggle}>
                            {isPlaying ? <PauseIcon /> : <PlayIcon />}
                        </button>
                        <button className={cn['button']} onClick={props.onNext}>
                            <ForwardIcon />
                        </button>
                    </div>
                    <div className={cn.progress}>
                        <ProgressBar progress={progress} />
                    </div>
                </div>
            )}
            {
                src && (
                    <audio 
                        ref={audio} 
                        src={src} 
                        onEnded={props.onEnded} 
                        onPause={pause} 
                        onPlay={play} 
                        onTimeUpdate={(e) => progress.update(e.currentTarget.currentTime / e.currentTarget.duration)} 
                    />
                )
            }
        </div>
    )
}

export default memo(Player)
