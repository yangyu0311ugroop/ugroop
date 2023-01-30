import { RELATIONSHIPS } from 'appConstants';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { Create } from '../index';

describe('<Create />', () => {
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
    rendered = shallow(<Create {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(Create).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('handleCreateClick', () => {
    it('should change open state to true', () => {
      instance.handleCreateClick();

      expect(rendered.state().open).toBe(true);
    });
  });

  describe('handleCreateClose', () => {
    it('should change open state to false', () => {
      instance.handleCreateClose();

      expect(rendered.state().open).toBe(false);
    });
  });

  describe('handleButtonRef', () => {
    it('should set ref based on the ref being passed down', () => {
      instance.handleButtonRef('aaa');

      expect(rendered.state().anchorEl).toBe('aaa');
    });
  });

  describe('handleSubmitSuccess', () => {
    it('should make loading and open state to false', () => {
      instance.handleSubmitSuccess();

      expect(rendered.state().loading).toBe(false);
      expect(rendered.state().open).toBe(false);
    });
  });

  describe('handleSubmitError', () => {
    it('should make loading state to false', () => {
      instance.handleSubmitError();

      expect(rendered.state().loading).toBe(false);
    });
  });

  describe('handleValidSubmit', () => {
    it('should call dispatchTo when creating link', () => {
      const model = {
        relationship: RELATIONSHIPS.MOTHER,
        followerId: 1,
      };

      instance.handleValidSubmit(model);

      expect(rendered.state().loading).toBe(true);
      expect(resaga.dispatchTo).toBeCalled();
      expect(resaga.dispatchTo.mock.calls).toMatchSnapshot();
    });
  });

  describe('renderButton', () => {
    it('should match snapshot', () => {
      const snapshot = shallow(<div>{instance.renderButton()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should match snapshot if renderButton props exist', () => {
      const renderButton = jest.fn(() => 'renderButton');
      rendered.setProps({
        renderButton,
      });
      const snapshot = shallow(<div>{instance.renderButton()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('render()', () => {
    it('should render correctly', () => {
      instance.renderButton = jest.fn(() => 'renderButton');
      rendered.setProps({
        selectableFollowers: [1, 2],
      });
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should render correctly if selectableFollowers is empty', () => {
      instance.renderButton = jest.fn(() => 'renderButton');
      rendered.setProps({
        selectableFollowers: [],
      });
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
