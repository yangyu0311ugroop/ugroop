import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { moment } from 'utils';
import { ItemSeparator } from '../index';

describe('<ItemSeparator />', () => {
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
    rendered = shallow(<ItemSeparator {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(ItemSeparator).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('isSameDay', () => {
    it('should return whatever isSameDay returns', () => {
      const createdAt = '2019-04-29T17:50:00.000Z';
      const previousCreatedAt = '2019-04-30T00:00:00.000Z';

      moment.isSameDay = jest.fn(() => true);

      rendered.setProps({
        createdAt,
        previousCreatedAt,
      });

      expect(instance.isSameDay()).toBe(true);
    });

    it('should return false if previousCreatedAt is null', () => {
      const createdAt = '2019-04-29T17:50:00.000Z';
      const previousCreatedAt = '';

      rendered.setProps({
        createdAt,
        previousCreatedAt,
      });

      expect(instance.isSameDay()).toBe(false);
    });
  });

  describe('render()', () => {
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
