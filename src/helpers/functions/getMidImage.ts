import { YTImage } from "../../Responses";

export const getMidImage = (arr: YTImage[]): YTImage => {
    return arr[Math.floor(arr.length / 2)]
}