/// <reference types="astro/client" />

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface ImportMetaEnv {
}

interface UserCredentials {
  email: string;
  password: string;
}
