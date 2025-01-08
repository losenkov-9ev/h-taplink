declare module '*.scss' {
  interface IClassNames {
    [className: string]: string;
  }

  const classnames: IClassNames;
  export = classnames;
}

declare module '*.svg' {
  import React from 'react';

  const SVG: React.FunctionComponent<React.SVGProps<SVGElement>>;
  export default SVG;
}

declare module '*.jpg';
declare module '*.jpeg';
declare module '*.png';
declare module '*.gif';

/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_FONTS_API_KEY: string;
  readonly VITE_IS_DEV: boolean;
  readonly VITE_API_LINK: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
