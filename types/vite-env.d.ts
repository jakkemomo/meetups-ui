/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_GOOGLE_MAP_API_KEY: string;
  readonly VITE_APP_GOOGLE_MAP_ID: string;
  readonly VITE_APP_BASE_URL_API: string;
  readonly VITE_APP_BASE_IMAGE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
