import { shallow } from 'enzyme';
import React from 'react';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { Rooms } from '../index';

describe('<Rooms />', () => {
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

    rendered = shallow(<Rooms {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(Rooms).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('renderCard()', () => {
    it('should renderCard', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderCard);
    });
  });

  describe('renderSummary()', () => {
    it('should renderSummary', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderSummary);
    });
  });

  describe('renderBody()', () => {
    it('should renderBody', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderBody, [{ id: 1 }]);
    });
  });

  describe('renderBlankSlate()', () => {
    it('should renderBlankSlate', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderBlankSlate, [true]);
    });
  });

  describe('handleSelectOption()', () => {
    it('should handleSelectOption', () => {
      TEST_HELPERS.expectMatchSnapshot(
        instance.handleSelectOption('Single'),
        [],
      );
    });
    it('should handleSelectOption', () => {
      instance.setState({ loading: true });
      TEST_HELPERS.expectMatchSnapshot(
        instance.handleSelectOption('Single'),
        [],
      );
    });
  });

  describe('openAddRoom()', () => {
    it('should openAddRoom', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.openAddRoom);
    });
  });

  describe('createLink()', () => {
    it('should createLink()', () => {
      instance.createLink({
        participantId: 1,
        occupant: [1, 2],
      })({
        preventDefault: jest.fn(),
        stopPropagation: jest.fn(),
      });
    });
    it('should createLink()', () => {
      rendered.setState({ loading: true });
      instance.createLink()({ result: [1] });
    });
  });

  describe('handleMoveRoomParticipant()', () => {
    it('should handleMoveRoomParticipant()', () => {
      instance.handleMoveRoomParticipant(1)();
    });
  });
  describe('openAddRoom()', () => {
    it('should openAddRoom', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.openAddRoom);
    });
  });
  describe('handleCreateLinkError()', () => {
    it('should handleCreateLinkError', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.handleCreateLinkError);
    });
  });

  describe('handleCreateLinkSuccess()', () => {
    it('should handleCreateLinkSuccess', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.handleCreateLinkSuccess);
    });
  });

  describe('renderRoomOptions()', () => {
    it('should renderRoomOptions', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderRoomOptions);
    });
    it('should renderRoomOptions', () => {
      rendered.setProps({ rooms: [1, 2], selectedId: 1 });
      TEST_HELPERS.expectMatchSnapshot(instance.renderRoomOptions);
    });
    it('should renderRoomOptions', () => {
      rendered.setProps({ rooms: [1, 2], selectedId: 0 });
      TEST_HELPERS.expectMatchSnapshot(instance.renderRoomOptions);
    });
  });

  describe('renderRoomTypeOptions()', () => {
    it('should renderRoomTypeOptions', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderRoomTypeOptions);
    });
  });

  describe('renderSelect()', () => {
    it('should renderSelect', () => {
      rendered.setProps({ rooms: [1, 2], selectedId: 0 });
      TEST_HELPERS.expectMatchSnapshot(instance.renderSelect);
    });
    it('should renderSelect', () => {
      rendered.setProps({ rooms: [1, 2], selectedId: 1 });
      TEST_HELPERS.expectMatchSnapshot(instance.renderSelect);
    });
  });

  describe('renderDefault()', () => {
    it('should renderDefault', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderDefault);
    });
    it('should renderDefault', () => {
      rendered.setProps({ rooms: [1] });
      TEST_HELPERS.expectMatchSnapshot(instance.renderDefault);
    });
  });

  describe('renderList()', () => {
    it('should renderList', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderList);
    });
    it('should renderDefault', () => {
      rendered.setProps({ rooms: [1] });
      TEST_HELPERS.expectMatchSnapshot(instance.renderList);
    });
  });
  describe('renderListHeader()', () => {
    it('should render on mobile', () => {
      rendered.setProps({ smDown: true });
      TEST_HELPERS.expectMatchSnapshot(instance.renderListHeader);
    });
  });
  describe('render()', () => {
    it('should render on mobile', () => {
      rendered.setProps({ smDown: true });
      LOGIC_HELPERS.switchCase = jest.fn(() => 'LOGIC_HELPERS.switchCase');

      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
    it('should render', () => {
      LOGIC_HELPERS.switchCase = jest.fn(() => 'LOGIC_HELPERS.switchCase');

      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
  });
});
