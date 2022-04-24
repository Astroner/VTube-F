export const createDoubleTapHandler = <E>(cb: (e: E) => void) => {

    let lastTime = Date.now();

    return (e: E) => {
        const currentTime = Date.now();
        const diff = currentTime - lastTime;
        lastTime = currentTime;
        if(diff < 180) cb(e)
    }
}