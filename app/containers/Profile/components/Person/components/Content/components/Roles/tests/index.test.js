import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { Roles } from '../index';

describe('<Roles />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    classes: {},
    resaga,
    id: 1,
    history: { push: jest.fn() },
  };

  beforeEach(() => {
    rendered = shallow(<Roles {...props} />);
    instance = rendered.instance();
    jest.clearAllMocks();
  });

  it('should exists', () => {
    expect(Roles).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('componentDidMount', () => {
    it('should call dispatchTo', () => {
      instance.componentDidMount();
      expect(resaga.dispatchTo.mock.calls).toMatchSnapshot();
    });
  });

  describe('goToCreateOrganisationPage()', () => {
    it('should call history.push', () => {
      const history = { push: jest.fn() };

      rendered.setProps({ history });

      instance.goToCreateOrganisationPage();

      expect(history.push).toBeCalled();
      expect(history.push.mock.calls).toMatchSnapshot();
    });
  });

  describe('render()', () => {
    it('should render correctly', () => {
      rendered.setProps({ orgUserIds: [1, 2] });
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should render empty', () => {
      rendered.setProps({ orgUserIds: [] });
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should render correctly if isUserRolesFetching is true', () => {
      rendered.setProps({
        isUserRolesFetching: true,
      });
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
