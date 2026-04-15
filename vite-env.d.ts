/// <reference types="vite/client" />

declare namespace React {
  interface ImgHTMLAttributes<_T> {
    fetchpriority?: 'high' | 'low' | 'auto';
  }
}

interface ImportMetaEnv {
  readonly VITE_FORMSPREE_ID: string;
  readonly VITE_CALCOM_LINK: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
