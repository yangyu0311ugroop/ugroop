import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { TourInvitationCard } from '../index';

describe('<TourInvitationCard />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    viewStore: 'someStore',
    userId: 999,
    classes: {},
    resaga,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    rendered = shallow(<TourInvitationCard {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(TourInvitationCard).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('componentDidMount()', () => {
    it('should call fetchInvitation', () => {
      rendered.setProps({ showCompleted: true });
      instance.fetchData = jest.fn();

      instance.componentDidMount();

      expect(instance.fetchData).toBeCalledWith(true);
    });
  });

  describe('componentWillReceiveProps()', () => {
    it('should call fetchInvitation', () => {
      rendered.setProps({ showCompleted: true });
      instance.fetchData = jest.fn();

      instance.componentWillReceiveProps({ showCompleted: false });

      expect(instance.fetchData).toBeCalledWith(false);
    });

    it('should NOT call fetchInvitation', () => {
      rendered.setProps({ showCompleted: true });
      instance.fetchInvitation = jest.fn();

      instance.componentWillReceiveProps({ showCompleted: true });

      expect(instance.fetchInvitation).not.toBeCalled();
    });
  });

  describe('fetchInvitation()', () => {
    it('should call dispatchTo with status = COMPLETED', () => {
      instance.fetchData(true);

      expect(resaga.dispatchTo).toBeCalled();
      expect(resaga.dispatchTo.mock.calls).toMatchSnapshot();
    });

    it('should call dispatchTo with status = PENDING', () => {
      instance.fetchData(false);

      expect(resaga.dispatchTo).toBeCalled();
      expect(resaga.dispatchTo.mock.calls).toMatchSnapshot();
    });
  });
  describe('onFetchSuccess()', () => {
    it('should set loading to false', () => {
      instance.onFetchSuccess();
      expect(rendered.state().loading).toEqual(false);
    });
    it('should set loading to false on error', () => {
      instance.onFetchError();
      expect(rendered.state().loading).toEqual(false);
    });
  });

  describe('renderProp()', () => {
    it('should return null', () => {
      expect(instance.renderProp({ array: [] })).toBe(null);
    });

    it('should renderProp', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderProp, [
        { array: [1], content: 'renderProp' },
      ]);
    });
  });

  describe('render()', () => {
    it('should render correctly', () => {
      rendered.setState({ loading: false });
      rendered.setProps({ fixHeight: true });

      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should render children', () => {
      rendered.setState({ loading: false });
      const children = jest.fn(() => 'children');

      rendered.setProps({ children });

      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
