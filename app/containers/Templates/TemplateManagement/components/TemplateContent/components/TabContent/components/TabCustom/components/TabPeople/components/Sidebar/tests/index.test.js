import { PEOPLE_FILTERS, PEOPLE_TAB_OPTIONS } from 'appConstants';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { TOUR_CONTRIBUTOR } from 'utils/modelConstants';
import { Sidebar } from '../index';
import { ability } from '../../../../../../../../../../../../../../apis/components/Ability/ability';

describe('<Sidebar />', () => {
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
    rendered = shallow(<Sidebar {...props} />);
    instance = rendered.instance();
    jest.clearAllMocks();
  });

  it('should exists', () => {
    expect(Sidebar).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('componentDidMount', () => {
    it('should call setValue', () => {
      instance.componentDidMount();

      expect(resaga.setValue).toBeCalledWith({
        peopleView: TOUR_CONTRIBUTOR,
        peopleFilterSelected: PEOPLE_FILTERS.CONTRIBUTORS,
        peopleTabOptionSelected: PEOPLE_TAB_OPTIONS.ALL_CONTRIBUTORS,
      });
    });
  });
  describe('stickyChange', () => {
    it('should call setState', () => {
      instance.setState = jest.fn();
      instance.stickyChange({ status: 'test' });
      expect(instance.setState).toBeCalled();
    });
  });

  describe('renderParticipantButton', () => {
    it('should return participantMenuButton if useList is true', () => {
      const innerProps = { useList: true };
      const snapshot = shallow(
        <div>{instance.renderParticipantButton()(innerProps)}</div>,
      );

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('recalculateRemainingSeats()', () => {
    it('should return true', () => {
      rendered.setProps({ subscriptionSeats: 2 });
      rendered.setProps({ numberOfConnectedPeople: 1 });
      rendered.setState({ remainingSeats: 0 });
    });
  });

  describe('canExecuteTab()', () => {
    it('should return true', () => {
      rendered.setProps({ editable: true });
      ability.can = jest.fn(() => true);

      expect(instance.canExecuteTab()).toBe(true);
    });
  });

  describe('render()', () => {
    it('should render correctly', () => {
      instance.canExecuteTab = jest.fn(() => true);
      instance.canInvite = jest.fn(() => true);
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
