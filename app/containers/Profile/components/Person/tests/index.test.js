import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { Person } from '../index';

describe('<Person />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const history = {
    push: jest.fn(),
  };

  const location = {
    pathname: 'http://sample',
    search: '?tab=1',
  };

  const props = {
    classes: {},
    resaga,
    userId: 1,
    history,
    location,
  };

  beforeEach(() => {
    rendered = shallow(<Person {...props} />);
    instance = rendered.instance();
  });

  describe('onClickRenderPage', () => {
    it('should call history push function', () => {
      instance.onClickRenderPage({ item: { id: 1 } })();
      expect(history.push).toBeCalled();
      expect(history.push.mock.calls).toMatchSnapshot();
    });
  });

  describe('getUserPreference', () => {
    it('should call dispatchTo', () => {
      instance.getUserPreference();
      expect(resaga.dispatchTo).toHaveBeenCalled();
    });
  });

  describe('renderSettingTabDropDownMenu', () => {
    it('should call history push function and render', () => {
      const snapshot = shallow(
        <div>{instance.renderSettingTabDropDownMenu({})}</div>,
      );

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should call history push function, undefined, and render', () => {
      rendered.setProps({
        location: {
          search: '',
        },
      });

      const snapshot = shallow(
        <div>{instance.renderSettingTabDropDownMenu({})}</div>,
      );

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  it('should exists', () => {
    expect(Person).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('renderSettingTabDropDownButton', () => {
    it('should call history push function and render', () => {
      const snapshot = shallow(
        <div>{instance.renderSettingTabDropDownButton({})}</div>,
      );

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should call history push function, undefined, and render', () => {
      rendered.setProps({
        location: {
          search: '',
        },
      });

      const snapshot = shallow(
        <div>{instance.renderSettingTabDropDownButton({})}</div>,
      );

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('render()', () => {
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should render loading if getPersonDetailsLoading is true', () => {
      rendered.setProps({
        getPersonDetailsLoading: true,
      });
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
