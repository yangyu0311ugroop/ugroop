import Overlay from 'shareAssets/overlay.png';

const styles = {
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 8px',
  },

  img: {
    transition: 'all 300ms ease-in',
  },

  imgBg: {
    objectFit: 'cover',
    borderRadius: '5px',
  },

  placeholder: {
    borderRadius: 5,
    position: 'relative',
    backgroundImage: `url(${Overlay})`,
    backgroundBlendMode: 'color-burn',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  normalImg: {
    width: 130,
    height: 130,
    minHeight: 130,
    '@media (max-width: 540px)': {
      width: 110,
      height: 110,
      minHeight: 110,
    },
  },

  selected: {
    width: 170,
    height: 170,
    minHeight: 170,
    '@media (max-width: 540px)': {
      width: 150,
      height: 150,
      minHeight: 150,
    },
  },

  logo: {
    zIndex: 3,
    height: 70,
    opacity: 0.9,
    position: 'absolute',
    filter: 'invert(100%)',
    transition: '0.3s filter linear',
    top: '20%',
  },
  logoSelected: {
    height: 80,
    filter: 'unset',
  },
  color1: {
    backgroundColor: '#584EAC',
  },
  color2: {
    backgroundColor: '#439DA5',
  },
  color3: {
    backgroundColor: '#3C7692',
  },
  color4: {
    backgroundColor: '#4599B1',
  },
  color5: {
    backgroundColor: '#297F64',
  },
};

export default styles;
