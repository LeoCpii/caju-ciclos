export function getDomain() {
    const hostname = window.location.hostname;

    if (hostname === 'localhost') { return hostname; }

    return '.' + hostname.match(/^(?:.*?\.)?([a-zA-Z0-9\-_]{3,}\.(?:\w{2,8}|\w{2,4}\.\w{2,4}))$/)[1];
}

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

export function matchPath(pathname: string, options: { path: string, exact?: boolean }) {
    const { path, exact = false } = options;

    const regex = new RegExp(`^${path}`);

    const match = regex.exec(pathname);

    if (!match) {
        return null;
    }

    const [url, ...values] = match;

    const isExact = pathname === url;

    if (exact && !isExact) {
        return null;
    }

    return {
        path,
        url: path === '/' && url === '' ? '/' : url,
        isExact,
        params: values.reduce((params, value, index) => {
            params[index.toString()] = value;
            return params;
        }, {})
    };
}

export function getBasePath(url: string) { return url.split('/')[3]; }
export function getLastPath<T extends string>(url: string) { return url.split('/').reverse()[0] as T; }