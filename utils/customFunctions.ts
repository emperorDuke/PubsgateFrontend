export const debounce = (func: (...args: any[]) => void, timeout = 2000) => {
    let timer: NodeJS.Timeout;

    return (...args: any[]) => {
        clearTimeout(timer);
        timer = setTimeout(() => func(...args), timeout);
    }
}