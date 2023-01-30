import { defineMessages } from 'react-intl';
import { PERSON_TYPES } from './constants';

export default defineMessages({
  label: {
    id: 'app.Node.parts.PersonType.label',
    defaultMessage: 'Participating As',
  },
  text: {
    id: 'app.Node.parts.PersonType.text',
    defaultMessage: 'as {type}',
  },
  type: {
    id: 'app.Node.parts.PersonType.type',
    defaultMessage: '{type}',
  },
  [PERSON_TYPES.student]: {
    id: 'app.Node.parts.PersonType.student',
    defaultMessage: 'Student',
  },
  [PERSON_TYPES.parent]: {
    id: 'app.Node.parts.PersonType.parent',
    defaultMessage: 'Parent',
  },
  [PERSON_TYPES.teacher]: {
    id: 'app.Node.parts.PersonType.teacher',
    defaultMessage: 'Teacher',
  },
  [PERSON_TYPES.leader]: {
    id: 'app.Node.parts.PersonType.leader',
    defaultMessage: 'Tour Leader',
  },
  [PERSON_TYPES.none]: {
    id: 'app.Node.parts.PersonType.none',
    defaultMessage: 'Other',
  },
});
