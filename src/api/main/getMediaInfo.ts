import { axios } from "../../helpers/axios";
import { VideoInfo } from "../../Responses";

export type MediaType = "video" | "audio" | "both" | "all"

export const getMediaInfo = async (code: string): Promise<VideoInfo> => {
    const { data } = await axios.get<VideoInfo>(`/player/info/${code}`)

    return data;
}