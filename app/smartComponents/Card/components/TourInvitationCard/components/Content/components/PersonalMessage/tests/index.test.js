import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { PersonalMessage } from '../index';

describe('<PersonalMessage />', () => {
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
    rendered = shallow(<PersonalMessage {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(PersonalMessage).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('render()', () => {
    it('should return null', () => {
      rendered.setProps({ content: '' });

      expect(instance.render()).toBe(null);
    });

    it('should render', () => {
      rendered.setProps({ content: 'some content' });

      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
