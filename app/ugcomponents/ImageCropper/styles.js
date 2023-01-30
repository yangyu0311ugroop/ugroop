const styles = {
  root: {
    width: '100%',
    marginTop: 30,
  },
  imgCircle: {
    width: 92,
    height: 92,
    display: 'flex',
    overflow: 'hidden',
    borderRadius: '50%',
    boxShadow: '0 0 1px #727272',
  },
  buttonCircle: {
    width: 150,
    height: 150,
    display: 'flex',
    overflow: 'hidden',
    borderRadius: '50%',
    border: '2px dashed #c4d9e6',
    backgroundColor: 'rgba(224, 243, 255, 0.1)',
  },
  imgRect: {
    width: 92,
    height: 92,
    display: 'flex',
    overflow: 'hidden',
    borderRadius: '5%',
  },
  buttonRect: {
    width: 150,
    height: 150,
    display: 'flex',
    overflow: 'hidden',
    borderRadius: '5%',
    border: '2px dashed #e3e9ef',
    backgroundColor: '#fbfcfd',
  },
  smallImgRect: {
    width: 88,
    height: 88,
    display: 'flex',
    overflow: 'hidden',
    borderRadius: '5%',
    boxShadow: '0 0 1px #727272',
  },
  smallButtonRect: {
    width: 88,
    height: 88,
    display: 'flex',
    overflow: 'hidden',
    borderRadius: '5%',
    border: '2px dashed #e3e9ef',
    backgroundColor: '#fbfcfd',
  },
  imgLargeRect: {
    width: 140,
    height: 140,
    marginTop: 30,
    display: 'flex',
    overflow: 'hidden',
    borderRadius: '2%',
    boxShadow: '0 0 4px #c8c8c8',
  },
  buttonLargeRect: {
    width: 140,
    height: 140,
    marginTop: 30,
    border: '1.7px dashed #c4d9e6',
    display: 'flex',
    overflow: 'hidden',
    borderRadius: '2%',
  },
  placeholderAndInputContainer: {
    height: '100%',
    width: '100%',
  },

  templateImage: {
    width: '100%',
    height: 200,

    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  dayImage: {
    width: 72,
    height: 72,
  },
  activityImage: {},

  templateImageContainer: {
    background: '#0f334d',
  },
  activityImageContainer: {},

  templateUpdateButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bottom: 'unset',
    width: 'unset',

    background: '#00000080',
    boxShadow: '0px 0px 5px 1px rgba(210, 210, 210, 0.5)',
    color: 'white',
    padding: '4px 8px',
    borderRadius: 4,

    '&:hover': {
      background: '#00000095',
    },
  },

  daythumbnailImage: {
    width: 36,
    height: 36,
  },
  daythumbnailContainer: {
    minWidth: 36,
    minHeight: 36,
  },
};

export default styles;
