import { createMuiTheme } from '@material-ui/core/styles';
import colors from './CoolThemeColors';
import margins from './margins';
import paddings from './paddings';
import { fontScale } from './scale';
export const PRIMARY_COLOR = '#7097EB';

const CoolTheme = createMuiTheme({
  colorTone: 'cool',
  colors,
  paddings,
  margins,
  fontScale,
  fontSize: {
    breadcrumb: {
      item: '14px',
    },
  },
  typography: {
    fontFamily: "'IBM Plex Sans',sans-serif",
  },
  overrides: {
    MuiFilledInput: {
      root: {
        fontSize: 16,
      },
      input: {
        color: '#2B344D',
      },
    },
    MuiAlert: {
      root: {
        fontSize: 16,
      },
    },
    MuiTooltip: {
      tooltip: {
        '@media (min-width: 600px)': {
          fontSize: 14, // fix the issue with font being too small
        },
      },
    },
    MuiList: {
      padding: {
        paddingTop: 'unset',
        paddingBottom: 'unset',
      },
    },
    MuiMenuItem: {
      root: {
        fontSize: 12, // fix the issue with font being too small
        height: 'unset',
      },
    },
    MuiButton: {
      root: {
        fontSize: 14,
        '&:hover': {
          backgroundColor: 'rgba(0, 0, 0, 0.02)',
        },
      },
    },
    MuiIconButton: {
      colorSecondary: {
        '&:hover': {
          backgroundColor: 'white',
        },
      },
    },
    MuiCheckbox: {
      // '& $checked': {
      // color: '#7097EB !important',
      // },
    },
    MuiSwitch: {
      // '& $checked': {
      //   color: PRIMARY_COLOR,
      // },
    },
    MuiTabs: {
      indicator: {
        backgroundColor: '#fff',
      },
    },
    MuiRadio: {
      // '& $checked': {
      //   color: '#7097EB',
      // },
    },
    MuiOutlinedInput: {
      root: {
        fontSize: 16,
      },
    },
    MuiInput: {
      root: {
        fontSize: 16,
        '&:after': {
          backgroundColor: 'rgb(112, 151, 235)',
        },
      },
      multiline: {},
      inputMultiline: {},
      // Name of the styleSheet
      underline: {
        paddingBottom: 0,
        '&:before': {
          // backgroundColor: 'rgb(212, 212, 212)',
        },
        '&:hover:not($disabled):before': {
          // backgroundColor: 'rgb(175, 175, 175)',
        },
      },
      // '& $error': {
      //   '&:after': {
      //     backgroundColor: '#ff1744',
      //     transform: 'scaleX(1)',
      //   },
      // },
      input: {
        height: '1.5em',
        padding: '8px 0',
        color: '#2B344D',
        backgroundColor: 'transparent',
      },
      // inputType: {
      //   height: '1.5em',
      // },
      // '& $focused': {
      //   '& $input': {
      //     backgroundColor: 'transparent',
      //   },
      // },
    },
    MuiSelect: {
      select: {
        '&:focus': {
          background: 'transparent',
        },
      },
    },
    MuiFormLabel: {
      root: {
        color: '#8e94a2',
        fontSize: '14px',
        fontFamily: '"IBM Plex Sans", sans-serif',
      },
      // '& $focused': {
      //   color: PRIMARY_COLOR,
      // },
    },
    MuiInputLabel: {
      root: {
        '& span:nth-child(2)': {
          // remove asterisk (*) in required field
          display: 'none',
        },
      },
      formControl: {
        fontWeight: 400,
        top: 4,
      },
      shrink: {
        top: 4,
      },
    },
    MuiFormHelperText: {
      root: {
        color: '#8e94a2',
        marginBottom: 2,
        fontWeight: 400,
        fontSize: 12,
      },
      // '& $error': {
      //   marginTop: 4,
      //   marginBottom: 0,
      //   color: '#37415B',
      //   fontSize: '12px',
      //   lineHeight: '1.6',
      //   '&:before': {
      //     display: 'inline-block',
      //     marginRight: '8px',
      //     content: '""',
      //     width: '4px',
      //     height: '4px',
      //     background: '#D75B7F',
      //     borderRadius: '100%',
      //     marginBottom: '2px',
      //   },
      // },
    },
    MuiFormControl: {
      marginDense: {
        marginTop: 0,
        marginBottom: 4,
      },
      root: {
        height: '100%',
      },
    },
    MuiFormControlLabel: {
      label: {
        color: '#4C5673',
      },
    },
    MuiTypography: {
      // title: {
      //   fontFamily: 'IBM Plex Sans',
      // },
      body1: {
        fontFamily: 'IBM Plex Sans',
        fontSize: 14,
      },
      button: {
        fontSize: '1.5rem',
      },
      caption: {
        fontSize: '1.3rem',
      },
      // headline: {
      //   fontSize: '1.8rem',
      //   fontWeight: 500,
      // },
      // subheading: {
      //   fontSize: '1.5rem',
      // },
    },
    MuiPickersDay: {
      day: {
        fontSize: '1.4rem',
        fontWeight: 'inherit',
      },
      '& $selected': {
        backgroundColor: PRIMARY_COLOR,
      },
    },
    MuiPickersToolbar: {
      toolbar: {
        backgroundColor: PRIMARY_COLOR,
        '& > div': {
          display: 'flex',
          flexDirection: 'column',
        },
      },
    },
    MuiPickersTimePicker: {
      hourMinuteLabel: {
        flexDirection: 'row !important',
      },
    },
    MuiPickersClock: {
      pin: {
        backgroundColor: PRIMARY_COLOR,
      },
    },
    MuiPickersClockPointer: {
      pointer: {
        backgroundColor: PRIMARY_COLOR,
      },
      thumb: {
        backgroundColor: PRIMARY_COLOR,
        border: '14px solid #7097EB',
      },
      noPoint: {
        backgroundColor: PRIMARY_COLOR,
      },
    },
    MuiPickersModal: {
      dialogActions: {
        '& > button:nth-child(3)': {
          position: 'absolute',
          right: 8,
        },
      },
    },
    MuiChip: {
      label: {
        fontSize: '12px',
      },
      outlinedPrimary: {
        color: colors.base,
        border: `1px solid ${colors.base}`,
      },
    },
  },
});

export default CoolTheme;
