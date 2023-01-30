import { shallow } from 'enzyme';
import React from 'react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { Thumbnail } from '../index';

describe('<Thumbnail />', () => {
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
    jest.clearAllMocks();

    rendered = shallow(<Thumbnail {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(Thumbnail).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('padUrlQuery()', () => {
    it('should padUrlQuery()', () => {
      expect(instance.padUrlQuery()).toBeDefined();
    });
  });

  describe('isPhoto()', () => {
    it('should return false if not truthy', () => {
      instance.extension = jest.fn(() => '');

      expect(instance.isPhoto()).toBe(false);
    });
    it('should return true jpg', () => {
      instance.extension = jest.fn(() => 'jpg');

      expect(instance.isPhoto()).toBe(true);
    });
    it('should return true JPEG', () => {
      instance.extension = jest.fn(() => 'JPEG');

      expect(instance.isPhoto()).toBe(true);
    });
    it('should return true GIF', () => {
      instance.extension = jest.fn(() => 'GIF');

      expect(instance.isPhoto()).toBe(true);
    });
    it('should return true PNG', () => {
      instance.extension = jest.fn(() => 'PNG');

      expect(instance.isPhoto()).toBe(true);
    });
    it('should return true BMP', () => {
      instance.extension = jest.fn(() => 'BMP');

      expect(instance.isPhoto()).toBe(true);
    });
    it('should return true ICO', () => {
      instance.extension = jest.fn(() => 'ICO');

      expect(instance.isPhoto()).toBe(true);
    });
    it('should return false', () => {
      instance.extension = jest.fn(() => 'PDF');

      expect(instance.isPhoto()).toBe(false);
    });
  });

  describe('extension()', () => {
    it('should extension() jpg', () => {
      rendered.setProps({ type: 'jpg' });

      expect(instance.extension()).toBe('jpg');
    });

    it('should extension() image/jpg', () => {
      rendered.setProps({ type: 'image/jpg' });

      expect(instance.extension()).toBe('jpg');
    });

    it('should extension() image.jpg', () => {
      rendered.setProps({ name: 'image.jpg' });

      expect(instance.extension()).toBe('jpg');
    });

    it('should extension() no extension', () => {
      rendered.setProps({ name: 'image' });

      expect(instance.extension()).toBe('image');
    });
  });

  describe('renderImage()', () => {
    it('should renderThumbnailDefault', () => {
      rendered.setProps({ type: '', name: '' });
      instance.renderThumbnailDefault = jest.fn(() => 'renderThumbnailDefault');

      expect(instance.renderImage()).toBe('renderThumbnailDefault');
    });

    it('should renderImageThumbnail', () => {
      rendered.setProps({ type: 'jpg', name: 'photo' });
      instance.renderImageThumbnail = jest.fn(() => 'renderImageThumbnail');
      instance.padUrlQuery = jest.fn(() => 'padUrlQuery');
      instance.isPhoto = jest.fn(() => true);

      expect(instance.renderImage()).toBe('renderImageThumbnail');
    });

    it('should render default', () => {
      rendered.setProps({ type: 'jpg', name: 'photo' });
      instance.isPhoto = jest.fn(() => false);
      instance.extension = jest.fn(() => 'extension');
      instance.padUrlQuery = jest.fn(() => 'padUrlQuery');

      TEST_HELPERS.expectMatchSnapshot(instance.renderImage);
    });
  });

  describe('render()', () => {
    it('should render isDeleted', () => {
      rendered.setProps({ isDeleted: true });

      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });

    it('should render', () => {
      instance.renderImage = jest.fn(() => 'renderImage');
      instance.padUrlQuery = jest.fn(() => 'padUrlQuery');

      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });

    it('should render sub', () => {
      rendered.setProps({ name: 'name.jpg', description: 'hello' });
      instance.padUrlQuery = jest.fn(() => 'padUrlQuery');

      instance.renderImage = jest.fn(() => 'renderImage');

      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
  });
});
