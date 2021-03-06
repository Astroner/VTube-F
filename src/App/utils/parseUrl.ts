export interface ParsedURL {
    type: "PLAYLIST" | "VIDEO" | "DYNAMIC_PLAYLIST",
    code: string
}

export const parseUrl = (strURL: string): ParsedURL => {
    try {
        const url = new URL(strURL);
        if (url.pathname === "/watch") {
            if(url.searchParams.has("list")) {
                return {
                    type: "DYNAMIC_PLAYLIST",
                    code: `${url.searchParams.get("list")!} | ${url.searchParams.get("v")!}`
                }
            }
            return {
                type: "VIDEO",
                code: url.searchParams.get("v") ?? ""
            }
        } else if (url.pathname === "/playlist") {
            return {
                type: "PLAYLIST",
                code: url.searchParams.get("list") ?? ""
            }
        } else {
            return {
                code: url.pathname.slice(1),
                type: "VIDEO"
            }
        }
    } catch(e) {
        return {
            code: strURL,
            type: "VIDEO"
        }
    }
}