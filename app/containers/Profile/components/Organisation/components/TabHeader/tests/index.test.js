import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { ProfileTabHeader } from '../index';

describe('<ProfileTabHeader />', () => {
  let rendered;
  let instance;
  const history = {
    push: jest.fn(),
  };
  const location = {
    pathname: 'http://sample',
    search: '?tab=1',
  };
  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    classes: {},
    resaga,
    history,
    location,
  };

  beforeEach(() => {
    rendered = shallow(<ProfileTabHeader {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(ProfileTabHeader).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('render()', () => {
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    describe('handleTabChange', () => {
      it('should call history push function', () => {
        instance.handleTabChange({ id: 1 })();
        expect(history.push).toBeCalled();
        expect(history.push.mock.calls).toMatchSnapshot();
      });
    });
    it('should render correctly if query param tab is undefined', () => {
      rendered.setProps({
        location: {
          search: '',
        },
      });
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('onClickRenderPage', () => {
    it('should call history push function', () => {
      instance.onClickRenderPage({ item: { id: 1 } })();
      expect(history.push).toBeCalled();
      expect(history.push.mock.calls).toMatchSnapshot();
    });
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
});
