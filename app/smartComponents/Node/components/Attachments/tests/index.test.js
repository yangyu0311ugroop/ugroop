import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { SUMMARY, LIST } from 'appConstants';
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
    rendered = shallow(<Attachments {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(Attachments).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });
  describe('eventAttachmentIcon()', () => {
    it('eventAttachmentIcon should render correctly when no events attachments', () => {
      const data = {
        id: 1,
        eventAttachments: [],
        position: 1,
      };
      const snapshot = shallow(<div>{instance.eventAttachmentIcon(data)}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('eventAttachmentIcon should render correctly', () => {
      const data = {
        id: 1,
        eventAttachments: [1, 2],
        position: 1,
      };
      const snapshot = shallow(<div>{instance.eventAttachmentIcon(data)}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
  describe('renderEventAttachments()', () => {
    it('renderEventAttachments should render correctly when no events attachments', () => {
      rendered.setProps({ eventDataIds: [1], events: [{ id: 1 }] });
      const snapshot = shallow(<div>{instance.renderEventAttachments()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
  describe('renderSummary()', () => {
    it('renderSummary should render correctly when no events attachments', () => {
      rendered.setProps({ attachmentIds: [] });
      const snapshot = shallow(<div>{instance.renderSummary()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('renderSummary should render correctly', () => {
      rendered.setProps({ attachmentIds: [1, 2] });
      const snapshot = shallow(<div>{instance.renderSummary()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
  describe('renderModePopperButton()', () => {
    it('should render correctly from summary', () => {
      rendered.setProps({ variant: SUMMARY });
      const snapshot = shallow(
        <div>{instance.renderModePopperButton({})}</div>,
      );
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should render correctly from List', () => {
      rendered.setProps({ variant: LIST });
      const snapshot = shallow(
        <div>{instance.renderModePopperButton({})}</div>,
      );
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should render correctly from List', () => {
      rendered.setProps({
        variant: LIST,
        attachmentIds: [1, 2],
        eventAttachmentsIds: [3, 4, 5],
      });
      const snapshot = shallow(
        <div>{instance.renderModePopperButton({})}</div>,
      );
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
  describe('renderModePopperOptions()', () => {
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.renderModePopperOptions()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
  describe('renderModePopper()', () => {
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.renderModePopper()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should render correctly', () => {
      rendered.setProps({ eventAttachmentsIds: [1] });
      const snapshot = shallow(<div>{instance.renderModePopper()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
  describe('closeMoreMenu()', () => {
    it('should setState', () => {
      const event = { currentTarget: 'target' };
      instance.stopPropagation = jest.fn();
      global.setTimeout = jest.fn(cb => cb());

      instance.closeMoreMenu(event);

      expect(instance.stopPropagation).toBeCalledWith(event);
      expect(global.setTimeout).toBeCalled();
      expect(rendered.state().anchorEl).toBe(null);
    });
  });

  describe('openMoreMenu()', () => {
    it('should setState', () => {
      const event = { currentTarget: 'target' };
      instance.stopPropagation = jest.fn();

      instance.openMoreMenu(event);

      expect(instance.stopPropagation).toBeCalledWith(event);
      expect(rendered.state().anchorEl).toBe(event.currentTarget);
    });

    it('should NOT setState', () => {
      const event = { currentTarget: 'target' };
      instance.stopPropagation = jest.fn();
      rendered.setState({ blockOpening: true, anchorEl: null });

      instance.openMoreMenu(event);

      expect(instance.stopPropagation).toBeCalledWith(event);
      expect(rendered.state().anchorEl).toBe(null);
    });
  });

  describe('stopPropagation()', () => {
    it('should setState', () => {
      const event = { stopPropagation: jest.fn() };

      instance.stopPropagation(event);

      expect(event.stopPropagation).toBeCalledWith();
    });
  });
  describe('renderMenuHeader()', () => {
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.renderMenuHeader('test')}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.renderMenuHeader()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
  describe('renderEventAttachmentList()', () => {
    it('should render correctly', () => {
      rendered.setProps({ eventAttachmentsIds: [1] });
      const snapshot = shallow(
        <div>{instance.renderEventAttachmentList()}</div>,
      );
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should render correctly', () => {
      rendered.setProps({ eventAttachmentsIds: [] });
      const snapshot = shallow(
        <div>{instance.renderEventAttachmentList()}</div>,
      );
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should render correctly', () => {
      rendered.setProps({
        eventAttachmentsIds: [1, 2, 3, 4],
        attachmentIds: [1, 2, 3, 4],
      });
      const snapshot = shallow(
        <div>{instance.renderEventAttachmentList(true, true)}</div>,
      );
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
  describe('renderSectionAttachmentList()', () => {
    it('should render correctly', () => {
      rendered.setProps({ attachmentIds: [1] });
      const snapshot = shallow(
        <div>{instance.renderSectionAttachmentList()}</div>,
      );
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should render correctly', () => {
      rendered.setProps({ attachmentIds: [] });
      const snapshot = shallow(
        <div>{instance.renderSectionAttachmentList()}</div>,
      );
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
  describe('render()', () => {
    it('should render correctly', () => {
      rendered.setProps({ attachmentIds: [1], events: [{ id: 1 }] });
      instance.renderContent = jest.fn(() => 'renderContent');
      const snapshot = shallow(<div>{instance.render()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
