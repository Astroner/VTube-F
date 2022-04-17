import { useBooleanState } from '@dogonis/hooks';
import React, { memo, FC, ReactNode, useState, useCallback } from 'react';
import { useSwipeable } from 'react-swipeable';

import Logo from '../components/Logo';
import Player from '../Player';
import { Playlist } from '../Responses';
import Sidebar from '../Sidebar';
import { QueueItem } from '../Types';
import Queue from './components/Queue';
import VideoInput, { Video } from './components/VideoInput';

import cn from "./App.module.scss";

export interface IApp {
    children?: ReactNode
}

const App: FC<IApp> = props => {

    const [cursor, setCursor] = useState<number>(0);
    const [queue, setQueue] = useState<QueueItem[]>([]);
    const [sidebarState, open, close] = useBooleanState(false);

    const handlers = useSwipeable({
        onSwipedLeft: open,
        onSwipedRight: close
    })

    const playPlaylist = useCallback((playlist: Playlist) => {
        setCursor(0)
        setQueue(playlist.list)
    }, [])

    const playVideo = useCallback((video: Video) => {
        setCursor(0)
        setQueue([{
            code: video.code,
            display: video.displayImage,
            title: video.title
        }])
    }, [])

    const add = useCallback((video: Video) => {
        setQueue(prev => prev.concat({
            code: video.code,
            display: video.displayImage,
            title: video.title
        }))
    }, [])

    const playPrev = useCallback(() => {
        setCursor(prev => prev - 1 < 0 ? 0 : prev - 1)
    }, [])

    const playNext = useCallback(() => {
        setCursor(prev => prev + 1)
    }, [])

    return (
        <div className={cn.root} {...handlers}>
            <Logo />
            <Player margin="20px 0 0" video={cursor !== null ? queue[cursor] : null} onEnded={playNext} onNext={playNext} onPrev={playPrev} />
            <VideoInput margin="20px 0 0" onPlaylistPlay={playPlaylist} onVideoPlay={playVideo} onPlaylistAdd={add} />
            <Queue margin="20px 0 0" cursor={cursor} items={queue} onItemSelect={setCursor} />
            <div className={sidebarState ? cn['sidebar--opened'] : cn['sidebar--closed']}>
                <Sidebar onPlay={playPlaylist} />
            </div>
        </div>
    )
}

export default memo(App)
