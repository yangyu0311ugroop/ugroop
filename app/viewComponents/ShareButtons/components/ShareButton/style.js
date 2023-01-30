const style = {
  link: {
    color: '#fff',
    textDecoration: 'none',
    '&:hover': {
      color: '#fff',
      textDecoration: 'none',
    },
  },

  buttonRoot: {
    padding: '6px',
    borderRadius: '50%',
  },

  buttonRootSmall: {
    padding: '4px 6px',
    borderRadius: '50%',
  },

  buttonSquare: {
    borderRadius: 4,
  },

  iconRoot: {
    fill: '#fff',
    stroke: 'none',
    display: 'flex',
    '& > svg': {
      width: 12,
      height: 12,
      marginRight: 4,
      verticalAlign: 'top',
    },
  },

  iconRootInline: {
    fill: '#fff',
    stroke: 'none',
    display: 'flex',
    '& > svg': {
      width: 14,
      height: 14,
      marginRight: 4,
      verticalAlign: 'top',
    },
  },

  iconBase: {
    '& > svg': {
      margin: 0,
      verticalAlign: 'middle',
    },
  },

  // social media icons
  buttonFacebook: {
    borderColor: '#3b5998',
    backgroundColor: '#3b5998',
    '&:hover, &:active': {
      borderColor: '#2d4373',
      backgroundColor: '#2d4373',
    },
  },

  buttonInlineFacebook: {
    borderColor: '#3b5998',
    backgroundColor: '#fff',
    color: '#3b5998',
    '&:hover, &:active': {
      borderColor: '#2d4373',
      backgroundColor: '#fff',
      color: '#2d4373',
    },
  },

  buttonTwitter: {
    borderColor: '#55acee',
    backgroundColor: '#55acee',
    '&:hover, &:active': {
      borderColor: '#2795e9',
      backgroundColor: '#2795e9',
    },
  },

  buttonInlineTwitter: {
    borderColor: '#55acee',
    backgroundColor: '#fff',
    color: '#55acee',
    '&:hover, &:active': {
      borderColor: '#2795e9',
      backgroundColor: '#fff',
      color: '#2795e9',
    },
  },

  buttonWhatsApp: {
    borderColor: '#25D366',
    backgroundColor: '#25D366',
    '&:hover, &:active': {
      borderColor: '#1DA851',
      backgroundColor: '#1DA851',
    },
    '& svg': {
      width: 14,
      height: 14,
    },
  },

  buttonInlineWhatsAppSmall: {
    borderColor: '#25D366',
    backgroundColor: '#fff',
    color: '#25D366',
    padding: '4px 5px',
    '&:hover, &:active': {
      borderColor: '#1DA851',
      backgroundColor: '#fff',
      color: '#1DA851',
    },
    '& svg': {
      width: 14,
      height: 14,
    },
  },

  buttonMail: {
    borderColor: '#777777',
    backgroundColor: '#777777',
    '&:hover, &:active': {
      borderColor: '#5e5e5e',
      backgroundColor: '#5e5e5e',
    },
  },

  buttonInlineMail: {
    borderColor: '#777777',
    backgroundColor: '#fff',
    color: '#777777',
    '&:hover, &:active': {
      borderColor: '#5e5e5e',
      backgroundColor: '#fff',
      color: '#5e5e5e',
    },
  },
};

export default style;
