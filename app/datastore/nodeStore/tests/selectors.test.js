import { NODE_STORE, TEMPLATE_MANAGEMENT_VIEWSTORE } from 'appConstants';
import { EVENT_STORE_DATA_SELECTORS } from 'datastore/eventStore/selectors';
import { NODE_PATHS } from 'datastore/nodeStore/constants';
import {
  MEDICAL_PATHS,
  DIETARY_PATHS,
} from 'datastore/personDataStore/constants';
import {
  CHECKITEM,
  CHECKLIST,
  PARTICIPANTS,
  SEATS,
} from 'utils/modelConstants';
import {
  NODE_STORE_SELECTORS,
  NODE_VIEW_STORE_SELECTORS,
  SORT_BY_SELECTORS,
  LINK_STORE_SELECTORS,
} from '../selectors';
import { NODE_STORE_CACHE_KEYS } from '../cacheKey';
import { NODE_STORE_UTILS } from '../utils';

describe('NODE_VIEW_STORE_SELECTORS selectors', () => {
  describe('editable()', () => {
    it('should return keyPath', () => {
      expect(NODE_VIEW_STORE_SELECTORS.editable()).toEqual([
        TEMPLATE_MANAGEMENT_VIEWSTORE,
        'updatingTourInfo',
      ]);
    });
  });
});

