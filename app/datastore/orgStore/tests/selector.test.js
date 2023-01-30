/**
 * Created by Yang on 31/1/17.
 */
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { fromJS } from 'immutable';
import {
  ORGANISATION_DATA_STORE,
  INVITATION_STORE,
  RECENT,
  STARRED,
} from 'appConstants';
import {
  selectOrgansiation,
  selectOrgDataStore,
  getOrganisationName,
  getOrganisationPhotoUrl,
  getOrganisationAddress,
  getOrganisationPlaceId,
  getOrganisationType,
  getOrganisationWebsite,
  getOrganisationTimezone,
  getOrganisationFormat,
  getOrganisationCountry,
  getOrganisationSchoolGender,
  getOrganisationLocationId,
  getOrganisationPreferenceId,
  getOrganisationDetailsId,
  getRoleMembersIds,
  getRoleMembersPendingIds,
  getMemberFullName,
  getMemberRootNodeId,
  getMemberEmail,
  getMemberRole,
  getMemberCreatedDate,
  getOrganisationLastSeen,
  getActivated,
  getPendingEmail,
  getInviteRole,
  getInviteStatus,
  getOrganisationOwnerId,
  getRoleMembersConfirmedIds,
  ORGANISATION_STORE_SELECTORS,
  getPeopleIds,
  getPendingInvitations,
  getMemberEmailByIds,
  getOrganisationCreatedDate,
  getMemberIdsAndEmail,
  getMemberIdsAndActivated,
  ORGANISATION_SHOOL_SELECTOR,
  getOrganisationReminderAttempts,
  getOrganisationReminderFrequency,
  getOrganisationReminderDisabled,
  getOrganisationPaxLabel,
} from '../selectors';

describe('selectOrgDataStore', () => {
  const dataStoreSelector = selectOrgDataStore();
  it('should select the org Data state', () => {
    const orgDataState = fromJS({});
    const mockedState = fromJS({
      orgDataStore: orgDataState,
    });
    expect(dataStoreSelector(mockedState)).toEqual(orgDataState);
  });
});

