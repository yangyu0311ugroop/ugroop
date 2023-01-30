import { PORTAL_HELPERS } from 'containers/Portal/helpers';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import {
  ONLY_ME,
  ORGANISERS,
} from 'smartComponents/Node/types/TabOther/components/TabAccess/constants';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { Card } from '../index';

describe('<Card />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    classes: {},
    resaga,
    history: { location: { pathname: 'some path' } },
  };

  beforeEach(() => {
    rendered = shallow(<Card {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(Card).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('openPreview()', () => {
    it('should call PORTAL_HELPERS.openPhotoPreview', () => {
      PORTAL_HELPERS.openPhotoPreview = jest.fn();

      instance.openPreview()();

      TEST_HELPERS.expectCalled(PORTAL_HELPERS.openPhotoPreview);
    });
  });

  describe('renderPhoto()', () => {
    it('should renderPhoto', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderPhoto);
    });
  });

  describe('renderEmpty()', () => {
    it('should renderEmpty', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderEmpty);
    });
  });

  describe('renderPhotos()', () => {
    it('should renderEmpty', () => {
      rendered.setProps({ children: [] });
      instance.renderEmpty = jest.fn(() => 'renderEmpty');

      expect(instance.renderPhotos({})).toBe('renderEmpty');
    });

    it('should renderPhotos', () => {
      instance.renderPhoto = jest.fn(() => 'renderPhoto');

      rendered.setProps({ children: [1] });

      TEST_HELPERS.expectMatchSnapshot(instance.renderPhotos({}));
    });
    it('should return null', () => {
      rendered.setProps({ children: [1] });

      expect(instance.renderPhotos({ filteredIds: [] })).toBe(null);
    });
  });
  describe('filteredIds()', () => {
    it('should filteredIds', () => {
      rendered.setProps({ filtered: true });
      TEST_HELPERS.expectMatchSnapshot(instance.filteredIds([1]));
    });
  });
  describe('componentDidUpdate()', () => {
    it('should componentDidUpdate', () => {
      rendered.setProps({ selectDayId: 2, filtered: true });
      rendered.setState({ showingCount: 2 });
      TEST_HELPERS.expectMatchSnapshot(
        instance.componentDidUpdate({ selectDayId: 1 }),
      );
    });
  });
  describe('renderGoTo()', () => {
    it('should return null', () => {
      rendered.setProps({ children: [] });

      expect(instance.renderGoTo(1)).toBe(null);
    });

    it('should renderGoTo', () => {
      rendered.setProps({ children: [1, 2] });

      TEST_HELPERS.expectMatchSnapshot(instance.renderGoTo, [1]);
    });
  });

  describe('renderPhotoCount()', () => {
    it('should return null', () => {
      rendered.setProps({ children: [1, 2], filtered: true });
      rendered.setState({ showingCount: 2 });
      expect(instance.renderPhotoCount()).toBe(null);
    });

    it('should renderPhotoCount', () => {
      rendered.setProps({ children: [1, 2, 3], filtered: true });
      rendered.setState({ showingCount: 2 });
      TEST_HELPERS.expectMatchSnapshot(instance.renderPhotoCount);
    });
  });

  describe('render()', () => {
    it('should return null', () => {
      rendered.setProps({ sharedWith: ORGANISERS });

      expect(instance.render()).toBe(null);
    });

    it('should return null 2', () => {
      rendered.setProps({ sharedWith: ONLY_ME });

      expect(instance.render()).toBe(null);
    });

    it('should render correctly', () => {
      rendered.setProps({ isPublic: true });
      instance.renderPhotos = jest.fn(() => 'renderPhotos');
      instance.renderGoTo = jest.fn(() => 'renderGoTo');
      instance.canCreatePhoto = jest.fn(() => true);

      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
