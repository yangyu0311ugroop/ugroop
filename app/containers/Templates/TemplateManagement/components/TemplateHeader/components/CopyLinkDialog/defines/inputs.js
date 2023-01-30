import m from './message';

const TITLE = {
  autoFocus: true,
  required: true,
  autoComplete: 'off',
  name: 'content',
  placeholder: m.placeholder.defaultMessage,
};

const SELECT_LAYOUT = {
  options: [
    {
      value: 'interactive',
      children: 'Interactive Layout',
    },
    {
      value: 'print',
      children: 'Print Layout',
    },
  ],
  native: false,
  name: 'layout',
  id: 'selectedLayout',
  label: 'Select Travel Link Layout',
};

export default {
  TITLE,
  SELECT_LAYOUT,
};
