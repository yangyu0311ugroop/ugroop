import { ABILITY_DATA_STORE } from 'appConstants';

export const CONFIG = {
  value: {
    tour: ({ nodeId }) => [ABILITY_DATA_STORE, 'tours', nodeId],
    organisation: ({ orgId }) => [ABILITY_DATA_STORE, 'organisation', orgId],
    executeAbilityUpdate: [ABILITY_DATA_STORE, 'executeAbilityUpdate'],
  },
  setValue: {
    abilityUpdated: [ABILITY_DATA_STORE, 'abilityUpdated'],
    executeAbilityUpdate: [ABILITY_DATA_STORE, 'executeAbilityUpdate'],
  },
};
