import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { Description } from '../index';

describe('<Description />', () => {
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
    rendered = shallow(<Description {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(Description).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('renderTextOnly', () => {
    it('should match snapshot', () => {
      const snapshot = shallow(<div>{instance.renderTextOnly()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderTextField', () => {
    it('should match snapshot', () => {
      const snapshot = shallow(<div>{instance.renderTextField()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderProp', () => {
    it('should call children function with description', () => {
      const children = jest.fn();
      rendered.setProps({
        children,
        description: 'description',
      });
      instance.renderProp();

      expect(children).toBeCalledWith('description');
    });
  });

  describe('render()', () => {
    it('should match snapshot', () => {
      LOGIC_HELPERS.switchCase = jest.fn();
      instance.render();

      expect(LOGIC_HELPERS.switchCase.mock.calls).toMatchSnapshot();
    });
  });
});
