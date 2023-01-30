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
    location: {
      pathname: '',
    },
    history: {
      push: jest.fn(),
    },
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

  describe('handleError()', () => {
    it('should renderContent', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.handleError());
    });
  });

  describe('onCloneSuccess()', () => {
    it('should onCloneSuccess', () => {
      //  rendered.setProps({ participantModel: currentPerson });
      TEST_HELPERS.expectMatchSnapshot(instance.onCloneSuccess([1]), [
        { nodes: [] },
      ]);
    });
    it('should onCloneSuccess - not yet exists', () => {
      instance.copyParticipant = jest.fn(() => () => 'copyParticipant');
      const currentPerson = {
        customData: { firstName: 'a', lastName: 'b', email: 'd' },
      };
      rendered.setProps({
        participantModel: currentPerson,
        onSelect: jest.fn(),
      });
      TEST_HELPERS.expectMatchSnapshot(instance.onCloneSuccess([1]), [
        { cloneId: 1 },
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

  describe('getTourDetail()', () => {
    it('should getTourDetail', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.getTourDetail(1), []);
    });
  });

  describe('cancelAdd()', () => {
    it('should cancelAdd', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.cancelAdd);
    });
  });

  describe('onConfirm()', () => {
    it('should onConfirm', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.onConfirm, []);
    });
    it('should onConfirm  has ids copy', () => {
      rendered.setProps({ action: 'copy' });
      TEST_HELPERS.expectMatchSnapshot(instance.onConfirm, [1]);
    });
    it('should onConfirm  move', () => {
      rendered.setProps({ action: 'move' });
      TEST_HELPERS.expectMatchSnapshot(instance.onConfirm, [1]);
    });
  });

  describe('confirmAction()', () => {
    it('should confirmAction', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.confirmAction, [
        { templates: 1, id: 1 },
      ]);
    });
  });

  describe('handleCopyMoveSuccess()', () => {
    it('should handleCopyMoveSuccess', () => {
      rendered.setProps({ onSuccess: jest.fn() });
      TEST_HELPERS.expectMatchSnapshot(instance.handleCopyMoveSuccess([1]), [
        [1],
      ]);
    });
  });

  describe('handleMoveSuccess()', () => {
    it('should handleMoveSuccess', () => {
      rendered.setProps({ onSuccess: jest.fn(), sourceTabIds: [1, 2] });
      TEST_HELPERS.expectMatchSnapshot(instance.handleMoveSuccess([1]), [[1]]);
    });
  });

  describe('cancelSelected()', () => {
    it('should cancelSelected', () => {
      rendered.setProps({ onSelect: jest.fn() });
      TEST_HELPERS.expectMatchSnapshot(instance.cancelSelected);
    });
  });

  describe('copyTab()', () => {
    it('should copyTab', () => {
      rendered.setProps({
        targetTabIds: [1],
        onSelect: jest.fn(),
      });
      TEST_HELPERS.expectMatchSnapshot(instance.copyTab([1], []));
    });
    it('should copyTab, only id', () => {
      rendered.setProps({
        targetTabIds: [],
        onSelect: jest.fn(),
      });
      TEST_HELPERS.expectMatchSnapshot(instance.copyTab([], []));
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

  describe('moveTab()', () => {
    it('should renderAdding', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.moveTab({}), [{}]);
    });
  });

  describe('handlePersonSuccess()', () => {
    it('should handlePersonSuccess', () => {
      rendered.setProps({
        fetching: false,
        tourAdded: false,
        error: 'test',
        selected: 1,
      });
      TEST_HELPERS.expectMatchSnapshot(instance.renderAddButton);
    });
  });
  describe('handlePersonSuccess()', () => {
    it('should handlePersonSuccess', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.handlePersonSuccess);
    });
  });
  describe('render()', () => {
    it('should render', () => {
      rendered.setProps({
        fetching: false,
      });
      instance.renderContent = jest.fn(() => 'renderContent');

      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
  });
});
