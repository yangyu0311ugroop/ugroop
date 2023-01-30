/**
 * Created by stephenkarpinskyj on 29/4/18.
 */

const style = {
  root: {
    padding: '12px 8px',
    border: 'dashed 2px #e3e9ef',
  },
  containerRoot: {
    padding: '0px 8px 0px 8px',
  },
  dropzone: {
    backgroundColor: '#edf2f4',
    cursor: 'pointer',
    '& > input': {
      width: 0,
    },
  },
  detailsContainer: {
    maxWidth: '100%',
  },
  clearButton: {
    height: '100%',
  },
  browseIconBorder: {
    width: 40,
    height: 40,
    color: '#acb2c1',
    borderRadius: '50%',
    backgroundColor: '#fff',
    border: 'solid 1px #e3e9ef',
  },
  browseIcon: {
    padding: 10,
    lineHeight: 1.8,
  },
  text: {
    fontWeight: 600,
    fontSize: 12,
  },
  withTextWidth: {
    width: 200,
  },
};

export default style;
