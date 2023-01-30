import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { ErrorPages } from '../index';

describe('<ErrorPages />', () => {
  let rendered;

  const props = {
    classes: {},
  };

  beforeEach(() => {
    rendered = shallow(<ErrorPages {...props} />);
  });

  it('should exists', () => {
    expect(ErrorPages).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  it('should render something', () => {
    expect(toJSON(rendered)).toMatchSnapshot();
  });

  it('should render error 404', () => {
    rendered.setProps({ error: '404' });
    expect(toJSON(rendered)).toMatchSnapshot();
  });

  describe('methods', () => {
    it('handleGoBack', () => {
      const mockGo = jest.fn();
      const mockHistory = { go: mockGo };
      rendered.setProps({ history: mockHistory });
      rendered.instance().handleGoBack();
      expect(mockGo).toBeCalledWith(-1);
    });
  });
});
