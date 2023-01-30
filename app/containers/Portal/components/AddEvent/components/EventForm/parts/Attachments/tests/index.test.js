import { shallow } from 'enzyme';
import React from 'react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { Attachments } from '../index';

describe('<Attachments />', () => {
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

    rendered = shallow(<Attachments {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(Attachments).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('eventAttachments()', () => {
    it('should return null', () => {
      rendered.setState({ uploadedIds: null });

      expect(instance.eventAttachments()).toBe(null);
    });

    it('should eventAttachments', () => {
      rendered.setState({
        uploadedIds: [1],
        uploadedFiles: {
          1: { name: 'name', url: 'url', responseFile: { type: 'image' } },
        },
      });

      TEST_HELPERS.expectDefined(instance.eventAttachments);
    });
  });

  describe('updateAttachments()', () => {
    it('should updateAttachments()', () => {
      instance.updateAttachments({ uploadedIds: 1, uploadedFiles: 2 });

      expect(rendered.state().uploadedIds).toBe(1);
      expect(rendered.state().uploadedFiles).toBe(2);
    });
  });

  describe('setAdding()', () => {
    it('should setAdding()', () => {
      instance.setAdding();

      expect(rendered.state().adding).toBe(true);
    });
  });

  describe('closeAdding()', () => {
    it('should closeAdding()', () => {
      instance.closeAdding();

      expect(rendered.state().adding).toBe(false);
    });
  });

  describe('render()', () => {
    it('should render !adding', () => {
      rendered.setProps({ adding: false });

      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });

    it('should render adding', () => {
      rendered.setProps({ adding: true });
      instance.eventAttachments = jest.fn(() => 'eventAttachments');

      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
  });
});
