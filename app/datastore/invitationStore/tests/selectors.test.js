import { TOUR_CONTRIBUTOR_ROLE_TYPES } from 'apis/components/Ability/roles';
import { INVITATION_STORE_CACHE_KEYS } from 'datastore/invitationStore/cacheKey';
import { INVITATION_STORE_UTILS } from 'datastore/invitationStore/utils';
import { INVITATION_STORE } from 'appConstants';
import {
  INVITATION_STORE_SELECTORS,
  INVITATION_VIEW_STORE_SELECTORS,
} from '../selectors';

describe('INVITATION selectors', () => {
  describe('INVITATION_VIEW_STORE_SELECTORS', () => {
    describe('show()', () => {
      it('should return keyPath', () => {
        expect(
          INVITATION_VIEW_STORE_SELECTORS.show({ viewStore: 'someStore' }),
        ).toEqual(['someStore', 'show']);
      });
    });

    describe('showCompleted()', () => {
      it('should return keyPath', () => {
        expect(
          INVITATION_VIEW_STORE_SELECTORS.showCompleted({
            viewStore: 'someStore',
          }),
        ).toEqual(['someStore', 'showCompleted']);
      });
    });
  });

  describe('INVITATION_STORE_SELECTORS', () => {
    describe('#filterSharesByShareToUserId', () => {
      let filterSharesByShareToUserId;

      beforeEach(() => {
        INVITATION_STORE_CACHE_KEYS.filterSharesByShareToUserId = jest.fn(
          (...args) => ['filterSharesByShareToUserId', ...args],
        );
        filterSharesByShareToUserId = INVITATION_STORE_SELECTORS.filterSharesByShareToUserId();
      });

      it('returns correct keyPath', () => {
        const props = { ids: [1, 2] };
        expect(filterSharesByShareToUserId.keyPath(props)).toEqual(
          props.ids.map(id =>
            INVITATION_STORE_SELECTORS.shareShareToUserId({ id }),
          ),
        );
      });

      it('returns correct cacheKey', () => {
        const obj = { ids: 'ids', shareToUserIds: 'shareToUserIds' };
        expect(filterSharesByShareToUserId.cacheKey).toEqual(
          INVITATION_STORE_CACHE_KEYS.filterSharesByShareToUserId(obj),
        );
      });

      it('returns correct props', () => {
        const props = { ids: 'ids', shareToUserIds: 'shareToUserIds' };
        expect(
          filterSharesByShareToUserId.props.map(func => func(props)),
        ).toEqual([[props.ids], [props.shareToUserIds]]);
      });

      it('getter calls reducer', () => {
        const selectedShareToUserIds = [1];
        const id = 1;
        const shareToUserIds = 2;
        INVITATION_STORE_UTILS.filterSharesByShareToUserIdReducer = jest.fn(
          () => () => 1,
        );
        expect(
          filterSharesByShareToUserId.getter(
            ...selectedShareToUserIds,
            id,
            shareToUserIds,
          ),
        ).toEqual(
          INVITATION_STORE_UTILS.filterSharesByShareToUserIdReducer()(),
        );
      });
    });

    describe('#filterSharesByNodeId', () => {
      let filterSharesByNodeId;

      beforeEach(() => {
        INVITATION_STORE_CACHE_KEYS.filterSharesByNodeId = jest.fn(
          (...args) => ['filterSharesByNodeId', ...args],
        );
        filterSharesByNodeId = INVITATION_STORE_SELECTORS.filterSharesByNodeId();
      });

      it('returns correct keyPath', () => {
        const props = { ids: [1, 2] };
        expect(filterSharesByNodeId.keyPath(props)).toEqual(
          props.ids.map(id => INVITATION_STORE_SELECTORS.shareNodeId({ id })),
        );
      });

      it('returns correct cacheKey', () => {
        const obj = { ids: 'ids', nodeIds: 'nodeIds' };
        expect(filterSharesByNodeId.cacheKey).toEqual(
          INVITATION_STORE_CACHE_KEYS.filterSharesByNodeId(obj),
        );
      });

      it('returns correct props', () => {
        const props = { ids: 'ids', nodeIds: 'nodeIds' };
        expect(filterSharesByNodeId.props.map(func => func(props))).toEqual([
          [props.ids],
          [props.nodeIds],
        ]);
      });

      it('getter calls reducer', () => {
        const selectedShareToUserIds = [1];
        const id = 1;
        const nodeIds = 2;
        INVITATION_STORE_UTILS.filterSharesByNodeIdReducer = jest.fn(() => () =>
          1,
        );
        expect(
          filterSharesByNodeId.getter(...selectedShareToUserIds, id, nodeIds),
        ).toEqual(INVITATION_STORE_UTILS.filterSharesByNodeIdReducer()());
      });
    });

    describe('#filterSharesByRole', () => {
      let filterSharesByRole;

      beforeEach(() => {
        INVITATION_STORE_CACHE_KEYS.filterSharesByRole = jest.fn((...args) => [
          'filterSharesByRole',
          ...args,
        ]);
        filterSharesByRole = INVITATION_STORE_SELECTORS.filterSharesByRole();
      });

      it('returns correct keyPath', () => {
        const props = { ids: [1, 2] };
        expect(filterSharesByRole.keyPath(props)).toEqual(
          props.ids.map(id => INVITATION_STORE_SELECTORS.shareRole({ id })),
        );
      });

      it('returns correct cacheKey', () => {
        const obj = { ids: 'ids' };
        expect(filterSharesByRole.cacheKey).toEqual(
          INVITATION_STORE_CACHE_KEYS.filterSharesByRole(obj),
        );
      });

      it('returns correct props', () => {
        const props = { ids: 'ids', roles: ['roles'] };
        expect(filterSharesByRole.props.map(func => func(props))).toEqual([
          [props.ids],
          props.roles,
        ]);
      });

      it('returns correct props if roles is not existing', () => {
        const props = { ids: 'ids' };
        expect(filterSharesByRole.props.map(func => func(props))).toEqual([
          [props.ids],
          TOUR_CONTRIBUTOR_ROLE_TYPES,
        ]);
      });

      it('getter calls reducer', () => {
        const selectedShareToUserIds = [1];
        const id = 1;
        const roles = [2];
        INVITATION_STORE_UTILS.filterSharesByRolesReducer = jest.fn(() => () =>
          1,
        );
        expect(
          filterSharesByRole.getter(...selectedShareToUserIds, id, roles),
        ).toEqual(INVITATION_STORE_UTILS.filterSharesByRolesReducer()());
      });

      it('getter should return empty array if rolesValue is not array', () => {
        const selectedShareToUserIds = [1];
        const id = 1;
        const roles = null;
        INVITATION_STORE_UTILS.filterSharesByRolesReducer = jest.fn(() => () =>
          1,
        );
        expect(
          filterSharesByRole.getter(...selectedShareToUserIds, id, roles),
        ).toEqual([]);
      });
    });

    describe('#filterSharesByStatus', () => {
      let filterSharesByStatus;

      beforeEach(() => {
        INVITATION_STORE_CACHE_KEYS.filterSharesByStatus = jest.fn(
          (...args) => ['filterSharesByStatus', ...args],
        );
        filterSharesByStatus = INVITATION_STORE_SELECTORS.filterSharesByStatus();
      });

      it('returns correct keyPath', () => {
        const props = { ids: [1, 2] };
        expect(filterSharesByStatus.keyPath(props)).toEqual(
          props.ids.map(id => INVITATION_STORE_SELECTORS.shareStatus({ id })),
        );
      });

      it('returns correct cacheKey', () => {
        const obj = { ids: 'ids' };
        expect(filterSharesByStatus.cacheKey).toEqual(
          INVITATION_STORE_CACHE_KEYS.filterSharesByStatus(obj),
        );
      });

      it('returns correct props', () => {
        const props = { ids: 'ids' };
        expect(filterSharesByStatus.props.map(func => func(props))).toEqual([
          [props.ids],
        ]);
      });

      it('getter calls reducer', () => {
        const selectedShareToUserIds = [1];
        const id = 1;
        const statuses = 2;
        INVITATION_STORE_UTILS.filterSharesByStatusesReducer = jest.fn(
          () => () => 1,
        );
        expect(
          filterSharesByStatus.getter(...selectedShareToUserIds, id, statuses),
        ).toEqual(INVITATION_STORE_UTILS.filterSharesByStatusesReducer()());
      });
    });

    describe('shareProp()', () => {
      it('should return keyPath', () => {
        const props = { id: 'id', path: 'path' };
        expect(INVITATION_STORE_SELECTORS.shareProp(props)).toEqual([
          ...INVITATION_STORE_SELECTORS.shares,
          props.id,
          props.path,
        ]);
      });
    });

    describe('shareShareTo()', () => {
      it('should return keyPath', () => {
        const props = { id: 'id' };
        expect(INVITATION_STORE_SELECTORS.shareShareTo(props)).toEqual([
          ...INVITATION_STORE_SELECTORS.shares,
          props.id,
          'shareTo',
        ]);
      });
    });

    describe('shareShareToUserId()', () => {
      it('should return keyPath', () => {
        const props = { id: 'id' };
        expect(INVITATION_STORE_SELECTORS.shareShareToUserId(props)).toEqual([
          ...INVITATION_STORE_SELECTORS.shares,
          props.id,
          'shareToUserId',
        ]);
      });
    });

    describe('shareNodeId()', () => {
      it('should return keyPath', () => {
        const props = { id: 'id' };
        expect(INVITATION_STORE_SELECTORS.shareNodeId(props)).toEqual([
          ...INVITATION_STORE_SELECTORS.shares,
          props.id,
          'nodeId',
        ]);
      });
    });

    describe('shareRole()', () => {
      it('should return keyPath', () => {
        const props = { id: 'id' };
        expect(INVITATION_STORE_SELECTORS.shareRole(props)).toEqual([
          ...INVITATION_STORE_SELECTORS.shares,
          props.id,
          'role',
        ]);
      });
    });

    describe('shareStatus()', () => {
      it('should return keyPath', () => {
        const props = { id: 'id' };
        expect(INVITATION_STORE_SELECTORS.shareStatus(props)).toEqual([
          ...INVITATION_STORE_SELECTORS.shares,
          props.id,
          'status',
        ]);
      });
    });
    describe('updatedAt()', () => {
      it('should return keyPath', () => {
        const props = { id: 'id' };
        expect(INVITATION_STORE_SELECTORS.updatedAt(props)).toEqual([
          ...INVITATION_STORE_SELECTORS.shares,
          props.id,
          'updatedAt',
        ]);
      });
    });
    describe('resendUserId()', () => {
      it('should return keyPath', () => {
        const props = { id: 'id' };
        expect(INVITATION_STORE_SELECTORS.resendUserId(props)).toEqual([
          ...INVITATION_STORE_SELECTORS.shares,
          props.id,
          'resendUserId',
        ]);
      });
    });
    describe('shareChildren()', () => {
      it('should return keyPath', () => {
        const props = { id: 'id' };
        expect(INVITATION_STORE_SELECTORS.shareChildren(props)).toEqual([
          ...INVITATION_STORE_SELECTORS.shares,
          props.id,
          'subNodes',
        ]);
      });
    });

    describe('#shareSubNodeShareTokens', () => {
      let shareSubNodeShareTokens;

      beforeEach(() => {
        INVITATION_STORE_CACHE_KEYS.shareSubNodeShareTokens = jest.fn(
          (...args) => ['shareSubNodeShareTokens', ...args],
        );
        shareSubNodeShareTokens = INVITATION_STORE_SELECTORS.shareSubNodeShareTokens();
      });

      it('returns correct keyPath', () => {
        const props = { ids: [1, 2] };
        expect(shareSubNodeShareTokens.keyPath(props)).toEqual(
          props.ids.map(id =>
            INVITATION_STORE_SELECTORS.shareSubNodeShareToken({ id }),
          ),
        );
      });

      it('returns correct cacheKey', () => {
        const obj = { ids: 'ids' };
        expect(shareSubNodeShareTokens.cacheKey).toEqual(
          INVITATION_STORE_CACHE_KEYS.shareSubNodeShareTokens(obj),
        );
      });

      it('returns correct props', () => {
        expect(shareSubNodeShareTokens.props).toBeNull();
      });

      it('getter converts selection to array', () => {
        expect(shareSubNodeShareTokens.getter(1, 2)).toEqual([1, 2]);
      });
    });

    describe('#filterShareSubNodesByNodeId', () => {
      let filterShareSubNodesByNodeId;

      beforeEach(() => {
        INVITATION_STORE_CACHE_KEYS.filterShareSubNodesByNodeId = jest.fn(
          (...args) => ['filterShareSubNodesByNodeId', ...args],
        );
        filterShareSubNodesByNodeId = INVITATION_STORE_SELECTORS.filterShareSubNodesByNodeId();
      });

      it('returns correct keyPath', () => {
        const props = { ids: [1, 2] };
        expect(filterShareSubNodesByNodeId.keyPath(props)).toEqual(
          props.ids.map(id =>
            INVITATION_STORE_SELECTORS.shareSubNodeNodeId({ id }),
          ),
        );
      });

      it('returns correct cacheKey', () => {
        const obj = { ids: 'ids', nodeIds: 'nodeIds' };
        expect(filterShareSubNodesByNodeId.cacheKey).toEqual(
          INVITATION_STORE_CACHE_KEYS.filterShareSubNodesByNodeId(obj),
        );
      });

      it('returns correct props', () => {
        const props = { ids: 'ids', nodeIds: 'nodeIds' };
        expect(
          filterShareSubNodesByNodeId.props.map(func => func(props)),
        ).toEqual([[props.ids], [props.nodeIds]]);
      });

      it('getter calls reducer', () => {
        const selectedShareToUserIds = [1];
        const ids = [1];
        const nodeIds = [2];
        INVITATION_STORE_UTILS.filterShareSubNodesByNodeIdReducer = jest.fn(
          () => () => 1,
        );
        expect(
          filterShareSubNodesByNodeId.getter(
            ...selectedShareToUserIds,
            ids,
            nodeIds,
          ),
        ).toEqual(
          INVITATION_STORE_UTILS.filterShareSubNodesByNodeIdReducer()(),
        );
      });
    });

    describe('#filterShareSubNodesByRole', () => {
      let filterShareSubNodesByRole;

      beforeEach(() => {
        INVITATION_STORE_CACHE_KEYS.filterShareSubNodesByRole = jest.fn(
          (...args) => ['filterShareSubNodesByRole', ...args],
        );
        filterShareSubNodesByRole = INVITATION_STORE_SELECTORS.filterShareSubNodesByRole();
      });

      it('returns correct keyPath', () => {
        const props = { ids: [1, 2] };
        expect(filterShareSubNodesByRole.keyPath(props)).toEqual(
          props.ids.map(id =>
            INVITATION_STORE_SELECTORS.shareSubNodeRole({ id }),
          ),
        );
      });

      it('returns correct cacheKey', () => {
        const obj = { ids: 'ids', roles: 'roles' };
        expect(filterShareSubNodesByRole.cacheKey).toEqual(
          INVITATION_STORE_CACHE_KEYS.filterShareSubNodesByRole(obj),
        );
      });

      it('returns correct props', () => {
        const props = { ids: 'ids', roles: 'roles' };
        expect(
          filterShareSubNodesByRole.props.map(func => func(props)),
        ).toEqual([[props.ids], [props.roles]]);
      });

      it('getter calls reducer', () => {
        const selectedRoles = [1];
        const ids = [2];
        const roles = ['role'];
        INVITATION_STORE_UTILS.filterShareSubNodesByRolesReducer = jest.fn(
          () => () => 1,
        );
        expect(
          filterShareSubNodesByRole.getter(...selectedRoles, ids, roles),
        ).toEqual(INVITATION_STORE_UTILS.filterShareSubNodesByRolesReducer()());
      });
    });

    describe('contentType()', () => {
      it('should return keyPath', () => {
        const props = { id: 'id' };
        expect(INVITATION_STORE_SELECTORS.contentType(props)).toEqual([
          ...INVITATION_STORE_SELECTORS.notifications,
          props.id,
          'contentType',
        ]);
      });
    });

    describe('createdAt()', () => {
      it('should return keyPath', () => {
        const props = { id: 'id' };
        expect(INVITATION_STORE_SELECTORS.createdAt(props)).toEqual([
          ...INVITATION_STORE_SELECTORS.joinOrganisations,
          props.id,
          'createdAt',
        ]);
      });
    });

    describe('inviteFrom()', () => {
      it('should return keyPath', () => {
        const props = { id: 'id' };
        expect(INVITATION_STORE_SELECTORS.inviteFrom(props)).toEqual([
          ...INVITATION_STORE_SELECTORS.joinOrganisations,
          props.id,
          'inviteFrom',
        ]);
      });
    });

    describe('orgId()', () => {
      it('should return keyPath', () => {
        const props = { id: 'id' };
        expect(INVITATION_STORE_SELECTORS.orgId(props)).toEqual([
          ...INVITATION_STORE_SELECTORS.joinOrganisations,
          props.id,
          'orgId',
        ]);
      });
    });

    describe('role()', () => {
      it('should return keyPath', () => {
        const props = { id: 'id' };
        expect(INVITATION_STORE_SELECTORS.role(props)).toEqual([
          ...INVITATION_STORE_SELECTORS.joinOrganisations,
          props.id,
          'role',
        ]);
      });
    });

    describe('#userNodeUserIds', () => {
      let userNodeUserIds;

      beforeEach(() => {
        INVITATION_STORE_CACHE_KEYS.userNodeUserIds = jest.fn((...args) => [
          'userNodeUserIds',
          ...args,
        ]);
        userNodeUserIds = INVITATION_STORE_SELECTORS.userNodeUserIds();
      });

      it('returns correct keyPath', () => {
        const props = { ids: [1, 2] };
        expect(userNodeUserIds.keyPath(props)).toEqual(
          props.ids.map(id =>
            INVITATION_STORE_SELECTORS.userNodeUserId({ id }),
          ),
        );
      });

      it('returns correct cacheKey', () => {
        const obj = { idsProp: 'ids' };
        expect(userNodeUserIds.cacheKey).toEqual(
          INVITATION_STORE_CACHE_KEYS.userNodeUserIds(obj),
        );
      });

      it('returns correct props', () => {
        expect(userNodeUserIds.props).toBeNull();
      });

      it('getter converts selection to array', () => {
        expect(userNodeUserIds.getter(1, 2)).toEqual([1, 2]);
      });
    });

    describe('#filterUserNodesByUserId', () => {
      let filterUserNodesByUserId;

      beforeEach(() => {
        INVITATION_STORE_CACHE_KEYS.filterUserNodesByUserId = jest.fn(
          (...args) => ['filterUserNodesByUserId', ...args],
        );
        filterUserNodesByUserId = INVITATION_STORE_SELECTORS.filterUserNodesByUserId();
      });

      it('returns correct keyPath', () => {
        const props = { ids: [1, 2] };
        expect(filterUserNodesByUserId.keyPath(props)).toEqual(
          props.ids.map(id =>
            INVITATION_STORE_SELECTORS.userNodeUserId({ id }),
          ),
        );
      });

      it('returns correct cacheKey', () => {
        const obj = { ids: 'ids', userIds: 'userIds' };
        expect(filterUserNodesByUserId.cacheKey).toEqual(
          INVITATION_STORE_CACHE_KEYS.filterUserNodesByUserId(obj),
        );
      });

      it('returns correct props', () => {
        const props = { ids: 'ids', userIds: 'userIds' };
        expect(filterUserNodesByUserId.props.map(func => func(props))).toEqual([
          [props.ids],
          [props.userIds],
        ]);
      });

      it('getter calls reducer', () => {
        const selectedUserIds = [1];
        const ids = [2];
        const userIds = [3];
        INVITATION_STORE_UTILS.filterUserNodesByUserIdReducer = jest.fn(
          () => () => 1,
        );
        expect(
          filterUserNodesByUserId.getter(...selectedUserIds, ids, userIds),
        ).toEqual(INVITATION_STORE_UTILS.filterUserNodesByUserIdReducer()());
      });
    });

    describe('#filterUserNodesByNodeId', () => {
      let filterUserNodesByNodeId;

      beforeEach(() => {
        INVITATION_STORE_CACHE_KEYS.filterUserNodesByNodeId = jest.fn(
          (...args) => ['filterUserNodesByNodeId', ...args],
        );
        filterUserNodesByNodeId = INVITATION_STORE_SELECTORS.filterUserNodesByNodeId();
      });

      it('returns correct keyPath', () => {
        const props = { ids: [1, 2] };
        expect(filterUserNodesByNodeId.keyPath(props)).toEqual(
          props.ids.map(id =>
            INVITATION_STORE_SELECTORS.userNodeNodeId({ id }),
          ),
        );
      });

      it('returns correct cacheKey', () => {
        const obj = { ids: 'ids', nodeIds: 'nodeIds' };
        expect(filterUserNodesByNodeId.cacheKey).toEqual(
          INVITATION_STORE_CACHE_KEYS.filterUserNodesByNodeId(obj),
        );
      });

      it('returns correct props', () => {
        const props = { ids: 'ids', nodeIds: 'nodeIds' };
        expect(filterUserNodesByNodeId.props.map(func => func(props))).toEqual([
          [props.ids],
          [props.nodeIds],
        ]);
      });

      it('getter calls reducer', () => {
        const selectedNodeIds = [1];
        const ids = [2];
        const nodeIds = [3];
        INVITATION_STORE_UTILS.filterUserNodesByNodeIdReducer = jest.fn(
          () => () => 1,
        );
        expect(
          filterUserNodesByNodeId.getter(...selectedNodeIds, ids, nodeIds),
        ).toEqual(INVITATION_STORE_UTILS.filterUserNodesByNodeIdReducer()());
      });
    });

    describe('#filterUserNodesByRole', () => {
      let filterUserNodesByRole;

      beforeEach(() => {
        INVITATION_STORE_CACHE_KEYS.filterUserNodesByRole = jest.fn(
          (...args) => ['filterUserNodesByRole', ...args],
        );
        filterUserNodesByRole = INVITATION_STORE_SELECTORS.filterUserNodesByRole();
      });

      it('returns correct keyPath', () => {
        const props = { ids: [1, 2] };
        expect(filterUserNodesByRole.keyPath(props)).toEqual(
          props.ids.map(id => INVITATION_STORE_SELECTORS.userNodeRole({ id })),
        );
      });

      it('returns correct cacheKey', () => {
        const obj = { ids: 'ids', staticRoles: null };
        expect(filterUserNodesByRole.cacheKey).toEqual(
          INVITATION_STORE_CACHE_KEYS.filterUserNodesByRole(obj),
        );
      });

      it('returns correct props', () => {
        const props = { ids: 'ids', roles: ['roles'] };
        expect(filterUserNodesByRole.props.map(func => func(props))).toEqual([
          [props.ids],
          props.roles,
        ]);
      });

      it('returns correct props if roles is undefined', () => {
        const props = { ids: 'ids' };
        expect(filterUserNodesByRole.props.map(func => func(props))).toEqual([
          [props.ids],
          TOUR_CONTRIBUTOR_ROLE_TYPES,
        ]);
      });

      it('getter calls reducer', () => {
        const selectedRoles = [1];
        const ids = [2];
        const roles = [3];
        INVITATION_STORE_UTILS.filterUserNodesByRolesReducer = jest.fn(
          () => () => 1,
        );
        expect(
          filterUserNodesByRole.getter(...selectedRoles, ids, roles),
        ).toEqual(INVITATION_STORE_UTILS.filterUserNodesByRolesReducer()());
      });

      it('getter return empty string if roles is not array', () => {
        const selectedRoles = [1];
        const ids = [2];
        const roles = null;
        INVITATION_STORE_UTILS.filterUserNodesByRolesReducer = jest.fn(
          () => () => 1,
        );
        expect(
          filterUserNodesByRole.getter(...selectedRoles, ids, roles),
        ).toEqual([]);
      });
    });

    describe('userNodeProp()', () => {
      it('should return keyPath', () => {
        const props = { id: 'id', path: 'path' };
        expect(INVITATION_STORE_SELECTORS.userNodeProp(props)).toEqual([
          ...INVITATION_STORE_SELECTORS.userNodes,
          props.id,
          props.path,
        ]);
      });
    });

    describe('userNodeUserNodeId()', () => {
      it('should return keyPath', () => {
        const props = { id: 'id' };
        expect(INVITATION_STORE_SELECTORS.userNodeUserNodeId(props)).toEqual([
          ...INVITATION_STORE_SELECTORS.userNodes,
          props.id,
          'userNodeId',
        ]);
      });
    });

    describe('userNodeUserNodes()', () => {
      it('should return keyPath', () => {
        const props = { id: 'id' };
        expect(INVITATION_STORE_SELECTORS.userNodeUserNodes(props)).toEqual([
          ...INVITATION_STORE_SELECTORS.userNodes,
          props.id,
          'userNodes',
        ]);
      });
    });
    describe('userNodeCustomRole()', () => {
      it('should return keyPath', () => {
        const props = { id: 'id' };
        expect(INVITATION_STORE_SELECTORS.userNodeCustomRole(props)).toEqual([
          ...INVITATION_STORE_SELECTORS.userNodes,
          props.id,
          'userRole',
        ]);
      });
    });
    describe('nodeContent()', () => {
      it('should return keyPath', () => {
        const props = { id: 'id' };
        expect(INVITATION_STORE_SELECTORS.nodeContent(props)).toEqual([
          ...INVITATION_STORE_SELECTORS.nodeTransfers,
          props.id,
          'content',
        ]);
      });
    });
    describe('shareToUserId()', () => {
      it('should return keyPath', () => {
        const props = { id: 'id', token: 'abc' };
        expect(INVITATION_STORE_SELECTORS.shareToUserId(props)).toEqual([
          INVITATION_STORE,
          'shares',
          'abc',
          'shareToUserId',
        ]);
      });
    });
    describe('shareTo()', () => {
      it('should return keyPath', () => {
        const props = { id: 'id', token: 'abc' };
        expect(INVITATION_STORE_SELECTORS.shareTo(props)).toEqual([
          INVITATION_STORE,
          'shares',
          'abc',
          'shareTo',
        ]);
      });
    });
    describe('shareFrom()', () => {
      it('should return keyPath', () => {
        const props = { id: 'id', token: 'abc' };
        expect(INVITATION_STORE_SELECTORS.shareFromUserId(props)).toEqual([
          INVITATION_STORE,
          'shares',
          'abc',
          'shareFrom',
        ]);
      });
    });
    describe('nodeId()', () => {
      it('should return keyPath', () => {
        const props = { id: 'id', token: 'abc' };
        expect(INVITATION_STORE_SELECTORS.nodeId(props)).toEqual([
          INVITATION_STORE,
          'shares',
          'abc',
          'nodeId',
        ]);
      });
    });
    describe('sharedProp()', () => {
      it('should return keyPath', () => {
        const props = { id: 'id', token: 'abc', keyProp: 'shareToUserId' };
        expect(INVITATION_STORE_SELECTORS.sharedProp(props)).toEqual([
          INVITATION_STORE,
          'shares',
          'abc',
          'shareToUserId',
        ]);
      });
    });
    describe('sent()', () => {
      it('should return keyPath', () => {
        const props = { type: 'shares' };
        expect(INVITATION_STORE_SELECTORS.sent(props)).toEqual(
          INVITATION_STORE_SELECTORS.fromMe,
        );
      });
    });
    describe('sent()', () => {
      it('should return keyPath', () => {
        const props = { type: 'shares' };
        expect(INVITATION_STORE_SELECTORS.sent(props)).toEqual(
          INVITATION_STORE_SELECTORS.fromMe,
        );
      });
    });
    describe('received()', () => {
      it('should return keyPath', () => {
        const props = { type: 'shares' };
        expect(INVITATION_STORE_SELECTORS.received(props)).toEqual(
          INVITATION_STORE_SELECTORS.toMe,
        );
      });
    });
    describe('completedToMe()', () => {
      it('should return keyPath', () => {
        const props = { type: 'shares' };
        expect(INVITATION_STORE_SELECTORS.completedToMe(props)).toEqual([
          INVITATION_STORE,
          'completedToMe',
        ]);
      });
    });
    describe('completedFromMe()', () => {
      it('should return keyPath', () => {
        const props = { type: 'shares' };
        expect(INVITATION_STORE_SELECTORS.completedFromMe(props)).toEqual([
          INVITATION_STORE,
          'completedFromMe',
        ]);
      });
    });
    describe('content()', () => {
      it('should return keyPath', () => {
        const props = { id: 1 };
        expect(INVITATION_STORE_SELECTORS.content(props)).toEqual([
          INVITATION_STORE,
          'notifications',
          1,
          'content',
          'content',
        ]);
      });
    });
    describe('organisationName()', () => {
      it('should return keyPath', () => {
        const props = { id: 1 };
        expect(INVITATION_STORE_SELECTORS.contentOrgName(props)).toEqual([
          INVITATION_STORE,
          'notifications',
          1,
          'content',
          'organisationName',
        ]);
      });
    });
  });
});