describe('NODE_STORE selectors', () => {
  beforeEach(() => jest.clearAllMocks());

  describe('SORT_BY_SELECTORS', () => {
    describe('Smoke Test', () => {
      it('should exists', () => {
        expect(SORT_BY_SELECTORS).toMatchSnapshot();
      });
    });

    describe('sortBy', () => {
      it('should exists', () => {
        expect(
          SORT_BY_SELECTORS.sortBy({ parentNodeId: 33 }),
        ).toMatchSnapshot();
        expect(
          SORT_BY_SELECTORS.sortBy({
            parentNodeId: 44,
            viewStore: 'someStore',
          }),
        ).toMatchSnapshot();
      });
    });

    describe('order', () => {
      it('should exists', () => {
        expect(SORT_BY_SELECTORS.order({ parentNodeId: 33 })).toMatchSnapshot();
        expect(
          SORT_BY_SELECTORS.order({ parentNodeId: 44, viewStore: 'someStore' }),
        ).toMatchSnapshot();
      });
    });
  });

  describe('Data store selectors NODE_STORE_SELECTORS', () => {
    describe('activityIds()', () => {
      it('should return keyPath', () => {
        expect(NODE_STORE_SELECTORS.activityIds({ id: 999 })).toEqual([
          NODE_STORE,
          'nodes',
          999,
          'activities',
        ]);
      });
    });

    describe('parentActivityIds()', () => {
      it('should return keyPath', () => {
        expect(
          NODE_STORE_SELECTORS.parentActivityIds({ parentNodeId: 999 }),
        ).toEqual([NODE_STORE, 'nodes', 999, 'activities']);
      });
    });

    describe('startDate', () => {
      it('should return keyPath', () => {
        expect(NODE_STORE_SELECTORS.startDate({ id: 999 })).toEqual([
          NODE_STORE,
          'nodes',
          999,
          'customData',
          'startDate',
        ]);
      });
    });

    describe('isPrivate', () => {
      it('should return keyPath', () => {
        expect(NODE_STORE_SELECTORS.isPrivate({ id: 999 })).toEqual([
          NODE_STORE,
          'nodes',
          999,
          'customData',
          'private',
        ]);
      });
    });

    describe('secondChild', () => {
      it('should return keyPath', () => {
        expect(NODE_STORE_SELECTORS.secondChild({ id: 999 })).toEqual([
          NODE_STORE,
          'nodes',
          999,
          'children',
          1,
        ]);
      });
    });

    describe('weekDay', () => {
      it('should return keyPath', () => {
        expect(NODE_STORE_SELECTORS.weekDay({ id: 999 })).toEqual([
          NODE_STORE,
          'nodes',
          999,
          'customData',
          'weekDay',
        ]);
      });
    });

    describe('userNode', () => {
      it('should return keyPath', () => {
        expect(LINK_STORE_SELECTORS.userNode({ id: 1 })).toEqual([
          NODE_STORE,
          'links',
          1,
          'userNode',
        ]);
      });
    });

    describe('responsibility', () => {
      it('should return keyPath', () => {
        expect(NODE_STORE_SELECTORS.responsibility({ id: 999 })).toEqual([
          NODE_STORE,
          'nodes',
          999,
          'customData',
          'responsibility',
        ]);
      });
    });

    describe('when', () => {
      it('should return keyPath', () => {
        expect(NODE_STORE_SELECTORS.when({ id: 999 })).toEqual([
          NODE_STORE,
          'nodes',
          999,
          'customData',
          'when',
        ]);
      });
    });

    describe('done', () => {
      it('should return keyPath', () => {
        expect(NODE_STORE_SELECTORS.done({ id: 999 })).toEqual([
          NODE_STORE,
          'nodes',
          999,
          'customData',
          'done',
        ]);
      });
    });

    describe('likelihood', () => {
      it('should return keyPath', () => {
        expect(NODE_STORE_SELECTORS.likelihood({ id: 999 })).toEqual([
          NODE_STORE,
          'nodes',
          999,
          'customData',
          'likelihood',
        ]);
      });
    });

    describe('impact', () => {
      it('should return keyPath', () => {
        expect(NODE_STORE_SELECTORS.impact({ id: 999 })).toEqual([
          NODE_STORE,
          'nodes',
          999,
          'customData',
          'impact',
        ]);
      });
    });

    describe('control', () => {
      it('should return keyPath', () => {
        expect(NODE_STORE_SELECTORS.control({ id: 999 })).toEqual([
          NODE_STORE,
          'nodes',
          999,
          'customData',
          'control',
        ]);
      });
    });

    describe('risks', () => {
      it('should return keyPath', () => {
        expect(NODE_STORE_SELECTORS.risks({ id: 999 })).toEqual([
          NODE_STORE,
          'nodes',
          999,
          'risks',
        ]);
      });
    });

    describe('node()', () => {
      it('should return keyPath', () => {
        expect(NODE_STORE_SELECTORS.node({ id: 999 })).toEqual([
          NODE_STORE,
          'nodes',
          999,
        ]);
      });
    });

    describe('nodeProp()', () => {
      it('returns correct keyPath', () => {
        const id = 1;
        const path = 'path';
        expect(NODE_STORE_SELECTORS.nodeProp({ id, path })).toEqual([
          NODE_STORE,
          'nodes',
          id,
          path,
        ]);
      });
    });

    describe('checklistsStatus()', () => {
      it('should return undefined', () => {
        expect(
          NODE_STORE_SELECTORS.checklistsStatus({ type: 'something wrong' }),
        ).toEqual(undefined);
      });

      it('should return keyPath type = CHECKLIST', () => {
        expect(
          NODE_STORE_SELECTORS.checklistsStatus({
            type: CHECKLIST,
            checklists: [undefined],
          }),
        ).toEqual(undefined);
        expect(
          NODE_STORE_SELECTORS.checklistsStatus({
            type: CHECKLIST,
            checklists: [[1, 2]],
          }),
        ).toEqual([
          [NODE_STORE, 'nodes', 1, 'status'],
          [NODE_STORE, 'nodes', 2, 'status'],
        ]);
      });

      it('should return keyPath type = CHECKITEM', () => {
        expect(
          NODE_STORE_SELECTORS.checklistsStatus({
            type: CHECKITEM,
            checklists: [[1, 2], [3, 4]],
            statuses: ['open', 'closed'],
          }),
        ).toEqual([
          [NODE_STORE, 'nodes', 1, 'status'],
          [NODE_STORE, 'nodes', 2, 'status'],
        ]);
      });
    });

    describe('allChecklists()', () => {
      it('should return array', () => {
        expect(NODE_STORE_SELECTORS.allChecklists({ id: [1, 2] })).toEqual([
          NODE_STORE_SELECTORS.checklists({ id: 1 }),
          NODE_STORE_SELECTORS.checklists({ id: 2 }),
        ]);
      });

      it('should return single', () => {
        expect(NODE_STORE_SELECTORS.allChecklists({ id: 11 })).toEqual(
          NODE_STORE_SELECTORS.checklists({ id: 11 }),
        );
      });
    });

    describe('allStatuses()', () => {
      it('should return array', () => {
        expect(NODE_STORE_SELECTORS.allStatuses({ id: [1, 2] })).toEqual([
          NODE_STORE_SELECTORS.status({ id: 1 }),
          NODE_STORE_SELECTORS.status({ id: 2 }),
        ]);
      });

      it('should return single', () => {
        expect(NODE_STORE_SELECTORS.allStatuses({ id: 11 })).toEqual(
          NODE_STORE_SELECTORS.status({ id: 11 }),
        );
      });
    });

    describe('allChecklistIds()', () => {
      it('should matchSnapshot', () => {
        expect(NODE_STORE_SELECTORS.allChecklistIds).toMatchSnapshot();
        expect(
          NODE_STORE_SELECTORS.allChecklistIds.getter([1], [2, 3], [4]),
        ).toEqual([[1], [2, 3], [4]]);
      });
    });

    describe('allChecklistStatuses()', () => {
      it('should matchSnapshot', () => {
        expect(NODE_STORE_SELECTORS.allChecklistStatuses).toMatchSnapshot();
        expect(
          NODE_STORE_SELECTORS.allChecklistStatuses.getter([1], [2, 3], [4]),
        ).toEqual([[1], [2, 3], [4]]);
      });
    });

    describe('content()', () => {
      it('should return keyPath', () => {
        expect(NODE_STORE_SELECTORS.content({ id: 999 })).toEqual([
          NODE_STORE,
          'nodes',
          999,
          'content',
        ]);
      });
    });

    describe('vicinity()', () => {
      it('should return keyPath', () => {
        expect(NODE_STORE_SELECTORS.vicinity({ id: 999 })).toEqual([
          NODE_STORE,
          'nodes',
          999,
          'customData',
          'vicinity',
        ]);
      });
    });

    describe('firstName', () => {
      it('should return keyPath', () => {
        expect(NODE_STORE_SELECTORS.firstName({ id: 999 })).toEqual([
          NODE_STORE,
          'nodes',
          999,
          'customData',
          'firstName',
        ]);
      });
    });

    describe('lastName', () => {
      it('should return keyPath', () => {
        expect(NODE_STORE_SELECTORS.lastName({ id: 999 })).toEqual([
          NODE_STORE,
          'nodes',
          999,
          'customData',
          'lastName',
        ]);
      });
    });

    describe('heading()', () => {
      it('should return keyPath', () => {
        expect(NODE_STORE_SELECTORS.heading({ id: 999 })).toEqual([
          NODE_STORE,
          'nodes',
          999,
          'customData',
          'heading',
        ]);
      });
    });

    describe('subheading()', () => {
      it('should return keyPath', () => {
        expect(NODE_STORE_SELECTORS.subheading({ id: 999 })).toEqual([
          NODE_STORE,
          'nodes',
          999,
          'customData',
          'subheading',
        ]);
      });
    });

    describe('customData()', () => {
      it('should return keyPath', () => {
        expect(NODE_STORE_SELECTORS.customData({ id: 999 })).toEqual([
          NODE_STORE,
          'nodes',
          999,
          'customData',
        ]);
      });
    });

    describe('duration()', () => {
      it('should return keyPath', () => {
        expect(NODE_STORE_SELECTORS.duration({ id: 999 })).toEqual([
          NODE_STORE,
          'nodes',
          999,
          'customData',
          'duration',
        ]);
      });
    });

    describe('url()', () => {
      it('should return keyPath', () => {
        expect(NODE_STORE_SELECTORS.url({ id: 999 })).toEqual([
          NODE_STORE,
          'nodes',
          999,
          'customData',
          'url',
        ]);
      });
    });

    describe('email()', () => {
      it('should return keyPath', () => {
        expect(NODE_STORE_SELECTORS.email({ id: 999 })).toEqual([
          NODE_STORE,
          'nodes',
          999,
          'customData',
          'email',
        ]);
      });
    });

    describe('subtitle()', () => {
      it('should return keyPath', () => {
        expect(NODE_STORE_SELECTORS.subtitle({ id: 999 })).toEqual([
          NODE_STORE,
          'nodes',
          999,
          'customData',
          'subtitle',
        ]);
      });
    });

    describe('timeZoneId()', () => {
      it('should return keyPath', () => {
        expect(NODE_STORE_SELECTORS.timeZoneId({ id: 999 })).toEqual([
          NODE_STORE,
          'nodes',
          999,
          'customData',
          'timeZoneId',
        ]);
      });
    });

    describe('parentContent()', () => {
      it('should return keyPath', () => {
        expect(
          NODE_STORE_SELECTORS.parentContent({ parentNodeId: 999 }),
        ).toEqual([NODE_STORE, 'nodes', 999, 'content']);
      });
    });

    describe('children()', () => {
      it('should return keyPath', () => {
        expect(NODE_STORE_SELECTORS.children({ id: 999 })).toEqual([
          NODE_STORE,
          'nodes',
          999,
          'children',
        ]);
      });
    });

    describe('childrenCount()', () => {
      it('should return keyPath', () => {
        expect(NODE_STORE_SELECTORS.childrenCount({ id: 999 })).toEqual([
          NODE_STORE,
          'nodes',
          999,
          'children',
          'length',
        ]);
      });
    });

    describe('tourRoles()', () => {
      it('should return keyPath', () => {
        expect(NODE_STORE_SELECTORS.tourRoles({ id: 999 })).toEqual([
          NODE_STORE,
          'nodes',
          999,
          'tourRoles',
        ]);
      });
    });

    describe('sharedWith()', () => {
      it('should return keyPath', () => {
        expect(NODE_STORE_SELECTORS.sharedWith({ id: 999 })).toEqual([
          NODE_STORE,
          'nodes',
          999,
          'sharedWith',
        ]);
      });
    });

    describe('editing()', () => {
      it('should return keyPath', () => {
        expect(NODE_STORE_SELECTORS.editing({ id: 999 })).toEqual([
          NODE_STORE,
          'nodes',
          999,
          'calculated',
          'editing',
        ]);
      });
    });

    describe('child()', () => {
      it('should return keyPath', () => {
        expect(NODE_STORE_SELECTORS.child(3)({ id: 999 })).toEqual([
          NODE_STORE,
          'nodes',
          999,
          'children',
          3,
        ]);
      });
    });

    describe('personal()', () => {
      it('should return keyPath', () => {
        expect(NODE_STORE_SELECTORS.personal({ id: 999 })).toEqual([
          NODE_STORE,
          'nodes',
          999,
          'personal',
        ]);
      });
    });

    describe('parentChildren()', () => {
      it('should return keyPath', () => {
        expect(
          NODE_STORE_SELECTORS.parentChildren({ parentNodeId: 999 }),
        ).toEqual([NODE_STORE, 'nodes', 999, 'children']);
      });
    });

    describe('lastNodeId', () => {
      it('should return keyPath', () => {
        expect(NODE_STORE_SELECTORS.lastNodeId({ id: 999 })).toEqual([
          NODE_STORE,
          'nodes',
          999,
          'lastNodeId',
        ]);
      });
    });

    describe('parentId', () => {
      it('should return keyPath', () => {
        expect(NODE_STORE_SELECTORS.parentId({ id: 999 })).toEqual([
          NODE_STORE,
          'nodes',
          999,
          'parentId',
        ]);
      });
    });

    describe('insertLocation', () => {
      it('should return keyPath', () => {
        expect(NODE_STORE_SELECTORS.insertLocation({ id: 999 })).toEqual([
          NODE_STORE,
          'nodes',
          999,
          'insertLocation',
        ]);
      });
    });

    describe('rooms', () => {
      it('should return keyPath', () => {
        expect(NODE_STORE_SELECTORS.rooms({ id: 999 })).toEqual([
          NODE_STORE,
          'nodes',
          999,
          'rooms',
        ]);
      });
    });

    describe('roomType', () => {
      it('should return keyPath', () => {
        expect(NODE_STORE_SELECTORS.roomType({ id: 999 })).toEqual([
          NODE_STORE,
          'nodes',
          999,
          'customData',
          'roomType',
        ]);
      });
    });

    describe('ageType', () => {
      it('should return keyPath', () => {
        expect(NODE_STORE_SELECTORS.ageType({ id: 999 })).toEqual([
          NODE_STORE,
          'nodes',
          999,
          'customData',
          'ageType',
        ]);
      });
    });
    describe('bedCount', () => {
      it('should return keyPath', () => {
        expect(NODE_STORE_SELECTORS.bedCount({ id: 999 })).toEqual([
          NODE_STORE,
          'nodes',
          999,
          'customData',
          'bedCount',
        ]);
      });
    });
    describe('guestCount', () => {
      it('should return keyPath', () => {
        expect(NODE_STORE_SELECTORS.guestCount({ id: 999 })).toEqual([
          NODE_STORE,
          'nodes',
          999,
          'customData',
          'guestCount',
        ]);
      });
    });

    describe('type()', () => {
      it('should return keyPath', () => {
        expect(NODE_STORE_SELECTORS.type({ id: 999 })).toEqual([
          NODE_STORE,
          'nodes',
          999,
          'type',
        ]);
      });
    });

    describe('parentType()', () => {
      it('should return keyPath', () => {
        expect(NODE_STORE_SELECTORS.parentType({ parentNodeId: 999 })).toEqual([
          NODE_STORE,
          'nodes',
          999,
          'type',
        ]);
      });
    });

    describe('description()', () => {
      it('should return keyPath', () => {
        expect(NODE_STORE_SELECTORS.description({ id: 999 })).toEqual([
          NODE_STORE,
          'nodes',
          999,
          'customData',
          'description',
        ]);
      });
    });

    describe('shortDescription()', () => {
      it('should return keyPath', () => {
        expect(NODE_STORE_SELECTORS.shortDescription({ id: 999 })).toEqual([
          NODE_STORE,
          'nodes',
          999,
          'customData',
          'shortDescription',
        ]);
      });
    });

    describe('notes()', () => {
      it('should return keyPath', () => {
        expect(NODE_STORE_SELECTORS.notes({ id: 999 })).toEqual([
          NODE_STORE,
          'nodes',
          999,
          'customData',
          'notes',
        ]);
      });
    });

    describe('status()', () => {
      it('should return keyPath', () => {
        expect(NODE_STORE_SELECTORS.status({ id: 999 })).toEqual([
          NODE_STORE,
          'nodes',
          999,
          'status',
        ]);
      });
    });

    describe('createdAt()', () => {
      it('should return keyPath', () => {
        expect(NODE_STORE_SELECTORS.createdAt({ id: 999 })).toEqual([
          NODE_STORE,
          'nodes',
          999,
          'createdAt',
        ]);
      });
    });

    describe('createdBy()', () => {
      it('should return keyPath', () => {
        expect(NODE_STORE_SELECTORS.createdBy({ id: 999 })).toEqual([
          NODE_STORE,
          'nodes',
          999,
          'createdBy',
        ]);
      });
    });

    describe('printMode()', () => {
      it('should return keyPath', () => {
        expect(NODE_STORE_SELECTORS.printMode({ id: 999 })).toEqual([
          NODE_STORE,
          'nodes',
          999,
          'printMode',
        ]);
      });
    });
    describe('calculatedEndTimeReal()', () => {
      it('should return keyPath', () => {
        expect(NODE_STORE_SELECTORS.calculatedEndTimeReal({ id: 999 })).toEqual(
          [NODE_STORE, 'nodes', 999, 'calculated', 'time', 'end', 'real'],
        );
      });
    });
    describe('calculatedEventIds()', () => {
      it('should return keyPath', () => {
        expect(NODE_STORE_SELECTORS.calculatedEventIds({ id: 999 })).toEqual([
          NODE_STORE,
          'nodes',
          999,
          'calculated',
          'eventIds',
        ]);
      });
    });
    describe('calculatedEventObjs()', () => {
      it('should return keyPath', () => {
        expect(NODE_STORE_SELECTORS.calculatedEventObjs({ id: 999 })).toEqual([
          NODE_STORE,
          'nodes',
          999,
          'calculated',
          'eventObjs',
        ]);
      });
    });

    describe('completedAt()', () => {
      it('should return keyPath', () => {
        expect(NODE_STORE_SELECTORS.completedAt({ id: 999 })).toEqual([
          NODE_STORE,
          'nodes',
          999,
          'customData',
          'completedAt',
        ]);
      });
    });

    describe('completedBy()', () => {
      it('should return keyPath', () => {
        expect(NODE_STORE_SELECTORS.completedBy({ id: 999 })).toEqual([
          NODE_STORE,
          'nodes',
          999,
          'customData',
          'completedBy',
        ]);
      });
    });

    describe('dueDate()', () => {
      it('should return keyPath', () => {
        expect(NODE_STORE_SELECTORS.dueDate({ id: 999 })).toEqual([
          NODE_STORE,
          'nodes',
          999,
          'customData',
          'dueDate',
        ]);
      });
    });

    describe('displayDate()', () => {
      it('returns correct keyPath', () => {
        const id = 1;
        expect(NODE_STORE_SELECTORS.displayDate({ id })).toEqual([
          NODE_STORE,
          'nodes',
          id,
          'customData',
          'displayDate',
        ]);
      });
    });

    describe('comments()', () => {
      it('should return keyPath', () => {
        expect(NODE_STORE_SELECTORS.comments({ id: 999 })).toEqual([
          NODE_STORE,
          'nodes',
          999,
          'feedbacks',
        ]);
      });
    });

    describe('feedbacks()', () => {
      it('should return keyPath', () => {
        expect(NODE_STORE_SELECTORS.feedbacks({ id: 999 })).toEqual([
          NODE_STORE,
          'nodes',
          999,
          'feedbacks',
        ]);
      });
    });

    describe('commentCount()', () => {
      it('should return keyPath', () => {
        expect(NODE_STORE_SELECTORS.commentCount({ id: 999 })).toEqual([
          NODE_STORE,
          'nodes',
          999,
          'feedbacks',
          'length',
        ]);
      });
    });

    describe('location()', () => {
      it('returns correct keyPath', () => {
        const id = 1;
        expect(NODE_STORE_SELECTORS.location({ id })).toEqual([
          NODE_STORE,
          'nodes',
          id,
          'customData',
          'location',
        ]);
      });
    });

    describe('icon()', () => {
      it('returns correct keyPath', () => {
        const id = 1;
        expect(NODE_STORE_SELECTORS.icon({ id })).toEqual([
          NODE_STORE,
          'nodes',
          id,
          'customData',
          'icon',
        ]);
      });
    });

    describe('placeId()', () => {
      it('returns correct keyPath', () => {
        const id = 1;
        expect(NODE_STORE_SELECTORS.placeId({ id })).toEqual([
          NODE_STORE,
          'nodes',
          id,
          'customData',
          'placeId',
        ]);
      });
    });

    describe('origin()', () => {
      it('returns correct keyPath', () => {
        const id = 1;
        expect(NODE_STORE_SELECTORS.origin({ id })).toEqual([
          NODE_STORE,
          'nodes',
          id,
          'customData',
          'origin',
        ]);
      });
    });

    describe('destination()', () => {
      it('returns correct keyPath', () => {
        const id = 1;
        expect(NODE_STORE_SELECTORS.destination({ id })).toEqual([
          NODE_STORE,
          'nodes',
          id,
          'customData',
          'destination',
        ]);
      });
    });

    describe('travelMode()', () => {
      it('returns correct keyPath', () => {
        const id = 1;
        expect(NODE_STORE_SELECTORS.travelMode({ id })).toEqual([
          NODE_STORE,
          'nodes',
          id,
          'customData',
          'travelMode',
        ]);
      });
    });

    describe('visible()', () => {
      it('returns correct keyPath', () => {
        const id = 1;
        expect(NODE_STORE_SELECTORS.visible({ id })).toEqual([
          NODE_STORE,
          'nodes',
          id,
          'customData',
          'visible',
        ]);
      });
    });

    describe('routeContent()', () => {
      it('returns correct keyPath', () => {
        const id = 1;
        expect(NODE_STORE_SELECTORS.routeContent({ id })).toEqual([
          NODE_STORE,
          'nodes',
          id,
          'customData',
          'routeContent',
        ]);
      });
    });

    describe('photoId()', () => {
      it('returns correct keyPath', () => {
        const id = 1;
        expect(NODE_STORE_SELECTORS.photoId({ id })).toEqual([
          NODE_STORE,
          'nodes',
          id,
          'photos',
          0,
        ]);
      });
    });

    describe('attachmentId()', () => {
      it('returns correct keyPath', () => {
        const id = 1;
        expect(NODE_STORE_SELECTORS.attachmentId({ id })).toEqual([
          NODE_STORE,
          'nodes',
          id,
          'attachment',
        ]);
      });
    });

    describe('photos()', () => {
      it('returns correct keyPath', () => {
        const id = 1;
        expect(NODE_STORE_SELECTORS.photos({ id })).toEqual([
          NODE_STORE,
          'nodes',
          id,
          'photos',
        ]);
      });
    });

    describe('exist()', () => {
      it('returns correct keyPath', () => {
        const id = 1;
        expect(NODE_STORE_SELECTORS.exist({ id })).toEqual([
          NODE_STORE,
          'nodes',
          id,
          'id',
        ]);
      });
    });

    describe('isEditable()', () => {
      it('returns correct keyPath', () => {
        const id = 1;
        expect(NODE_STORE_SELECTORS.isEditable({ id })).toEqual([
          NODE_STORE,
          'nodes',
          id,
          'isEditable',
        ]);
      });
    });

    describe('sortedIds()', () => {
      it('returns correct keyPath', () => {
        const id = 1;
        expect(NODE_STORE_SELECTORS.sortedIds({ id })).toEqual([
          NODE_STORE,
          'nodes',
          id,
          'calculated',
          'sortedIds',
        ]);
      });
    });

    describe('checklists()', () => {
      it('should return keyPath', () => {
        expect(NODE_STORE_SELECTORS.checklists({ id: 999 })).toEqual([
          NODE_STORE,
          'nodes',
          999,
          'checklists',
        ]);
      });
    });

    describe('routes()', () => {
      it('returns correct keyPath', () => {
        const id = 1;
        expect(NODE_STORE_SELECTORS.routes({ id })).toEqual([
          NODE_STORE,
          'nodes',
          id,
          'routes',
        ]);
      });
    });

    describe('checklistCount()', () => {
      it('should return keyPath', () => {
        expect(NODE_STORE_SELECTORS.checklistCount({ id: 999 })).toEqual([
          NODE_STORE,
          'nodes',
          999,
          'checklists',
          'length',
        ]);
      });
    });

    describe('nextNodes()', () => {
      it('should return keyPath', () => {
        expect(NODE_STORE_SELECTORS.nextNodes({ id: 999 })).toEqual([
          NODE_STORE,
          'nodes',
          999,
          'nextNodes',
        ]);
      });
    });

    describe('firstNextNodeId()', () => {
      it('should return keyPath', () => {
        expect(NODE_STORE_SELECTORS.firstNextNodeId({ id: 999 })).toEqual([
          NODE_STORE,
          'nodes',
          999,
          'nextNodes',
          0,
        ]);
      });
    });

    describe('firstChildrenId()', () => {
      it('should return keyPath', () => {
        expect(NODE_STORE_SELECTORS.firstChildrenId({ id: 999 })).toEqual([
          NODE_STORE,
          'nodes',
          999,
          'children',
          0,
        ]);
      });
    });

    describe('parentChecklists()', () => {
      it('should return keyPath', () => {
        expect(
          NODE_STORE_SELECTORS.parentChecklists({ parentNodeId: 999 }),
        ).toEqual([NODE_STORE, 'nodes', 999, 'checklists']);
      });
    });

    describe('parentParentNodeId()', () => {
      it('should return keyPath', () => {
        expect(
          NODE_STORE_SELECTORS.parentParentNodeId({ parentNodeId: 999 }),
        ).toEqual([NODE_STORE, 'nodes', 999, 'parentNodeId']);
      });
    });

    describe('parentNodeId()', () => {
      it('should return keyPath', () => {
        expect(NODE_STORE_SELECTORS.parentNodeId({ id: 999 })).toEqual([
          NODE_STORE,
          'nodes',
          999,
          'parentNodeId',
        ]);
      });
    });

    describe('id()', () => {
      it('should return keyPath', () => {
        expect(NODE_STORE_SELECTORS.id({ id: 999 })).toEqual([
          NODE_STORE,
          'nodes',
          999,
          'id',
        ]);
      });
    });

    describe('trail()', () => {
      it('should return keyPath', () => {
        expect(NODE_STORE_SELECTORS.trail({ id: 999 })).toEqual([
          NODE_STORE,
          'nodes',
          999,
          'calculated',
          'trail',
        ]);
      });
    });

    describe('organisationId()', () => {
      it('should return keyPath', () => {
        expect(NODE_STORE_SELECTORS.organisationId({ id: 999 })).toEqual([
          NODE_STORE,
          'nodes',
          999,
          'customData',
          'organisationId',
        ]);
      });
    });

    describe('timeNode()', () => {
      it('should return keyPath', () => {
        expect(NODE_STORE_SELECTORS.timeNode({ id: 999 })).toEqual([
          NODE_STORE,
          'timeNodes',
          999,
        ]);
      });
    });

    describe('viaNodePath()', () => {
      it('should return keyPath', () => {
        expect(NODE_STORE_SELECTORS.viaNodePath({ id: 999 })).toEqual([
          NODE_STORE,
          'nodes',
          999,
        ]);
        expect(
          NODE_STORE_SELECTORS.viaNodePath({
            id: 999,
            nodePath: ['customData', 'someKey'],
          }),
        ).toEqual([NODE_STORE, 'nodes', 999, 'customData', 'someKey']);
      });
    });

    describe('percentage()', () => {
      it('should return keyPath', () => {
        expect(NODE_STORE_SELECTORS.percentage({ id: 999 })).toMatchSnapshot();
      });
    });

    describe('lastModifiedBy', () => {
      it('should return a specific keyPath shape', () => {
        expect(
          NODE_STORE_SELECTORS.lastModifiedBy({ id: 1 }),
        ).toMatchSnapshot();
      });
    });

    describe('updatedAt', () => {
      it('should return a specific keyPath shape', () => {
        expect(NODE_STORE_SELECTORS.updatedAt({ id: 1 })).toMatchSnapshot();
      });
    });

    describe('index', () => {
      it('should return a specific keyPath shape', () => {
        expect(NODE_STORE_SELECTORS.index({ id: 1 })).toMatchSnapshot();
      });
    });
  });

  describe('#cachedChildren', () => {
    let cachedChildren;

    beforeEach(() => {
      NODE_STORE_CACHE_KEYS.cachedChildren = jest.fn((...args) => [
        'cachedChildren',
        ...args,
      ]);
      cachedChildren = NODE_STORE_SELECTORS.cachedChildren();
    });

    it('returns correct keyPath', () => {
      const props = { id: 1 };
      expect(cachedChildren.keyPath(props)).toEqual(
        NODE_STORE_SELECTORS.children(props),
      );
    });

    it('returns correct cacheKey', () => {
      expect(cachedChildren.cacheKey).toEqual(
        NODE_STORE_CACHE_KEYS.cachedChildren({ idProp: 'id' }),
      );
    });

    it('returns correct props', () => {
      expect(cachedChildren.props).toBeNull();
    });
  });

  describe('#cachedIndex', () => {
    let cachedIndex;

    beforeEach(() => {
      NODE_STORE_CACHE_KEYS.cachedIndex = jest.fn((...args) => [
        'cachedIndex',
        ...args,
      ]);
      cachedIndex = NODE_STORE_SELECTORS.cachedIndex();
    });

    it('returns correct keyPath', () => {
      const props = { parentNodeId: 1 };
      expect(cachedIndex.keyPath(props)).toEqual(
        NODE_STORE_SELECTORS.children({ id: props.parentNodeId }),
      );
    });

    it('returns correct cacheKey', () => {
      const obj = { idProp: 'id', parentNodeIdProp: 'parentNodeId' };
      expect(cachedIndex.cacheKey).toEqual(
        NODE_STORE_CACHE_KEYS.cachedIndex(obj),
      );
    });

    it('returns correct props', () => {
      const props = { id: 'id' };
      expect(cachedIndex.props(props)).toEqual(props.id);
    });

    it('getter returns correct result', () => {
      const childrenIds = [1];
      const id = 1;
      expect(cachedIndex.getter(childrenIds, id)).toEqual(0);
    });
  });

  describe('#eventIds', () => {
    it('returns correct keyPath', () => {
      const id = 1;
      expect(NODE_STORE_SELECTORS.eventIds({ id })).toEqual([
        NODE_STORE,
        'nodes',
        id,
        'events',
      ]);
    });
  });

  describe('#interestedPeople', () => {
    it('returns correct keyPath', () => {
      const id = 1;
      expect(NODE_STORE_SELECTORS.interestedPeople({ id })).toEqual([
        NODE_STORE,
        'nodes',
        id,
        'interestedPeople',
      ]);
    });
  });

  describe('#eventDataId', () => {
    it('returns correct keyPath', () => {
      const id = 1;
      expect(NODE_STORE_SELECTORS.eventDataId({ id })).toEqual([
        NODE_STORE,
        'nodes',
        id,
        'customData',
        'eventId',
      ]);
    });
  });

  describe('#eventDataIds', () => {
    let eventDataIds;

    beforeEach(() => {
      NODE_STORE_CACHE_KEYS.eventDataIds = jest.fn((...args) => [
        'eventDataIds',
        ...args,
      ]);
      eventDataIds = NODE_STORE_SELECTORS.eventDataIds({});
    });

    it('returns correct keyPath', () => {
      const props = { ids: [1, 2] };
      expect(eventDataIds.keyPath(props)).toEqual(
        props.ids.map(id => NODE_STORE_SELECTORS.eventDataId({ id })),
      );
    });

    it('returns correct cacheKey', () => {
      const obj = { idsProp: 'ids' };
      expect(eventDataIds.cacheKey).toEqual(
        NODE_STORE_CACHE_KEYS.eventDataIds(obj),
      );
    });

    it('returns correct props', () => {
      expect(eventDataIds.props).toBeNull();
    });

    it('getter returns correct result', () => {
      const ids = [1];
      expect(eventDataIds.getter(...ids, null)).toEqual(ids);
    });
  });

  describe('#addEventDataIds', () => {
    let addEventDataIds;

    beforeEach(() => {
      addEventDataIds = NODE_STORE_SELECTORS.addEventDataIds({});
    });

    it('returns correct keyPath', () => {
      NODE_STORE_SELECTORS.eventDataId = jest.fn(() => 'eventDataId');
      expect(addEventDataIds.keyPath({ nodes: [{ id: 1 }] })).toMatchSnapshot();
    });

    it('returns correct props', () => {
      expect(addEventDataIds.props({ nodes: [{ id: 1 }] })).toEqual([
        { id: 1 },
      ]);
    });

    it('returns correct getter', () => {
      expect(
        addEventDataIds.getter({ node: 1 }, false, [{ id: 1 }, { id: 2 }]),
      ).toMatchSnapshot();
    });
  });

  describe('#filterByTypes', () => {
    let filterByTypes;

    beforeEach(() => {
      NODE_STORE_CACHE_KEYS.filterByTypes = jest.fn((...args) => [
        'filterByTypes',
        ...args,
      ]);
      filterByTypes = NODE_STORE_SELECTORS.filterByTypes({});
    });

    it('returns correct keyPath', () => {
      const props = { ids: [1, 2] };
      expect(filterByTypes.keyPath(props)).toEqual(
        props.ids.map(id => NODE_STORE_SELECTORS.type({ id })),
      );
    });

    it('returns correct cacheKey', () => {
      const obj = { ids: 'ids', types: 'types' };
      expect(filterByTypes.cacheKey).toEqual(
        NODE_STORE_CACHE_KEYS.filterByTypes(obj),
      );
    });

    it('returns correct props', () => {
      const props = {
        ids: ['ids'],
        types: ['types'],
      };
      expect(filterByTypes.props.map(func => func(props))).toEqual(
        Object.values(props),
      );
    });

    it('getter calls reducer', () => {
      const types = [1];
      const ids = [2];
      const typesFilter = ['type'];
      NODE_STORE_UTILS.filterByTypesReducer = jest.fn(() => () => 1);
      expect(filterByTypes.getter(...types, ids, typesFilter)).toEqual(
        NODE_STORE_UTILS.filterByTypesReducer()(),
      );
    });
  });

  describe('#filterByStatuses', () => {
    let filterByStatuses;

    beforeEach(() => {
      NODE_STORE_CACHE_KEYS.filterByStatuses = jest.fn((...args) => [
        'filterByStatuses',
        ...args,
      ]);
      filterByStatuses = NODE_STORE_SELECTORS.filterByStatuses({});
    });

    it('returns correct keyPath', () => {
      const props = { ids: [1, 2] };
      expect(filterByStatuses.keyPath(props)).toEqual(
        props.ids.map(id => NODE_STORE_SELECTORS.status({ id })),
      );
    });

    it('returns correct cacheKey', () => {
      const obj = { ids: 'ids', statuses: 'statuses' };
      expect(filterByStatuses.cacheKey).toEqual(
        NODE_STORE_CACHE_KEYS.filterByStatuses(obj),
      );
    });

    it('returns correct props', () => {
      const props = {
        ids: ['ids'],
        statuses: ['statuses'],
      };
      expect(filterByStatuses.props.map(func => func(props))).toEqual(
        Object.values(props),
      );
    });

    it('getter calls reducer', () => {
      const statuses = [1];
      const ids = [2];
      const statusesFilter = ['status'];
      NODE_STORE_UTILS.filterByStatusesReducer = jest.fn(() => () => 1);
      expect(filterByStatuses.getter(...statuses, ids, statusesFilter)).toEqual(
        NODE_STORE_UTILS.filterByStatusesReducer()(),
      );
    });
  });

  describe('#filterAndSortByTime', () => {
    let filterAndSortByTime;

    beforeEach(() => {
      NODE_STORE_CACHE_KEYS.filterAndSortByTime = jest.fn();
      filterAndSortByTime = NODE_STORE_SELECTORS.filterAndSortByTime({});
    });

    it('returns correct keyPath', () => {
      const props = { nodes: [{ dataId: 1 }] };
      expect(filterAndSortByTime.keyPath(props)).toEqual(
        props.nodes.map(({ dataId }) =>
          EVENT_STORE_DATA_SELECTORS.eventType({ id: dataId }),
        ),
      );
    });

    it('returns correct props', () => {
      const props = {
        date: ['date'],
        nodes: ['nodes'],
      };
      expect(filterAndSortByTime.props.map(func => func(props))).toEqual(
        Object.values(props),
      );
    });

    it('getter calls reducer', () => {
      NODE_STORE_UTILS.filterAndSortByTime = jest.fn(
        () => 'filterAndSortByTime',
      );
      expect(filterAndSortByTime.getter([1])).toEqual('filterAndSortByTime');
    });
  });

  describe('#filterCalculatedEvents', () => {
    let filterCalculatedEvents;

    beforeEach(() => {
      NODE_STORE_CACHE_KEYS.filterCalculatedEvents = jest.fn();
      filterCalculatedEvents = NODE_STORE_SELECTORS.filterCalculatedEvents({
        grouping: 'grouping',
        hasTime: 'hasTime',
      });
    });

    it('returns correct props', () => {
      const props = {
        grouping: 'grouping 1',
        hasTime: 'hasTime 1',
      };
      expect(filterCalculatedEvents.props.map(func => func(props))).toEqual(
        Object.values(props),
      );
      expect(filterCalculatedEvents.props.map(func => func({}))).toEqual([
        'grouping',
        'hasTime',
      ]);
    });

    it('getter calls map', () => {
      NODE_STORE_UTILS.calculatedEventsFilter = jest.fn(() => () =>
        'calculatedEventsFilter',
      );
      expect(filterCalculatedEvents.getter()).toMatchSnapshot();
      expect(filterCalculatedEvents.getter([{ id: 1 }])).toMatchSnapshot();
    });
  });

  describe('#filterByNotMatchingTime', () => {
    let filterByNotMatchingTime;

    beforeEach(() => {
      filterByNotMatchingTime = NODE_STORE_SELECTORS.filterByNotMatchingTime(
        {},
      );
    });

    it('returns correct keyPath', () => {
      const props = { ids: [1] };

      expect(filterByNotMatchingTime.keyPath(props)).toEqual(
        props.ids.map(id =>
          NODE_STORE_SELECTORS.calculatedStartTimeValue({ id }),
        ),
      );
    });

    it('returns correct props', () => {
      const props = {
        nodes: 'nodes',
      };
      expect(filterByNotMatchingTime.props.map(func => func(props))).toEqual(
        Object.values(props),
      );
    });

    it('getter calls map', () => {
      NODE_STORE_UTILS.filterByNotMatchingTime = jest.fn(() => () =>
        'filterByNotMatchingTime',
      );
      expect(filterByNotMatchingTime.getter([{ id: 1 }])).toMatchSnapshot();
    });
  });

  describe('#calculatedTime', () => {
    it('returns correct keyPath', () => {
      const id = 1;
      expect(NODE_STORE_SELECTORS.calculatedTime({ id })).toEqual([
        NODE_STORE,
        'nodes',
        id,
        'calculated',
        'time',
      ]);
    });
  });

  describe('#calculatedEvents', () => {
    it('returns correct keyPath', () => {
      const id = 1;
      expect(NODE_STORE_SELECTORS.calculatedEvents({ id })).toEqual([
        NODE_STORE,
        'nodes',
        id,
        'calculated',
        'events',
      ]);
    });
  });

  describe('#cachedCalculatedEvents', () => {
    let cachedCalculatedEvents;

    beforeEach(() => {
      cachedCalculatedEvents = NODE_STORE_SELECTORS.cachedCalculatedEvents();
    });

    it('returns correct keyPath', () => {
      expect(cachedCalculatedEvents.keyPath({ id: 1 })).toEqual(
        NODE_STORE_SELECTORS.calculatedEvents({ id: 1 }),
      );
    });
  });

  describe('#calculatedUploadPhotoDialogId', () => {
    it('returns correct keyPath', () => {
      const id = 1;
      expect(
        NODE_STORE_SELECTORS.calculatedUploadPhotoDialogId({ id }),
      ).toEqual([NODE_STORE, 'nodes', id, 'calculated', 'uploadPhotoDialogId']);
    });
  });

  describe('calculatedShowChecklists()', () => {
    it('returns correct keyPath', () => {
      const id = 1;
      expect(NODE_STORE_SELECTORS.calculatedShowChecklists({ id })).toEqual([
        NODE_STORE,
        'nodes',
        id,
        'calculated',
        'showChecklists',
      ]);
    });
  });

  describe('calculatedSelectedIds()', () => {
    it('returns correct keyPath', () => {
      const id = 1;
      expect(NODE_STORE_SELECTORS.calculatedSelectedIds({ id })).toEqual([
        NODE_STORE,
        'nodes',
        id,
        'calculated',
        'selectedIds',
      ]);
    });
  });

  describe('calculatedClickMode()', () => {
    it('returns correct keyPath', () => {
      const id = 1;
      expect(NODE_STORE_SELECTORS.calculatedClickMode({ id })).toEqual([
        NODE_STORE,
        'nodes',
        id,
        'calculated',
        'clickMode',
      ]);
    });
  });

  describe('calculatedPreviewId()', () => {
    it('returns correct keyPath', () => {
      const id = 1;
      expect(NODE_STORE_SELECTORS.calculatedPreviewId({ id })).toEqual([
        NODE_STORE,
        'nodes',
        id,
        'calculated',
        'previewId',
      ]);
    });
  });

  describe('calculatedOngoing()', () => {
    it('returns correct keyPath', () => {
      const id = 1;
      expect(NODE_STORE_SELECTORS.calculatedOngoing({ id })).toEqual([
        NODE_STORE,
        'nodes',
        id,
        'calculated',
        'ongoing',
      ]);
    });
  });

  describe('calculatedFetching()', () => {
    it('returns correct keyPath', () => {
      const id = 1;
      expect(NODE_STORE_SELECTORS.calculatedFetching({ id })).toEqual([
        NODE_STORE,
        'nodes',
        id,
        'calculated',
        'fetching',
      ]);
    });
  });

  describe('calculatedLayoutRecheck()', () => {
    it('returns correct keyPath', () => {
      const id = 1;
      expect(NODE_STORE_SELECTORS.calculatedLayoutRecheck({ id })).toEqual([
        NODE_STORE,
        'nodes',
        id,
        'calculated',
        'layoutRecheck',
      ]);
    });
  });

  describe('calculatedLayout()', () => {
    it('returns correct keyPath', () => {
      const id = 1;
      expect(NODE_STORE_SELECTORS.calculatedLayout({ id })).toEqual([
        NODE_STORE,
        'nodes',
        id,
        'calculated',
        'layout',
      ]);
    });
  });

  describe('calculatedSelectedId()', () => {
    it('returns correct keyPath', () => {
      const id = 1;
      expect(NODE_STORE_SELECTORS.calculatedSelectedId({ id })).toEqual([
        NODE_STORE,
        'nodes',
        id,
        'calculated',
        'selectedId',
      ]);
    });
  });

  describe('calculatedShowDetail()', () => {
    it('returns correct keyPath', () => {
      const id = 1;
      expect(NODE_STORE_SELECTORS.calculatedShowDetail({ id })).toEqual([
        NODE_STORE,
        'nodes',
        id,
        'calculated',
        'showDetail',
      ]);
    });
  });

  describe('calculatedPreviousLayout()', () => {
    it('returns correct keyPath', () => {
      const id = 1;
      expect(NODE_STORE_SELECTORS.calculatedPreviousLayout({ id })).toEqual([
        NODE_STORE,
        'nodes',
        id,
        'calculated',
        'previousLayout',
      ]);
    });
  });

  describe('calculatedStatus()', () => {
    it('returns correct keyPath', () => {
      const id = 1;
      expect(NODE_STORE_SELECTORS.calculatedStatus({ id })).toEqual([
        NODE_STORE,
        'nodes',
        id,
        'calculated',
        'status',
      ]);
    });
  });

  describe('calculatedMedicalSeverity()', () => {
    it('returns correct keyPath', () => {
      const id = 1;
      expect(NODE_STORE_SELECTORS.calculatedMedicalSeverity({ id })).toEqual([
        NODE_STORE,
        'nodes',
        id,
        ...MEDICAL_PATHS.calculatedSeverity,
      ]);
    });
  });

  describe('calculatedMedicalCount()', () => {
    it('returns correct keyPath', () => {
      const id = 1;
      expect(NODE_STORE_SELECTORS.calculatedMedicalCount({ id })).toEqual([
        NODE_STORE,
        'nodes',
        id,
        ...MEDICAL_PATHS.calculatedCount,
      ]);
    });
  });

  describe('calculatedDietaryCount()', () => {
    it('returns correct keyPath', () => {
      const id = 1;
      expect(NODE_STORE_SELECTORS.calculatedDietaryCount({ id })).toEqual([
        NODE_STORE,
        'nodes',
        id,
        ...DIETARY_PATHS.calculatedCount,
      ]);
    });
  });

  describe('calculatedStart()', () => {
    it('returns correct keyPath', () => {
      const id = 1;
      expect(NODE_STORE_SELECTORS.calculatedStart({ id })).toEqual([
        NODE_STORE,
        'nodes',
        id,
        'calculated',
        'startTime',
      ]);
    });
  });

  describe('calculatedEnd()', () => {
    it('returns correct keyPath', () => {
      const id = 1;
      expect(NODE_STORE_SELECTORS.calculatedEnd({ id })).toEqual([
        NODE_STORE,
        'nodes',
        id,
        'calculated',
        'endTime',
      ]);
    });
  });

  describe('calculatedFirstEventId()', () => {
    it('returns correct keyPath', () => {
      const id = 1;
      expect(NODE_STORE_SELECTORS.calculatedFirstEventId({ id })).toEqual([
        NODE_STORE,
        'nodes',
        id,
        'calculated',
        'firstEventId',
      ]);
    });
  });

  describe('calculatedActive()', () => {
    it('returns correct keyPath', () => {
      const id = 1;
      expect(NODE_STORE_SELECTORS.calculatedActive({ id })).toEqual([
        NODE_STORE,
        'nodes',
        id,
        'calculated',
        'active',
      ]);
    });
  });

  describe('calculatedRouteFound()', () => {
    it('returns correct keyPath', () => {
      const id = 1;
      expect(NODE_STORE_SELECTORS.calculatedRouteFound({ id })).toEqual([
        NODE_STORE,
        'nodes',
        id,
        'calculated',
        'routeFound',
      ]);
    });
  });

  describe('#calculatedStartTime', () => {
    it('returns correct keyPath', () => {
      const id = 1;
      expect(NODE_STORE_SELECTORS.calculatedStartTime({ id })).toEqual([
        NODE_STORE,
        'nodes',
        id,
        'calculated',
        'time',
        'start',
      ]);
    });
  });

  describe('#calculatedStartTimeValue', () => {
    it('returns correct keyPath', () => {
      const id = 1;
      expect(NODE_STORE_SELECTORS.calculatedStartTimeValue({ id })).toEqual([
        NODE_STORE,
        'nodes',
        id,
        'calculated',
        'time',
        'start',
        'value',
      ]);
    });
  });

  describe('#calculatedStartTimeReal', () => {
    it('returns correct keyPath', () => {
      const id = 1;
      expect(NODE_STORE_SELECTORS.calculatedStartTimeReal({ id })).toEqual([
        NODE_STORE,
        'nodes',
        id,
        'calculated',
        'time',
        'start',
        'real',
      ]);
    });
  });

  describe('#calculatedStartTimeZoneId', () => {
    it('returns correct keyPath', () => {
      const id = 1;
      expect(NODE_STORE_SELECTORS.calculatedStartTimeZoneId({ id })).toEqual([
        NODE_STORE,
        'nodes',
        id,
        'calculated',
        'time',
        'start',
        'timeZoneId',
      ]);
    });
  });

  describe('#calculatedStartTimeMode', () => {
    it('returns correct keyPath', () => {
      const id = 1;
      expect(NODE_STORE_SELECTORS.calculatedStartTimeMode({ id })).toEqual([
        NODE_STORE,
        'nodes',
        id,
        'calculated',
        'time',
        'start',
        'mode',
      ]);
    });
  });

  describe('#calculatedStartTimeMoment', () => {
    let calculatedStartTimeMoment;

    beforeEach(() => {
      NODE_STORE_CACHE_KEYS.calculatedStartTimeMoment = jest.fn((...args) => [
        'calculatedStartTimeMoment',
        ...args,
      ]);
      calculatedStartTimeMoment = NODE_STORE_SELECTORS.calculatedStartTimeMoment();
    });

    it('returns correct keyPath', () => {
      const props = { id: 1 };
      expect(
        calculatedStartTimeMoment.keyPath.map(func => func(props)),
      ).toEqual([
        NODE_STORE_SELECTORS.calculatedStartTimeValue({ id: props.id }),
        NODE_STORE_SELECTORS.calculatedStartTimeZoneId({ id: props.id }),
      ]);
    });

    it('returns correct cacheKey', () => {
      const obj = { idProp: 'id' };
      expect(calculatedStartTimeMoment.cacheKey).toEqual(
        NODE_STORE_CACHE_KEYS.calculatedStartTimeMoment(obj),
      );
    });

    it('returns correct props', () => {
      expect(calculatedStartTimeMoment.props).toBeNull();
    });

    it('getter returns util', () => {
      expect(calculatedStartTimeMoment.getter).toBe(
        NODE_STORE_UTILS.calculatedTimeMoment,
      );
    });
  });

  describe('#calculatedEndTime', () => {
    it('returns correct keyPath', () => {
      const id = 1;
      expect(NODE_STORE_SELECTORS.calculatedEndTime({ id })).toEqual([
        NODE_STORE,
        'nodes',
        id,
        'calculated',
        'time',
        'end',
      ]);
    });
  });

  describe('#calculatedEndTimeValue', () => {
    it('returns correct keyPath', () => {
      const id = 1;
      expect(NODE_STORE_SELECTORS.calculatedEndTimeValue({ id })).toEqual([
        NODE_STORE,
        'nodes',
        id,
        'calculated',
        'time',
        'end',
        'value',
      ]);
    });
  });

  describe('#calculatedEndTimeZoneId', () => {
    it('returns correct keyPath', () => {
      const id = 1;
      expect(NODE_STORE_SELECTORS.calculatedEndTimeZoneId({ id })).toEqual([
        NODE_STORE,
        'nodes',
        id,
        'calculated',
        'time',
        'end',
        'timeZoneId',
      ]);
    });
  });

  describe('#calculatedEndTimeMode', () => {
    it('returns correct keyPath', () => {
      const id = 1;
      expect(NODE_STORE_SELECTORS.calculatedEndTimeMode({ id })).toEqual([
        NODE_STORE,
        'nodes',
        id,
        'calculated',
        'time',
        'end',
        'mode',
      ]);
    });
  });

  describe('#calculatedEndTimeMoment', () => {
    let calculatedEndTimeMoment;

    beforeEach(() => {
      NODE_STORE_CACHE_KEYS.calculatedEndTimeMoment = jest.fn((...args) => [
        'calculatedEndTimeMoment',
        ...args,
      ]);
      calculatedEndTimeMoment = NODE_STORE_SELECTORS.calculatedEndTimeMoment();
    });

    it('returns correct keyPath', () => {
      const props = { id: 1 };
      expect(calculatedEndTimeMoment.keyPath.map(func => func(props))).toEqual([
        NODE_STORE_SELECTORS.calculatedEndTimeValue({ id: props.id }),
        NODE_STORE_SELECTORS.calculatedEndTimeZoneId({ id: props.id }),
      ]);
    });

    it('returns correct cacheKey', () => {
      const obj = { idProp: 'id' };
      expect(calculatedEndTimeMoment.cacheKey).toEqual(
        NODE_STORE_CACHE_KEYS.calculatedEndTimeMoment(obj),
      );
    });

    it('returns correct props', () => {
      expect(calculatedEndTimeMoment.props).toBeNull();
    });

    it('getter returns util', () => {
      expect(calculatedEndTimeMoment.getter).toBe(
        NODE_STORE_UTILS.calculatedTimeMoment,
      );
    });
  });

  describe('#calculatedStartEndTimes', () => {
    let calculatedStartEndTimes;

    beforeEach(() => {
      NODE_STORE_CACHE_KEYS.calculatedStartEndTimes = jest.fn((...args) => [
        'calculatedStartEndTimes',
        ...args,
      ]);
      calculatedStartEndTimes = NODE_STORE_SELECTORS.calculatedStartEndTimes();
    });

    it('returns correct keyPath', () => {
      const props = { ids: [1, 2] };
      expect(calculatedStartEndTimes.keyPath(props)).toEqual(
        props.ids.map(id => NODE_STORE_SELECTORS.calculatedTime({ id })),
      );
    });

    it('returns correct cacheKey', () => {
      const obj = { idsProp: 'ids' };
      expect(calculatedStartEndTimes.cacheKey).toEqual(
        NODE_STORE_CACHE_KEYS.calculatedStartEndTimes(obj),
      );
    });

    it('returns correct props', () => {
      const props = { ids: 'ids' };
      expect(calculatedStartEndTimes.props(props)).toEqual(props.ids);
    });

    it('getter calls reducer', () => {
      const times = [1];
      const ids = [2];
      NODE_STORE_UTILS.idValuesReducer = jest.fn(() => 1);
      expect(calculatedStartEndTimes.getter(...times, ids)).toEqual(
        NODE_STORE_UTILS.idValuesReducer(),
      );
    });
  });

  describe('#calculatedStartTimeValues', () => {
    let calculatedStartTimeValues;

    beforeEach(() => {
      NODE_STORE_CACHE_KEYS.calculatedStartTimeValues = jest.fn((...args) => [
        'calculatedStartTimeValues',
        ...args,
      ]);
      calculatedStartTimeValues = NODE_STORE_SELECTORS.calculatedStartTimeValues();
    });

    it('returns correct keyPath', () => {
      const props = { ids: [1, 2] };
      expect(calculatedStartTimeValues.keyPath(props)).toEqual(
        props.ids.map(id =>
          NODE_STORE_SELECTORS.calculatedStartTimeValue({ id }),
        ),
      );
    });

    it('returns correct cacheKey', () => {
      const obj = { idsProp: 'ids', sort: true };
      expect(calculatedStartTimeValues.cacheKey).toEqual(
        NODE_STORE_CACHE_KEYS.calculatedStartTimeValues(obj),
      );
    });

    it('returns correct props', () => {
      const props = { ids: 'ids' };
      expect(calculatedStartTimeValues.props(props)).toEqual(props.ids);
    });

    it('getter calls reducer then sorts', () => {
      const times = [1];
      const ids = [2];
      NODE_STORE_UTILS.idValueReducer = jest.fn(() => [
        { value: 'bValue' },
        { value: 'aValue' },
      ]);
      expect(calculatedStartTimeValues.getter(...times, ids)).toEqual([
        { value: 'aValue' },
        { value: 'bValue' },
      ]);
    });

    it('getter calls reducer then not sorts', () => {
      const times = [1];
      const ids = [2];
      calculatedStartTimeValues = NODE_STORE_SELECTORS.calculatedStartTimeValues(
        { sort: false },
      );
      NODE_STORE_UTILS.idValueReducer = jest.fn(() => [
        { value: 'bValue' },
        { value: 'aValue' },
      ]);
      expect(calculatedStartTimeValues.getter(...times, ids)).toEqual(
        NODE_STORE_UTILS.idValueReducer(),
      );
    });
  });

  describe('#calculatedTrail', () => {
    it('returns correct keyPath', () => {
      const id = 1;
      expect(NODE_STORE_SELECTORS.calculatedTrail({ id })).toEqual([
        NODE_STORE,
        'nodes',
        id,
        'calculated',
        'trail',
      ]);
    });
  });

  describe('#calculatedTrailParent', () => {
    let calculatedTrailParent;

    beforeEach(() => {
      NODE_STORE_CACHE_KEYS.calculatedTrailParent = jest.fn((...args) => [
        'calculatedTrailParent',
        ...args,
      ]);
      calculatedTrailParent = NODE_STORE_SELECTORS.calculatedTrailParent();
    });

    it('returns correct keyPath', () => {
      const props = { id: 1 };
      expect(calculatedTrailParent.keyPath(props)).toEqual(
        NODE_STORE_SELECTORS.calculatedTrail({ id: props.id }),
      );
    });

    it('returns correct cacheKey', () => {
      const obj = { idProp: 'id' };
      expect(calculatedTrailParent.cacheKey).toEqual(
        NODE_STORE_CACHE_KEYS.calculatedTrailParent(obj),
      );
    });

    it('returns correct props', () => {
      const props = { id: 'id' };
      expect(calculatedTrailParent.props(props)).toEqual(props.id);
    });

    it('getter returns util', () => {
      expect(calculatedTrailParent.getter).toBe(
        NODE_STORE_UTILS.getParentInTrail,
      );
    });
  });

  describe('#sortByProp', () => {
    let sortByProp;

    beforeEach(() => {
      NODE_STORE_CACHE_KEYS.sortByProp = jest.fn((...args) => [
        'sortByProp',
        ...args,
      ]);
      sortByProp = NODE_STORE_SELECTORS.sortByProp();
    });

    it('returns correct keyPath', () => {
      const props = { ids: [1, 2] };
      expect(sortByProp.keyPath(props)).toEqual(
        props.ids.map(id =>
          NODE_STORE_SELECTORS.nodeProp({ id, path: NODE_PATHS.createdAt }),
        ),
      );
    });

    it('returns correct cacheKey', () => {
      const obj = {
        ids: 'ids',
        path: NODE_PATHS.createdAt,
        reverse: true,
      };
      expect(sortByProp.cacheKey).toEqual(
        NODE_STORE_CACHE_KEYS.sortByProp(obj),
      );
    });

    it('returns correct props', () => {
      const props = { ids: 'ids' };
      expect(sortByProp.props(props)).toEqual([props.ids]);
    });

    it('getter sorts correctly', () => {
      const values = [1, 2, 3];
      const ids = [20, 30, null];
      expect(sortByProp.getter(...values, ids)).toEqual([30, 20]);
    });

    it('getter sorts correctly not in reverse', () => {
      const values = [1, 2, 3];
      const ids = [20, 30, null];
      expect(
        NODE_STORE_SELECTORS.sortByProp({ reverse: false }).getter(
          ...values,
          ids,
        ),
      ).toEqual([20, 30]);
    });
  });

  describe('getNodeSetting()', () => {
    it('should return keyPath', () => {
      expect(
        NODE_STORE_SELECTORS.getNodeSetting({ id: 999, settingKey: 'test' }),
      ).toMatchSnapshot();
    });
  });
  describe('hashkey()', () => {
    it('should return keyPath', () => {
      expect(NODE_STORE_SELECTORS.hashkey({ id: 999 })).toMatchSnapshot();
    });
  });
  describe('hashkey()', () => {
    it('should return keyPath', () => {
      expect(
        NODE_STORE_SELECTORS.getNodeSettingNodeId({ id: 999, settingKey: '' }),
      ).toMatchSnapshot();
    });
  });
  describe('hashkeyDescription()', () => {
    it('should return keyPath', () => {
      expect(
        NODE_STORE_SELECTORS.hashkeyDescription({ haskeyDescription: 'abcd' }),
      ).toMatchSnapshot();
    });
  });
  describe('hashkeyDescription()', () => {
    it('should return keyPath', () => {
      expect(NODE_STORE_SELECTORS.disableRYI({ id: 1 })).toMatchSnapshot();
    });
  });

  describe('seats', () => {
    it('should return keyPath', () => {
      expect(NODE_STORE_SELECTORS.seats({ id: 1 })).toEqual([
        NODE_STORE,
        'nodes',
        1,
        SEATS,
      ]);
    });
  });

  describe('participants', () => {
    it('should return keyPath', () => {
      expect(NODE_STORE_SELECTORS.participants({ id: 1 })).toEqual([
        NODE_STORE,
        'nodes',
        1,
        PARTICIPANTS,
      ]);
    });
  });

  describe('participantsLinks', () => {
    it('should return keyPath', () => {
      expect(NODE_STORE_SELECTORS.participantLinks({ id: 1 })).toEqual([
        NODE_STORE,
        'nodes',
        1,
        'participantLinks',
      ]);
    });
  });

  describe('linkType', () => {
    it('should return keyPath', () => {
      expect(NODE_STORE_SELECTORS.linkType({ id: 1 })).toEqual([
        NODE_STORE,
        'links',
        1,
        'type',
      ]);
    });
  });

  describe('linkProp', () => {
    it('should return keyPath', () => {
      expect(NODE_STORE_SELECTORS.linkProp([1])({ id: 1 })).toEqual([
        NODE_STORE,
        'links',
        1,
        1,
      ]);
    });
  });

  describe('firstParticipant', () => {
    it('should return keyPath', () => {
      expect(NODE_STORE_SELECTORS.firstParticipant({ id: 1 })).toEqual([
        NODE_STORE,
        'nodes',
        1,
        PARTICIPANTS,
        '0',
      ]);
    });
  });

  describe('calculatedParticipants', () => {
    it('should return keyPath', () => {
      expect(
        NODE_STORE_SELECTORS.calculatedParticipants({ id: 1 }),
      ).toMatchSnapshot();
    });
  });

  describe('calculatedRoutes', () => {
    it('should return keyPath', () => {
      expect(NODE_STORE_SELECTORS.calculatedRoutes({ id: 1 })).toEqual([
        NODE_STORE,
        'nodes',
        1,
        'calculated',
        'routes',
      ]);
    });
  });

  describe('calculatedGalleryId', () => {
    it('should return keyPath', () => {
      expect(NODE_STORE_SELECTORS.calculatedGalleryId({ id: 1 })).toEqual([
        NODE_STORE,
        'nodes',
        1,
        'calculated',
        'galleryId',
      ]);
    });
  });

  describe('calculatedTimelineId', () => {
    it('should return keyPath', () => {
      expect(NODE_STORE_SELECTORS.calculatedTimelineId({ id: 1 })).toEqual([
        NODE_STORE,
        'nodes',
        1,
        'calculated',
        'timelineId',
      ]);
    });
  });

  describe('calculatedVisibleChildren', () => {
    it('should return keyPath', () => {
      expect(NODE_STORE_SELECTORS.calculatedVisibleChildren({ id: 1 })).toEqual(
        [NODE_STORE, 'nodes', 1, 'visibleChildren'],
      );
    });
  });

  describe('calculatedPrivateIds', () => {
    it('should return keyPath', () => {
      expect(NODE_STORE_SELECTORS.calculatedPrivateIds({ id: 1 })).toEqual([
        NODE_STORE,
        'nodes',
        1,
        'privateIds',
      ]);
    });
  });

  describe('calculatedHiddenIds', () => {
    it('should return keyPath', () => {
      expect(NODE_STORE_SELECTORS.calculatedHiddenIds({ id: 1 })).toEqual([
        NODE_STORE,
        'nodes',
        1,
        'hiddenIds',
      ]);
    });
  });

  describe('calculatedOnlyMeIds', () => {
    it('should return keyPath', () => {
      expect(NODE_STORE_SELECTORS.calculatedOnlyMeIds({ id: 1 })).toEqual([
        NODE_STORE,
        'nodes',
        1,
        'onlyMeIds',
      ]);
    });
  });

  describe('groups', () => {
    it('should return keyPath', () => {
      expect(NODE_STORE_SELECTORS.groups({ id: 1 })).toEqual([
        NODE_STORE,
        'nodes',
        1,
        'groups',
      ]);
    });
  });

  describe('customDataStartMode', () => {
    it('should return keyPath', () => {
      expect(NODE_STORE_SELECTORS.customDataStartMode({ id: 1 })).toEqual([
        NODE_STORE,
        'nodes',
        1,
        'customData',
        'start',
        'mode',
      ]);
    });
  });

  describe('calculatedRouteError', () => {
    it('should return keyPath', () => {
      expect(NODE_STORE_SELECTORS.calculatedRouteError({ id: 1 })).toEqual([
        NODE_STORE,
        'nodes',
        1,
        'calculated',
        'routeError',
      ]);
    });
  });

  describe('calculatedIndex', () => {
    it('should return keyPath', () => {
      expect(NODE_STORE_SELECTORS.calculatedIndex({ id: 1 })).toEqual([
        NODE_STORE,
        'nodes',
        1,
        'calculated',
        'index',
      ]);
    });
  });

  describe('calculatedOrigin', () => {
    it('should return keyPath', () => {
      expect(NODE_STORE_SELECTORS.calculatedOrigin({ id: 1 })).toEqual([
        NODE_STORE,
        'nodes',
        1,
        'calculated',
        'origin',
      ]);
    });
  });

  describe('calculatedDestination', () => {
    it('should return keyPath', () => {
      expect(NODE_STORE_SELECTORS.calculatedDestination({ id: 1 })).toEqual([
        NODE_STORE,
        'nodes',
        1,
        'calculated',
        'destination',
      ]);
    });
  });

  describe('calculatedMarkerIds', () => {
    it('should return keyPath', () => {
      expect(NODE_STORE_SELECTORS.calculatedMarkerIds({ id: 1 })).toEqual([
        NODE_STORE,
        'nodes',
        1,
        'calculated',
        'markerIds',
      ]);
    });
  });

  describe('calculatedDistance', () => {
    it('should return keyPath', () => {
      expect(NODE_STORE_SELECTORS.calculatedDistance({ id: 1 })).toEqual([
        NODE_STORE,
        'nodes',
        1,
        'calculated',
        'distance',
      ]);
    });
  });

  describe('calculatedPlaceIds', () => {
    it('should return keyPath', () => {
      expect(NODE_STORE_SELECTORS.calculatedPlaceIds({ id: 1 })).toEqual([
        NODE_STORE,
        'nodes',
        1,
        'calculated',
        'placeIds',
      ]);
    });
  });

  describe('calculatedRouteIds', () => {
    it('should return keyPath', () => {
      expect(NODE_STORE_SELECTORS.calculatedRouteIds({ id: 1 })).toEqual([
        NODE_STORE,
        'nodes',
        1,
        'calculated',
        'routeIds',
      ]);
    });
  });

  describe('calculatedEvents', () => {
    it('should return keyPath', () => {
      expect(
        NODE_STORE_SELECTORS.calculatedEvents({ id: 1 }),
      ).toMatchSnapshot();
    });
  });

  describe('cachedCalculatedEvents', () => {
    describe('keyPath', () => {
      it('should return keyPath', () => {
        expect(
          NODE_STORE_SELECTORS.cachedCalculatedEvents().keyPath({ id: 1 }),
        ).toMatchSnapshot();
      });
    });
  });

  describe('filterByNotMatchingTime', () => {
    describe('keyPath', () => {
      it('should return keyPath', () => {
        expect(
          NODE_STORE_SELECTORS.filterByNotMatchingTime({}).keyPath({
            ids: [1, 2],
          }),
        ).toMatchSnapshot();
      });
    });

    describe('props', () => {
      it('should return startEndTimeProps', () => {
        expect(
          NODE_STORE_SELECTORS.filterByNotMatchingTime({
            nodesProp: 'startEndTimes',
          }).props[0]({ startEndTimes: [1] }),
        ).toEqual([1]);
      });
    });
  });

  describe('ratings', () => {
    it('should return keyPath', () => {
      expect(NODE_STORE_SELECTORS.ratings({ id: 1 })).toMatchSnapshot();
    });
  });

  describe('rating', () => {
    it('should return keyPath', () => {
      expect(NODE_STORE_SELECTORS.rating({ id: 1 })).toMatchSnapshot();
    });
  });

  describe('reactions', () => {
    it('should return keyPath', () => {
      expect(NODE_STORE_SELECTORS.reactions({ id: 1 })).toMatchSnapshot();
    });
  });

  describe('nodeTransferStatus()', () => {
    it('should return keyPath', () => {
      const props = { id: 'id' };
      expect(NODE_STORE_SELECTORS.nodeTransferStatus(props)).toEqual([
        NODE_STORE,
        'nodes',
        'id',
        'calculated',
        'transfer',
        'status',
      ]);
    });
  });
  describe('nodeTransferTo()', () => {
    it('should return keyPath', () => {
      const props = { id: 'id' };
      expect(NODE_STORE_SELECTORS.nodeTransferTo(props)).toEqual([
        NODE_STORE,
        'nodes',
        'id',
        'calculated',
        'transfer',
        'transferTo',
      ]);
    });
  });
  describe('nodeTransferToUserId()', () => {
    it('should return keyPath', () => {
      const props = { id: 'id' };
      expect(NODE_STORE_SELECTORS.nodeTransferToUserId(props)).toEqual([
        NODE_STORE,
        'nodes',
        'id',
        'calculated',
        'transfer',
        'transferToUserId',
      ]);
    });
  });
  describe('nodeTransferToken()', () => {
    it('should return keyPath', () => {
      const props = { id: 'id' };
      expect(NODE_STORE_SELECTORS.nodeTransferToken(props)).toEqual([
        NODE_STORE,
        'nodes',
        'id',
        'calculated',
        'transfer',
        'notificationToken',
      ]);
    });
  });
  describe('nodeTransferToken()', () => {
    it('should return keyPath', () => {
      const props = { id: 'id' };
      expect(LINK_STORE_SELECTORS.userNode(props)).toEqual([
        'nodeStore',
        'links',
        'id',
        'userNode',
      ]);
    });
  });
  describe('calculatedNodesEvents', () => {
    it('should return keyPath', () => {
      const props = { id: 'id' };
      expect(NODE_STORE_SELECTORS.calculatedNodesEvents(props)).toEqual([
        'nodeStore',
        'calculatedNodes',
        'id',
        'calculated',
        'events',
      ]);
    });
  });
  describe('cachedCalculatedNodesEventIds', () => {
    it('should return keyPath', () => {
      const props = { idProp: 'id' };
      expect(
        NODE_STORE_SELECTORS.cachedCalculatedNodesEventIds(props).keyPath({
          id: 'id',
        }),
      ).toEqual(['nodeStore', 'calculatedNodes', 'id', 'calculated', 'events']);
    });

    it('should return keyPath even if idProp is not present', () => {
      expect(
        NODE_STORE_SELECTORS.cachedCalculatedNodesEventIds().keyPath({
          id: 'id',
        }),
      ).toEqual(['nodeStore', 'calculatedNodes', 'id', 'calculated', 'events']);
    });
  });
  describe('calculatedEventId', () => {
    it('should return keyPath', () => {
      const props = { id: 'id', eid: 'eid' };
      expect(NODE_STORE_SELECTORS.calculatedEventId(props)).toEqual([
        'nodeStore',
        'nodes',
        'id',
        'calculated',
        'eventObjs',
        'eid',
        'id',
      ]);
    });
  });
  describe('calculatedEventType', () => {
    it('should return keyPath', () => {
      const props = { id: 'id', eid: 'eid' };
      expect(NODE_STORE_SELECTORS.calculatedEventType(props)).toEqual([
        'nodeStore',
        'nodes',
        'id',
        'calculated',
        'eventObjs',
        'eid',
        'type',
      ]);
    });
  });
  describe('calculatedEventCancellation', () => {
    it('should return keyPath', () => {
      const props = { id: 'id', eid: 'eid' };
      expect(NODE_STORE_SELECTORS.calculatedEventCancellation(props)).toEqual([
        'nodeStore',
        'nodes',
        'id',
        'calculated',
        'eventObjs',
        'eid',
        'cancellation',
      ]);
    });
  });
  describe('calculatedEventSubType', () => {
    it('should return keyPath', () => {
      const props = { id: 'id', eid: 'eid' };
      expect(NODE_STORE_SELECTORS.calculatedEventSubType(props)).toEqual([
        'nodeStore',
        'nodes',
        'id',
        'calculated',
        'eventObjs',
        'eid',
        'subtype',
      ]);
    });
  });
  describe('calculatedEventMode', () => {
    it('should return keyPath', () => {
      const props = { id: 'id', eid: 'eid' };
      expect(NODE_STORE_SELECTORS.calculatedEventMode(props)).toEqual([
        'nodeStore',
        'nodes',
        'id',
        'calculated',
        'eventObjs',
        'eid',
        'mode',
      ]);
    });
  });
  describe('calculatedEventValue', () => {
    it('should return keyPath', () => {
      const props = { id: 'id', eid: 'eid' };
      expect(NODE_STORE_SELECTORS.calculatedEventValue(props)).toEqual([
        'nodeStore',
        'nodes',
        'id',
        'calculated',
        'eventObjs',
        'eid',
        'value',
      ]);
    });
  });
  describe('calculatedEventTimeZone', () => {
    it('should return keyPath', () => {
      const props = { id: 'id', eid: 'eid' };
      expect(NODE_STORE_SELECTORS.calculatedEventTimeZone(props)).toEqual([
        'nodeStore',
        'nodes',
        'id',
        'calculated',
        'eventObjs',
        'eid',
        'timeZoneId',
      ]);
    });
  });
  describe('calculatedEventReal', () => {
    it('should return keyPath', () => {
      const props = { id: 'id', eid: 'eid' };
      expect(NODE_STORE_SELECTORS.calculatedEventReal(props)).toEqual([
        'nodeStore',
        'nodes',
        'id',
        'calculated',
        'eventObjs',
        'eid',
        'real',
      ]);
    });
  });
  describe('calculatedEventDayCount', () => {
    it('should return keyPath', () => {
      const props = { id: 'id', eid: 'eid' };
      expect(NODE_STORE_SELECTORS.calculatedEventDayCount(props)).toEqual([
        'nodeStore',
        'nodes',
        'id',
        'calculated',
        'eventObjs',
        'eid',
        'dayCount',
      ]);
    });
  });
  describe('calculatedEventPosition', () => {
    it('should return keyPath', () => {
      const props = { id: 'id', eid: 'eid' };
      expect(NODE_STORE_SELECTORS.calculatedEventPosition(props)).toEqual([
        'nodeStore',
        'nodes',
        'id',
        'calculated',
        'eventObjs',
        'eid',
        'position',
      ]);
    });
  });
  describe('isEmpty()', () => {
    it('should return keyPath', () => {
      expect(NODE_STORE_SELECTORS.isEmpty.getter(1)).toEqual(false);
      expect(NODE_STORE_SELECTORS.isEmpty.getter(null, 1)).toEqual(false);
      expect(NODE_STORE_SELECTORS.isEmpty.getter(null, null, 1)).toEqual(false);
      expect(NODE_STORE_SELECTORS.isEmpty.getter(null, null, null, 1)).toEqual(
        false,
      );
      expect(
        NODE_STORE_SELECTORS.isEmpty.getter(null, null, null, null, 1),
      ).toEqual(false);
      expect(NODE_STORE_SELECTORS.isEmpty.getter()).toEqual(true);
    });
  });

  describe('subtype', () => {
    it('should return keyPath', () => {
      const props = { id: 1 };
      expect(NODE_STORE_SELECTORS.subtype(props)).toEqual([
        NODE_STORE,
        'nodes',
        1,
        'customData',
        'subtype',
      ]);
    });
  });

  describe('customDataStartTimeZoneId', () => {
    it('should return keyPath', () => {
      const props = { id: 1 };
      expect(NODE_STORE_SELECTORS.customDataStartTimeZoneId(props)).toEqual([
        NODE_STORE,
        'nodes',
        1,
        'customData',
        'start',
        'timeZoneId',
      ]);
    });
  });

  describe('customDataEndMode', () => {
    it('should return keyPath', () => {
      const props = { id: 1 };
      expect(NODE_STORE_SELECTORS.customDataEndMode(props)).toEqual([
        NODE_STORE,
        'nodes',
        1,
        'customData',
        'end',
        'mode',
      ]);
    });
  });

  describe('customDataStartValue', () => {
    it('should return keyPath', () => {
      const props = { id: 1 };
      expect(NODE_STORE_SELECTORS.customDataStartValue(props)).toEqual([
        NODE_STORE,
        'nodes',
        1,
        'customData',
        'start',
        'value',
      ]);
    });
  });

  describe('customDataEndValue', () => {
    it('should return keyPath', () => {
      const props = { id: 1 };
      expect(NODE_STORE_SELECTORS.customDataEndValue(props)).toEqual([
        NODE_STORE,
        'nodes',
        1,
        'customData',
        'end',
        'value',
      ]);
    });
  });

  describe('customDataStartTimeZoneId', () => {
    it('should return keyPath', () => {
      const props = { id: 1 };
      expect(NODE_STORE_SELECTORS.customDataStartTimeZoneId(props)).toEqual([
        NODE_STORE,
        'nodes',
        1,
        'customData',
        'start',
        'timeZoneId',
      ]);
    });
  });

  describe('calculatedPeopleTabId', () => {
    it('should return keyPath', () => {
      const props = { id: 1 };
      expect(NODE_STORE_SELECTORS.calculatedPeopleTabId(props)).toEqual([
        NODE_STORE,
        'nodes',
        1,
        'calculated',
        'peopleTabId',
      ]);
    });
  });

  describe('calculatedPeopleCount', () => {
    it('should return keyPath', () => {
      const props = { id: 1 };
      expect(NODE_STORE_SELECTORS.calculatedPeopleCount(props)).toEqual([
        NODE_STORE,
        'nodes',
        1,
        'calculated',
        'peopleCount',
      ]);
    });
  });

  describe('oldFollowerProp', () => {
    it('should return keyPath', () => {
      const props = { id: 1 };
      expect(NODE_STORE_SELECTORS.oldFollowerProp(['id'])(props)).toEqual([
        NODE_STORE,
        'nodes',
        1,
        'oldFollower',
        'id',
      ]);
    });

    it('should return keyPath even if selector is undefined', () => {
      const props = { id: 1 };
      expect(NODE_STORE_SELECTORS.oldFollowerProp()(props)).toEqual([
        NODE_STORE,
        'nodes',
        1,
        'oldFollower',
      ]);
    });
  });
  describe('selectedChecklists', () => {
    it('should return getter empty array', () => {
      expect(NODE_STORE_SELECTORS.selectedChecklists.getter()).toEqual([]);
    });
    it('should return getter value', () => {
      expect(NODE_STORE_SELECTORS.selectedChecklists.getter([1])).toEqual([1]);
    });
  });
  describe('followers', () => {
    it('should return keyPath', () => {
      expect(NODE_STORE_SELECTORS.followers({ id: 1 })).toEqual([
        'nodeStore',
        'nodes',
        1,
        'followers',
      ]);
    });
  });
});
