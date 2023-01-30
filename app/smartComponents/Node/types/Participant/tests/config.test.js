import { TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS } from 'datastore/templateManagementStore/selectors';
import { PERSON_STORE_SELECTORS } from 'datastore/personDataStore/selectors';
import first from 'lodash/first';
import { NODE_PATHS } from 'datastore/nodeStore/constants';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { CONFIG, CONFIG_PARENT, CONFIG_3 } from '../config';

describe('smartComponents/Node/types/Participant/config', () => {
  describe('CONFIG', () => {
    it('exists', () => {
      expect(CONFIG).toBeDefined();
    });
  });
  describe('CONFIG_PARENT', () => {
    it('exists', () => {
      expect(CONFIG_PARENT).toBeDefined();
    });
  });

  describe('value', () => {
    it('has personId keyPath', () => {
      expect(CONFIG.value.personId.keyPath({ id: 1 })).toEqual(
        NODE_STORE_SELECTORS.nodeProp({
          id: 1,
          path: NODE_PATHS.calculatedPeople,
        }),
      );
    });
    it('should have personId getter', () => {
      expect(CONFIG.value.personId.getter([1])).toEqual(first([1]));
    });
    it('has personType', () => {
      expect(CONFIG.value.personType({ id: 1 })).toEqual(
        NODE_STORE_SELECTORS.nodeProp({ id: 1, path: NODE_PATHS.personType }),
      );
    });
    it('has personEmail', () => {
      expect(CONFIG.value.personEmail({ id: 1 })).toEqual(
        NODE_STORE_SELECTORS.nodeProp({ id: 1, path: NODE_PATHS.email }),
      );
    });
    it('has nodeType', () => {
      expect(CONFIG.value.nodeType({ id: 1 })).toEqual(
        NODE_STORE_SELECTORS.type({ id: 1 }),
      );
    });
  });

  describe('#setValue', () => {
    it('contains required properties', () => {
      expect(CONFIG_3.setValue.participantViewOpen).toEqual(
        TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.PARTICIPANT.VIEW.open,
      );
      expect(CONFIG_3.setValue.participantViewId).toEqual(
        TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.PARTICIPANT.VIEW.id,
      );
      expect(CONFIG_3.setValue.selectedFollowerId).toEqual(
        TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.FOLLOWER_SELECTORS
          .selectedFollowerId,
      );
      expect(CONFIG_3.setValue.participantViewMode).toEqual(
        TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.PARTICIPANT.VIEW.mode,
      );
      expect(CONFIG_3.setValue.interestedPersonCreateOpen).toEqual(
        TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.INTERESTED_PERSON.CREATE.open,
      );
      expect(CONFIG_3.setValue.interestedPersonCreateParticipantId).toEqual(
        TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.INTERESTED_PERSON.CREATE
          .participantId,
      );
    });
  });
  describe('CONFIG_3 value', () => {
    it('should have participantEmail', () => {
      expect(CONFIG_3.value.participantEmail({ personId: 1 })).toEqual(
        PERSON_STORE_SELECTORS.email({ id: 1 }),
      );
    });
    it('should have travelWith', () => {
      expect(CONFIG_3.value.travelWith({ groups: [1] })).toEqual(
        NODE_STORE_SELECTORS.participants({ id: 1 }),
      );
    });
    it('should have participantEmail', () => {
      expect(CONFIG.value.roomOccupants({ rooms: [1] })).toEqual(
        NODE_STORE_SELECTORS.participants({ id: 1 }),
      );
    });
    it('should have travelWithContent', () => {
      expect(CONFIG_3.value.travelWithContent({ groups: [1] })).toEqual(
        NODE_STORE_SELECTORS.content({ id: 1 }),
      );
    });
    it('tourName', () => {
      expect(CONFIG.value.tourName({ templateId: 1 })).toEqual(
        NODE_STORE_SELECTORS.content({ id: 1 }),
      );
    });
  });
  describe('#value', () => {
    it('contains required properties', () => {
      expect(CONFIG.value.personType({ id: 1 })).toEqual([
        'nodeStore',
        'nodes',
        1,
        'customData',
        'personType',
      ]);
      expect(CONFIG.value.createdBy({ id: 1 })).toEqual([
        'nodeStore',
        'nodes',
        1,
        'createdBy',
      ]);
      expect(CONFIG.value.personId.keyPath({ id: 1 })).toEqual([
        'nodeStore',
        'nodes',
        1,
        'calculated',
        'people',
      ]);
      expect(CONFIG.value.personId.getter([1, 2, 3])).toEqual(1);
      expect(CONFIG.value.createdBy({ id: 1 })).toEqual([
        'nodeStore',
        'nodes',
        1,
        'createdBy',
      ]);
      expect(CONFIG.value.parentType({ parentId: 1 })).toEqual([
        'nodeStore',
        'nodes',
        1,
        'type',
      ]);
    });
  });
});
