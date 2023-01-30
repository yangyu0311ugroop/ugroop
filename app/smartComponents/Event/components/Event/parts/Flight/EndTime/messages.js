/**
 * Created by stephenkarpinskyj on 5/8/18.
 */

import { defineMessages } from 'react-intl';

export const messages = defineMessages({
  editablePlaceholder: {
    id: 'app.Event.parts.Flight.EndTime.editablePlaceholder',
    defaultMessage: 'Click to specify arrival time',
  },
  multiInputLabel: {
    id: 'app.Event.parts.Flight.EndTime.multiInputLabel',
    defaultMessage: 'Specify journey time instead of arrival time?',
  },
  labelPrefix: {
    id: 'app.Event.parts.Flight.EndTime.labelPrefix',
    defaultMessage: 'Arriving:',
  },
});

export default messages;
