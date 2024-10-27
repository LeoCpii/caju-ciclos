/// <reference types="vite/client" />

interface ImportMetaEnv {
    // FIREBASE
    readonly VITE_APP_ID: string;
    readonly VITE_API_KEY: string;
    readonly VITE_AUTH_DOMAIN: string;
    readonly VITE_PROJECT_ID: string;
    readonly VITE_STORAGE_BUCKET: string;
    readonly VITE_MEASUREMENT_ID: string;
    readonly VITE_MESSAGING_SENDER_ID: string;

    // URLS
    readonly VITE_SSO_URL: string;
    readonly VITE_MANAGER_URL: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}