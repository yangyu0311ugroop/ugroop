import { defineMessages } from 'react-intl';

export default defineMessages({
  label: {
    id: 'app.Node.parts.ConsentConfirmation.label',
    defaultMessage: 'I hereby agree and give my consent',
  },

  labelOnBehalf: {
    id: 'app.Node.parts.ConsentConfirmation.labelOnBehalf',
    defaultMessage: 'Mark as consent given on their behalf',
  },

  labelConsented: {
    id: 'app.Node.parts.ConsentConfirmation.labelConsented',
    defaultMessage: '{by} gave their consent {at}',
  },

  labelConsentedOnBehalf: {
    id: 'app.Node.parts.ConsentConfirmation.labelConsentedOnBehalf',
    defaultMessage: '{by} gave consent on their behalf {at}',
  },
});
