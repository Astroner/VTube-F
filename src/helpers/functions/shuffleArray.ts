export const shuffleArray = <T>(arr: T[]): T[] => {
    return arr.sort(() => Math.random() * 2 - 1)
}