import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { ResponseMessage } from '../index';

describe('<ResponseMessage />', () => {
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
    rendered = shallow(<ResponseMessage {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(ResponseMessage).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('render()', () => {
    it('should return null', () => {
      rendered.setProps({ content: '' });

      expect(instance.render()).toBe(null);
    });

    it('should render correctly with decline header', () => {
      rendered.setProps({ content: 'wrong email address' });

      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
