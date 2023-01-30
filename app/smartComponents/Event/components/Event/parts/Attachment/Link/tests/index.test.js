import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { AttachmentLink } from '../index';

describe('<Link />', () => {
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
    rendered = shallow(<AttachmentLink {...props} />);
    instance = rendered.instance();
    jest.clearAllMocks();
  });

  it('should exists', () => {
    expect(AttachmentLink).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('handleClick', () => {
    it('should call stopPropagation', () => {
      const stopPropagation = jest.fn();
      instance.handleClick({ stopPropagation });

      expect(stopPropagation).toBeCalledWith();
    });
  });

  describe('renderField', () => {
    it('should match snapshot', () => {
      const snapshot = shallow(<div>{instance.renderField()}</div>);

      expect(toJSON(snapshot)).toBeDefined();
    });
  });

  describe('renderDefault', () => {
    it('should match snapshot', () => {
      const snapshot = shallow(<div>{instance.renderDefault()}</div>);

      expect(toJSON(snapshot)).toBeDefined();
    });
  });

  describe('renderProp', () => {
    it('should pass link value in the children prop function', () => {
      const children = jest.fn();
      rendered.setProps({
        children,
        link: 'http://google.com',
      });
      instance.renderProp();

      expect(children).toBeCalled();
    });
  });

  describe('renderTextOnly()', () => {
    it('should renderTextOnly', () => {
      instance.padUrlquery = jest.fn(() => 'padUrlquery');

      TEST_HELPERS.expectMatchSnapshot(instance.renderTextOnly);
    });
  });

  describe('padUrlquery', () => {
    it('should go to 2nd condition', () => {
      const url = 'link';
      const fileName = 'name';
      const expected = `${
        process.env.COORDINATE_BASE_URL
      }/link?filename=${fileName}`;
      expect(instance.padUrlquery(url, fileName)).toEqual(expected);
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
