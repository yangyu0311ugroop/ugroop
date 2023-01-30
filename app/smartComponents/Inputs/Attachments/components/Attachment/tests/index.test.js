import { shallow } from 'enzyme';
import React from 'react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { Attachment, defaultValue } from '../index';

describe('defaultValue()', () => {
  it('should defaultValue', () => {
    TEST_HELPERS.expectDefined(defaultValue, [{ eventAttachment: {} }]);
  });
});

describe('<Attachment />', () => {
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

    rendered = shallow(<Attachment {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(Attachment).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('getUploadedFile()', () => {
    it('should return null', () => {
      const uploadedFile = { hi: 123 };

      rendered.setProps({ uploadedFile });

      expect(instance.getUploadedFile()).toBe(uploadedFile);
    });

    it('should getUploadedFile', () => {
      rendered.setProps({ uploadedFile: null });

      TEST_HELPERS.expectDefined(instance.getUploadedFile);
    });
  });

  describe('handleDelete()', () => {
    it('should handleDelete()', () => {
      instance.handleDelete();

      expect(rendered.state().isDeleted).toBe(true);
    });
  });

  describe('handleUndoDelete()', () => {
    it('should handleUndoDelete()', () => {
      instance.handleUndoDelete();

      expect(rendered.state().isDeleted).toBe(false);
    });
  });

  describe('onInlineSubmit()', () => {
    it('should onInlineSubmit()', () => {
      const onSubmit = jest.fn();
      rendered.setProps({ onSubmit });
      instance.onInlineSubmit();
      expect(onSubmit).toBeCalled();
    });
  });

  describe('renderInlineDelete()', () => {
    it('should renderInlineDelete()', () => {
      expect(instance.renderInlineDelete()).toEqual(null);
    });
    it('should renderInlineDelete()', () => {
      const renderDelete = jest.fn();
      rendered.setProps({ renderDelete });
      instance.renderInlineDelete(1);
      expect(renderDelete).toBeCalled();
    });
  });

  describe('render()', () => {
    it('should render', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
    it('should render inline', () => {
      rendered.setProps({ inline: true });
      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
  });
});
