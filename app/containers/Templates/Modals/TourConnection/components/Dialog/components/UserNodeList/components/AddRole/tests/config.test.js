import { TOUR_PARTICIPANT } from 'utils/modelConstants';
import { CONFIG_1, CONFIG_2, CONFIG_3, CONFIG_4 } from '../config';

describe('Dialog/components/UserNodeList/components/AddRole/config', () => {
  describe('CONFIG_1', () => {
    it('exists', () => {
      expect(CONFIG_1).toBeDefined();
    });
    it('value.interestedPersonIds', () => {
      expect(CONFIG_1.value.interestedPersonIds({ templateId: 1 })).toEqual([
        'nodeStore',
        'nodes',
        1,
        'interestedPeople',
      ]);
    });
    it('value.participantIds', () => {
      expect(CONFIG_1.value.participantIds({ templateId: 1 })).toEqual([
        'nodeStore',
        'nodes',
        1,
        'calculated',
        'participants',
      ]);
    });
  });

  describe('#config2.value.customData', () => {
    it('keypath', () => {
      const result = [
        ['userDataStore', 'people', 1, 'firstName'],
        ['userDataStore', 'people', 1, 'lastName'],
        ['userDataStore', 'people', 1, 'birthDate'],
        ['userDataStore', 'people', 1, 'email'],
      ];
      expect(CONFIG_2.value.customData.keyPath({ userId: 1 })).toEqual(result);
    });
    it('getter', () => {
      const result = {
        firstName: 'firstName',
        lastName: 'lastName',
        dob: 'dob',
        email: 'email',
      };
      expect(
        CONFIG_2.value.customData.getter(
          'firstName',
          'lastName',
          'dob',
          'email',
        ),
      ).toEqual(result);
    });
  });

  describe('#config2.value.personNodeIds', () => {
    it('getter', () => {
      expect(
        CONFIG_2.value.personNodeIds.getter({
          role: TOUR_PARTICIPANT,
          interestedPersonIds: [],
          participantIds: [],
        }),
      ).toEqual([]);
    });
  });

  describe('#config3.value.pendingNodeId', () => {
    it('keyPath', () => {
      expect(
        CONFIG_3.value.pendingNodeId.keyPath({ personNodeIds: [1] }),
      ).toEqual([['nodeStore', 'nodes', 1, 'customData', 'email']]);
    });
    it('getter', () => {
      expect(
        CONFIG_3.value.pendingNodeId.getter(['emal1'], ['email2'], [1, 2]),
      ).toMatchSnapshot();
    });
    it('getter', () => {
      expect(
        CONFIG_3.value.pendingNodeId.props({
          personNodeIds: [1, 2],
          customData: { email: 'test' },
        }),
      ).toMatchSnapshot();
    });
  });
  describe('#config4.value.personNodeIds', () => {
    it('getter', () => {
      expect(CONFIG_4.value.status({ pendingNodeId: 1 })).toEqual([
        'nodeStore',
        'nodes',
        1,
        'status',
      ]);
    });
  });
});
