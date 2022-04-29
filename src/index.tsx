import React from 'react';
import ReactDOM from 'react-dom';
import { InjectableProvider } from '@dogonis/react-injectable';

import "normalize.css";
import "./index.scss"

import App from './App';
import { PlaylistsService } from './services/playlists.service';
import { UserService } from './services/user.service';

ReactDOM.render(
  <React.StrictMode>
    <InjectableProvider inject={[PlaylistsService, UserService]}>
      <App />
    </InjectableProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