describe('selectOrgansiation', () => {
  const orgSelector = selectOrgansiation();
  it('should select the current user', () => {
    const org = fromJS({ id: 1, name: 'orgname', namekey: 'namekey' });
    const mockedState = fromJS({
      orgDataStore: {
        org,
      },
    });
    expect(orgSelector(mockedState)).toEqual(org);
  });
});
describe('organisation', () => {
  it('should return keyPath', () => {
    expect(ORGANISATION_STORE_SELECTORS.organisation({ id: 999 })).toEqual([
      ORGANISATION_DATA_STORE,
      'organisations',
      999,
    ]);
  });
});
describe('getOrganisationName()', () => {
  it('should return keyPath', () => {
    expect(getOrganisationName({ id: 999 })).toEqual([
      ORGANISATION_DATA_STORE,
      'organisations',
      999,
      'name',
    ]);
  });
});
describe('getOrganisationPhotoUrl()', () => {
  it('should return keyPath', () => {
    expect(getOrganisationPhotoUrl({ id: 999 })).toEqual([
      ORGANISATION_DATA_STORE,
      'organisations',
      999,
      'photo',
    ]);
  });
});
describe('knownAs', () => {
  it('should return keyPath', () => {
    expect(ORGANISATION_STORE_SELECTORS.knownAs({ id: 999 })).toEqual([
      ORGANISATION_DATA_STORE,
      'members',
      999,
      'knownAs',
    ]);
  });
});
describe('children', () => {
  it('should return keyPath', () => {
    expect(ORGANISATION_STORE_SELECTORS.children({ id: 999 })).toEqual([
      ORGANISATION_DATA_STORE,
      'organisationTours',
      999,
      'children',
    ]);
  });
});
describe('getPeopleIds', () => {
  it('should return keyPath', () => {
    expect(getPeopleIds({ id: 999 })).toEqual([
      ORGANISATION_DATA_STORE,
      'organisations',
      999,
      'people',
    ]);
  });
});
describe('getPendingInvitations', () => {
  it('should return keyPath', () => {
    expect(getPendingInvitations({ id: 999 })).toEqual([
      ORGANISATION_DATA_STORE,
      'organisations',
      999,
      'pendingInvitations',
    ]);
  });
});
describe('hasPersonDetail', () => {
  it('should return keyPath', () => {
    expect(ORGANISATION_STORE_SELECTORS.hasPersonDetail({ id: 999 })).toEqual([
      ORGANISATION_DATA_STORE,
      'members',
      999,
      'hasPersonDetail',
    ]);
  });
});
describe('getOrgMember', () => {
  it('should return keyPath', () => {
    expect(ORGANISATION_STORE_SELECTORS.getOrgMember({ id: 999 })).toEqual([
      ORGANISATION_DATA_STORE,
      'members',
      999,
    ]);
  });
});
describe('getOrganisationLocationId()', () => {
  it('should return keyPath', () => {
    expect(getOrganisationLocationId({ id: 999 })).toEqual([
      ORGANISATION_DATA_STORE,
      'organisations',
      999,
      'location',
    ]);
  });
});
describe('getOrganisationPreferenceId()', () => {
  it('should return keyPath', () => {
    expect(getOrganisationPreferenceId({ id: 999 })).toEqual([
      ORGANISATION_DATA_STORE,
      'organisations',
      999,
      'preference',
    ]);
  });
});
describe('getOrganisationDetailsId()', () => {
  it('should return keyPath', () => {
    expect(getOrganisationDetailsId({ id: 999 })).toEqual([
      ORGANISATION_DATA_STORE,
      'organisations',
      999,
      'details',
    ]);
  });
});
describe('getOrganisationAddress()', () => {
  it('should return keyPath', () => {
    expect(getOrganisationAddress({ id: 999 })).toEqual([
      ORGANISATION_DATA_STORE,
      'locations',
      999,
      'address',
    ]);
  });
});
describe('getOrganisationPlaceId()', () => {
  it('should return keyPath', () => {
    expect(getOrganisationPlaceId({ id: 999 })).toEqual([
      ORGANISATION_DATA_STORE,
      'locations',
      999,
      'placeId',
    ]);
  });
});
describe('getOrganisationType()', () => {
  it('should return keyPath', () => {
    expect(getOrganisationType({ id: 999 })).toEqual([
      ORGANISATION_DATA_STORE,
      'organisations',
      999,
      'type',
    ]);
  });
});
describe('getOrganisationWebsite()', () => {
  it('should return keyPath', () => {
    expect(getOrganisationWebsite({ id: 999 })).toEqual([
      ORGANISATION_DATA_STORE,
      'organisations',
      999,
      'website',
    ]);
  });
});
describe('orgCountry', () => {
  it('should exist', () => {
    expect(ORGANISATION_STORE_SELECTORS.orgCountry({ id: 999 })).toEqual([
      ORGANISATION_DATA_STORE,
      'organisations',
      999,
      'country',
    ]);
  });
});
describe('orgInfoCountry', () => {
  it('should exist', () => {
    expect(ORGANISATION_STORE_SELECTORS.orgInfoCountry).toEqual([
      ORGANISATION_DATA_STORE,
      'orgInfo',
      'country',
    ]);
  });
});
describe('getOrganisationTimezone()', () => {
  it('should return keyPath', () => {
    expect(getOrganisationTimezone({ id: 999 })).toEqual([
      ORGANISATION_DATA_STORE,
      'preferences',
      999,
      'timezone',
    ]);
  });
});
describe('getOrganisationReminderFrequency', () => {
  it('should return keyPath', () => {
    expect(getOrganisationReminderFrequency({ id: 1 })).toEqual([
      ORGANISATION_DATA_STORE,
      'preferences',
      1,
      'reminderFrequencyDays',
    ]);
  });
});
describe('getOrganisationReminderAttempts', () => {
  it('should return keyPath', () => {
    expect(getOrganisationReminderAttempts({ id: 1 })).toEqual([
      ORGANISATION_DATA_STORE,
      'preferences',
      1,
      'reminderAttempts',
    ]);
  });
});
describe('getOrganisationReminderDisabled', () => {
  it('should return keyPath', () => {
    expect(getOrganisationReminderDisabled({ id: 1 })).toEqual([
      ORGANISATION_DATA_STORE,
      'preferences',
      1,
      'reminderDisabled',
    ]);
  });
});
describe('getOrganisationFormat()', () => {
  it('should return keyPath', () => {
    expect(getOrganisationFormat({ id: 999 })).toEqual([
      ORGANISATION_DATA_STORE,
      'preferences',
      999,
      'format',
    ]);
  });
});
describe('getOrganisationCountry()', () => {
  it('should return keyPath', () => {
    expect(getOrganisationCountry({ id: 999 })).toEqual([
      ORGANISATION_DATA_STORE,
      'preferences',
      999,
      'country',
    ]);
  });
});
describe('getOrganisationSchoolGender()', () => {
  it('should return keyPath', () => {
    expect(getOrganisationSchoolGender({ id: 999 })).toEqual([
      ORGANISATION_DATA_STORE,
      'details',
      999,
      'type',
    ]);
  });
});
describe('getRoleMembersIds()', () => {
  it('should return keyPath', () => {
    expect(getRoleMembersIds({ id: 999 })).toEqual([
      ORGANISATION_DATA_STORE,
      'roles',
      999,
      'confirmed',
    ]);
  });
});
describe('getRoleMembersPendingIds()', () => {
  it('should return keyPath', () => {
    expect(getRoleMembersPendingIds({ id: 999 })).toEqual([
      ORGANISATION_DATA_STORE,
      'shares',
      999,
      'pending',
    ]);
  });
});
describe('getMemberFullName()', () => {
  it('should return keyPath', () => {
    expect(getMemberFullName({ id: 999 })).toEqual([
      ORGANISATION_DATA_STORE,
      'members',
      999,
      'fullName',
    ]);
  });
});
describe('getMemberRootNodeId()', () => {
  it('should return keyPath', () => {
    expect(getMemberRootNodeId({ id: 999 })).toEqual([
      ORGANISATION_DATA_STORE,
      'members',
      999,
      'rootNodeId',
    ]);
  });
});
describe('getMemberEmail()', () => {
  it('should return keyPath', () => {
    expect(getMemberEmail({ id: 999 })).toEqual([
      ORGANISATION_DATA_STORE,
      'members',
      999,
      'email',
    ]);
  });
});
describe('getMemberRole()', () => {
  it('should return keyPath', () => {
    expect(getMemberRole({ id: 999 })).toEqual([
      ORGANISATION_DATA_STORE,
      'members',
      999,
      'role',
    ]);
  });
});
describe('getMemberCreatedDate()', () => {
  it('should return keyPath', () => {
    expect(getMemberCreatedDate({ id: 999 })).toEqual([
      ORGANISATION_DATA_STORE,
      'members',
      999,
      'createdAt',
    ]);
  });
});
describe('getActivated', () => {
  it('should return a particular shape of object', () => {
    const activated = getActivated;
    expect(activated.keyPath({ id: 1 })).toMatchSnapshot();
    expect(activated.getter(true)).toMatchSnapshot();
    expect(activated.getter(null)).toMatchSnapshot();
  });
});
describe('getPendingEmail()', () => {
  it('should return keyPath', () => {
    expect(getPendingEmail({ id: 999 })).toEqual([
      INVITATION_STORE,
      'organisationShares',
      999,
      'email',
    ]);
  });
});
describe('getInviteStatus()', () => {
  it('should return keyPath', () => {
    expect(getInviteStatus({ id: 999 })).toEqual([
      INVITATION_STORE,
      'organisationShares',
      999,
      'status',
    ]);
  });
});
describe('getInviteRole()', () => {
  it('should return keyPath', () => {
    expect(getInviteRole({ id: 999 })).toEqual([
      INVITATION_STORE,
      'organisationShares',
      999,
      'role',
    ]);
  });
});
describe('getOrganisationOwnerId()', () => {
  it('should return keyPath', () => {
    expect(getOrganisationOwnerId({ id: 999 })).toEqual([
      ORGANISATION_DATA_STORE,
      'organisations',
      999,
      'createdBy',
    ]);
  });
});
describe('getOrganisationCreatedDate()', () => {
  it('should return keyPath', () => {
    expect(getOrganisationCreatedDate({ id: 999 })).toEqual([
      ORGANISATION_DATA_STORE,
      'organisations',
      999,
      'createdAt',
    ]);
  });
});
describe('getOrganisationLastSeen()', () => {
  it('should return keyPath', () => {
    expect(getOrganisationLastSeen({ id: 999 })).toEqual([
      ORGANISATION_DATA_STORE,
      'members',
      999,
      'lastSeen',
    ]);
  });
});
describe('getRoleMembersConfirmedIds', () => {
  it('should return a particular shape of object', () => {
    const member = getRoleMembersConfirmedIds;
    expect(member.keyPath({ id: 1 })).toMatchSnapshot();
    expect(member.getter(['1'])).toMatchSnapshot();
    expect(member.getter([])).toMatchSnapshot();
  });
});

