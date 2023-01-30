import { TOUR_CONTRIBUTOR_ROLE } from 'apis/components/Ability/roles';
import { INVITATION_STORE } from 'appConstants';
import { fromJS } from 'immutable';
import { INVITATION_STORE_RESELECTORS } from '../selectorsViaConnect';

describe('INVITATION_STORE_RESELECTORS', () => {
  const userNodes = {
    1: { id: 1, userId: 1, role: TOUR_CONTRIBUTOR_ROLE.TOUR_COLLABORATOR },
    2: { id: 2, userId: 2, role: TOUR_CONTRIBUTOR_ROLE.TOUR_ORGANIZER },
    3: { id: 3, userId: 3, role: TOUR_CONTRIBUTOR_ROLE.TOUR_ORGANIZER },
  };
  const userNodeIds = [1, 2, 3];
  const invitationStore = fromJS({
    [INVITATION_STORE]: {
      userNodeIds: [],
      userNodes: {},
    },
  })
    .setIn([INVITATION_STORE, 'userNodes'], userNodes)
    .setIn([INVITATION_STORE, 'userNodeIds'], userNodeIds);

  describe('getTourOrganisersUserIds', () => {
    it('should get user id of all organisers in tour', () => {
      const organiserIds = INVITATION_STORE_RESELECTORS.getTourOrganisersUserIds(
        invitationStore,
      );

      expect(organiserIds).toEqual([2, 3]);
    });

    it('should not throw error if userNodeIds is undefined', () => {
      const organiserIds = INVITATION_STORE_RESELECTORS.getTourOrganisersUserIds(
        invitationStore.setIn([INVITATION_STORE, 'userNodeIds'], undefined),
      );

      expect(organiserIds).toEqual([]);
    });
  });
});
