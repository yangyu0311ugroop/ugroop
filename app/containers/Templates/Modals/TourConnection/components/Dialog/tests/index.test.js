import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { mockFunc, TourConnectionDialog } from '../index';

describe('<TourConnectionDialog />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
  };

  const onClose = jest.fn();

  const props = {
    classes: {},
    onClose,
    resaga,
  };

  beforeEach(() => {
    jest.clearAllMocks();

    rendered = shallow(<TourConnectionDialog {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(TourConnectionDialog).toBeDefined();
  });

  it('should return nothing', () => {
    expect(mockFunc()).not.toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('handleCloseClick()', () => {
    it('should call onClose', () => {
      instance.handleCloseClick();
      expect(onClose).toBeCalled();
    });
  });

  describe('handleRemoveUser()', () => {
    it('should call onClose', () => {
      instance.handleRemoveUser();
      expect(onClose).toBeCalled();
    });
  });

  describe('render()', () => {
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
