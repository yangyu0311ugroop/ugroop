export const PUBLIC = 'public';
export const ORGANISERS = 'organisers';
export const ONLY_ME = 'onlyMe';
export const SHOW = 'show';
export const HIDE = 'hide';

export const ACCESS_LEVEL = {
  [PUBLIC]: {
    icon: 'lnr-earth',
    title: 'Everyone',
    longTitle: 'Shared with Everyone',
    description: 'Everyone in this tour',
  },
  [ORGANISERS]: {
    icon: 'lnr-users',
    title: 'Organisers',
    longTitle: 'Shared with Organisers',
    description: 'Tour owner and organisers',
  },
  [ONLY_ME]: {
    icon: 'lnr-lock',
    title: 'Private',
    longTitle: 'Private',
    description: 'Only me',
  },
};
export const PRINT_MODE = {
  [SHOW]: {
    icon: 'lnr-printer',
    title: 'Show',
    longTitle: 'Will show on print view',
    description: 'Will show on print view',
  },
  [HIDE]: {
    icon: 'lnr-layers-crossed',
    title: 'Hide',
    longTitle: 'Hidden on print view',
    description: 'Hidden on print view',
  },
};
export const ACCESS_VARIANTS = {
  sharedWith: 'sharedWith',
  printMode: 'printMode',
};

ACCESS_LEVEL.null = ACCESS_LEVEL[PUBLIC]; // default
ACCESS_LEVEL[''] = ACCESS_LEVEL[PUBLIC]; // default
PRINT_MODE.null = PRINT_MODE[SHOW]; // default
PRINT_MODE[''] = PRINT_MODE[SHOW]; // default
