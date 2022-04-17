import { Injectable, OnInit } from "@dogonis/react-injectable";
import { YTImage } from "../Responses";

export interface Playlist {
    title: string;
    display: YTImage[];
    code: string;
}

export interface TPlaylistsService {
    playlists: Playlist[]
}

export class PlaylistsService extends Injectable<TPlaylistsService> implements OnInit {
    static KEY = "app_playlists"

    getDefaultState() {
        try {
            return JSON.parse(localStorage.getItem(PlaylistsService.KEY) ?? "")            
        } catch(e){
            return {
                playlists: []
            }
        }
    }

    onInit(){
        this.subscribe(state => {
            localStorage.setItem(PlaylistsService.KEY, JSON.stringify(state))
        })
    }

    add(playlist: Playlist){
        this.setState(prev => ({
            ...prev,
            playlists: prev.playlists.concat(playlist)
        }))
    }

    has(code: string){
        return !!this.getState().playlists.find(item => item.code === code)
    }

    remove(code: string) {
        this.setState(prev => ({
            ...prev,
            playlists: prev.playlists.filter(item => item.code !== code)
        }))
    }
}