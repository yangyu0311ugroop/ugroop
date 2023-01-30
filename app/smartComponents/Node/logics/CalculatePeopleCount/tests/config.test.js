import {
  TOUR_CONTRIBUTOR_ROLE,
  TOUR_CONTRIBUTOR_ROLE_TYPES,
} from 'apis/components/Ability/roles';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { INVITATION_STORE_SELECTORS } from 'datastore/invitationStore/selectors';
import { USER_STORE_SELECTORS } from 'datastore/userStore/selectors';
import { UID_HELPERS } from 'utils/helpers/uid';
import { TOUR_ORGANIZER } from 'utils/modelConstants';
import { CONFIG_0, CONFIG, CONFIG_2, CONFIG_3, GET_ROLES } from '../config';

describe('CalculatePeopleCount/CONFIG_0', () => {
  afterEach(() => jest.clearAllMocks());

  describe('Smoke Test', () => {
    it('should exists', () => {
      expect(typeof CONFIG_0).toBe('object');
    });
  });

  describe('value', () => {
    it('should exists', () => {
      expect(typeof CONFIG_0.value).toBe('object');
    });
  });
});

describe('GET_ROLES', () => {
  afterEach(() => jest.clearAllMocks());

  describe('Smoke Test', () => {
    it('should exists', () => {
      expect(typeof GET_ROLES).toBe('object');
    });
  });

  describe('value', () => {
    it('should exists', () => {
      expect(typeof GET_ROLES.value).toBe('object');
    });

    describe('roles', () => {
      describe('getter', () => {
        it('should return contributor role types if role is organizer or owner', () => {
          const roles = [TOUR_ORGANIZER];

          expect(GET_ROLES.value.roles.getter({ roles })).toEqual(
            TOUR_CONTRIBUTOR_ROLE_TYPES,
          );
        });

        it('should return organiser only if not organiser or owner', () => {
          const roles = [];

          expect(GET_ROLES.value.roles.getter({ roles })).toEqual([
            TOUR_CONTRIBUTOR_ROLE.TOUR_ORGANIZER,
            TOUR_CONTRIBUTOR_ROLE.TOUR_OWNER,
          ]);
        });

        it('should not explode', () => {
          const roles = undefined;

          expect(GET_ROLES.value.roles.getter({ roles })).toEqual([
            TOUR_CONTRIBUTOR_ROLE.TOUR_ORGANIZER,
            TOUR_CONTRIBUTOR_ROLE.TOUR_OWNER,
          ]);
        });
      });
    });
  });
});

describe('CalculatePeopleCount/config.js', () => {
  afterEach(() => jest.clearAllMocks());

  describe('Smoke Test', () => {
    it('should exists', () => {
      expect(typeof CONFIG).toBe('object');
    });
  });

  describe('value', () => {
    it('should exists', () => {
      expect(typeof CONFIG.value).toBe('object');
    });

    describe('followersEmail', () => {
      describe('keyPath', () => {
        it('should return selectors', () => {
          expect(
            CONFIG.value.followersEmail.keyPath({ followers: [1, 2] }),
          ).toEqual([
            NODE_STORE_SELECTORS.email({ id: 1 }),
            NODE_STORE_SELECTORS.email({ id: 2 }),
          ]);
        });

        it('should not explode', () => {
          expect(CONFIG.value.followersEmail.keyPath({})).toEqual([]);
        });
      });

      describe('cacheKey', () => {
        it('should return a particular cache key', () => {
          expect(
            CONFIG.value.followersEmail.cacheKey({ followers: [1] }),
          ).toEqual(`CalculatePeopleCount.1.followersCount`);
        });

        it('should not explode', () => {
          expect(CONFIG.value.followersEmail.cacheKey({})).toEqual(
            `CalculatePeopleCount..followersCount`,
          );
        });
      });

      describe('props', () => {
        it('should return followers', () => {
          expect(CONFIG.value.followersEmail.props({ followers: [1] })).toEqual(
            [1],
          );
        });
      });

      describe('getter', () => {
        it('should follower emails', () => {
          const args = [1, 2];

          expect(CONFIG.value.followersEmail.getter(...args)).toEqual([1]);
        });
      });
    });

    describe('participantEmails', () => {
      describe('keyPath', () => {
        it('should return selectors', () => {
          expect(
            CONFIG.value.participantEmails.keyPath({ participants: [1, 2] }),
          ).toEqual([
            NODE_STORE_SELECTORS.email({ id: 1 }),
            NODE_STORE_SELECTORS.email({ id: 2 }),
          ]);
        });

        it('should not explode', () => {
          expect(CONFIG.value.participantEmails.keyPath({})).toEqual([]);
        });
      });

      describe('cacheKey', () => {
        it('should return a particular cache key', () => {
          expect(
            CONFIG.value.participantEmails.cacheKey({ participants: [1] }),
          ).toEqual(`CalculatePeopleCount.1.participantsCount`);
        });

        it('should not explode', () => {
          expect(CONFIG.value.participantEmails.cacheKey({})).toEqual(
            `CalculatePeopleCount..participantsCount`,
          );
        });
      });

      describe('props', () => {
        it('should return followers', () => {
          expect(
            CONFIG.value.participantEmails.props({ participants: [1] }),
          ).toEqual([1]);
        });
      });

      describe('getter', () => {
        it('should follower emails', () => {
          const args = [1, 2];

          expect(CONFIG.value.participantEmails.getter(...args)).toEqual([1]);
        });
      });
    });

    describe('organiserUserIds', () => {
      describe('keyPath', () => {
        it('should return selectors', () => {
          expect(
            CONFIG.value.organiserUserIds.keyPath({ userNodeIds: [1, 2] }),
          ).toEqual([
            INVITATION_STORE_SELECTORS.userNodeUserId({ id: 1 }),
            INVITATION_STORE_SELECTORS.userNodeUserId({ id: 2 }),
          ]);
        });

        it('should not explode', () => {
          expect(CONFIG.value.organiserUserIds.keyPath({})).toEqual([]);
        });
      });

      describe('cacheKey', () => {
        it('should return a particular cache key', () => {
          expect(
            CONFIG.value.organiserUserIds.cacheKey({ userNodeIds: [1] }),
          ).toEqual(`CalculatePeopleCount.1.organiserUserIds`);
        });

        it('should not explode', () => {
          expect(CONFIG.value.organiserUserIds.cacheKey({})).toEqual(
            `CalculatePeopleCount..organiserUserIds`,
          );
        });
      });

      describe('props', () => {
        it('should return followers', () => {
          expect(
            CONFIG.value.organiserUserIds.props({ userNodeIds: [1] }),
          ).toEqual([1]);
        });
      });

      describe('getter', () => {
        it('should follower emails', () => {
          const args = [1, 2];

          expect(CONFIG.value.organiserUserIds.getter(...args)).toEqual([1]);
        });
      });
    });
  });
});

