export interface ParsedURL {
    type: "PLAYLIST" | "VIDEO",
    code: string
}

export const parseUrl = (strURL: string): ParsedURL => {
    try {
        const url = new URL(strURL);
        if (url.pathname === "/watch") {
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