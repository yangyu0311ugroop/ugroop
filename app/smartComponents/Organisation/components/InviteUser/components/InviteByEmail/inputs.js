import React from 'react';

const EMAIL = {
  name: 'email',
  type: 'text',
  label: <span>Enter email address</span>,
  validations: 'isEmail',
  placeholder: 'Enter the email address of the person you want to invite',
  validText: '',
  validationErrors: {
    isEmail: 'does not look like an email',
  },
  required: true,
};

const TOUR_ROLE = {
  name: 'tourRole',
  type: 'radio',
  required: true,
};

export default {
  EMAIL,
  TOUR_ROLE,
};
