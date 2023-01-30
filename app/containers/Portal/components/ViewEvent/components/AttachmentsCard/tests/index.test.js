import { shallow } from 'enzyme';
import React from 'react';
import { EVENT_VIEW_HELPERS } from 'smartComponents/Node/types/Event/helpers';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { AttachmentsCard } from '../index';

describe('<AttachmentsCard />', () => {
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

    rendered = shallow(<AttachmentsCard {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(AttachmentsCard).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('renderDescription()', () => {
    it('should return null', () => {
      expect(instance.renderDescription(null)).toBe(null);
    });

    it('should renderDescription', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderDescription, [
        'description',
      ]);
    });
  });

  describe('reduceAttachments()', () => {
    it('should reduceAttachments()', () => {
      expect(
        instance.reduceAttachments([1], { errorMessage: 'some erroe' }),
      ).toEqual([1]);
    });

    it('should reduceAttachments()', () => {
      expect(instance.reduceAttachments([1], { id: 2 })).toEqual([
        1,
        { id: 2 },
      ]);
    });
  });

  describe('attachments()', () => {
    it('should return props', () => {
      rendered.setProps({ id: 0 });
      EVENT_VIEW_HELPERS.eventAttachments = jest.fn(() => [11]);

      expect(instance.attachments()).toEqual([11]);
    });

    it('should attachments', () => {
      rendered.setProps({ id: 11, attachments: [12] });

      expect(instance.attachments()).toEqual([12]);
    });
    it('should attachments return empty array', () => {
      rendered.setProps({ id: 11, attachments: 0 });

      expect(instance.attachments()).toEqual([]);
    });
  });

  describe('renderAttachment()', () => {
    it('should return null', () => {
      rendered.setProps({ id: null });

      TEST_HELPERS.expectMatchSnapshot(instance.renderAttachment);
    });

    it('should renderAttachment', () => {
      rendered.setProps({ id: 11 });

      TEST_HELPERS.expectMatchSnapshot(instance.renderAttachment);
    });
  });

  describe('renderAttachments()', () => {
    it('should return null', () => {
      instance.attachments = jest.fn(() => []);

      TEST_HELPERS.expectMatchSnapshot(instance.renderAttachments);
    });

    it('should renderAttachments', () => {
      instance.attachments = jest.fn(() => [1, 2]);

      TEST_HELPERS.expectMatchSnapshot(instance.renderAttachments);
    });
  });

  describe('renderEmpty()', () => {
    it('should return null', () => {
      rendered.setProps({ canCreate: false });

      expect(instance.renderEmpty()).toBe(null);
    });

    it('should renderEmpty', () => {
      rendered.setProps({ canCreate: true });

      TEST_HELPERS.expectMatchSnapshot(instance.renderEmpty);
    });
  });

  describe('render()', () => {
    it('should return null', () => {
      instance.attachments = jest.fn(() => []);

      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });

    it('should render', () => {
      instance.renderAttachments = jest.fn(() => 'renderAttachments');
      instance.attachments = jest.fn(() => [1, 2]);

      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
  });
});
