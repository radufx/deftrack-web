import Image, { ImageProps } from 'next/image';
import { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

export interface StaticImageData {
  src: string;
  height: number;
  width: number;
  blurDataURL?: string;
}

interface StaticRequire {
  default: StaticImageData;
}

declare type StaticImport = StaticRequire | StaticImageData;

type ImageIconProps = Omit<ImageProps, 'src'> & {
  icon: IconProp;
  className?: string;
  iconClassName?: string;
  src?: string | StaticImport | null;
};

const ImageIcon = ({ icon, className, iconClassName, src, alt = '', ...imageProps }: ImageIconProps) => {
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);

  return (
    <>
      {!imageLoaded && <FontAwesomeIcon className={iconClassName} icon={icon} />}
      {!!src && (
        <Image className={className} src={src} alt={alt} {...imageProps} onLoadingComplete={() => setImageLoaded(true)} />
      )}
    </>
  );
};

export default ImageIcon;
