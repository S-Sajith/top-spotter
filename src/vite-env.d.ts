interface ImportMetaEnv {
    VITE_AUTH_ENDPOINT: string;
    VITE_CLIENT_ID: string;
    VITE_REDIRECT_URL: string;
  }
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
declare module "*.png";
declare module "*.svg";
declare module "*.jpeg";
declare module "*.jpg";