import { PORTAL_HELPERS } from 'containers/Portal/helpers';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { Badge } from '../index';

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
  };

  beforeEach(() => {
    rendered = shallow(<Badge {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(Badge).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('openPreview()', () => {
    it('should call PORTAL_HELPERS.openPhotoPreview', () => {
      PORTAL_HELPERS.openPhotoPreview = jest.fn();
      const e = {
        stopPropagation: jest.fn(),
      };

      instance.openPreview()(e);

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

  describe('renderBadge()', () => {
    it('should match snapshot', () => {
      rendered.setProps({ filtered: true });
      TEST_HELPERS.expectMatchSnapshot(instance.renderBadge([1]));
    });
  });
  describe('renderBadge()', () => {
    it('should match snapshot if is empty', () => {
      rendered.setProps({ filtered: true });
      TEST_HELPERS.expectMatchSnapshot(instance.renderBadge());
    });
  });
  describe('renderPhotoCount()', () => {
    it('should renderPhotoCount', () => {
      rendered.setProps({ children: [1, 2], filtered: true });
      rendered.setState({ showingCount: 2 });
      TEST_HELPERS.expectMatchSnapshot(instance.renderPhotoCount);
    });
  });
  describe('dayBadge()', () => {
    it('should dayBadge', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.dayBadge([1]));
    });
  });
  describe('renderBadgeButton()', () => {
    it('should null when ids are not valid', () => {
      TEST_HELPERS.expectMatchSnapshot(
        expect(instance.renderBadgeButton({})).toEqual(null),
      );
    });
    it('should null when ids is empty ', () => {
      TEST_HELPERS.expectMatchSnapshot(
        expect(instance.renderBadgeButton({ filteredIds: [] })).toEqual(null),
      );
    });
    it('should renderBadgeButton', () => {
      TEST_HELPERS.expectMatchSnapshot(
        TEST_HELPERS.expectMatchSnapshot(
          instance.renderBadgeButton({ filteredIds: [1] }),
        ),
      );
    });
  });

  describe('render()', () => {
    it('should render correctly', () => {
      rendered.setProps({ isDateSet: true, filtered: true });
      instance.renderBadgeButton = jest.fn(() => 'renderBadgeButton');

      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should render correctly if not filted', () => {
      rendered.setProps({ isDateSet: true, filtered: false });
      instance.renderPhotos = jest.fn(() => 'renderPhotos');

      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
