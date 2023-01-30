import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { ANIMATION_MAX_INDEX } from '../constants';
import { Transferee } from '../index';

describe('<Transferee />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    id: 999,
    classes: {},
    resaga,
  };

  beforeEach(() => {
    rendered = shallow(<Transferee {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(Transferee).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('renderStatus()', () => {
    it('should render correctly', () => {
      rendered.setProps({ userId: [1] });
      const snapshot = shallow(<div>{instance.renderStatus()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should render correctly if creating', () => {
      const snapshot = shallow(<div>{instance.renderStatus()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
  describe('renderUserStatus()', () => {
    it('should render correctly', () => {
      rendered.setProps({ userId: [1] });
      const snapshot = shallow(<div>{instance.renderUserStatus(true)}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should render correctly if false', () => {
      rendered.setProps({ creating: true });
      const snapshot = shallow(<div>{instance.renderUserStatus(false)}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
  describe('renderContent()', () => {
    it('should render correctly', () => {
      rendered.setProps({ accepted: false });
      const snapshot = shallow(<div>{instance.renderContent()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should render correctly if accepted', () => {
      rendered.setProps({ accepted: true });
      const snapshot = shallow(<div>{instance.renderContent()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
  describe('renderPersonalMessage()', () => {
    it('should render correctly', () => {
      rendered.setProps({ content: '' });
      const snapshot = shallow(<div>{instance.renderPersonalMessage()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should render correctly if content', () => {
      rendered.setProps({ content: 'hello' });
      const snapshot = shallow(<div>{instance.renderPersonalMessage()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
  describe('render()', () => {
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should render correctly', () => {
      rendered.setProps({ index: ANIMATION_MAX_INDEX + 1 });
      rendered.setState({ show: true });
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should render correctly', () => {
      rendered.setProps({ noanimate: true, index: ANIMATION_MAX_INDEX - 1 });
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should render correctly', () => {
      rendered.setProps({ noanimate: false, index: ANIMATION_MAX_INDEX - 1 });
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
