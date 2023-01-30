import { PHOTO_TITLE_DATE } from 'appConstants';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import nth from 'lodash/nth';
import { moment } from 'utils';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import Hover from 'viewComponents/Hover';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { DAY, TAB_OTHER } from 'utils/modelConstants';
import { Day } from '../index';

describe('<Day />', () => {
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
    LOGIC_HELPERS.ifFunction = jest.fn(() => jest.fn());
    rendered = shallow(<Day {...props} />);
    instance = rendered.instance();
    jest.clearAllMocks();
  });

  it('should exists', () => {
    expect(Day).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('handleClick', () => {
    it('should give id of day to ifFunction', () => {
      instance.handleClick(DAY)();
      expect(LOGIC_HELPERS.ifFunction).toBeCalled();
      expect(LOGIC_HELPERS.ifFunction.mock.calls).toMatchSnapshot();
    });

    it('should give parentNodeId of day to ifFunction', () => {
      rendered.setProps({
        parentNodeId: 2,
      });
      instance.handleClick(TAB_OTHER)();
      expect(LOGIC_HELPERS.ifFunction).toBeCalled();
      expect(LOGIC_HELPERS.ifFunction.mock.calls).toMatchSnapshot();
    });
  });

  describe('getTrailRoot', () => {
    it('should return nth of something', () => {
      rendered.setProps({
        trail: [1],
      });
      expect(instance.getTrailRoot()).toEqual(nth([1], -1));
    });
  });

  describe('renderCardEvents', () => {
    it('should match snapshot', () => {
      const events = [1];
      instance.renderEventIcon = jest.fn(() => 'renderEventIcon');
      const snap = shallow(<div>{instance.renderCardEvents({ events })}</div>);
      expect(toJSON(snap)).toMatchSnapshot();
    });
  });

  describe('handleLinkClick', () => {
    it('should pass the clicked id', () => {
      LOGIC_HELPERS.ifFunction = jest.fn();
      const onClick = 'onClick';
      rendered.setProps({ onClick, id: 1 });
      instance.handleLinkClick();

      expect(LOGIC_HELPERS.ifFunction).toBeCalledWith('onClick', [1]);
    });
  });

  describe('getTrailRoot()', () => {
    it('should getTrailRoot()', () => {
      rendered.setProps({ trail: [1, 2, 3] });

      expect(instance.getTrailRoot()).toBe(3);
    });
  });

  describe('weekend()', () => {
    it('should return weekend', () => {
      LOGIC_HELPERS.ifElse = jest.fn(() => 'LOGIC_HELPERS.ifElse');

      expect(instance.weekend()).toBe('LOGIC_HELPERS.ifElse');
    });
  });

  describe('renderLogic', () => {
    it('should match snapshot', () => {
      instance.getTrailRoot = jest.fn(() => 1);
      rendered.setProps({
        id: 1,
      });
      const snap = shallow(<div>{instance.renderLogic()}</div>);
      expect(toJSON(snap)).toMatchSnapshot();
    });
  });

  describe('renderDateText()', () => {
    it('should return null', () => {
      rendered.setProps({ startDate: '' });

      expect(instance.renderDateText()).toBe(null);
    });

    it('should return moment.renderDateShorter', () => {
      moment.renderDateShorter = jest.fn(() => 'moment.renderDateShorter');

      rendered.setProps({ startDate: '1' });

      expect(instance.renderDateText()).toBe('moment.renderDateShorter');
    });
  });

  describe('renderCardEvents()', () => {
    it('should renderCardEvents', () => {
      instance.renderEventIcon = jest.fn(() => 'renderEventIcon');

      TEST_HELPERS.expectMatchSnapshot(instance.renderCardEvents, [
        { events: [1] },
      ]);
    });
  });

  describe('renderCard', () => {
    it('should match snapshot', () => {
      const snapshot = shallow(<div>{instance.renderCard()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should match snapshot when photo exist', () => {
      rendered.setProps({
        photo: 'qqqq',
      });
      const snapshot = shallow(<div>{instance.renderCard()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderEventIcon', () => {
    it('should render match snapshot', () => {
      const snapshot = shallow(
        <div>{instance.renderEventIcon({ id: 1, position: 'center' })}</div>,
      );

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderLogic()', () => {
    it('should renderLogic', () => {
      instance.getTrailRoot = jest.fn(() => 9922);

      TEST_HELPERS.expectMatchSnapshot(instance.renderLogic);
    });
  });

  describe('render()', () => {
    it('should render correctly', () => {
      rendered.setProps({
        index: 1,
        variant: PHOTO_TITLE_DATE,
        startDate: '1',
      });

      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should render correctly if all props were present in hover', () => {
      rendered.setProps({
        userId: 1,
      });
      const snapshot = shallow(
        <div>
          {rendered.find(Hover).prop('children')({
            entered: true,
            anchorEl: null,
            handleMouseEnter: jest.fn(),
            handleMouseLeave: jest.fn(),
          })}
        </div>,
      );
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should render correctly if all props were present in hover but userId is not present', () => {
      const snapshot = shallow(
        <div>
          {rendered.find(Hover).prop('children')({
            entered: true,
            anchorEl: null,
            handleMouseEnter: jest.fn(),
            handleMouseLeave: jest.fn(),
          })}
        </div>,
      );
      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should render description correctly if description prop exist', () => {
      rendered.setProps({
        description: 'sample',
      });
      const snapshot = shallow(
        <div>
          {rendered.find(Hover).prop('children')({
            entered: true,
            anchorEl: null,
            handleMouseEnter: jest.fn(),
            handleMouseLeave: jest.fn(),
          })}
        </div>,
      );
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
