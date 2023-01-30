const NAME = {
  name: 'content',
  type: 'text',
  label: 'Name',
  placeholder: 'Enter tab name',
  validations: 'minLength:2,maxLength:50',
  validationErrors: {
    minLength: 'a bit longer (between 2-50 characters)',
    maxLength: 'too long (between 2-50 characters)',
  },
  required: true,
  autoFocus: true,
};

const PRIVATE = {
  name: 'private',
  label: 'Want to keep this tab private?',
};

export default {
  NAME,
  PRIVATE,
};
