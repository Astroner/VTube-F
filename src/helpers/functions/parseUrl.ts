export const parseUrl = (strURL: string): string => {
    try {
        const url = new URL(strURL);
        if (url.pathname === "/watch") {
            return url.searchParams.get("v") ?? ""
        } else {
            return url.pathname.slice(1)
        }
    } catch(e) {
        return strURL
    }
}