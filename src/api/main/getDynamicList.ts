import { axios } from "../../helpers/axios"
import { Playlist } from "../../Responses";

export const getDynamicList = async (psid: string, list: string, code: string) => {
    const { data } = await axios.get<Playlist>(`/playlist/dynamic/${psid}/${list}/${code}`);
    return data;
}