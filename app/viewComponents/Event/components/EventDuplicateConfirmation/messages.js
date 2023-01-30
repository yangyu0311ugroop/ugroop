/**
 * Created by john april serafico on 05/27/20.
 */

import { defineMessages } from 'react-intl';

export default defineMessages({
  title: {
    id: 'app.Event.components.EventDuplicateConfirmation.title',
    defaultMessage: 'Copy Event',
  },
  headlineWithEventName: {
    id: 'app.Event.components.EventDuplicateConfirmation.headlineWithEventName',
    defaultMessage: 'You are about to copy:',
  },
  headlineWithoutEventName: {
    id:
      'app.Event.components.EventDuplicateConfirmation.headlineWithoutEventName',
    defaultMessage: 'You are about to copy an event',
  },
  text: {
    id: 'app.Event.components.EventDuplicateConfirmation.text',
    defaultMessage:
      'Are you sure you want to copy {typeName} Event to selected date/s?',
  },
});
