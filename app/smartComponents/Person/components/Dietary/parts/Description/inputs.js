import { DIETARY_PATHS } from 'datastore/personDataStore/constants';
import { PERSON_STORE_HELPERS } from 'datastore/personDataStore/helpers';

export default {
  textField: {
    name: PERSON_STORE_HELPERS.pathToDietaryInputName(
      DIETARY_PATHS.description,
    ),
    placeholder: 'Enter description',
    required: true,
    autoFocus: true,
  },
};
