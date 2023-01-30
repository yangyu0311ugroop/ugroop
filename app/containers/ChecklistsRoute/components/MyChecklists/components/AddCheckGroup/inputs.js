import React from 'react';

const NAME = {
  name: 'content',
  type: 'text',
  label: <span>Checklist Group Name</span>,
  validations: 'minLength:2,maxLength:500',
  validationErrors: {
    minLength: 'a bit longer (between 2-500 characters)',
    maxLength: 'too long (between 2-500 characters)',
  },
  required: true,
  autoFocus: true,
};

const DESCRIPTION = {
  name: 'description',
  placeholder:
    'Write a short description, i.e. its purpose or when it would be used',
};

export default {
  NAME,
  DESCRIPTION,
};
