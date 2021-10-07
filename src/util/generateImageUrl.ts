import {IMAGE_URL} from './contants';

export const generateImageUrl = (path: string, width: string = 'w500') => {
  return {uri: `${IMAGE_URL}${width}${path}`};
};
