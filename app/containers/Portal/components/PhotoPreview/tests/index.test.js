import { ability } from 'apis/components/Ability/ability';
import {
  LEAST_RECENTLY_UPLOADED,
  RECENTLY_UPLOADED,
  VIEW_MODE,
} from 'appConstants';
import { PORTAL_HELPERS } from 'containers/Portal/helpers';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { PhotoPreview } from '../index';

describe('<PhotoPreview />', () => {
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
    rendered = shallow(<PhotoPreview {...props} />);
    instance = rendered.instance();

    jest.clearAllMocks();
  });

  it('should exists', () => {
    expect(PhotoPreview).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('componentDidMount()', () => {
    it('should call closePreview', () => {
      rendered.setProps({ exist: false });
      instance.closePreview = jest.fn();

      instance.componentDidMount();

      TEST_HELPERS.expectCalled(instance.closePreview);
    });

    it('should call addEventListener', () => {
      rendered.setProps({ exist: true });
      document.addEventListener = jest.fn();

      instance.componentDidMount();

      TEST_HELPERS.expectCalled(document.addEventListener);
    });
  });

  describe('componentWillReceiveProps()', () => {
    it('should call closePreview', () => {
      instance.closePreview = jest.fn();

      instance.componentWillReceiveProps({ exist: false });

      TEST_HELPERS.expectCalled(instance.closePreview);
    });

    it('should NOT call closePreview', () => {
      instance.closePreview = jest.fn();

      instance.componentWillReceiveProps({ exist: true });

      TEST_HELPERS.expectNotCalled(instance.closePreview);
    });

    it('should set this.activity', () => {
      rendered.setProps({ createdBy: 1 });

      instance.componentWillReceiveProps({ createdBy: 2 });

      expect(instance.activity.createdBy).toBe(2);
    });
  });

  describe('componentWillUnmount()', () => {
    it('should call addEventListener', () => {
      document.removeEventListener = jest.fn();

      instance.componentWillUnmount();

      TEST_HELPERS.expectCalled(document.removeEventListener);
    });
  });

  describe('deletePhoto()', () => {
    it('should call dispatchTo', () => {
      instance.deletePhoto();

      TEST_HELPERS.expectCalled(resaga.dispatchTo);
    });
  });

  describe('deletePhotoSuccess()', () => {
    it('should closePreview', () => {
      instance.children = jest.fn(() => [1]);
      instance.closePreview = jest.fn();
      PORTAL_HELPERS.closePortal = jest.fn();

      instance.deletePhotoSuccess();

      TEST_HELPERS.expectCalled(PORTAL_HELPERS.closePortal);
      TEST_HELPERS.expectCalled(instance.closePreview);
    });

    it('should previewRight', () => {
      instance.children = jest.fn(() => [1, 2]);
      instance.previewRight = jest.fn();
      PORTAL_HELPERS.closePortal = jest.fn();

      instance.deletePhotoSuccess();

      TEST_HELPERS.expectCalled(PORTAL_HELPERS.closePortal);
      TEST_HELPERS.expectCalled(instance.previewRight);
    });
  });

  describe('deletePhotoError()', () => {
    it('should closePortal', () => {
      PORTAL_HELPERS.closePortal = jest.fn();

      instance.deletePhotoError();

      TEST_HELPERS.expectCalled(PORTAL_HELPERS.closePortal);
    });
  });

  describe('confirmDelete()', () => {
    it('should call confirmDeletePhoto', () => {
      PORTAL_HELPERS.confirmDeletePhoto = jest.fn(() => 999);

      instance.confirmDelete();

      TEST_HELPERS.expectCalled(PORTAL_HELPERS.confirmDeletePhoto);
      expect(rendered.state().confirmDeleteDialogId).toBe(999);
    });
  });

  describe('handleKeyDown()', () => {
    it('should NOT call previewLeft and previewRight #1', () => {
      rendered.setState({ editing: true });
      rendered.setProps({ previewId: 1 });
      instance.previewLeft = jest.fn();
      instance.previewRight = jest.fn();

      instance.handleKeyDown({});

      TEST_HELPERS.expectNotCalled(instance.previewLeft);
      TEST_HELPERS.expectNotCalled(instance.previewRight);
    });

    it('should NOT call previewLeft and previewRight #2', () => {
      rendered.setState({ editing: false });
      rendered.setProps({ previewId: 0 });
      instance.previewLeft = jest.fn();
      instance.previewRight = jest.fn();

      instance.handleKeyDown({});

      TEST_HELPERS.expectNotCalled(instance.previewLeft);
      TEST_HELPERS.expectNotCalled(instance.previewRight);
    });

    it('should call previewLeft', () => {
      rendered.setState({ editing: false });
      rendered.setProps({ previewId: 1 });
      instance.previewLeft = jest.fn();
      instance.previewRight = jest.fn();

      instance.handleKeyDown({ keyCode: 37 });

      TEST_HELPERS.expectCalled(instance.previewLeft);
      TEST_HELPERS.expectNotCalled(instance.previewRight);
    });

    it('should call previewRight', () => {
      rendered.setState({ editing: false });
      rendered.setProps({ previewId: 1 });
      instance.previewLeft = jest.fn();
      instance.previewRight = jest.fn();

      instance.handleKeyDown({ keyCode: 39 });

      TEST_HELPERS.expectNotCalled(instance.previewLeft);
      TEST_HELPERS.expectCalled(instance.previewRight);
    });
  });

  describe('closePreview()', () => {
    it('should call close', () => {
      PORTAL_HELPERS.close = jest.fn();

      instance.closePreview();

      TEST_HELPERS.expectCalled(PORTAL_HELPERS.close);
    });
  });

  describe('previewLeft()', () => {
    it('should return null', () => {
      rendered.setProps({ previewId: 0 });

      expect(instance.previewLeft()).toBe(null);
    });

    it('should previewLeft prev', () => {
      rendered.setProps({ previewId: 2 });
      PORTAL_HELPERS.openPhotoPreview = jest.fn();
      instance.children = jest.fn(() => [1, 2]);

      instance.previewLeft();

      TEST_HELPERS.expectCalledAndMatchSnapshot(
        PORTAL_HELPERS.openPhotoPreview,
      );
    });

    it('should previewLeft last', () => {
      rendered.setProps({ previewId: 1 });
      PORTAL_HELPERS.openPhotoPreview = jest.fn();
      instance.children = jest.fn(() => [1, 2]);

      instance.previewLeft();

      TEST_HELPERS.expectCalledAndMatchSnapshot(
        PORTAL_HELPERS.openPhotoPreview,
      );
    });
  });

  describe('previewRight()', () => {
    it('should return null', () => {
      rendered.setProps({ previewId: 0 });

      expect(instance.previewRight()).toBe(null);
    });

    it('should previewRight next', () => {
      rendered.setProps({ previewId: 1 });
      PORTAL_HELPERS.openPhotoPreview = jest.fn();
      instance.children = jest.fn(() => [1, 2]);

      instance.previewRight();

      TEST_HELPERS.expectCalledAndMatchSnapshot(
        PORTAL_HELPERS.openPhotoPreview,
      );
    });

    it('should previewRight first', () => {
      rendered.setProps({ previewId: 2 });
      PORTAL_HELPERS.openPhotoPreview = jest.fn();
      instance.children = jest.fn(() => [1, 2]);

      instance.previewRight();

      TEST_HELPERS.expectCalledAndMatchSnapshot(
        PORTAL_HELPERS.openPhotoPreview,
      );
    });
  });

  describe('handleDescriptionMode()', () => {
    it('should setState editing false', () => {
      instance.handleDescriptionMode(VIEW_MODE);

      expect(rendered.state().editing).toBe(false);
    });

    it('should setState editing true', () => {
      instance.handleDescriptionMode('editing');

      expect(rendered.state().editing).toBe(true);
    });
  });

  describe('children()', () => {
    it('should return children reverse', () => {
      rendered.setProps({ children: [1, 2], sortBy: RECENTLY_UPLOADED });

      expect(instance.children()).toEqual([2, 1]);
    });

    it('should return children', () => {
      rendered.setProps({ children: [1, 2], sortBy: LEAST_RECENTLY_UPLOADED });

      expect(instance.children()).toEqual([1, 2]);
    });
  });

  describe('renderReactButton', () => {
    it('should render react button', () => {
      const snapshot = shallow(
        <div>{instance.renderReactButton(1)(null, true, 1)}</div>,
      );

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderPhoto()', () => {
    it('should renderPhoto', () => {
      rendered.setProps({ previewId: 1, children: [1, 2] });
      ability.can = jest.fn(() => true);

      TEST_HELPERS.expectMatchSnapshot(instance.renderPhoto);
    });
  });

  describe('renderContent()', () => {
    it('should renderContent', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderContent);
    });
  });

  describe('render()', () => {
    it('should render correctly', () => {
      instance.renderPhoto = jest.fn(() => 'renderPhoto');
      instance.renderContent = jest.fn(() => 'renderContent');

      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
