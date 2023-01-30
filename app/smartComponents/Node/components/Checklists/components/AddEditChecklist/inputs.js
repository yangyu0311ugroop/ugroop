import React from 'react';

const NAME = {
  id: 'content',
  name: 'content',
  label: <span>Checklist Name</span>,
  type: 'text',
  validations: {
    minLength: 3,
  },
  validationErrors: {
    minLength: 'too short',
  },
  required: true,
  autoFocus: true,
};

const DESCRIPTION = {
  name: 'description',
  placeholder:
    'Write a short description, i.e. its purpose or when it would be used',
};

const NODE = {
  name: 'copyFromNodeId',
  label: 'Copy checklist',
};

export default {
  NAME,
  DESCRIPTION,
  NODE,
};
