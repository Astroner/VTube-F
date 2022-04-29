import { axios } from "../../helpers/axios"
import { MusicCategories } from "../../Responses"

export const getMusicRecommendations = async (psid: string) => {
    const { data } = await axios.get<MusicCategories>("/recommendations/music/" + psid)

    return data;
}