import React from 'react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import mockStylesheet from 'utils/mockStylesheet';
import style from '../style';
import { Participants } from '..';

const classes = mockStylesheet(
  'smartComponents/Node/parts/Participants',
  style,
  { colors: {} },
);

describe('<Participants />', () => {
  let wrapper;
  let instance;
  let doResagaSnapshot;

  const makeProps = () => ({
    classes,
    resaga: {
      setValue: jest.fn(
        obj => doResagaSnapshot && expect({ setValue: obj }).toMatchSnapshot(),
      ),
      dispatchTo: jest.fn(
        obj =>
          doResagaSnapshot && expect({ dispatchTo: obj }).toMatchSnapshot(),
      ),
    },
    value: [1],
  });

  beforeEach(() => {
    wrapper = shallow(<Participants {...makeProps()} />);
    instance = wrapper.instance();
    doResagaSnapshot = false;
    jest.clearAllMocks();
  });

  it('exists', () => {
    expect(Comment).toBeDefined();
  });

  describe('componentWillMount', () => {
    it('should call fetchParticipants', () => {
      wrapper.setProps({
        mode: 'forms',
      });
      instance.fetchParticipants = jest.fn();
      instance.componentWillMount();
      expect(instance.fetchParticipants).toHaveBeenCalled();
    });
  });

  describe('#handleAddButtonClick()', () => {
    it('resaga.setValue still matches snapshot', () => {
      doResagaSnapshot = true;
      instance.handleAddButtonClick();
    });
    it('resaga.setValue still matches snapshot if readOnlyStatus', () => {
      wrapper.setProps({
        readOnlyStatus: true,
      });
      doResagaSnapshot = true;
      instance.handleAddButtonClick();
    });
  });

  describe('#renderTextOnly()', () => {
    it('still matches snapshot', () => {
      expect(instance.renderTextOnly()).toMatchSnapshot();
    });
  });

  describe('#renderEditableValue()', () => {
    it('still matches snapshot if no value', () => {
      wrapper.setProps({ value: [] });
      expect(instance.renderEditableValue()).toMatchSnapshot();
    });
  });

  describe('getBadgeClasses()', () => {
    it('should getBadgeClasses', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.getBadgeClasses);
    });
  });

  describe('#render()', () => {
    it('not explodes', () => {
      expect(wrapper).toHaveLength(1);
    });

    it('still matches snapshot', () => {
      expect(toJSON(wrapper)).toMatchSnapshot();
    });
  });
});
