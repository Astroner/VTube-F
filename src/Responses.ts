export interface YTImage {
    url: string;
    width: number;
    height: number;
}

export interface Playlist {
    title: string;
    display: YTImage[];
    list: ListItem[];
}

export interface ListItem {
    title: string;
    code: string;
    display: YTImage[];
}
export interface VideoFormat {
    itag: number;
    mime: string;
    quality: string;
}

export interface VideoInfo {
    title: string;
    displayImage: YTImage[];
}