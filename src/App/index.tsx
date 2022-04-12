import React, { memo, FC, ReactNode, useState, useEffect } from 'react';
import { useCallback } from 'react';
import { axios } from '../helpers/axios';
import { parseUrl } from '../helpers/functions/parseUrl';
import Player from '../Player';
import { Playlist } from '../Responses';

import cn from "./App.module.scss";

export interface IApp {
    children?: ReactNode
}

const App: FC<IApp> = props => {

    const [input, setInput] = useState("");
    const [video, setVideo] = useState<string | null>(null);
    const [playlistID, setPlaylistID] = useState<string | null>(null);
    const [playlist, setPlaylist] = useState<Playlist | null>(null);

    const submit = () => {
        const url = parseUrl(input);
        if(url.type === "VIDEO") {
            setVideo(url.code)
        } else {
            setPlaylistID(url.code)
        }
    }

    const startPlaylist = () => {
        if(!playlist) return
        setVideo(playlist.list[0].code)
    }

    const continuePlaylist = useCallback(() => {
        if(!playlist) return
        const current = playlist.list.findIndex(item => item.code === video)
        if(current === playlist.list.length - 1) return;
        setVideo(playlist.list[current + 1].code);

    }, [playlist, video])

    useEffect(() => {
        setPlaylist(null)
        setVideo(null)
        if(!playlistID) return;
        let mounted = true;

        axios
            .get<Playlist>(`/playlist/${playlistID}`)
            .then(({ data }) => {
                if(!mounted) return;
                setPlaylist(data)
            })
            .catch(() => alert("PLAYLIST ERROR"))

        return () => {
            mounted = false;
        }
    }, [playlistID])

    return (
        <div className={cn.root}>
            <div>
                <input value={input} onChange={e => setInput(e.target.value)} />
                <button style={{ marginLeft: 20 }} onClick={submit}>
                    Load
                </button>
            </div>
            {playlist && (
                <div>
                    <h2>Playlist: {playlist.title}</h2>
                    <h3>Length: {playlist.list.length}</h3>
                    <button onClick={startPlaylist}>
                        Play
                    </button>
                </div>
            )}
            {video && (
                <Player code={video} autoPlay={!!playlist} onEnded={continuePlaylist} />
            )}
        </div>
    )
}

export default memo(App)
