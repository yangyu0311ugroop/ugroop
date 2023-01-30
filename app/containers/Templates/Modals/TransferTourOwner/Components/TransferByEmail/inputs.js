import React from 'react';

const EMAIL = {
  name: 'email',
  type: 'text',
  label: <span>Enter email address</span>,
  validations: 'isEmail',
  placeholder:
    'Enter the email address of the person you want this tour be transfered',
  validText: '',
  validationErrors: {
    isEmail: 'does not look like an email',
  },
  required: true,
  autoFocus: true,
};

export default {
  EMAIL,
};
