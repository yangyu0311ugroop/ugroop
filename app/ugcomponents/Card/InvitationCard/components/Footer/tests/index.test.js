import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { Footer } from '../index';

describe('<Footer />', () => {
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
    rendered = shallow(<Footer {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(Footer).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('handleToggle()', () => {
    it('should call setValue', () => {
      instance.handleToggle(null, true);

      expect(resaga.setValue).toBeCalledWith({ showCompleted: true });
    });
  });

  describe('render()', () => {
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
