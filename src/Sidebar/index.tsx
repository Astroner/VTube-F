import { useAsyncCallback } from '@dogonis/hooks';
import { useInjector } from '@dogonis/react-injectable';
import React, { memo, FC } from 'react';
import { getPlaylist } from '../api/main/getPlaylist';
import Logo from '../components/Logo';
import { getMidImage } from '../helpers/functions/getMidImage';
import { CloseIcon } from '../icons/Close.icon';
import { Playlist as ProtoPlaylist } from '../Responses';
import { Playlist, PlaylistsService } from '../services/playlists.service';

import cn from "./Sidebar.module.scss";

export interface ISidebar {
    onPlay?: (item: ProtoPlaylist) => void;
}

const Sidebar: FC<ISidebar> = props => {

    const [{ playlists }, service] = useInjector(PlaylistsService);

    const [add] = useAsyncCallback(
        async (state, playlist: Playlist) => {
            const info = await getPlaylist(playlist.code);
            if(!state.isMounted) return;
            props.onPlay && props.onPlay(info)
        }, 
        [props.onPlay]
    )

    return (
        <div className={cn.root}>
            <Logo />
            <div className={cn.list}>
                {playlists.map(item => (
                    <div key={item.code} className={cn.item} onClick={() => add(item)} style={{ backgroundImage: `url(${getMidImage(item.display).url})` }}>
                        <div className={cn.content}>
                            <div className={cn.text}>
                                {item.title}
                            </div>
                            <button className={cn.button} onClick={() => service.remove(item.code)}>
                                <CloseIcon />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default memo(Sidebar)
