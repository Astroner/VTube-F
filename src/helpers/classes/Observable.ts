export class Observable<T> {
    private callbacks: Array<(value: T) => void> = []

    constructor(public value: T) {}

    update(next: T){
        for(const cb of this.callbacks) {
            cb(next)
        }
    }

    subscribe(cb: (value: T) => void){
        this.callbacks.push(cb);

        return {
            unsubscribe: () => {
                this.callbacks.splice(this.callbacks.indexOf(cb), 1)
            }
        }
    }
}