/**
 * Created by stephenkarpinskyj on 20/8/18.
 */

import { defineMessages } from 'react-intl';

export default defineMessages({
  title: {
    id: 'app.Event.components.EventDeleteConfirmation.title',
    defaultMessage: 'Delete Event',
  },
  headlineWithEventName: {
    id: 'app.Event.components.EventDeleteConfirmation.headlineWithEventName',
    defaultMessage: 'You are about to delete:',
  },
  headlineWithoutEventName: {
    id: 'app.Event.components.EventDeleteConfirmation.headlineWithoutEventName',
    defaultMessage: 'You are about to delete an event',
  },
  text: {
    id: 'app.Event.components.EventDeleteConfirmation.text',
    defaultMessage: 'Are you sure you want to delete this {typeName} event?',
  },
});
