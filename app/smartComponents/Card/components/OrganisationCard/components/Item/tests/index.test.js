import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { Item } from '../index';

describe('<Item />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    classes: {},
    resaga,
    darkMode: true,
  };

  beforeEach(() => {
    rendered = shallow(<Item {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(Item).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('renderContent()', () => {
    it('should renderContent alwaysShow = true', () => {
      rendered.setProps({ alwaysShow: true });

      const snapshot = shallow(<div>{instance.renderContent()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should renderContent alwaysShow = false', () => {
      rendered.setProps({ alwaysShow: false });

      const snapshot = shallow(<div>{instance.renderContent()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('render()', () => {
    it('should render correctly', () => {
      rendered.setProps({
        hover: true,
        ellipsis: true,
        paddingLeft: true,
      });
      instance.renderContent = jest.fn(() => 'renderContent');

      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
