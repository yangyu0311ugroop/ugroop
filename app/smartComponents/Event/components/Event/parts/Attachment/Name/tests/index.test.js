import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { Name } from '../index';

describe('<Name />', () => {
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
    rendered = shallow(<Name {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(Name).toBeDefined();
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

  describe('renderProp', () => {
    it('should pass to children function name', () => {
      const children = jest.fn();
      rendered.setProps({
        children,
        name: 'sample',
      });
      instance.renderProp();

      expect(children).toBeCalledWith('sample');
    });
  });

  describe('renderThumbnailDefault()', () => {
    it('should renderThumbnailDefault', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderThumbnailDefault);
    });
  });

  describe('renderThumbnail()', () => {
    it('should return null', () => {
      instance.renderThumbnailDefault = jest.fn(() => 'renderThumbnailDefault');

      rendered.setProps({ name: null });

      expect(instance.renderThumbnail()).toBe('renderThumbnailDefault');
    });

    it('should renderThumbnail', () => {
      rendered.setProps({ name: 'name.jpegggg' });

      TEST_HELPERS.expectMatchSnapshot(instance.renderThumbnail);
    });
  });

  describe('render()', () => {
    it('should render correctly', () => {
      LOGIC_HELPERS.switchCase = jest.fn();
      instance.render();

      expect(LOGIC_HELPERS.switchCase.mock.calls).toMatchSnapshot();
    });
  });
});
