import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { moment } from 'utils';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { CompletedAt } from '../index';

describe('<CompletedAt />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    classes: { default: 'default' },
    resaga,
  };

  beforeEach(() => {
    rendered = shallow(<CompletedAt {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(CompletedAt).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('contentClassName()', () => {
    it('should return contentClassName', () => {
      rendered.setProps({ className: 'customClassName' });

      expect(instance.contentClassName()).toMatchSnapshot();
    });
  });

  describe('renderDefault()', () => {
    it('should return null', () => {
      rendered.setProps({ completedAt: '' });

      expect(instance.renderDefault()).toBe(null);
    });

    it('should renderDefault', () => {
      moment.renderCurrentDayDateTimeZone = jest.fn(
        () => 'renderCurrentDayDateTimeZone',
      );
      moment.renderFromNow = jest.fn(() => 'renderFromNow');
      rendered.setProps({ completedAt: '1/1/2001' });

      const snapshot = shallow(<div>{instance.renderDefault()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('render()', () => {
    it('should return LOGIC_HELPERS.switchCase', () => {
      LOGIC_HELPERS.switchCase = jest.fn(() => 'switchCase');

      expect(instance.render()).toBe('switchCase');

      expect(LOGIC_HELPERS.switchCase).toBeCalled();
      expect(LOGIC_HELPERS.switchCase.mock.calls).toMatchSnapshot();
    });
  });
});
