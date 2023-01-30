import { defineMessages } from 'react-intl';

export default defineMessages({
  anyOneText: {
    id: 'app.containers.Templates.Modals.TransferTourOwner.readyLabel',
    defaultMessage: 'You can transfer the tour ownership of the tour',
  },
  readyLabel: {
    id: 'app.containers.Templates.Modals.TransferTourOwner.warningText',
    defaultMessage:
      'You are about to transfer the ownership of this tour. To proceed please press continue.',
  },
  awaitingLabel: {
    id: 'app.containers.Templates.Modals.TransferTourOwner.awaitingLabel',
    defaultMessage:
      'Waiting to accept the transfer. You can cancel the transfer anytime by pressing the Cancel Transfer button.',
  },
  emailSentlabel: {
    id: 'app.containers.Templates.Modals.TransferTourOwner.emailSentlabel',
    defaultMessage: 'An email has been sent to the recipient.',
  },
});
