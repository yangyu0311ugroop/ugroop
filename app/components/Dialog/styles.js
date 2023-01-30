import { SIZE_CONSTANTS } from 'sizeConstants';

const stylesheet = {
  root: {
    zIndex: 2000001,
  },
  paper: {
    borderRadius: '4px',
    margin: 16,
  },
  [`${SIZE_CONSTANTS.XS}PaperHeight`]: {
    height: 480,
  },
  [`${SIZE_CONSTANTS.SM}PaperHeight`]: {
    height: 600,
  },
  [`${SIZE_CONSTANTS.MD}PaperHeight`]: {
    height: 720,
  },
};

export default stylesheet;
