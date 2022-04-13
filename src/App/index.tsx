import React, { memo, FC, ReactNode, useState, useCallback } from 'react';

import Player from '../Player';
import { Playlist } from '../Responses';
import { QueueItem } from '../Types';

import cn from "./App.module.scss";
import VideoInput from './components/VideoInput';

export interface IApp {
    children?: ReactNode
}

const App: FC<IApp> = props => {

    const [cursor, setCursor] = useState<number | null>(null);
    const [queue, setQueue] = useState<QueueItem[]>([]);

    const addPlaylist = useCallback((playlist: Playlist) => {
        setCursor(0)
        setQueue(playlist.list)
    }, [])

    const playNext = useCallback(() => {
        console.log("NEXT")
        setCursor(prev => (prev ?? 0) + 1)
    }, [])

    return (
        <div className={cn.root}>
            <h1 className={cn.heading}>
                <span className={cn.v}>V</span>tube
            </h1>
            <Player margin="20px 0 0" video={cursor !== null ? queue[cursor] : null} onEnded={playNext} />
            <VideoInput margin="20px 0 0" onPlaylistPlay={addPlaylist} />
        </div>
    )
}

export default memo(App)