describe('ORGANISATION_STORE_SELECTORS', () => {
  describe('organisationId()', () => {
    it('should return keyPath', () => {
      expect(ORGANISATION_STORE_SELECTORS.organisationId).toMatchSnapshot();
    });
  });

  describe('organisationIdFromURL()', () => {
    it('should return number', () => {
      expect(
        ORGANISATION_STORE_SELECTORS.organisationIdFromURL({
          location: { pathname: '/orgs/2233' },
        }),
      ).toBe(2233);
    });

    it('should return personal', () => {
      expect(
        ORGANISATION_STORE_SELECTORS.organisationIdFromURL({
          location: { pathname: '/orgs/personal' },
        }),
      ).toBe(-1);
    });
  });

  describe('organisationIdFromMyToursURL()', () => {
    it('should return number', () => {
      expect(
        ORGANISATION_STORE_SELECTORS.organisationIdFromMyToursURL({
          location: { pathname: '/my-tours/2233' },
        }),
      ).toBe(2233);
    });

    it('should return RECENT', () => {
      expect(
        ORGANISATION_STORE_SELECTORS.organisationIdFromMyToursURL({
          location: { pathname: `/my-tours/${RECENT}` },
        }),
      ).toBe(RECENT);
    });

    it('should return STARRED', () => {
      expect(
        ORGANISATION_STORE_SELECTORS.organisationIdFromMyToursURL({
          location: { pathname: `/my-tours/${STARRED}` },
        }),
      ).toBe(STARRED);
    });

    it('should return personal', () => {
      expect(
        ORGANISATION_STORE_SELECTORS.organisationIdFromMyToursURL({
          location: { pathname: '/my-tours/personal' },
        }),
      ).toBe(-1);
    });
  });

  describe('organisationIdFromNode()', () => {
    it('should return organisationId', () => {
      expect(
        ORGANISATION_STORE_SELECTORS.organisationIdFromNode({
          match: { params: { id: 2233 } },
        }),
      ).toEqual(NODE_STORE_SELECTORS.organisationId({ id: 2233 }));
    });
  });

  describe('role()', () => {
    it('should return keyPath', () => {
      expect(ORGANISATION_STORE_SELECTORS.role({ id: 2233 })).toMatchSnapshot();
    });
  });

  describe('rootNodeId()', () => {
    it('should return keyPath', () => {
      expect(ORGANISATION_STORE_SELECTORS.rootNodeId({ id: 999 })).toEqual([
        ORGANISATION_DATA_STORE,
        'organisationNode',
        999,
        'rootNodeId',
      ]);
    });
  });
  describe('getMemberEmailByIds', () => {
    it('should return a particular shape of object', () => {
      const memberEmailIds = getMemberEmailByIds;
      expect(
        memberEmailIds.keyPath({ peopleIds: undefined }),
      ).toMatchSnapshot();
      expect(memberEmailIds.keyPath({ peopleIds: [1] })).toMatchSnapshot();
      expect(memberEmailIds.getter([3])).toMatchSnapshot();
    });
  });
  describe('getMemberIdsAndEmail', () => {
    it('should return a particular shape of object', () => {
      const memberEmailIds = getMemberIdsAndEmail;
      expect(memberEmailIds.keyPath({ roleMemberIds: [1] })).toMatchSnapshot();
      expect(memberEmailIds.keyPath({})).toMatchSnapshot();
      expect(memberEmailIds.props({ roleMemberIds: [1] })).toMatchSnapshot();
      expect(memberEmailIds.getter([3])).toMatchSnapshot();
      expect(memberEmailIds.getter(null)).toMatchSnapshot();
    });
  });
  describe('connectedMembersUserId', () => {
    it('should return user id', () => {
      expect(
        ORGANISATION_STORE_SELECTORS.connectedMembersUserId({ id: 999 }),
      ).toEqual([ORGANISATION_DATA_STORE, 'connectedMembers', 999, 'userId']);
    });
  });
  describe('connectedMembersRole', () => {
    it('should return role', () => {
      expect(
        ORGANISATION_STORE_SELECTORS.connectedMembersRole({ id: 999 }),
      ).toEqual([ORGANISATION_DATA_STORE, 'connectedMembers', 999, 'role']);
    });
  });
  describe('connectedMembersProp', () => {
    it('keypath', () => {
      expect(
        ORGANISATION_STORE_SELECTORS.connectedMembersProp({
          id: 'ids',
          keyProp: 'role',
        }).keyPath({ ids: [1, 2] }),
      ).toEqual(['organisationDataStore', 'connectedMembers', [1, 2], 'role']);
    });
    it('getter', () => {
      expect(
        ORGANISATION_STORE_SELECTORS.connectedMembersProp({
          id: 'ids',
          keyProp: 'role',
        }).getter({ ids: [1, 2] }),
      ).toEqual({ ids: [1, 2] });
    });
  });
  describe('connectedMembers', () => {
    it('keypath', () => {
      expect(
        ORGANISATION_STORE_SELECTORS.connectedMembers({
          id: 'ids',
        }).keyPath({ ids: [1, 2] }),
      ).toEqual([
        'organisationDataStore',
        'organisations',
        [1, 2],
        'connected',
      ]);
    });
    it('getter', () => {
      expect(
        ORGANISATION_STORE_SELECTORS.connectedMembers({
          id: 'ids',
        }).getter({ ids: [1, 2] }),
      ).toEqual({ ids: [1, 2] });
    });
  });
  describe('getConnectedIdByUserId', () => {
    it('keypath', () => {
      expect(
        ORGANISATION_STORE_SELECTORS.getConnectedIdByUserId({
          user: 'userId',
        }).keyPath({ ids: [1] }),
      ).toEqual([['organisationDataStore', 'connectedMembers', 1, 'userId']]);
      expect(
        ORGANISATION_STORE_SELECTORS.getConnectedIdByUserId({
          user: 'userId',
        }).keyPath({}),
      ).toEqual([]);
    });
    it('cacheKey', () => {
      expect(
        ORGANISATION_STORE_SELECTORS.getConnectedIdByUserId({
          user: 'userId',
        }).cacheKey({ ids: [1] }),
      ).toEqual('id.connectedId.1.userId');
    });
    it('props', () => {
      expect(
        ORGANISATION_STORE_SELECTORS.getConnectedIdByUserId({
          user: 'userId',
        }).props({ ids: [1], userId: 1 }),
      ).toEqual({ ids: [1], userId: 1 });
    });
    it('getter', () => {
      ORGANISATION_STORE_SELECTORS.getConnectedIdByUserId({
        id: 'ids',
      }).getter([1, 2, 3], [1], [2]);
    });
  });
  describe('getMemberIdsAndActivated', () => {
    it('should return a particular shape of object', () => {
      const memberEmailIds = getMemberIdsAndActivated;
      expect(memberEmailIds.keyPath({ roleMemberIds: [1] })).toMatchSnapshot();
      expect(memberEmailIds.keyPath({})).toMatchSnapshot();
      expect(memberEmailIds.props({ roleMemberIds: [1] })).toMatchSnapshot();
      expect(memberEmailIds.getter([3])).toMatchSnapshot();
      expect(memberEmailIds.getter(null)).toMatchSnapshot();
    });
  });
  describe('ORGANISATION_SHOOL_SELECTOR()', () => {
    it('schooltype', () => {
      expect(ORGANISATION_SHOOL_SELECTOR.schoolType({ id: 999 })).toEqual([
        ORGANISATION_DATA_STORE,
        'details',
        999,
        'schooltype',
      ]);
    });
    it('abn', () => {
      expect(ORGANISATION_SHOOL_SELECTOR.abn({ id: 999 })).toEqual([
        ORGANISATION_DATA_STORE,
        'details',
        999,
        'abn',
      ]);
    });
    it('abn', () => {
      expect(ORGANISATION_SHOOL_SELECTOR.abn({ id: 999 })).toEqual([
        ORGANISATION_DATA_STORE,
        'details',
        999,
        'abn',
      ]);
    });
    it('acn', () => {
      expect(ORGANISATION_SHOOL_SELECTOR.acn({ id: 999 })).toEqual([
        ORGANISATION_DATA_STORE,
        'details',
        999,
        'acn',
      ]);
    });
    it('doe', () => {
      expect(ORGANISATION_SHOOL_SELECTOR.doe({ id: 999 })).toEqual([
        ORGANISATION_DATA_STORE,
        'details',
        999,
        'doe',
      ]);
    });
    it('registration number', () => {
      expect(ORGANISATION_SHOOL_SELECTOR.registration({ id: 999 })).toEqual([
        ORGANISATION_DATA_STORE,
        'details',
        999,
        'registration',
      ]);
    });
    it('startTime', () => {
      expect(ORGANISATION_SHOOL_SELECTOR.startTime({ id: 999 })).toEqual([
        ORGANISATION_DATA_STORE,
        'details',
        999,
        'starttime',
      ]);
    });
    it('endTime', () => {
      expect(ORGANISATION_SHOOL_SELECTOR.endTime({ id: 999 })).toEqual([
        ORGANISATION_DATA_STORE,
        'details',
        999,
        'endtime',
      ]);
    });
  });
  describe('intercomDetails', () => {
    it('should return a particular shape of object', () => {
      expect(
        typeof ORGANISATION_STORE_SELECTORS.intercomDetails({
          ids: 'ids',
          propName: 'orgName',
          fn: jest.fn(() => true),
        }),
      ).toBe('object');
    });
    it('should return a particular shape of object', () => {
      expect(
        typeof ORGANISATION_STORE_SELECTORS.intercomDetails({
          fn: jest.fn(() => true),
        }),
      ).toBe('object');
    });
    it('should return a particular shape of object', () => {
      expect(typeof ORGANISATION_STORE_SELECTORS.intercomDetails()).toBe(
        'object',
      );
    });
    it('keyPath', () => {
      expect(
        ORGANISATION_STORE_SELECTORS.intercomDetails({
          ids: 'ids',
          propName: 'orgName',
          fn: jest.fn(() => true),
        }).keyPath({ ids: [1, 2] }),
      ).toEqual([true, true]);
    });
    it('cacheKey', () => {
      expect(
        ORGANISATION_STORE_SELECTORS.intercomDetails({
          ids: 'ids',
          propName: 'orgName',
          fn: jest.fn(() => true),
        }).cacheKey({ ids: [1, 2] }),
      ).toEqual('list.intercomOrg.1,2.orgName');
    });
    it('getter', () => {
      expect(
        ORGANISATION_STORE_SELECTORS.intercomDetails({
          ids: 'ids',
          propName: 'orgName',
          fn: jest.fn(() => true),
        }).getter([1, 2]),
      ).toEqual('');
    });
  });
  describe('getOrganisationPaxLabel()', () => {
    it('should return keyPath', () => {
      expect(getOrganisationPaxLabel({ id: 999 })).toEqual([
        ORGANISATION_DATA_STORE,
        'preferences',
        999,
        'paxLabel',
      ]);
    });
  });
});
