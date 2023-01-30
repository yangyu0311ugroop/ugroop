import { ability } from 'apis/components/Ability/ability';
import { CREATED_AT, PHOTO_WITH_INFO, PREVIEW, SELECT } from 'appConstants';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { PhotoCard } from '../index';

describe('<PhotoCard />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    classes: {},
    resaga,
    onClick: jest.fn(),
    onDelete: jest.fn(),
  };

  beforeEach(() => {
    rendered = shallow(<PhotoCard {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(PhotoCard).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('showInfo()', () => {
    it('should return true', () => {
      rendered.setProps({ layout: PHOTO_WITH_INFO, editable: true });

      expect(instance.showInfo()).toBe(true);
    });
  });

  describe('canUpdate()', () => {
    it('should return null', () => {
      ability.can = jest.fn(() => false);

      expect(instance.canUpdate()).toBe(false);
    });

    it('should return true', () => {
      ability.can = jest.fn(() => true);

      expect(instance.canUpdate()).toBe(true);
    });
  });

  describe('photoEditable()', () => {
    it('should return null', () => {
      rendered.setProps({ clickMode: PREVIEW, editable: true });
      instance.canUpdate = jest.fn(() => false);

      expect(instance.photoEditable()).toBe(false);
    });

    it('should return true', () => {
      rendered.setProps({ clickMode: PREVIEW, editable: true });
      instance.canUpdate = jest.fn(() => true);

      expect(instance.photoEditable()).toBe(true);
    });
  });

  describe('renderHeader()', () => {
    it('should return null', () => {
      instance.showInfo = jest.fn(() => false);

      expect(instance.renderHeader()).toBe(false);
    });

    it('should renderHeader', () => {
      rendered.setProps({ groupBy: CREATED_AT });
      instance.showInfo = jest.fn(() => true);

      TEST_HELPERS.expectMatchSnapshot(instance.renderHeader);
    });
  });

  describe('renderPhoto()', () => {
    it('should renderPhoto', () => {
      rendered.setProps({ clickMode: PREVIEW });

      TEST_HELPERS.expectMatchSnapshot(instance.renderPhoto);
    });
  });

  describe('renderDescription()', () => {
    it('should renderDescription', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderDescription, [
        { content: 'content' },
      ]);
    });
  });

  describe('renderContent()', () => {
    it('should return null', () => {
      instance.showInfo = jest.fn(() => null);

      expect(instance.renderContent()).toBe(null);
    });

    it('should renderContent', () => {
      instance.showInfo = jest.fn(() => true);

      TEST_HELPERS.expectMatchSnapshot(instance.renderContent);
    });
  });

  describe('renderCheckButton()', () => {
    it('should return null', () => {
      rendered.setProps({
        clickMode: SELECT,
        editable: null,
      });

      expect(instance.renderCheckButton()).toBe(null);
    });

    it('should renderCheckButton', () => {
      rendered.setProps({
        clickMode: SELECT,
        editable: true,
      });

      TEST_HELPERS.expectMatchSnapshot(instance.renderCheckButton);
    });
  });

  describe('renderDeleteButton()', () => {
    it('should return null', () => {
      instance.photoEditable = jest.fn(() => null);

      expect(instance.renderDeleteButton()).toBe(null);
    });

    it('should renderDeleteButton', () => {
      instance.photoEditable = jest.fn(() => true);

      TEST_HELPERS.expectMatchSnapshot(instance.renderDeleteButton);
    });
  });

  describe('render()', () => {
    it('should render correctly', () => {
      instance.renderHeader = jest.fn(() => 'renderHeader');
      instance.renderPhoto = jest.fn(() => 'renderPhoto');
      instance.renderContent = jest.fn(() => 'renderContent');
      instance.renderCheckButton = jest.fn(() => 'renderCheckButton');
      instance.renderDeleteButton = jest.fn(() => 'renderDeleteButton');

      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should render props', () => {
      const children = jest.fn(() => 'children');
      rendered.setProps({ children });

      expect(instance.render()).toBe('children');
    });
  });
});
