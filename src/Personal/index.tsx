import React, { memo, FC } from 'react';

import { useAsyncCallback, usePromiseCall } from '@dogonis/hooks';
import { useInjector } from '@dogonis/react-injectable';

import { getMusicRecommendations } from '../api/main/getMusicRecommendations';
import Sidebar from '../components/Sidebar';
import { UserService } from '../services/user.service';
import InputForm from './components/InputForm';

import cn from "./Personal.module.scss";
import { getMidImage } from '../helpers/functions/getMidImage';
import { Playlist } from '../Responses';
import { getDynamicList } from '../api/main/getDynamicList';

export interface IPersonal {
    onPlaylistPlay?: (next: Playlist) => void
}

const Personal: FC<IPersonal> = props => {

    const [user] = useInjector(UserService);

    const [isLoading, music] = usePromiseCall(async (psid) => {
        if(!psid) return null
        
        return await getMusicRecommendations(psid)
    }, [user.psid])

    const [playDynamicPlaylist] = useAsyncCallback(async (state, list: string, code: string) => {
        if(!user.psid) return state.cancel();

        const data = await getDynamicList(user.psid, list, code);

        if(!state.isMounted) return state.cancel();

        props.onPlaylistPlay && props.onPlaylistPlay(data)
    }, [props.onPlaylistPlay])

    return (
        <Sidebar noBorder>
            {
                !user.psid
                ? (
                    <div>
                        <h2 className={cn.header}>
                            Identify yourself
                        </h2>
                        <InputForm />
                    </div>
                )
                : (
                    <div>
                        {
                            music
                            ? (
                                <div>
                                    {music.categories.map(category => (
                                        <div key={category.title} className={cn.category}>
                                            <h2 className={cn.header}>
                                                {category.title}
                                            </h2>
                                            <div className={cn.lists}>
                                                {category.items.map(item => (
                                                    <div 
                                                        key={item.list}
                                                        className={cn['dynamic-playlist']} 
                                                        onClick={() => playDynamicPlaylist(item.list, item.code)}
                                                    >
                                                        <div className={cn.display} style={{ backgroundImage: `url(${getMidImage(item.display).url})` }} />
                                                        <p className={cn.name}>
                                                            {item.title}
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )
                            : isLoading
                            ? "Loading..."
                            : "Error"
                        }
                    </div>
                )
            }
        </Sidebar>
    )
}

export default memo(Personal)
