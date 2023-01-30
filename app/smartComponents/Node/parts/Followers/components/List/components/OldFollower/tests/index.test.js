import { NODE_API_HELPERS } from 'apis/components/Node/helpers';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { OldFollower } from '../index';

describe('<OldFollower />', () => {
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
    rendered = shallow(<OldFollower {...props} />);
    instance = rendered.instance();
    jest.clearAllMocks();
  });

  it('should exists', () => {
    expect(OldFollower).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('handleSubmitSuccess', () => {
    it('should call resaga setValue and call onSuccess passed to it', () => {
      const onSuccess = jest.fn();
      instance.handleSubmitSuccess({ onSuccess })();

      expect(rendered.state().loading).toBe(false);
      expect(resaga.setValue).toBeCalled();
      expect(resaga.setValue.mock.calls).toMatchSnapshot();
      expect(onSuccess).toBeCalled();
    });
  });

  describe('handleCreateLink', () => {
    it('should call dispatchTo create link', () => {
      instance.handleCreateLink({ model: {}, onSuccess: jest.fn() })();

      expect(rendered.state().loading).toBe(true);
      expect(resaga.dispatchTo).toBeCalled();
      expect(resaga.dispatchTo.mock.calls).toMatchSnapshot();
    });
  });

  describe('handleSubmitError', () => {
    it('should set loading state to false', () => {
      instance.handleSubmitError();

      expect(rendered.state().loading).toBe(false);
    });
  });

  describe('handleSubmit', () => {
    it('should call updateNode', () => {
      NODE_API_HELPERS.updateNode = jest.fn();
      instance.handleSubmit({ onError: jest.fn() });

      expect(NODE_API_HELPERS.updateNode).toBeCalled();
      expect(NODE_API_HELPERS.updateNode.mock.calls).toMatchSnapshot();
    });
  });

  describe('renderValue', () => {
    it('should match snapshot', () => {
      const snapshot = shallow(<div>{instance.renderValue()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderForm', () => {
    it('should match snapshot', () => {
      const snapshot = shallow(<div>{instance.renderForm()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('render()', () => {
    it('should render correctly', () => {
      instance.renderForm = jest.fn(() => 'renderForm');
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
