export function getParams<T>(): T {
    return window.location.search
        .replace('?', '')
        .split('&')
        .reduce<T>((acc, value: string) => {
            const [l, v] = value.split('=') as [keyof T, any];
            acc[l] = v;
            return acc;
        }, {} as T);
}