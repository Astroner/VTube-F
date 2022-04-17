import React from 'react';
import ReactDOM from 'react-dom';

import "normalize.css";
import "./index.scss"

import App from './App';
import { InjectableProvider } from '@dogonis/react-injectable';
import { PlaylistsService } from './services/playlists.service';

ReactDOM.render(
  <React.StrictMode>
    <InjectableProvider inject={[PlaylistsService]}>
      <App />
    </InjectableProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
