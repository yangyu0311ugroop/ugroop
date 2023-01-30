import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { NODE_POSITIONS } from 'utils/constants/nodes';
import { MOMENT_HELPERS } from 'utils/helpers/moment';
import { EventSubscribe } from '../index';

describe('<EventSubscribe />', () => {
  let rendered;
  let instance;

  const props = {
    id: 1,
    position: NODE_POSITIONS.end,
    updateParentEvents: jest.fn(),
    index: 1,
    renderSection: 'ceiling',
    startingUp: true,
  };

  beforeEach(() => {
    rendered = shallow(<EventSubscribe {...props} />);
    instance = rendered.instance();
    jest.clearAllMocks();
  });

  it('should exists', () => {
    expect(EventSubscribe).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('componentDidUpdate', () => {
    it('calls props.updateParentEvents', () => {
      rendered.setProps({ endTime: null });
      instance.componentDidUpdate({ endTime: 'not null' });
      expect(instance.props.updateParentEvents).toBeCalledWith(
        expect.objectContaining({
          id: instance.props.id,
          position: instance.props.position,
        }),
        true,
      );
    });
  });

  describe('componentWillUnmount', () => {
    it('calls props.updateParentEvents', () => {
      instance.componentWillUnmount();
      expect(instance.props.updateParentEvents).toBeCalledWith(
        expect.objectContaining({
          id: instance.props.id,
          position: instance.props.position,
        }),
        true,
      );
    });
  });

  describe('makeEventTime', () => {
    it('makes times at least SHORTEST_ITINERARY_DURATION apart', () => {
      MOMENT_HELPERS.setTimeZone = MOMENT_HELPERS.createUtc;
      rendered.setProps({
        renderSection: 'content',
        startTime: '2018-01-01T12:00:00.000Z',
        endTime: '2018-01-01T12:01:00.000Z',
      });
      const result = instance.makeEventTime(instance.props);
      expect(result.startTime.toISOString()).toEqual(
        '2018-01-01T12:00:00.000Z',
      );
      expect(result.endTime.toISOString()).toEqual('2018-01-01T12:30:00.000Z');
    });
  });

  describe('makeEvent', () => {
    it('still matches snapshot without event', () => {
      expect(instance.makeEvent()).toMatchSnapshot();
    });
  });

  describe('render()', () => {
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.render()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
