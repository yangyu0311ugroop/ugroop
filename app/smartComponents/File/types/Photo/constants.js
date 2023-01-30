export const CANVAS_SIZE_CONSTANTS = {
  SMALL: 'canvasSmall',
  MEDIUM: 'canvasMedium',
  LARGE: 'canvasLarge',
  LANDSCAPE_MD: 'canvasLandscapeMedium',
  LANDSCAPE_SM: 'canvasLandscapeSmall',
};

// I made the height and width divisible by 8
// since this is the standard number as well
// that we use for the sizes
export const CANVAS_SIZE = {
  [CANVAS_SIZE_CONSTANTS.SMALL]: {
    // Feel free to change this size
    canvasHeight: 240,
    canvasWidth: 240,
    canvasBorder: 0,
  },
  [CANVAS_SIZE_CONSTANTS.MEDIUM]: {
    canvasHeight: 480,
    canvasWidth: 480,
    canvasBorder: 0,
  },
  [CANVAS_SIZE_CONSTANTS.LARGE]: {
    // Feel free to change this size
    canvasHeight: 720,
    canvasWidth: 720,
    canvasBorder: 0,
  },
  [CANVAS_SIZE_CONSTANTS.LANDSCAPE_MD]: {
    canvasHeight: 320,
    canvasWidth: 480,
    canvasBorder: 0,
  },
  [CANVAS_SIZE_CONSTANTS.LANDSCAPE_SM]: {
    canvasHeight: 120,
    canvasWidth: 400,
    canvasBorder: 0,
  },
};

export const IMAGE_SIZES_CONSTANTS = {
  XS: 'imageExtraSmall',
  SMALL: 'imageSmall',
  MEDIUM_SMALL: 'imageMediumSmall',
  NORMAL: 'imageNormal',
  MEDIUM: 'imageMedium',
  LG: 'imageLarge',
  XL: 'imageExtraLarge',
  XXS: 'imageExtraExtraSmall',
  XXXS: 'imageExtraExtraExtraSmall',
  AUTO_WIDTH: 'imageAutoWidth',
  FULL_SIZE: 'imageFullSize',
  LANDSCAPE_MD: 'landscapeMedium',
  LANDSCAPE_SM: 'landscapeSmall',
};

export const IMAGE_VARIANTS_CONSTANTS = {
  ROUND: 'imageRound',
  SQUARE: 'imageSquare',
};

export const RESIZE_SIZES = {
  [IMAGE_SIZES_CONSTANTS.XXXS]: 16,
  [IMAGE_SIZES_CONSTANTS.XXS]: 48,
  [IMAGE_SIZES_CONSTANTS.XS]: 32,
  [IMAGE_SIZES_CONSTANTS.SMALL]: 80,
  [IMAGE_SIZES_CONSTANTS.MEDIUM_SMALL]: 60,
  [IMAGE_SIZES_CONSTANTS.NORMAL]: 80,
  [IMAGE_SIZES_CONSTANTS.MEDIUM]: 120,
  [IMAGE_SIZES_CONSTANTS.LARGE]: 344,
  [IMAGE_SIZES_CONSTANTS.XL]: 400,
};
