import React from 'react';
import toJSON from 'enzyme-to-json';
import { shallow } from 'enzyme';
import { Body } from '../index';

describe('<Body />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    classes: {},
    resaga,
    id: 999,
  };

  beforeEach(() => {
    rendered = shallow(<Body {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(Body).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('renderDescription()', () => {
    it('should render view mode', () => {
      rendered.setProps({ editing: 0, description: 'hello world' });
      const snapshot = shallow(<div>{instance.renderDescription()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should render edit mode', () => {
      rendered.setProps({ editing: 123, description: 'hello world' });
      const snapshot = shallow(<div>{instance.renderDescription()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderPhoto()', () => {
    it('should return empty if !content', () => {
      rendered.setProps({ editing: 0, content: '' });
      expect(instance.renderPhoto()).toBe('');
    });

    it('should render view mode', () => {
      rendered.setProps({ editing: 0, content: 'hello world' });
      const snapshot = shallow(<div>{instance.renderPhoto()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should render edit mode', () => {
      rendered.setProps({ editing: 123, content: 'hello world' });
      instance.renderPhotoCropper = () => 'renderPhotoCropper';
      const snapshot = shallow(<div>{instance.renderPhoto()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderAttachment()', () => {
    it('should render view mode', () => {
      rendered.setProps({ editing: 0, id: 13, attachmentId: 123 });
      const snapshot = shallow(<div>{instance.renderAttachment()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should render edit mode', () => {
      rendered.setProps({ editing: 1, id: 13, attachmentId: 123 });
      const snapshot = shallow(<div>{instance.renderAttachment()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderBody()', () => {
    it('should return empty if !description && !attachment', () => {
      instance.renderDescription = jest.fn();
      instance.renderAttachment = jest.fn();
      expect(instance.renderBody()).toBe('');
    });

    it('should render view mode', () => {
      instance.renderDescription = jest.fn(() => 'renderDescription');
      instance.renderAttachment = jest.fn(() => 'renderAttachment');
      const snapshot = shallow(<div>{instance.renderBody()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('render()', () => {
    it('should render empty if !body && !photo', () => {
      instance.renderBody = jest.fn();
      instance.renderPhoto = jest.fn();
      const snapshot = shallow(<div>{instance.render()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should render correctly', () => {
      instance.renderBody = jest.fn(() => 'renderBody');
      instance.renderPhoto = jest.fn(() => 'renderPhoto');
      const snapshot = shallow(<div>{instance.render()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
