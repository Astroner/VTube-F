import { axios } from "../../helpers/axios";
import { Playlist } from "../../Responses";

export const getPlaylist = async (code: string): Promise<Playlist> => {
    const { data } = await axios.get<Playlist>(`/playlist/${code}`);

    return data;
}