describe('CalculatePeopleCount/CONFIG_2', () => {
  afterEach(() => jest.clearAllMocks());

  describe('Smoke Test', () => {
    it('should exists', () => {
      expect(typeof CONFIG_2).toBe('object');
    });
  });

  describe('value', () => {
    const organiserUserIds = [1, 2];
    it('should exists', () => {
      expect(typeof CONFIG_2.value).toBe('object');
    });

    describe('organiserEmails', () => {
      describe('keyPath', () => {
        it('should match keypath', () => {
          expect(
            CONFIG_2.value.organiserEmails.keyPath({ organiserUserIds }),
          ).toEqual([
            USER_STORE_SELECTORS.email({ id: 1 }),
            USER_STORE_SELECTORS.email({ id: 2 }),
          ]);
        });

        it('should not explode', () => {
          expect(CONFIG_2.value.organiserEmails.keyPath({})).toEqual([]);
        });
      });

      describe('cacheKey', () => {
        it('should match cachekey', () => {
          expect(
            CONFIG_2.value.organiserEmails.cacheKey({ organiserUserIds }),
          ).toEqual('CalculatePeopleCount.1,2.organiserEmails');
        });

        it('should not explode', () => {
          expect(CONFIG_2.value.organiserEmails.cacheKey({})).toEqual(
            'CalculatePeopleCount..organiserEmails',
          );
        });
      });

      describe('props', () => {
        it('should return organiserUserIds', () => {
          expect(
            CONFIG_2.value.organiserEmails.props({ organiserUserIds }),
          ).toEqual(organiserUserIds);
        });
      });

      describe('getter', () => {
        it('should return organiser emails', () => {
          expect(CONFIG_2.value.organiserEmails.getter(1, 2, 3)).toEqual([
            1,
            2,
          ]);
        });
      });
    });
  });
});

describe('CalculatePeopleCount/CONFIG_3', () => {
  afterEach(() => jest.clearAllMocks());

  describe('Smoke Test', () => {
    it('should exists', () => {
      expect(typeof CONFIG_3).toBe('object');
    });
  });

  describe('setValue', () => {
    it('should exists', () => {
      expect(typeof CONFIG_3.setValue).toBe('object');
    });
  });

  describe('value', () => {
    const props = {
      followers: [1],
      userNodeIds: [2],
      participants: [3],
      organiserEmails: ['aa@gg.com', ''],
      participantEmails: ['', 'bb@gg.com', 'cc@gg.com'],
      followersEmail: ['', 'cc@gg.com', 'dd@gg.com'],
      ownerEmail: 'ee@gg.com',
    };
    it('should exists', () => {
      expect(typeof CONFIG_3.value).toBe('object');
    });

    describe('mergedUserEmails', () => {
      describe('cacheKey', () => {
        it('should use followers, userNodeIds and participants for cacheKey', () => {
          expect(CONFIG_3.value.mergedUserEmails.cacheKey(props)).toEqual(
            `CalculatePeopleCount.${props.followers.toString()}.${props.userNodeIds.toString()}.${props.participants.toString()}.mergedUserEmails`,
          );
        });

        it('should not explode', () => {
          expect(CONFIG_3.value.mergedUserEmails.cacheKey({})).toEqual(
            `CalculatePeopleCount....mergedUserEmails`,
          );
        });
      });

      describe('getter', () => {
        let count = 0;
        UID_HELPERS.generateUID = jest.fn(() => {
          count += 1;
          return `123123-123123${count}`;
        });
        it('should return merged emails', () => {
          expect(
            CONFIG_3.value.mergedUserEmails.getter(props),
          ).toMatchSnapshot();
        });

        it('should not explode', () => {
          expect(CONFIG_3.value.mergedUserEmails.getter({})).toMatchSnapshot();
        });
      });
    });
  });
});
