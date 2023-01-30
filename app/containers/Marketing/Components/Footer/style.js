import FooterImg from 'shareAssets/footer-image.jpg';

const style = ({ colors }) => ({
  root: {
    backgroundImage: `url(${FooterImg})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    height: '450px',
    position: 'relative',
    display: 'flex',
  },
  darkOverride: {
    backgroundColor: colors.dune,
    position: 'absolute',
    top: '0',
    left: '0',
    height: '100%',
    width: '100%',
    opacity: '0.98',
    zIndex: 9,
  },
  footerContent: {
    position: 'relative',
    zIndex: 99,
    flex: '1 1 0',
    display: 'flex',
  },
  footerBottom: {
    position: 'absolute',
    bottom: '0',
    width: '100%',
    '& footer': {
      width: '100%',
    },
    '& li': {
      color: 'white',
    },
    '& a': {
      color: 'white',
    },
  },
  container: {
    position: 'relative',
  },
});

export default style;
