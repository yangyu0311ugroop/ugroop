import { USER_DATA_STORE, SHARED_TEMPLATES_DATASTORE } from 'appConstants';
import get from 'lodash/get';

export const CONFIG = {
  value: {
    persons: props => {
      if (props.dataStore === SHARED_TEMPLATES_DATASTORE)
        return [props.dataStore, 'children', props.id, 'people'];
      return [props.dataStore, 'nodes', props.id, 'people'];
    },
    firstPersonName: {
      keyPath: [
        props => {
          if (props.dataStore === SHARED_TEMPLATES_DATASTORE)
            return [props.dataStore, 'children', props.id, 'people'];
          return [props.dataStore, 'nodes', props.id, 'people'];
        },
        () => [USER_DATA_STORE, 'people'],
      ],
      getter: (peopleIds, people) => {
        if (!peopleIds) {
          return { firstPersonName: '', secondPersonName: '' };
        }
        const firstPersonName = get(people, `${peopleIds[0]}.knownAs`, '');
        const secondPersonName = get(people, `${peopleIds[1]}.knownAs`, '');
        return { firstPersonName, secondPersonName };
      },
      spreadObject: true,
    },
  },
  setValue: {},
};
