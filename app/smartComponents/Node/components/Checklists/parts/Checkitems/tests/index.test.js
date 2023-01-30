import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { Checkitems } from '../index';

describe('<Checkitems />', () => {
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
    rendered = shallow(<Checkitems {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(Checkitems).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('render()', () => {
    it('should return null', () => {
      rendered.setProps({ checklists: [] });

      expect(instance.render()).toBe(null);
    });
    it('should render showPlaceholder', () => {
      rendered.setProps({ checklists: [], showPlaceholder: true });

      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should render correctly', () => {
      rendered.setProps({ checklists: [1] });

      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
