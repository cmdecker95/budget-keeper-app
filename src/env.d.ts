/// <reference types="astro/client" />

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface ImportMetaEnv {
  readonly JWT_SECRET: string;
}

interface UserCredentials {
  email: string;
  password: string;
}

interface TokenPayload {
  userId: string;
  keeperId: string;
  sessionId: string;
  expirationDate: Date;
}
