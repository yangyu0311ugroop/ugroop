import { schema } from 'normalizr';
import omit from 'lodash/omit';

export const photoStrategy = photo => {
  const newPhoto = { ...photo };
  const { x, y, width, height, scale, rotate } = photo;
  const metaInfo = {
    x: Number(x),
    y: Number(y),
    width: Number(width),
    height: Number(height),
    scale: Number(scale),
    rotate: Number(rotate),
  };
  newPhoto.metaInfo = metaInfo;
  return omit(newPhoto, [
    'w',
    'h',
    'x',
    'y',
    'width',
    'height',
    'scale',
    'rotate',
  ]);
};

const photo = new schema.Entity(
  'photo',
  {},
  {
    idAttribute: 'url',
    processStrategy: photoStrategy,
  },
);
const photos = [photo];

const templatePhoto = new schema.Entity(
  'photo',
  {},
  {
    idAttribute: 'content',
  },
);

const templatePhotos = [templatePhoto];

const attachment = new schema.Entity(
  'attachment',
  {},
  {
    idAttribute: 'id',
  },
);

export const FILE_STORE_SCHEMAS = {
  photo,
  photos,
  templatePhoto,
  templatePhotos,
  attachment,
};
