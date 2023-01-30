import React from 'react';
import { shallow } from 'enzyme';
import { PARTICIPANT_ACCESS_LEVELS } from 'utils/constants/people';
import { ability } from 'apis/components/Ability/ability';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import toJSON from 'enzyme-to-json';
import { TemplateParticipantList } from '..';

describe('<TemplateParticipantList />', () => {
  let wrapper;
  let instance;
  let doResagaSnapshot;

  const makeProps = () => ({
    declinedIds: [],
    pendingIds: [],
    classes: {},
    templateId: 1,
    onClose: jest.fn(),
    resaga: {
      setValue: jest.fn(
        obj => doResagaSnapshot && expect({ setValue: obj }).toMatchSnapshot(),
      ),
    },
  });

  beforeEach(() => {
    wrapper = shallow(<TemplateParticipantList {...makeProps()} />);
    instance = wrapper.instance();
    doResagaSnapshot = false;
    jest.clearAllMocks();
  });

  it('exists', () => {
    expect(TemplateParticipantList).toBeDefined();
  });

  describe('#handleCloseParticipantsModal()', () => {
    it('resaga.setValue still matches snapshot', () => {
      doResagaSnapshot = true;
      instance.handleCloseParticipantsModal();
    });
  });

  describe('#handleCloseCreateParticipantModal()', () => {
    it('resaga.setValue still matches snapshot', () => {
      doResagaSnapshot = true;
      instance.handleCloseCreateParticipantModal();
    });
  });

  describe('#handleCloseViewParticipantModal()', () => {
    it('resaga.setValue still matches snapshot', () => {
      doResagaSnapshot = true;
      instance.handleCloseViewParticipantModal();
    });
  });

  describe('#handleViewFormsClick()', () => {
    it('resaga.setValue still matches snapshot', () => {
      doResagaSnapshot = true;
      instance.handleViewFormsClick({ preventDefault: jest.fn() });
    });
  });

  describe('#renderAvatar()', () => {
    it('still matches snapshot', () => {
      const id = 1;
      const props = { x: 1 };
      expect(instance.renderAvatar(id, props)).toMatchSnapshot();
    });
  });

  describe('renderList()', () => {
    it('should renderList', () => {
      wrapper.setProps({ editable: true, people: [1] });

      TEST_HELPERS.expectMatchSnapshot(instance.renderList);
    });
  });

  describe('#render()', () => {
    it('not explodes', () => {
      expect(wrapper).toHaveLength(1);
    });

    it('still matches snapshot', () => {
      ability.can = jest.fn(() => true);
      expect(instance.render()).toMatchSnapshot();
    });
  });

  describe('renderTooltipText()', () => {
    it('should renderTooltipText', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderTooltipText(1, 'level'));
    });
  });

  describe('renderLabel()', () => {
    it('should renderLabel', () => {
      instance.canCreateParticipant = jest.fn(() => false);
      TEST_HELPERS.expectMatchSnapshot(instance.renderLabel());
    });
    it('should renderLabel', () => {
      instance.canCreateParticipant = jest.fn(() => true);
      TEST_HELPERS.expectMatchSnapshot(instance.renderLabel());
    });
  });

  describe('renderAvatarWithClassname()', () => {
    it('should renderAvatarWithClassname', () => {
      TEST_HELPERS.expectMatchSnapshot(
        instance.renderAvatarWithClassname(1, {}, 'level'),
      );
    });
  });

  describe('renderAvatarWithAccessLevel()', () => {
    it('should renderAvatarWithAccessLevel', () => {
      instance.renderAvatarWithClassname = jest.fn();
      TEST_HELPERS.expectMatchSnapshot(
        instance.renderAvatarWithAccessLevel(1, {})(
          PARTICIPANT_ACCESS_LEVELS.full,
        ),
      );
    });
    it('should renderAvatarWithAccessLevel', () => {
      instance.renderAvatarWithClassname = jest.fn(() => jest.fn());
      TEST_HELPERS.expectMatchSnapshot(
        instance.renderAvatarWithAccessLevel(1, {})(
          PARTICIPANT_ACCESS_LEVELS.limited,
        ),
      );
    });
  });

  describe('renderListLogics()', () => {
    it('should renderListLogics', () => {
      wrapper.setProps({
        participantIds: [1],
      });
      TEST_HELPERS.expectMatchSnapshot(instance.renderListLogics);
    });
  });

  describe('renderAvatarList()', () => {
    it('should renderAvatarList', () => {
      wrapper.setProps({
        pendingIds: [2],
        declinedIds: [3],
      });
      TEST_HELPERS.expectMatchSnapshot(instance.renderAvatarList);
    });
  });

  describe('renderPopperOptions()', () => {
    it('should renderPopperOptions', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderPopperOptions({}));
    });
  });

  describe('renderPopperButton()', () => {
    it('should renderPopperButton', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderPopperButton({}));
    });
    it('should renderPopperButton', () => {
      instance.getPeopleBasedOnFilter = jest.fn(() => [1, 2]);
      TEST_HELPERS.expectMatchSnapshot(instance.renderPopperButton({}));
    });
  });

  describe('renderMine()', () => {
    it('should renderMine', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderMine);
    });
  });

  describe('handleFilterSelect()', () => {
    it('should handleFilterSelect', () => {
      TEST_HELPERS.expectMatchSnapshot(
        instance.handleFilterSelect('filter', 'value'),
      );
    });
  });

  describe('renderAvatars', () => {
    it('should match snapshot', () => {
      const snapshot = shallow(
        <div>
          {instance.renderAvatars()({ handlePeopleRedirect: jest.fn() })}
        </div>,
      );

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderFilterPopper', () => {
    it('should match snapshot', () => {
      const snapshot = shallow(<div>{instance.renderFilterPopper()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
  describe('canCreateParticipant', () => {
    it('should match snapshot', () => {
      const snapshot = shallow(<div>{instance.canCreateParticipant()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderParticipants()', () => {
    it('should renderParticipants', () => {
      wrapper.setProps({
        useList: false,
      });
      instance.renderMine = jest.fn();
      TEST_HELPERS.expectMatchSnapshot(instance.renderParticipants);
    });
  });
});
