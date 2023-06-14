import Resizer from 'react-image-file-resizer';

export const resizeFile = (file: File, onResize: (file: File) => void): Promise<any> =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(file, 512, 512, 'PNG', 100, 0, (uri: any) => resolve(onResize(uri)), 'file', 512, 512);
  });
