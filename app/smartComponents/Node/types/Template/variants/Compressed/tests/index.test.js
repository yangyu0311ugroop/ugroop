import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { Compressed } from '../index';

describe('<Compressed />', () => {
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
    rendered = shallow(<Compressed {...props} />);
    instance = rendered.instance();

    jest.clearAllMocks();
  });

  it('should exists', () => {
    expect(Compressed).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('isActive()', () => {
    it('should isActive()', () => {
      expect(instance.isActive()).toBe(false);
    });
  });

  describe('handleClickTour()', () => {
    it('should handleClickTour', () => {
      const onClick = jest.fn();
      rendered.setProps({ onClick });

      instance.handleClickTour();

      expect(onClick).toBeCalled();
    });
  });

  describe('removeRecent()', () => {
    it('should removeRecent', () => {
      instance.removeRecent({ stopPropagation: jest.fn() });

      expect(resaga.dispatchTo).toBeCalled();
    });
  });

  describe('renderStarButton()', () => {
    it('should renderStarButton', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderStarButton, [
        {
          starred: true,
        },
      ]);
    });
  });

  describe('renderContent()', () => {
    it('should renderContent', () => {
      rendered.setProps({ showOrganisation: true });

      TEST_HELPERS.expectMatchSnapshot(instance.renderContent, [
        {
          starred: true,
        },
      ]);
    });
  });

  describe('render()', () => {
    it('should render correctly', () => {
      rendered.setProps({ recent: true });

      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
