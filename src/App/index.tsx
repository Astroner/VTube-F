import React, { memo, FC, ReactNode, useState } from 'react';
import { parseUrl } from '../helpers/functions/parseUrl';
import Player from '../Player';

import cn from "./App.module.scss";

export interface IApp {
    children?: ReactNode
}

const App: FC<IApp> = props => {

    const [input, setInput] = useState("");
    const [video, setVideo] = useState<string | null>(null);


    return (
        <div className={cn.root}>
            <div>
                <input value={input} onChange={e => setInput(e.target.value)} />
                <button style={{ marginLeft: 20 }} onClick={() => setVideo(parseUrl(input))}>
                    Load
                </button>
            </div>
            {video && (
                <Player code={video} />
            )}
        </div>
    )
}

export default memo(App)
