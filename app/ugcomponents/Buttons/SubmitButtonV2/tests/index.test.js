import { DO_NOTHING } from 'appConstants';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { SubmitButton } from '../index';

describe('<Button />', () => {
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
    rendered = shallow(<SubmitButton {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(SubmitButton).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('handleClick()', () => {
    it('should call onClick', () => {
      const onClick = jest.fn();
      rendered.setProps({ onClick });

      expect(instance.handleClick('some', 'props')).not.toBe(DO_NOTHING);

      expect(onClick).toBeCalledWith('some', 'props');
    });

    it('should not do anything', () => {
      rendered.setProps({ onClick: undefined });

      expect(instance.handleClick('some', 'props')).toBe(DO_NOTHING);
    });
  });

  describe('renderLoading()', () => {
    it('should renderLoading correctly', () => {
      const snapshot = shallow(<div>{instance.renderLoading()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderValid()', () => {
    it('should renderValid correctly', () => {
      const snapshot = shallow(<div>{instance.renderValid()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('render()', () => {
    it('should render valid', () => {
      instance.renderValid = () => 'renderValid';

      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should render loading', () => {
      instance.renderLoading = () => 'renderLoading';
      rendered.setProps({ loading: true });

      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
