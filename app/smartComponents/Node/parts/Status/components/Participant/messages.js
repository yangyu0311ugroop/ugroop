import { defineMessages } from 'react-intl';
import {
  PARTICIPANT_STATUSES,
  PARTICIPANT_STATUSES_REQUIRED,
} from 'utils/constants/nodes';

export default defineMessages({
  label: {
    id: 'app.Node.parts.Status.Participant.label',
    defaultMessage: 'Status',
  },
  required: {
    id: 'app.Node.parts.Status.Participant.required',
    defaultMessage: 'Status *',
  },
  '': {
    id: 'app.Node.parts.Status.Participant.none',
    defaultMessage: '',
  },
  [PARTICIPANT_STATUSES.pending]: {
    id: 'app.Node.parts.Status.Participant.pending',
    defaultMessage: 'Maybe',
  },
  [PARTICIPANT_STATUSES.confirmed]: {
    id: 'app.Node.parts.Status.Participant.confirmed',
    defaultMessage: 'Going',
  },
  [PARTICIPANT_STATUSES.declined]: {
    id: 'app.Node.parts.Status.Participant.declined',
    defaultMessage: 'Not Going',
  },
  [PARTICIPANT_STATUSES_REQUIRED.pending_required]: {
    id: 'app.Node.parts.Status.Participant.pending',
    defaultMessage: 'Maybe',
  },
  [PARTICIPANT_STATUSES_REQUIRED.confirmed_required]: {
    id: 'app.Node.parts.Status.Participant.confirmed',
    defaultMessage: 'Going',
  },
  [PARTICIPANT_STATUSES_REQUIRED.declined_required]: {
    id: 'app.Node.parts.Status.Participant.declined',
    defaultMessage: 'Not Going',
  },
});
