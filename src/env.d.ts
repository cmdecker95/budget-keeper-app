/// <reference types="astro/client" />

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface ImportMetaEnv {
  readonly APPWRITE_ENDPOINT: string;
  readonly APPWRITE_PROJECT_ID: string;
}
