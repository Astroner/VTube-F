import { axios } from "../../helpers/axios"
import { Playlist } from "../../Responses";

export const getDynamicList = async (psid: string, list: string) => {
    const { data } = await axios.get<Playlist>(`/playlist/dynamic/${psid}/${list}`);
    return data;
}