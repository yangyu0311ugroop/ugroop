import { IMAGE_SIZES_CONSTANTS } from 'smartComponents/File/types/Photo/constants';

const styles = {
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    border: '1px dashed #e3e9ef',
    backgroundColor: '#fbfcfd',
    flexDirection: 'column',
    cursor: 'pointer',
  },
  [IMAGE_SIZES_CONSTANTS.LANDSCAPE_MD]: {
    minHeight: 320,
  },
  grow: {
    flex: '1',
  },
  round: {
    borderRadius: '50%',
  },
};

export default styles;
