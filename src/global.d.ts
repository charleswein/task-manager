declare module '*.module.scss' {
  interface IClassNames {
    [className: string]: string
  }
  const classes: IClassNames;
  export default classes;
}

declare module '*.png'
declare module '*.jpg'
declare module '*.svg' {
  import React from 'react';
  const SVG: React.FC<React.SVGProps<SVGSVGElement>>;
  export default SVG;
}

declare const __PLATFORM__: 'desktop' | 'mobile';
declare const __ENV__: 'development' | 'production';