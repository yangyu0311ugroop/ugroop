import { shallow } from 'enzyme';
import React from 'react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { TargetTour } from '../index';

describe('<TargetTour />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    classes: {},
    resaga,
  };

  beforeEach(() => {
    jest.clearAllMocks();

    rendered = shallow(<TargetTour {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(TargetTour).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('findPerson()', () => {
    it('should renderContent', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.findPerson({ tourId: 1 }));
    });
  });

  describe('personFindSuccess()', () => {
    it('should personFindSuccess', () => {
      const currentPerson = {
        customData: { firstName: 'a', lastName: 'b', email: 'd' },
      };
      rendered.setProps({ participantModel: currentPerson });
      TEST_HELPERS.expectMatchSnapshot(
        instance.personFindSuccess({ tourId: 1 }),
        [{ nodes: [currentPerson] }],
      );
    });
    it('should personFindSuccess - person not yet exists', () => {
      instance.copyParticipant = jest.fn(() => () => 'copyParticipant');
      const currentPerson = {
        customData: { firstName: 'a', lastName: 'b', email: 'd' },
      };
      const nodePerson = {
        customData: { firstName: 'a1', lastName: 'b1', email: 'd1' },
      };
      rendered.setProps({ participantModel: currentPerson });
      TEST_HELPERS.expectMatchSnapshot(instance.personFindSuccess([1]), [
        { nodes: [nodePerson] },
      ]);
    });
  });

  describe('personFindError()', () => {
    it('should personFindError', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.personFindError);
    });
  });

  describe('handleCreateError()', () => {
    it('should handleCreateError', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.handleCreateError);
    });
  });

  describe('cancelAdd()', () => {
    it('should cancelAdd', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.cancelAdd);
    });
  });

  describe('copyParticipant()', () => {
    it('should copyParticipant', () => {
      rendered.setProps({
        participantModel: { customData: { firstName: 'someone' } },
      });
      TEST_HELPERS.expectMatchSnapshot(instance.copyParticipant({ tourId: 1 }));
    });
  });

  describe('handleCreateSuccess()', () => {
    it('should handleCreateSuccess', () => {
      // instance.renderSaveCancelButton = jest.fn(() => 'renderSaveCancelButton');
      rendered.setProps({ personId: 1, personModel: { firstName: 'dan' } });

      TEST_HELPERS.expectMatchSnapshot(instance.handleCreateSuccess, [
        { node: { id: 1 } },
      ]);
    });
    it('should handleCreateSuccess', () => {
      // instance.renderSaveCancelButton = jest.fn(() => 'renderSaveCancelButton');
      rendered.setProps({ personId: 0, personModel: { firstName: 'dan' } });

      TEST_HELPERS.expectMatchSnapshot(instance.handleCreateSuccess, [
        { node: { id: 1 } },
      ]);
    });
  });

  describe('renderAdding()', () => {
    it('should renderAdding', () => {
      instance.handleCreateSuccess = jest.fn(() => 'handleCreateSuccess');
      rendered.setState({ isAdding: true });
      TEST_HELPERS.expectMatchSnapshot(instance.handleCreateSuccess);
    });
  });

  describe('handlePersonSuccess()', () => {
    it('should handlePersonSuccess', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.handlePersonSuccess);
    });
  });

  describe('render()', () => {
    it('should render', () => {
      instance.renderContent = jest.fn(() => 'renderContent');

      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
  });
});
