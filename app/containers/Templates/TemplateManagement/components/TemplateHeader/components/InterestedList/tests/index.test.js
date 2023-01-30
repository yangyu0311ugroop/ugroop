import React from 'react';
import { shallow } from 'enzyme';
import { ability } from 'apis/components/Ability/ability';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import toJSON from 'enzyme-to-json';
import { TemplateInterestedList } from '..';

describe('<TemplateInterestedList />', () => {
  let wrapper;
  let instance;
  let doResagaSnapshot;

  const makeProps = () => ({
    classes: {},
    templateId: 1,
    onClose: jest.fn(),
    complete: [],
    pending: [],
    history: {
      push: jest.fn(),
    },
    resaga: {
      setValue: jest.fn(
        obj => doResagaSnapshot && expect({ setValue: obj }).toMatchSnapshot(),
      ),
    },
  });

  beforeEach(() => {
    wrapper = shallow(<TemplateInterestedList {...makeProps()} />);
    instance = wrapper.instance();
    doResagaSnapshot = false;
    jest.clearAllMocks();
  });

  it('exists', () => {
    expect(TemplateInterestedList).toBeDefined();
  });

  describe('#handleOpenInterestedModal()', () => {
    it('resaga.setValue still matches snapshot', () => {
      doResagaSnapshot = true;
      instance.handleOpenInterestedModal();
    });
  });

  describe('#handleCloseInterestedModal()', () => {
    it('resaga.setValue still matches snapshot', () => {
      doResagaSnapshot = true;
      instance.handleCloseInterestedModal();
    });
  });

  describe('#handleCloseCreateInterestedPersonModal()', () => {
    it('resaga.setValue still matches snapshot', () => {
      doResagaSnapshot = true;
      instance.handleCloseCreateInterestedPersonModal();
    });
  });

  describe('#handleCloseViewInterestedPersonModal()', () => {
    it('resaga.setValue still matches snapshot', () => {
      doResagaSnapshot = true;
      instance.handleCloseViewInterestedPersonModal();
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
      wrapper.setProps({ editable: true, people: [1], peopleTabIndex: -1 });

      TEST_HELPERS.expectMatchSnapshot(instance.renderList);
    });

    it('should match snapshot if peopleTabIndex is not -1', () => {
      wrapper.setProps({ editable: true, people: [1], peopleTabIndex: 1 });

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
      instance.getPeopleBaseOnFilter = jest.fn(() => [1, 2]);
      TEST_HELPERS.expectMatchSnapshot(instance.renderPopperButton({}));
    });
  });

  describe('renderMine', () => {
    it('should match snapshot', () => {
      const snapshot = shallow(<div>{instance.renderMine()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('handleFilterSelect()', () => {
    it('should handleFilterSelect', () => {
      TEST_HELPERS.expectMatchSnapshot(
        instance.handleFilterSelect('filter', 'value'),
      );
    });
  });
});
