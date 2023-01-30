import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { TimeLineHeader } from '../timeLineHeader';

const props = {
  classes: {},
  dayIds: [1],
  dateTitle: 'month',
  unresolvedFeedbackCount: 1,
};

describe('TimeLineToolBar component', () => {
  let rendered;
  let instance;

  beforeEach(() => {
    rendered = shallow(<TimeLineHeader {...props} />);
    instance = rendered.instance();
  });

  describe('render()', () => {
    it('should render something', () => {
      expect(instance.render()).toBeDefined();
    });
    it('should render w/ badge', () => {
      instance.renderBadge = jest.fn(() => 'renderBadge');
      const snapshot = shallow(<div>{instance.render()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should render no title', () => {
      rendered.setProps({ dateTitle: '' });
      instance.renderBadge = jest.fn(() => 'renderBadge');
      const snapshot = shallow(<div>{instance.render()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should render div', () => {
      rendered.setProps({ dayIds: [] });
      instance.renderBadge = jest.fn(() => 'renderBadge');
      const snapshot = shallow(<div>{instance.render()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderBadge', () => {
    it('should render nothing', () => {
      rendered.setProps({ unresolvedFeedbackCount: 0 });
      expect(instance.renderBadge()).toBe('');
    });
    it('should render badge', () => {
      const snapshot = shallow(<div>{instance.renderBadge()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
