import { PARTICIPANT_STATUSES } from 'utils/constants/nodes';
import { NODE_STORE, SORT_CONSTANTS } from 'appConstants';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { INVITATION_STORE_SELECTORS } from 'datastore/invitationStore/selectors';
import { TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS } from 'datastore/templateManagementStore/selectors';
import {
  CONFIG_0,
  CONFIG,
  CONFIG_2,
  CONFIG_3,
  CONFIG_1,
  CONFIG_5,
  CONFIG_4,
  SORTER_CONFIG,
} from '../config';

describe('containers/Templates/Modals/ParticipantList/config', () => {
  describe('CONFIG_0', () => {
    describe('value', () => {
      it('should exist', () => {
        expect(CONFIG_0.value).toBeDefined();
      });
    });
  });

  describe('CONFIG', () => {
    describe('value', () => {
      it('should exist', () => {
        expect(CONFIG.value).toBeDefined();
      });

      it('contains required properties', () => {
        const props = { participantIds: [1] };
        expect(CONFIG.value.statuses.keyPath).toEqual([
          TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.PARTICIPANT_LIST.FILTER
            .confirmed,
          TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.PARTICIPANT_LIST.FILTER
            .pending,
          TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.PARTICIPANT_LIST.FILTER
            .declined,
        ]);
        expect(CONFIG.value.statuses.cacheKey(props)).toMatchSnapshot();
        expect(CONFIG.value.statuses.cacheKey({})).toMatchSnapshot();
        expect(CONFIG.value.statuses.props(props)).toEqual(
          props.participantIds,
        );
        expect(
          CONFIG.value.statuses.getter(
            false,
            false,
            false,
            props.participantIds,
          ),
        ).toEqual({
          filterConfirmed: false,
          filterPending: false,
          filterDeclined: false,
          statuses: [],
          hasParticipantIds: true,
        });
        expect(
          CONFIG.value.statuses.getter(true, true, true, props.participantIds),
        ).toEqual({
          filterConfirmed: true,
          filterPending: true,
          filterDeclined: true,
          statuses: [
            PARTICIPANT_STATUSES.confirmed,
            PARTICIPANT_STATUSES.pending,
            PARTICIPANT_STATUSES.declined,
          ],
          hasParticipantIds: true,
        });
      });

      describe('participantLinksNodeIds', () => {
        describe('keyPath', () => {
          it('should return array of keyPath', () => {
            expect(
              CONFIG.value.participantLinksNodeIds.keyPath({
                participantLinks: [1],
              }),
            ).toEqual([
              NODE_STORE_SELECTORS.linkProp(['prevNodeId'])({ id: 1 }),
            ]);
          });
        });

        describe('cacheKey', () => {
          it('should return cacheKey', () => {
            expect(
              CONFIG.value.participantLinksNodeIds.cacheKey({
                participantLinks: [1],
              }),
            ).toEqual('ParticipantList.participantLinkNodeIds.1');
          });
        });

        describe('props', () => {
          it('should return null', () => {
            expect(CONFIG.value.participantLinksNodeIds.props()).toEqual(null);
          });
        });

        describe('getter', () => {
          it('should filter null in arguments', () => {
            expect(
              CONFIG.value.participantLinksNodeIds.getter(1, 2, null, 3),
            ).toEqual([1, 2, 3]);
          });
        });
      });
    });
  });

  describe('CONFIG_1', () => {
    NODE_STORE_SELECTORS.filterByStatuses = jest.fn((...args) => [
      'filterByStatuses',
      ...args,
    ]);
    const { value } = CONFIG_1();

    it('contains required properties', () => {
      expect(value.confirmedParticipantIds).toEqual(
        NODE_STORE_SELECTORS.filterByStatuses({
          ids: 'participantIds',
          statuses: [PARTICIPANT_STATUSES.confirmed],
        }),
      );
      expect(value.pendingParticipantIds).toEqual(
        NODE_STORE_SELECTORS.filterByStatuses({
          ids: 'participantIds',
          statuses: [PARTICIPANT_STATUSES.pending],
        }),
      );
      expect(value.declinedParticipantIds).toEqual(
        NODE_STORE_SELECTORS.filterByStatuses({
          ids: 'participantIds',
          statuses: [PARTICIPANT_STATUSES.declined],
        }),
      );
    });

    describe('participantIds', () => {
      describe('getter', () => {
        it('should return participantIds prop if isTemplateId is true', () => {
          const props = { isTemplateId: true, participantIds: [1, 2] };
          expect(CONFIG_1().value.participantIds.getter(props)).toEqual(
            props.participantIds,
          );
        });

        it('should return participantLinksNodeIds if isTemplateId is false', () => {
          const props = {
            isTemplateId: false,
            participantLinksNodeIds: [1, 2],
          };
          expect(CONFIG_1().value.participantIds.getter(props)).toEqual(
            props.participantLinksNodeIds,
          );
        });
      });
    });

    it('should have galleryId', () => {
      expect(value.galleryId({ templateId: 1 })).toEqual(
        NODE_STORE_SELECTORS.calculatedGalleryId({ id: 1 }),
      );
    });

    describe('userNodeUserNodes', () => {
      it('should have keyPath', () => {
        const userNodeIdsAll = [1];
        expect(value.userNodeUserNodes.keyPath({ userNodeIdsAll })).toEqual(
          userNodeIdsAll.map(id =>
            INVITATION_STORE_SELECTORS.userNodeUserNodes({ id }),
          ),
        );
      });
      it('should have keyPath if there is no userNodeIdsAll', () => {
        expect(value.userNodeUserNodes.keyPath({})).toEqual([]);
      });
      it('should have cacheKey if userNodeIdsAll is not empty', () => {
        const userNodeIdsAll = [1];
        expect(value.userNodeUserNodes.cacheKey({ userNodeIdsAll })).toEqual(
          `nodeUserIds.userNodeUserNodes.forSort.${1}`,
        );
      });
      it('should have cacheKey if userNodeIdsAll is empty', () => {
        expect(value.userNodeUserNodes.cacheKey({})).toEqual(
          `nodeUserIds.userNodeUserNodes.forSort.${null}`,
        );
      });
      it('should have props if userNodeIdsAllis is not empty', () => {
        const userNodeIdsAll = [1];
        expect(value.userNodeUserNodes.props({ userNodeIdsAll })).toEqual([1]);
      });
      it('should have props if userNodeIdsAllis is empty', () => {
        expect(value.userNodeUserNodes.props({})).toEqual([]);
      });
      it('should have getter that returns something', () => {
        const args = [[22], [26], [59], [21, 25, 58]];
        const expected = [22, 26, 59];
        expect(value.userNodeUserNodes.getter(...args)).toEqual(expected);
      });
    });

    describe('pairedUserPersonIds', () => {
      it('should have cacheKey if userNodeUserIdsAll and userNodeIdsAll is not empty', () => {
        const userNodeIdsAll = [1];
        const userNodeUserIdsAll = [1];
        expect(
          value.pairedUserPersonIds.cacheKey({
            userNodeIdsAll,
            userNodeUserIdsAll,
          }),
        ).toEqual(`nodeUserIds.userNodeIds&personIds.forSort.${1}.${1}`);
      });
      it('should have null cacheKey if userNodeUserIdsAll and userNodeIdsAll is empty', () => {
        expect(value.pairedUserPersonIds.cacheKey({})).toEqual(
          `nodeUserIds.userNodeIds&personIds.forSort.${null}.${null}`,
        );
      });
      it('should have getter', () => {
        const userNodeIdsAll = [1];
        const userNodeUserIdsAll = [2];
        const args = [
          {
            userNodeIdsAll,
            userNodeUserIdsAll,
          },
        ];
        expect(value.pairedUserPersonIds.getter(...args)).toEqual([[1, 2]]);
      });
      it('should have getter that returns empty array', () => {
        const args = [{}];
        expect(value.pairedUserPersonIds.getter(...args)).toEqual([]);
      });
    });
  });
  describe('CONFIG_2', () => {
    const { value } = CONFIG_2();
    it('exists', () => {
      expect(CONFIG_2).toBeDefined();
    });

    describe('galleryChildren', () => {
      it('should return children', () => {
        expect(value.galleryChildren({ galleryId: 1 })).toEqual(
          NODE_STORE_SELECTORS.children({ id: 1 }),
        );
      });
    });

    describe('userNodeUserNodesIds', () => {
      it('should have keyPath if there are userNodeUserNodes', () => {
        const userNodeUserNodes = [1];
        expect(
          value.userNodeUserNodesIds.keyPath({ userNodeUserNodes }),
        ).toEqual(
          userNodeUserNodes.map(id =>
            INVITATION_STORE_SELECTORS.userNodeNodeId({ id }),
          ),
        );
      });
      it('should have keyPath if there are no userNodeUserNodes', () => {
        expect(value.userNodeUserNodesIds.keyPath({})).toEqual([]);
      });
      it('should have cacheKey if there are userNodeUserNodes', () => {
        const userNodeUserNodes = [1];
        expect(
          value.userNodeUserNodesIds.cacheKey({ userNodeUserNodes }),
        ).toEqual(`nodeUserIds.userNodes.forSort.${1}`);
      });
      it('should have cacheKey if there are no userNodeUserNodes', () => {
        expect(value.userNodeUserNodesIds.cacheKey({})).toEqual(
          `nodeUserIds.userNodes.forSort.${null}`,
        );
      });
      it('should have props that returns userNodeUserNodes', () => {
        const userNodeUserNodes = [1];
        expect(value.userNodeUserNodesIds.props({ userNodeUserNodes })).toEqual(
          [1],
        );
      });
      it('should have props that returns empty array', () => {
        expect(value.userNodeUserNodesIds.props({})).toEqual([]);
      });
      it('should have getter that returns correct values', () => {
        const args = [1544, 1593, 1869, [22, 26, 59]];
        const expected = [1544, 1593, 1869];
        expect(value.userNodeUserNodesIds.getter(...args)).toEqual(expected);
      });
    });

    describe('#value', () => {});
  });

  describe('CONFIG_3', () => {
    it('exists', () => {
      expect(CONFIG_3).toBeDefined();
    });

    describe('firstNameValues', () => {
      const { value } = CONFIG_3();
      it('should have keyPath if there are participantIds', () => {
        const participantIds = [1];
        expect(value.firstNameValues.keyPath({ participantIds })).toEqual(
          participantIds.map(id => NODE_STORE_SELECTORS.firstName({ id })),
        );
      });
      it('should have keyPath if there are no participantIds', () => {
        expect(value.firstNameValues.keyPath({})).toEqual([]);
      });
      it('should have cacheKey if there are participantIds', () => {
        const participantIds = [1];
        expect(value.firstNameValues.cacheKey({ participantIds })).toEqual(
          `participantIds.firstNameValues.forSort.${1}`,
        );
      });
      it('should have cacheKey if there are no participantIds', () => {
        expect(value.firstNameValues.cacheKey({})).toEqual(
          `participantIds.firstNameValues.forSort.${null}`,
        );
      });
      it('should have props if participantIds is not empty', () => {
        const participantIds = [1];
        expect(value.firstNameValues.props({ participantIds })).toEqual([1]);
      });
      it('should return empty array props', () => {
        expect(value.firstNameValues.props({})).toEqual([]);
      });
      it('should have getter that returns paired items', () => {
        const args = ['Elijah', 'Mac', 'Lisa', [1, 2, 3]];
        const expected = [[1, 'Elijah'], [2, 'Mac'], [3, 'Lisa']];
        expect(value.firstNameValues.getter(...args)).toEqual(expected);
      });
    });

    describe('pairedUserPersonNodeIds', () => {
      const { value } = CONFIG_3();
      it('should have getter that returns correct values', () => {
        const pairedUserPersonIds = [[21, 77], [25, 95], [58, 112]];
        const userNodeUserNodesIds = [1544, 1593, 1869];
        const args = [
          {
            pairedUserPersonIds,
            userNodeUserNodesIds,
          },
        ];
        const expected = [[1544, 21, 77], [1593, 25, 95], [1869, 58, 112]];
        expect(value.pairedUserPersonNodeIds.getter(...args)).toEqual(expected);
      });
      it('should have getter if both needed arrays are empty', () => {
        const args = [{}];
        expect(value.pairedUserPersonNodeIds.getter(...args)).toEqual([]);
      });
    });

    describe('reactions', () => {
      const { value } = CONFIG_3();
      it('should have keyPath if galleryChildren is not empty', () => {
        const galleryChildren = [1];
        expect(value.reactions.keyPath({ galleryChildren })).toEqual(
          galleryChildren.map(id => NODE_STORE_SELECTORS.reactions({ id })),
        );
      });
      it('should have keyPath that returns empty array', () => {
        expect(value.reactions.keyPath({})).toEqual([]);
      });
      it('should have cacheKey if there are galleryChildren', () => {
        const galleryChildren = [1];
        const linkRefresh = 'link';
        expect(
          value.reactions.cacheKey({ galleryChildren, linkRefresh }),
        ).toEqual(`galleryIds.reactions.forSort.${1}.link`);
      });
      it('should have cacheKey if there are no galleryChildren', () => {
        expect(value.reactions.cacheKey({})).toEqual(
          `galleryIds.reactions.forSort.${null}.${null}`,
        );
      });
      it('should have props that returns galleryChildren', () => {
        const galleryChildren = [1];
        expect(value.reactions.props({ galleryChildren })).toEqual([1]);
      });
      it('should have props that return empty array', () => {
        expect(value.reactions.props({})).toEqual([]);
      });
      it('should have getter that returns all reactions IDs', () => {
        const args = [
          [560],
          [557, 561],
          [559, 566],
          [556, 565],
          [564],
          [554, 563],
          [562],
          [558],
          [553],
          [552, 555],
          [551],
          [1, 2, 3],
        ];
        const expected = [
          560,
          557,
          561,
          559,
          566,
          556,
          565,
          564,
          554,
          563,
          562,
          558,
          553,
          552,
          555,
          551,
        ];
        expect(value.reactions.getter(...args)).toEqual(expected);
      });
    });

    describe('groupWithSortValue', () => {
      const { value } = CONFIG_3();
      describe('keyPath', () => {
        it('should return type path if sortMode is by type', () => {
          const props = {
            sortMode: SORT_CONSTANTS.TYPE,
            groups: [1, 2],
          };
          const keyPaths = value.groupWithSortValue.keyPath(props);

          expect(keyPaths).toEqual(
            props.groups.map(id => NODE_STORE_SELECTORS.type({ id })),
          );
        });

        it('should return key path for createdAt if sortMode is by created at', () => {
          const props = {
            sortMode: SORT_CONSTANTS.CREATED_AT,
            groups: [1, 2],
          };
          const keyPaths = value.groupWithSortValue.keyPath(props);

          expect(keyPaths).toEqual(
            props.groups.map(id => NODE_STORE_SELECTORS.createdAt({ id })),
          );
        });

        it('should return key path for content if sortMode is by content', () => {
          const props = {
            sortMode: SORT_CONSTANTS.NAME,
            groups: [1, 2],
          };
          const keyPaths = value.groupWithSortValue.keyPath(props);

          expect(keyPaths).toEqual(
            props.groups.map(id => NODE_STORE_SELECTORS.content({ id })),
          );
        });
      });

      describe('cacheKey', () => {
        it('should return a particular cacheKey by default', () => {
          const props = {
            groups: [1],
          };

          const cacheKey = value.groupWithSortValue.cacheKey(props);

          expect(cacheKey).toBe(
            `ParticipantList.groupWithSortValue.${props.groups.toString()}.createdAt`,
          );
        });
        it('should return a particular cacheKey if groups is null and sortMode is different', () => {
          const props = {
            groups: null,
            sortMode: SORT_CONSTANTS.NAME,
          };

          const cacheKey = value.groupWithSortValue.cacheKey(props);

          expect(cacheKey).toBe(
            `ParticipantList.groupWithSortValue.null.${SORT_CONSTANTS.NAME}`,
          );
        });

        it('should return a particular cacheKey if groups is undefined and sortMode is different', () => {
          const props = {
            sortMode: SORT_CONSTANTS.NAME,
          };

          const cacheKey = value.groupWithSortValue.cacheKey(props);

          expect(cacheKey).toBe(
            `ParticipantList.groupWithSortValue..${SORT_CONSTANTS.NAME}`,
          );
        });
      });

      describe('props', () => {
        it('should return groups props', () => {
          const props = {
            groups: [1],
          };
          const returnedProps = value.groupWithSortValue.props(props);

          expect(returnedProps).toEqual(props.groups);
        });
      });

      describe('getter', () => {
        it('should return groups with their sort value', () => {
          const args = [1, 2, [1, 2]];
          const returned = value.groupWithSortValue.getter(...args);

          expect(returned).toEqual([[1, 1], [2, 2]]);
        });
      });
    });
  });

  describe('CONFIG_4', () => {
    const { value } = CONFIG_4();
    describe('nextNodeIds', () => {
      it('should have keyPath if there are reactions', () => {
        const reactions = [1];
        expect(value.nextNodeIds.keyPath({ reactions })).toEqual(
          reactions.map(id => [NODE_STORE, 'links', id, 'nextNodeId']),
        );
      });
      it('should have keyPath that returns empty array', () => {
        expect(value.nextNodeIds.keyPath({})).toEqual([]);
      });
      it('should have cacheKey if there are reactions', () => {
        const reactions = [1];
        expect(value.nextNodeIds.cacheKey({ reactions })).toEqual(
          `galleryIds.reactions.nextNodeIds.forSort.${1}`,
        );
      });
      it('should have cacheKey if there are no reactions', () => {
        expect(value.nextNodeIds.cacheKey({})).toEqual(
          `galleryIds.reactions.nextNodeIds.forSort.${null}`,
        );
      });
      it('should have props that returns reactions', () => {
        const reactions = [1];
        expect(value.nextNodeIds.props({ reactions })).toEqual([1]);
      });
      it('should have props that returns empty array', () => {
        expect(value.nextNodeIds.props({})).toEqual([]);
      });
      it('should have getter that returns reactions count', () => {
        const args = [
          1966,
          1966,
          1966,
          1966,
          1966,
          1997,
          1997,
          1997,
          2017,
          [1, 2, 3],
        ];
        const expected = [[1966, 5], [1997, 3], [2017, 1]];
        expect(value.nextNodeIds.getter(...args)).toEqual(expected);
      });
    });
  });

  describe('CONFIG_5', () => {
    const { value } = CONFIG_5();

    describe('pairedReactionNodes', () => {
      it('should have keyPath if there are nextNodeIds', () => {
        const nextNodeIds = [[1966, 5], [1997, 3], [2017, 1]];
        expect(value.pairedReactionNodes.keyPath({ nextNodeIds })).toEqual(
          nextNodeIds.map(item =>
            NODE_STORE_SELECTORS.content({ id: item[0] }),
          ),
        );
      });
      it('should have keyPath that returns empty array', () => {
        expect(value.pairedReactionNodes.keyPath({})).toEqual([]);
      });
      it('should have cacheKey if there are nextNodeIds', () => {
        const nextNodeIds = [1];
        const reactions = [1];
        expect(
          value.pairedReactionNodes.cacheKey({ nextNodeIds, reactions }),
        ).toEqual(`galleryIds.reactions.pairedReactionNodes.forSort.${1}.${1}`);
      });
      it('should have cacheKey if there are no nextNodeIds', () => {
        expect(value.pairedReactionNodes.cacheKey({})).toEqual(
          `galleryIds.reactions.pairedReactionNodes.forSort.${null}.${null}`,
        );
      });
      it('should have props that returns arrays that are not empty', () => {
        const pairedUserPersonNodeIds = [1];
        const nextNodeIds = [1];
        expect(
          value.pairedReactionNodes.props({
            pairedUserPersonNodeIds,
            nextNodeIds,
          }),
        ).toEqual({ pairedUserPersonNodeIds, nextNodeIds });
      });
      it('should have props that returns arrays that are empty', () => {
        expect(value.pairedReactionNodes.props({})).toEqual({
          pairedUserPersonNodeIds: [],
          nextNodeIds: [],
        });
      });
      it('should have getter that returns values', () => {
        const args = [
          '77',
          '95',
          '112',
          {
            nextNodeIds: [[1966, 5], [1997, 4], [2017, 7]],
            pairedUserPersonNodeIds: [
              [1544, 21, 77],
              [1593, 25, 95],
              [1869, 58, 112],
            ],
          },
        ];
        const expected = [
          { participantNode: 1544, reactionCount: 5 },
          { participantNode: 1593, reactionCount: 4 },
          { participantNode: 1869, reactionCount: 7 },
        ];

        expect(value.pairedReactionNodes.getter(...args)).toEqual(expected);
      });
    });

    describe('sortedAllGroupsParticipants', () => {
      describe('cacheKey', () => {
        it('should return a particular cacheKey shape by default', () => {
          const props = {
            participantsAndGroupsWithSortValue: [],
            sortMode: '',
            participantWithGroups: [],
            participantWithNoGroups: [],
          };
          const cacheKey = value.sortedAllGroupsParticipants.cacheKey(props);

          expect(cacheKey).toBe(
            `ParticipantList.sortedAllGroupsParticipants.${props.participantsAndGroupsWithSortValue.toString()}.${props.sortMode.toString()}.${props.participantWithGroups.toString()}.${props.participantWithNoGroups.toString()}`,
          );
        });

        it('should return a particular cacheKey shape if other parts is undefined', () => {
          const props = {
            sortMode: '',
          };
          const cacheKey = value.sortedAllGroupsParticipants.cacheKey(props);

          expect(cacheKey).toBe(
            `ParticipantList.sortedAllGroupsParticipants..${props.sortMode.toString()}..`,
          );
        });
      });

      describe('props', () => {
        it('should return props needed', () => {
          const props = {
            participantsAndGroupsWithSortValue: [],
            sortMode: '',
          };
          const configProps = value.sortedAllGroupsParticipants.props.map(
            pFunc => pFunc(props),
          );

          expect(configProps).toEqual([
            props.participantsAndGroupsWithSortValue,
            props.sortMode,
          ]);
        });
      });

      describe('getter', () => {
        it('should sort by kind', () => {
          const props = {
            participantsAndGroupsWithSortValue: [
              [1, 'participant'],
              [2, 'group'],
            ],
            sortMode: SORT_CONSTANTS.TYPE,
          };
          const returned = value.sortedAllGroupsParticipants.getter(props);

          expect(returned).toEqual([2, 1]);
        });

        it('should sort by created at', () => {
          const props = {
            participantsAndGroupsWithSortValue: [
              [1, '2020-03-14'],
              [2, '2020-03-13'],
            ],
            sortMode: SORT_CONSTANTS.CREATED_AT,
          };
          const returned = value.sortedAllGroupsParticipants.getter(props);

          expect(returned).toEqual([1, 2]);
        });

        it('should sort by name', () => {
          const props = {
            participantsAndGroupsWithSortValue: [[1, 'a'], [2, 'b']],
            sortMode: SORT_CONSTANTS.NAME,
          };
          const returned = value.sortedAllGroupsParticipants.getter(props);

          expect(returned).toEqual([1, 2]);
        });
      });
    });

    describe('sortedConfirmedGroupsParticipants', () => {
      describe('cacheKey', () => {
        it('should return a particular cacheKey shape by default', () => {
          const props = {
            confirmedParticipantsAndGroups: [],
            sortMode: '',
            participantWithGroups: [],
            participantWithNoGroups: [],
          };
          const cacheKey = value.sortedConfirmedGroupsParticipants.cacheKey(
            props,
          );

          expect(cacheKey).toBe(
            `ParticipantList.sortedConfirmedGroupsParticipants.${props.confirmedParticipantsAndGroups.toString()}.${props.sortMode.toString()}.${props.participantWithGroups.toString()}.${props.participantWithNoGroups.toString()}`,
          );
        });

        it('should return a particular cacheKey shape if other parts is undefined', () => {
          const props = {
            sortMode: '',
          };
          const cacheKey = value.sortedConfirmedGroupsParticipants.cacheKey(
            props,
          );

          expect(cacheKey).toBe(
            `ParticipantList.sortedConfirmedGroupsParticipants..${props.sortMode.toString()}..`,
          );
        });
      });

      describe('props', () => {
        it('should return props needed', () => {
          const props = {
            confirmedParticipantsAndGroups: [],
            sortMode: '',
          };
          const configProps = value.sortedConfirmedGroupsParticipants.props.map(
            pFunc => pFunc(props),
          );

          expect(configProps).toEqual([
            props.confirmedParticipantsAndGroups,
            props.sortMode,
          ]);
        });
      });

      describe('getter', () => {
        it('should sort by kind', () => {
          const props = {
            confirmedParticipantsAndGroups: [[1, 'participant'], [2, 'group']],
            sortMode: SORT_CONSTANTS.TYPE,
          };
          const returned = value.sortedConfirmedGroupsParticipants.getter(
            props,
          );

          expect(returned).toEqual([2, 1]);
        });

        it('should sort by created at', () => {
          const props = {
            confirmedParticipantsAndGroups: [
              [1, '2020-03-14'],
              [2, '2020-03-13'],
            ],
            sortMode: SORT_CONSTANTS.CREATED_AT,
          };
          const returned = value.sortedConfirmedGroupsParticipants.getter(
            props,
          );

          expect(returned).toEqual([1, 2]);
        });

        it('should sort by name', () => {
          const props = {
            confirmedParticipantsAndGroups: [[1, 'a'], [2, 'b']],
            sortMode: SORT_CONSTANTS.NAME,
          };
          const returned = value.sortedConfirmedGroupsParticipants.getter(
            props,
          );

          expect(returned).toEqual([1, 2]);
        });
      });
    });

    describe('sortedPendingGroupsParticipants', () => {
      describe('cacheKey', () => {
        it('should return a particular cacheKey shape by default', () => {
          const props = {
            pendingParticipantsAndGroups: [],
            sortMode: '',
            participantWithGroups: [],
            participantWithNoGroups: [],
          };
          const cacheKey = value.sortedPendingGroupsParticipants.cacheKey(
            props,
          );

          expect(cacheKey).toBe(
            `ParticipantList.sortedPendingGroupsParticipants.${props.pendingParticipantsAndGroups.toString()}.${props.sortMode.toString()}.${props.participantWithGroups.toString()}.${props.participantWithNoGroups.toString()}`,
          );
        });

        it('should return a particular cacheKey shape if other parts is undefined', () => {
          const props = {
            sortMode: '',
          };
          const cacheKey = value.sortedPendingGroupsParticipants.cacheKey(
            props,
          );

          expect(cacheKey).toBe(
            `ParticipantList.sortedPendingGroupsParticipants..${props.sortMode.toString()}..`,
          );
        });
      });

      describe('props', () => {
        it('should return props needed', () => {
          const props = {
            pendingParticipantsAndGroups: [],
            sortMode: '',
          };
          const configProps = value.sortedPendingGroupsParticipants.props.map(
            pFunc => pFunc(props),
          );

          expect(configProps).toEqual([
            props.pendingParticipantsAndGroups,
            props.sortMode,
          ]);
        });
      });

      describe('getter', () => {
        it('should sort by kind', () => {
          const props = {
            pendingParticipantsAndGroups: [[1, 'participant'], [2, 'group']],
            sortMode: SORT_CONSTANTS.TYPE,
          };
          const returned = value.sortedPendingGroupsParticipants.getter(props);

          expect(returned).toEqual([2, 1]);
        });

        it('should sort by created at', () => {
          const props = {
            pendingParticipantsAndGroups: [
              [1, '2020-03-14'],
              [2, '2020-03-13'],
            ],
            sortMode: SORT_CONSTANTS.CREATED_AT,
          };
          const returned = value.sortedPendingGroupsParticipants.getter(props);

          expect(returned).toEqual([1, 2]);
        });

        it('should sort by name', () => {
          const props = {
            pendingParticipantsAndGroups: [[1, 'a'], [2, 'b']],
            sortMode: SORT_CONSTANTS.NAME,
          };
          const returned = value.sortedPendingGroupsParticipants.getter(props);

          expect(returned).toEqual([1, 2]);
        });
      });
    });

    describe('sortedDeclinedGroupsParticipants', () => {
      describe('cacheKey', () => {
        it('should return a particular cacheKey shape by default', () => {
          const props = {
            declinedParticipantsAndGroups: [],
            sortMode: '',
            participantWithGroups: [],
            participantWithNoGroups: [],
          };
          const cacheKey = value.sortedDeclinedGroupsParticipants.cacheKey(
            props,
          );

          expect(cacheKey).toBe(
            `ParticipantList.sortedDeclinedGroupsParticipants.${props.declinedParticipantsAndGroups.toString()}.${props.sortMode.toString()}.${props.participantWithGroups.toString()}.${props.participantWithNoGroups.toString()}`,
          );
        });

        it('should return a particular cacheKey shape if other parts is undefined', () => {
          const props = {
            sortMode: '',
          };
          const cacheKey = value.sortedDeclinedGroupsParticipants.cacheKey(
            props,
          );

          expect(cacheKey).toBe(
            `ParticipantList.sortedDeclinedGroupsParticipants..${props.sortMode.toString()}..`,
          );
        });
      });

      describe('props', () => {
        it('should return props needed', () => {
          const props = {
            declinedParticipantsAndGroups: [],
            sortMode: '',
          };
          const configProps = value.sortedDeclinedGroupsParticipants.props.map(
            pFunc => pFunc(props),
          );

          expect(configProps).toEqual([
            props.declinedParticipantsAndGroups,
            props.sortMode,
          ]);
        });
      });

      describe('getter', () => {
        it('should sort by kind', () => {
          const props = {
            declinedParticipantsAndGroups: [[1, 'participant'], [2, 'group']],
            sortMode: SORT_CONSTANTS.TYPE,
          };
          const returned = value.sortedDeclinedGroupsParticipants.getter(props);

          expect(returned).toEqual([2, 1]);
        });

        it('should sort by created at', () => {
          const props = {
            declinedParticipantsAndGroups: [
              [1, '2020-03-14'],
              [2, '2020-03-13'],
            ],
            sortMode: SORT_CONSTANTS.CREATED_AT,
          };
          const returned = value.sortedDeclinedGroupsParticipants.getter(props);

          expect(returned).toEqual([1, 2]);
        });

        it('should sort by name', () => {
          const props = {
            declinedParticipantsAndGroups: [[1, 'a'], [2, 'b']],
            sortMode: SORT_CONSTANTS.NAME,
          };
          const returned = value.sortedDeclinedGroupsParticipants.getter(props);

          expect(returned).toEqual([1, 2]);
        });
      });
    });
  });

  describe('SORTER_CONFIG', () => {
    describe('#setValue', () => {
      it('contains required properties', () => {
        const { setValue } = SORTER_CONFIG();
        expect(setValue.participantCreateOpen).toEqual(
          TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.PARTICIPANT.CREATE.open,
        );
        expect(setValue.participantCreateParentNodeId).toEqual(
          TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.PARTICIPANT.CREATE
            .parentNodeId,
        );
        expect(setValue.modeSubtitle).toEqual(
          TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.PARTICIPANT_LIST.MODE
            .subtitle,
        );
        expect(setValue.filterConfirmed).toEqual(
          TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.PARTICIPANT_LIST.FILTER
            .confirmed,
        );
        expect(setValue.filterPending).toEqual(
          TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.PARTICIPANT_LIST.FILTER
            .pending,
        );
        expect(setValue.filterDeclined).toEqual(
          TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.PARTICIPANT_LIST.FILTER
            .declined,
        );
      });
    });
  });
});
