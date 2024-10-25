import { useEffect } from 'react';

export enum DeviceBreakpoints {
    MAX_MOBILE = '(max-width: 719px)',
    MIN_TABLET = '(min-width: 720px)',
    MAX_TABLET = '(max-width: 1023px)',
    MIN_DESKTOP = '(min-width: 1024px)',
    MAX_DESKTOP = '(max-width: 1279px)',
    MIN_WIDESCREEN = '(min-width: 1280px)',
    MAX_WIDESCREEN = '(max-width: 1439px)',
    MIN_FULL_HD = '(min-width: 1440px)',
}

type Medias = {
    mobile: MediaQueryList;
    tablet: MediaQueryList;
    desktop: MediaQueryList;
    widescreen: MediaQueryList;
    full_hd: MediaQueryList;
}

export interface Callback {
    onMobile?: () => void;
    onTablet?: () => void;
    onFullHD?: () => void;
    onDesktop?: () => void;
    onWidescreen?: () => void;
}

const MEDIAS = {
    mobile: DeviceBreakpoints.MAX_MOBILE,
    tablet: `${DeviceBreakpoints.MIN_TABLET} and ${DeviceBreakpoints.MAX_TABLET}`,
    desktop: `${DeviceBreakpoints.MIN_DESKTOP} and ${DeviceBreakpoints.MAX_DESKTOP}`,
    widescreen: `${DeviceBreakpoints.MIN_WIDESCREEN} and ${DeviceBreakpoints.MAX_WIDESCREEN}`,
    full_hd: DeviceBreakpoints.MIN_FULL_HD
};

const getMedias = (): Medias => {
    return {
        mobile: window.matchMedia(MEDIAS.mobile),
        tablet: window.matchMedia(MEDIAS.tablet),
        desktop: window.matchMedia(MEDIAS.desktop),
        widescreen: window.matchMedia(MEDIAS.widescreen),
        full_hd: window.matchMedia(MEDIAS.full_hd)
    };
};

export default function useResize({
    onMobile, onTablet, onDesktop, onWidescreen, onFullHD
}: Callback, deps: any[] = []) {
    const MAP_CALLBACKS = {
        mobile: onMobile,
        tablet: onTablet,
        desktop: onDesktop,
        widescreen: onWidescreen,
        full_hd: onFullHD
    };

    const checker = (event: MediaQueryListEvent, fn: () => void) => { if (event.matches) { fn(); } };

    const makeMobile = (event: MediaQueryListEvent) => {
        if (onMobile) { checker(event, onMobile); }
    };

    const makeTablet = (event: MediaQueryListEvent) => {
        if (onTablet) { checker(event, onTablet); }
    };

    const makeDesktop = (event: MediaQueryListEvent) => {
        if (onDesktop) { checker(event, onDesktop); }
    };

    const makeWidescreen = (event: MediaQueryListEvent) => {
        if (onWidescreen) { checker(event, onWidescreen); }
    };

    const makeFullhd = (event: MediaQueryListEvent) => {
        if (onFullHD) { checker(event, onFullHD); }
    };

    const initialize = (medias: Medias) => {
        const key = Object.keys(medias).find((key) => medias[key].matches) as keyof typeof MAP_CALLBACKS;
        MAP_CALLBACKS[key]?.();
    };

    useEffect(() => {
        const medias = getMedias();
        initialize(medias);
    }, []);

    useEffect(() => {
        const medias = getMedias();

        /* eslint-disable @typescript-eslint/no-unused-expressions */
        onMobile && medias.mobile.addEventListener('change', makeMobile);
        onTablet && medias.tablet.addEventListener('change', makeTablet);
        onDesktop && medias.desktop.addEventListener('change', makeDesktop);
        onWidescreen && medias.widescreen.addEventListener('change', makeWidescreen);
        onFullHD && medias.full_hd.addEventListener('change', makeFullhd);

        return () => {
            onMobile && medias.mobile.removeEventListener('change', makeMobile);
            onTablet && medias.tablet.removeEventListener('change', makeTablet);
            onDesktop && medias.desktop.removeEventListener('change', makeDesktop);
            onWidescreen && medias.widescreen.removeEventListener('change', makeWidescreen);
            onFullHD && medias.full_hd.removeEventListener('change', makeFullhd);
        };
        /* eslint-enable @typescript-eslint/no-unused-expressions */
    }, deps);

};