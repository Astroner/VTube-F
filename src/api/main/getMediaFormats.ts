import { axios } from "../../helpers/axios";
import { VideoFormat } from "../../Responses";

export type MediaType = "video" | "audio" | "both" | "all"

export const getMediaFormats = async (code: string, type: MediaType): Promise<VideoFormat[]> => {
    const { data } = await axios.get<VideoFormat[]>(`/player/formats/${code}`, {
        params: {
            type
        }
    })

    return data;
}