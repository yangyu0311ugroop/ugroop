import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { ChangeDueDate } from '../index';

describe('<ChangeDueDate />', () => {
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
    rendered = shallow(<ChangeDueDate {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(ChangeDueDate).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('stopPropagation()', () => {
    it('should do nothing', () => {
      expect(instance.stopPropagation({})).toBe(undefined);
    });

    it('should call event.stopPropagation', () => {
      const event = { stopPropagation: jest.fn() };

      instance.stopPropagation(event);

      expect(event.stopPropagation).toBeCalledWith();
    });
  });

  // TODO: update when Modal is implemented
  describe('handleShowHelp()', () => {
    it('should show help', () => {
      instance.handleShowHelp();
    });
  });

  describe('renderBody()', () => {
    it('should renderBody', () => {
      const snapshot = shallow(<div>{instance.renderBody({})}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderHeader()', () => {
    it('should renderHeader', () => {
      const snapshot = shallow(<div>{instance.renderHeader()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('render()', () => {
    it('should render correctly', () => {
      instance.renderHeader = jest.fn(() => 'renderHeader');
      instance.renderBody = jest.fn(() => 'renderBody');

      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
